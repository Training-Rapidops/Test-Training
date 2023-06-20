const _ = require('lodash');
const fs = require('fs');
const jsonFormat = require('json-format');
process.env.NODE_ENV = process.argv[2] || 'dev';
process.env.REGION = process.argv[3];
const deploymentStep = process.argv[5];
const env = process.env.NODE_ENV;
const configuration = require('./index');
let applyServerDeploymentCommands = '#!/usr/bin/env  bash';
let applyJobDeploymentCommands = '#!/usr/bin/env  bash';
let applyCronDeploymentCommands = '#!/usr/bin/env  bash';
let applyServiceDeploymentCommands = '#!/usr/bin/env  bash';
let applyVirtualServiceDeploymentCommands = '#!/usr/bin/env  bash';

function start() {
  if (fs.existsSync('./deploy/ymls')) {
    fs.rmdirSync('./deploy/ymls', {recursive: true});
  }
  fs.mkdirSync('./deploy/ymls/crons', {
    recursive: true,
  });
  fs.mkdirSync('./deploy/ymls/deployments/jobs', {
    recursive: true,
  });
  fs.mkdirSync('./deploy/ymls/networking/services', {
    recursive: true,
  });
  fs.mkdirSync('./deploy/ymls/networking/virtual-services', {
    recursive: true,
  });
  if (deploymentStep) {
    generatePreReleaseDeploymentAppYMLFile({deploymentStep});
  } else {
    generateAppYMLFile();
    generateBackgroundJobsYMLFile();
    generateCronsYMLFile();
    generateAppServiceFile();
    generateAppIstioVirtualServiceFile();
  }
  fs.writeFileSync('./apply-server-deployments.sh', applyServerDeploymentCommands);
  fs.writeFileSync('./apply-job-deployments.sh', applyJobDeploymentCommands);
  fs.writeFileSync('./apply-cron-deployments.sh', applyCronDeploymentCommands);
  fs.writeFileSync('./apply-service-deployments.sh', applyServiceDeploymentCommands);
  fs.writeFileSync('./apply-virtual-service-deployments.sh', applyVirtualServiceDeploymentCommands);
}

