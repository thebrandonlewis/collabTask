/**
 * Server Configuration
 * 
 * Strapi server configuration for CollabTask
 */

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: env.bool('IS_PROXY', false),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      secret: env('TRANSFER_TOKEN_SALT'),
    },
    forgotPassword: {
      emailTemplate: {
        subject: 'Reset password',
        text: 'Click here to reset your password: <%= URL %>?code=<%= TOKEN %>',
        html: 'Click here to reset your password: <a href="<%= URL %>?code=<%= TOKEN %>">Reset password</a>',
      },
    },
  },
});
