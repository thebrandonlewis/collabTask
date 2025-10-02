/**
 * Task List Routes
 * 
 * API routes for task list endpoints
 */

'use strict';

/**
 * task-list router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::task-list.task-list', {
  config: {
    find: {
      auth: {
        scope: ['api::task-list.task-list.find'],
      },
    },
    findOne: {
      auth: {
        scope: ['api::task-list.task-list.findOne'],
      },
    },
    create: {
      auth: {
        scope: ['api::task-list.task-list.create'],
      },
    },
    update: {
      auth: {
        scope: ['api::task-list.task-list.update'],
      },
    },
    delete: {
      auth: {
        scope: ['api::task-list.task-list.delete'],
      },
    },
  },
});