function generatePreReleaseDeploymentAppYMLFile({deploymentStep}) {
  let ymlString = fs.readFileSync('./deploy/yml-templates/app.yml').toString('ASCII');
  _.forEach(configuration.app, (appConfig, appName) => {
    if (!appConfig.isPreReleaseDeployment) {
      return;
    }
    if (appConfig.ymlWithoutHealthCheck) {
      ymlString = fs.readFileSync('./deploy/yml-templates/app-without-readiness-probe.yml').toString('ASCII');
    } else {
      ymlString = fs.readFileSync('./deploy/yml-templates/app.yml').toString('ASCII');
    }
    const networkingConfig = appConfig;
    const flatJSON = convertNestedJSONToFlatJSON(networkingConfig);
    flatJSON.fileToRun = flatJSON.fileToRun.replace('src/', '');
    flatJSON.rootPath = appConfig.rootPath ? appConfig.rootPath : '/home/salesmate';
    flatJSON.configPath = appConfig.configPath ? appConfig.configPath : 'config/environments';
    _.forEach(flatJSON, (value, key) => {
      const regEx = new RegExp(`{{${key}}}`, 'igm');
      ymlString = ymlString.replace(regEx, getDefaultValue({key, value}));
    });
    fs.writeFileSync(`./deploy/ymls/deployments/${flatJSON.name}.yml`, ymlString);
    // eslint-disable-next-line max-len
    applyServerDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} apply -f deploy/ymls/deployments/${flatJSON.name}.yml`;
    // eslint-disable-next-line max-len
    applyServerDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} rollout status deployment/${flatJSON.name}`;
    // eslint-disable-next-line max-len
    applyServerDeploymentCommands += `\npod=\`sudo kubectl get pods -n ${flatJSON.namespace} | grep ${flatJSON.name} | cut -d ' ' -f 1\``;
    applyServerDeploymentCommands += `\necho $pod`;
    if (deploymentStep === 'CreateMissingTopics') {
      // eslint-disable-next-line max-len
      applyServerDeploymentCommands += `\nsudo kubectl exec $pod -n ${flatJSON.namespace} -- /bin/bash -c 'source /home/salesmate/.bash_profile && nvm use ${flatJSON.nodeVersion} && node utilities/create-missing-kafka-topics.js'`;
    } else if (deploymentStep === 'RunCockroachDbMigrations') {
      // eslint-disable-next-line max-len
      applyServerDeploymentCommands += `\nsudo kubectl exec $pod -n ${flatJSON.namespace} -- /bin/bash -c 'source /home/salesmate/.bash_profile && nvm use ${flatJSON.nodeVersion} && Database=default_values node migrate-postgre-database.js'`;
      // eslint-disable-next-line max-len
      applyServerDeploymentCommands += `\nsudo kubectl exec $pod -n ${flatJSON.namespace} -- /bin/bash -c 'source /home/salesmate/.bash_profile && nvm use ${flatJSON.nodeVersion} && node migrate-postgre-database.js'`;
    }
    applyServerDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} delete deployment/${flatJSON.name}`;
  });
}

function generateAppYMLFile() {
  let ymlString = fs.readFileSync('./deploy/yml-templates/app.yml').toString('ASCII');
  _.forEach(configuration.app, (appConfig, appName) => {
    if (appName === 'sample-service') {
      return;
    }
    if (appConfig.isPreReleaseDeployment) {
      return;
    }
    if (appConfig.ymlWithoutHealthCheck) {
      ymlString = fs.readFileSync('./deploy/yml-templates/app-without-readiness-probe.yml').toString('ASCII');
    } else {
      ymlString = fs.readFileSync('./deploy/yml-templates/app.yml').toString('ASCII');
    }
    const networkingConfig = appConfig;
    const flatJSON = convertNestedJSONToFlatJSON(networkingConfig);
    flatJSON.fileToRun = flatJSON.fileToRun.replace('src/', '');
    flatJSON.rootPath = appConfig.rootPath ? appConfig.rootPath : '/home/salesmate';
    flatJSON.configPath = appConfig.configPath ? appConfig.configPath : 'config/environments';
    _.forEach(flatJSON, (value, key) => {
      const regEx = new RegExp(`{{${key}}}`, 'igm');
      ymlString = ymlString.replace(regEx, getDefaultValue({key, value}));
    });
    ymlString = ymlString.replace(/{{[a-zA-Z0-9._]*}}/gmi, '');
    fs.writeFileSync(`./deploy/ymls/deployments/${flatJSON.name}.yml`, ymlString);
    // eslint-disable-next-line max-len
    applyServerDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} apply -f deploy/ymls/deployments/${flatJSON.name}.yml`;
    // eslint-disable-next-line max-len
    applyServerDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} rollout status deployment/${flatJSON.name}`;
  });
}

function generateAppServiceFile() {
  let ymlString = fs.readFileSync('./deploy/yml-templates/k8s-service.yml').toString('ASCII');
  _.forEach(configuration.app, (appConfig, appName) => {
    if (!appConfig.generateService) {
      return;
    }
    const networkingConfig = appConfig;
    ymlString = fs.readFileSync('./deploy/yml-templates/k8s-service.yml').toString('ASCII');
    const flatJSON = convertNestedJSONToFlatJSON(networkingConfig);
    flatJSON.serviceType = appConfig.serviceType ? appConfig.serviceType : getDefaultValue({key: 'serviceType'});
    _.forEach(flatJSON, (value, key) => {
      const regEx = new RegExp(`{{${key}}}`, 'igm');
      ymlString = ymlString.replace(regEx, getDefaultValue({key, value}));
    });
    fs.writeFileSync(
        `./deploy/ymls/networking/services/k8s-service-${flatJSON.name}.yml`, ymlString);
    // eslint-disable-next-line max-len
    applyServiceDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} apply -f deploy/ymls/networking/services/k8s-service-${flatJSON.name}.yml`;
  });
}

