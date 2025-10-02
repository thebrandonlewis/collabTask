/**
 * Users Permissions Extension
 * 
 * Custom configuration for users-permissions plugin
 */

'use strict';

module.exports = (plugin) => {
  // Add custom fields to user model
  plugin.contentTypes.user.attributes.taskLists = {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::task-list.task-list',
    mappedBy: 'owner',
  };

  plugin.contentTypes.user.attributes.collaboratedTaskLists = {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::task-list.task-list',
    mappedBy: 'collaborators',
  };

  // Customize the JWT token payload
  plugin.services.jwt.getToken = (user) => {
    return plugin.services.jwt.issue({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  };

  return plugin;
};
