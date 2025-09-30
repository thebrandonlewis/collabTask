/**
 * Task Controller
 * 
 * Handles task API endpoints
 */

'use strict';

/**
 * task controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({ strapi }) => ({
  // Custom method to get tasks for a specific task list
  async find(ctx) {
    const user = ctx.state.user;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to access tasks');
    }

    const { taskList } = ctx.query;
    
    if (!taskList) {
      return ctx.badRequest('taskList parameter is required');
    }

    // Check if user has access to the task list
    const taskListEntity = await strapi.entityService.findOne('api::task-list.task-list', taskList, {
      populate: ['owner', 'collaborators'],
    });

    if (!taskListEntity) {
      return ctx.notFound('Task list not found');
    }

    const hasAccess = taskListEntity.owner.id === user.id ||
      taskListEntity.collaborators.some(collaborator => collaborator.id === user.id);

    if (!hasAccess) {
      return ctx.forbidden('You do not have access to this task list');
    }

    return await super.find(ctx);
  },

  // Custom method to create a task
  async create(ctx) {
    const user = ctx.state.user;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to create tasks');
    }

    const { taskList } = ctx.request.body.data;
    
    if (!taskList) {
      return ctx.badRequest('taskList is required');
    }

    // Check if user has access to the task list
    const taskListEntity = await strapi.entityService.findOne('api::task-list.task-list', taskList, {
      populate: ['owner', 'collaborators'],
    });

    if (!taskListEntity) {
      return ctx.notFound('Task list not found');
    }

    const hasAccess = taskListEntity.owner.id === user.id ||
      taskListEntity.collaborators.some(collaborator => collaborator.id === user.id);

    if (!hasAccess) {
      return ctx.forbidden('You do not have access to this task list');
    }

    return await super.create(ctx);
  },

  // Custom method to update a task
  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to update tasks');
    }

    // Check if user has access to the task
    const task = await strapi.entityService.findOne('api::task.task', id, {
      populate: ['taskList.owner', 'taskList.collaborators'],
    });

    if (!task) {
      return ctx.notFound('Task not found');
    }

    const hasAccess = task.taskList.owner.id === user.id ||
      task.taskList.collaborators.some(collaborator => collaborator.id === user.id);

    if (!hasAccess) {
      return ctx.forbidden('You do not have access to this task');
    }

    return await super.update(ctx);
  },

  // Custom method to delete a task
  async delete(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;
    
    if (!user) {
      return ctx.unauthorized('You must be authenticated to delete tasks');
    }

    // Check if user has access to the task
    const task = await strapi.entityService.findOne('api::task.task', id, {
      populate: ['taskList.owner', 'taskList.collaborators'],
    });

    if (!task) {
      return ctx.notFound('Task not found');
    }

    const hasAccess = task.taskList.owner.id === user.id ||
      task.taskList.collaborators.some(collaborator => collaborator.id === user.id);

    if (!hasAccess) {
      return ctx.forbidden('You do not have access to this task');
    }

    return await super.delete(ctx);
  },
}));
