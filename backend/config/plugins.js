/**
 * Plugins Configuration
 * 
 * Strapi plugins configuration for CollabTask
 */

module.exports = {
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 1000000, // 1MB
      },
    },
  },
};
