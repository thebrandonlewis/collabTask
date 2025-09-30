/**
 * Task Routes
 * 
 * API routes for task endpoints
 */

'use strict';

/**
 * task router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::task.task', {
  config: {
    find: {
      auth: {
        scope: ['api::task.task.find'],
      },
    },
    findOne: {
      auth: {
        scope: ['api::task.task.findOne'],
      },
    },
    create: {
      auth: {
        scope: ['api::task.task.create'],
      },
    },
    update: {
      auth: {
        scope: ['api::task.task.update'],
      },
    },
    delete: {
      auth: {
        scope: ['api::task.task.delete'],
      },
    },
  },
});
