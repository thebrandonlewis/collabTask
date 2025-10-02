/**
 * CollabTask Strapi Backend Entry Point
 * 
 * Main entry point for the Strapi CMS backend
 */

'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    // Add any bootstrap logic here
    console.log('🚀 CollabTask Strapi Backend is starting...');
  },
};