function generateAppIstioVirtualServiceFile() {
  const vsTypes = ['host', 'route'];
  _.forEach(configuration.app, (appConfig, appName) => {
    if (!appConfig.generateVirtualService) {
      return;
    }
    const networkingConfig = appConfig;
    for (const type of vsTypes) {
      if (type === 'route' && !appConfig.generateRoute) {
        continue;
      }
      const flatJSON = convertNestedJSONToFlatJSON(networkingConfig);
      let ymlString = JSON.parse(
          fs.readFileSync(`./deploy/yml-templates/istio-virtual-service-${type}.yml`).toString('ASCII'),
      );
      flatJSON.gateways = appConfig.gateways ? appConfig.gateways : ['salesmate-gateway'];
      flatJSON.destinationHost = `${flatJSON.serviceName}.${flatJSON.namespace}.svc.cluster.local`;
      ymlString = replaceVSYAMLVariables(ymlString, flatJSON, type);
      // eslint-disable-next-line max-len
      fs.writeFileSync(
          `./deploy/ymls/networking/virtual-services/istio-virtual-service-${flatJSON.name}-${type}.json`,
          jsonFormat(ymlString));
      // eslint-disable-next-line max-len
      applyVirtualServiceDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} apply -f deploy/ymls/networking/virtual-services/istio-virtual-service-${flatJSON.name}-${type}.json`;
    }
  });
}


function replaceVSYAMLVariables(json, config, type) {
  const httpObject = {
    'headers': {
      'request': {
        'remove': [
          'x-user-id',
        ],
      },
    },
    'match': [
      {
        'uri': {
          'prefix': '/{{endpointPrefix}}',
        },
      },
    ],
    'rewrite': {
      'uri': '{{endpointPrefix}}',
    },
    'route': [
      {
        'destination': {
          'host': '{{destinationHost}}',
          'port': {
            'number': '{{NODE_PORT}}',
          },
        },
      },
    ],
  };
  _.forEach(json, (value, key) => {
    switch (key) {
      case 'metadata':
        value.name = `${config.name}-${type}`;
        value.namespace = `${config.namespace}`;
        break;
      case 'spec':
        replaceVSYAMLVariables(value, config, type);
        break;
      case 'gateways':
        json[key] = config.gateways;
        break;
      case 'hosts':
        json[key] = type === 'host' ? config.gatewayHosts : ['*.salesmate.io'];
        break;
      case 'http':
        if (config.hasMultipleHttp && type === 'host') {
          for (let i = 1; i< config.noOfHttp; i++) {
            json[key].push(httpObject);
          }
          for (let i = 0; i< config.noOfHttp; i++) {
            if (!config.rewriteEndpointPrefix) {
              delete value[i].rewrite;
            }
            value[i] = replaceVSYAMLVariables(value[i], config, type);
          }
        } else {
          if (!config.rewriteEndpointPrefix) {
            delete value[0].rewrite;
          }
          value[0] = replaceVSYAMLVariables(value[0], config, type);
        }
        break;
      case 'match':
        if (config.hasMultipleUriMatch) {
          for (let i = 1; i < config.endpointPrefix.length; i++) {
            value.push({'uri': {}});
          }
        }
        for (let i = 0; i < value.length; i++) {
          if (Array.isArray(config.endpointPrefix)) {
            // eslint-disable-next-line max-len
            value[i].uri[Object.keys(config.endpointPrefix[i])[0]] = `${type === 'route'? '/apis' : ''}/${config.endpointPrefix[i][Object.keys(config.endpointPrefix[i])[0]]}`;
          } else {
            value[i].uri.prefix = `/${config.endpointPrefix}`;
          }
        }
        break;
      case 'route':
        value[0] = replaceVSYAMLVariables(value[0], config, type);
        break;
      case 'destination':
        value.host = config.destinationHost;
        value.port.number = config.servicePort;
        break;
      case 'rewrite':
        value.uri = config.rewriteEndpointPrefix ?
            `/${config.rewriteEndpointPrefix}` : `/${config.endpointPrefix}`;
        break;
    }
  });
  return json;
}

function generateCronsYMLFile() {
  let ymlString = fs.readFileSync('./deploy/yml-templates/crons.yml').toString('ASCII');
  _.forEach(configuration.cron, (cronConfig, cronName) => {
    ymlString = fs.readFileSync('./deploy/yml-templates/crons.yml').toString('ASCII');
    if (cronName === 'sample-cron') {
      return;
    }
    const flatJSON = convertNestedJSONToFlatJSON(cronConfig);
    flatJSON.fileToRun = flatJSON.fileToRun.replace('src/', '');
    _.forEach(flatJSON, (value, key) => {
      const regEx = new RegExp(`{{${key}}}`, 'igm');
      ymlString = ymlString.replace(regEx, getDefaultValue({key, value}));
    });
    ymlString = ymlString.replace(/{{[a-zA-Z0-9._]*}}/gmi, '');
    fs.writeFileSync(`./deploy/ymls/crons/${flatJSON.name}.yml`, ymlString);
    // eslint-disable-next-line max-len
    applyCronDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} apply -f deploy/ymls/crons/${flatJSON.name}.yml`;
  });
}

