const config = {
  mysql: {
    host: 'mysql',
    hostForWebhook: 'mysql',
    hostForReadWrite: 'mysql',
    port: '3306',
    portForReadWrite: '3306',
    name: 'newlocal_mysoulcrm_com',
    username: 'root',
    password: 'root',
    poolSize: 10, // jshint ignore: line
    debug: false,
    dbBackupEncryptionSecret: 'eThAmZq4t2w!z%C*M-JaNdRfQjXn2r9u\n',
    genericDbName: 'accounts_dev_salesmate_io',
  },
  cockroach: {
    host: 'cockroach1',
    port: 26257,
    dbName: 'salesmate_dev',
    dbNameForStats: 'salesmate_dev_stats',
    dbNameForDefaultValues: 'salesmate_default_values_dev',
    dbNameForSubscription: 'subscription_manager_dev',
    username: 'root',
    password: '',
    poolSize: 10,
  },
  kafka: {
    host: 'kafka',
    port: 9092,
    brokerList: 'kafka:9092',
  },
  loggingOptions: {
    'console': {
      enabled: true,
    },
  },
  redis: {
    host: 'redis',
    port: '6379',
  },
  caching: {
    enabled: 'Y',
    server_type: 'redis',
    options: {
      host: 'redis', // '10.211.55.4',
      port: '6379',
    },
  },
  subscription: {
    urlV1: 'http://subscription:10029/subscription', // New subscription url
    token: 'Q3hgrpS-5LUG50c099ca-170d-4531-b3fc-dd1df5b88470-Ypzu-xQ9dUaa', // Token for new subscription
    dbName: 'subscription_manager',
    botUser: '7f70f08c-266d-44cc-94c1-2f0e3fa1597b',
  },
  kms: {
    keyRingId: 'access-token',
    cryptoKeyId: 'development',
  },
  gcpStorage: {
    projectId: 'salesmate-io',
    bucketName: 'salesmate-dev',
    keyFilename: 'gcp-service-account-key.json',
    audioBucket: 'salesmate-development-voice-prompts',
    audioHost: 'storage.cloud.google.com',
    gcpReportsFolderName: 'reports/tmp/',
  },
  elastic: {
    url: 'http://elasticsearch01:9200',
  },
  primaryMailServer: {
    host: 'smtp.sendgrid.net',
    port: 2525,
    isSSL: true,
    username: 'apikey',
    password: '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',
    debug: true,
  },
  secondaryMailServer: {
    host: 'smtp.sendgrid.net',
    port: 2525,
    isSSL: true,
    username: 'apikey',
    password: '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',
    debug: true,
  },
  primarySendgridAccount: {
    host: 'smtp.sendgrid.net',
    port: 2525,
    isSSL: true,
    username: 'apikey',
    password: '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',
    debug: true,
  },
  emailNotifications: {
    moduleObjectLink: 'https://apps-docker.salesmate.io/client/{{host}}/module/{{moduleName}}/{{objectId}}',
    attachmentLink: 'https://{{host}}/fe/emails/mailAttachments/{{path}}',
    imagesBasePath: 'https://{{host}}/assets/images/emails',
  },
  botUserId: 999999,
  recaptcha: {
    secretKey: '6LewNpsUAAAAAKO2EgevJADgED8PPt1WdNpFHtYt',
  },
  officeIps: ['120.72.91.58', '103.112.218.218'],
};
module.exports = config;
