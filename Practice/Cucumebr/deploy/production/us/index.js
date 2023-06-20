const config = {
  'commonEnvironmentVariables': {
    'NODE_ENV': 'production',
    'REGION': 'US',
    'PROJECT_ID': 'salesmate-io',
  },
  'apps': {
    'sample-service': {
      'replicas': 1,
      'environmentVariables': {
        'NODE_PORT': '8080',
      },
      'nodeVersion': '12',
      'maxOldSpaceSize': '512',
      'proxyCPU': '',
      'proxyMemory': '',
      'resources': {
        'request': {
          'cpu': '',
          'memory': '',
        },
        'limit': {
          'cpu': '',
          'memory': '',
        },
      },
      'gatewayHosts': ['apis.salesmate.io'],
    },
    'run-service-template-utilities-and-migrations': {
      'replicas': 1,
      'environmentVariables': {
        'NODE_PORT': '8080',
      },
      'nodeVersion': '12',
      'maxOldSpaceSize': '512',
      'proxyCPU': '',
      'proxyMemory': '',
      'resources': {
        'request': {
          'cpu': '',
          'memory': '',
        },
        'limit': {
          'cpu': '',
          'memory': '',
        },
      },
      'gatewayHosts': ['apis.salesmate.io'],
    },
  },
  'crons': {
    'sample-cron': {
      'environmentVariables': {
        'NODE_JOB_PORT': '8080',
      },
      'nodeVersion': '12',
      'maxOldSpaceSize': '512',
      'proxyCPU': '',
      'proxyMemory': '',
      'resources': {
        'request': {
          'cpu': '',
          'memory': '',
        },
        'limit': {
          'cpu': '',
          'memory': '',
        },
      },
    },
  },
  'backgroundJobs': {
    'sample': {
      'replicas': 1,
      'environmentVariables': {
        'NODE_JOB_PORT': '8080',
      },
      'nodeVersion': '12',
      'maxOldSpaceSize': '512',
      'proxyCPU': '',
      'proxyMemory': '',
      'resources': {
        'request': {
          'cpu': '',
          'memory': '',
        },
        'limit': {
          'cpu': '',
          'memory': '',
        },
      },
    },
  },
};

module.exports = config;