function generateBackgroundJobsYMLFile() {
  let ymlString = fs.readFileSync('./deploy/yml-templates/background-jobs.yml').toString('ASCII');
  _.forEach(configuration.backgroundJobs, (jobConfig, jobName) => {
    ymlString = fs.readFileSync('./deploy/yml-templates/background-jobs.yml').toString('ASCII');
    if (jobName === 'sample') {
      return;
    }
    const flatJSON = convertNestedJSONToFlatJSON(jobConfig);
    flatJSON.fileToRun = flatJSON.fileToRun.replace('src/', '');
    _.forEach(flatJSON, (value, key) => {
      const regEx = new RegExp(`{{${key}}}`, 'igm');
      ymlString = ymlString.replace(regEx, getDefaultValue({key, value}));
    });
    ymlString = ymlString.replace(/{{[a-zA-Z0-9._]*}}/gmi, '');
    fs.writeFileSync(`./deploy/ymls/deployments/jobs/${flatJSON.name}.yml`, ymlString);
    // eslint-disable-next-line max-len
    applyJobDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} apply -f deploy/ymls/deployments/jobs/${flatJSON.name}.yml`;
    applyJobDeploymentCommands += `\nsudo kubectl -n ${flatJSON.namespace} rollout status deployment/${flatJSON.name}`;
  });
}

function convertNestedJSONToFlatJSON(json, prefix) {
  let flatJSON = {};
  if (prefix) {
    prefix = `${prefix}.`;
  } else {
    prefix = '';
  }
  _.forEach(json, (value, key) => {
    if (_.isObject(value) && !Array.isArray(value)) {
      flatJSON = _.assign(flatJSON, convertNestedJSONToFlatJSON(value, `${prefix}${key}`));
    } else {
      if (key == 'cpu' && value === '') {
        value = '10m';
      }
      if (key == 'memory' && value === '') {
        value = '100Mi';
      }
      flatJSON[`${prefix}${key}`] = value;
    }
  });

  if (!prefix) {
    flatJSON.namespace = getNamespace();
    flatJSON.IMAGE_TAG = getImageTag();
    flatJSON.IMAGE_NAME = getImageName();
    flatJSON.PROJECT_ID = json.environmentVariables['PROJECT_ID'];
    flatJSON.serviceName = json.serviceName;
  }
  return flatJSON;
}

function getImageTag() {
  return process.env.IMAGE_TAG;
}

function getImageName() {
  return process.env.IMAGE_NAME;
}

function getDefaultValue({key, value}) {
  if (!value) {
    switch (key) {
      case 'proxyCPU':
        return '15m';
      case 'proxyMemory':
        return '50Mi';
      case 'resources.request.cpu':
        return '20m';
      case 'resources.request.memory':
        return '100Mi';
      case 'serviceType':
        return 'ClusterIP';
      default:
        return '';
    }
  } else {
    return value;
  }
}

function getNamespace() {
  switch (env) {
    case 'dev':
      if (process.env.CI_COMMIT_REF_NAME === 'develop') {
        return 'dev-apps';
      } else {
        return process.argv[4];
      }
    case 'staging':
      return 'staging-apps';
    case 'production':
      return 'prod-apps';
    case 'devenv1':
      return 'devenv1-apps';
    case 'devenv2':
      return 'devenv2-apps';
    case 'devenv3':
      return 'devenv3-apps';
    case 'devenv4':
      return 'devenv4-apps';
    case 'devenv5':
      return 'devenv5-apps';
  }
}

start();
