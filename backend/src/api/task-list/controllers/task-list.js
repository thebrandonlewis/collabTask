/**
 * Task List Controller
 * 
 * Handles task list API endpoints
 */

'use strict';

/**
 * task-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task-list.task-list', ({ strapi }) => ({
  // Custom method to get task lists for the current user
  async find(ctx) {
    const user = ctx.state.user;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to access task lists');
    }

    const { data, meta } = await super.find(ctx);
    
    // Filter task lists to only show those owned by or collaborated on by the user
    const filteredData = data.filter(taskList => 
      taskList.attributes.owner?.data?.id === user.id ||
      taskList.attributes.collaborators?.data?.some(collaborator => collaborator.id === user.id)
    );

    return { data: filteredData, meta };
  },

  // Custom method to create a task list
  async create(ctx) {
    const user = ctx.state.user;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to create task lists');
    }

    // Set the owner to the current user
    ctx.request.body.data.owner = user.id;

    return await super.create(ctx);
  },

  // Custom method to update a task list
  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to update task lists');
    }

    // Check if user owns the task list
    const taskList = await strapi.entityService.findOne('api::task-list.task-list', id, {
      populate: ['owner', 'collaborators'],
    });

    if (!taskList) {
      return ctx.notFound('Task list not found');
    }

    if (taskList.owner.id !== user.id) {
      return ctx.forbidden('You can only update task lists you own');
    }

    return await super.update(ctx);
  },

  // Custom method to delete a task list
  async delete(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to delete task lists');
    }

    // Check if user owns the task list
    const taskList = await strapi.entityService.findOne('api::task-list.task-list', id, {
      populate: ['owner'],
    });

    if (!taskList) {
      return ctx.notFound('Task list not found');
    }

    if (taskList.owner.id !== user.id) {
      return ctx.forbidden('You can only delete task lists you own');
    }

    return await super.delete(ctx);
  },
}));
