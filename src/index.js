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
  bootstrap({ strapi }) 
  {
    // WORKAROUND: more here https://github.com/strapi/strapi/issues/11828#issuecomment-1024015071
    strapi.db.lifecycles.subscribe({
      
      models: ['plugin::users-permissions.user'],

      afterCreate(event) 
      {      
          strapi.config.helpers.logActivity(event, 'CREATE');
      },
      afterUpdate(event) 
      {       
          strapi.config.helpers.logActivity(event, 'UPDATE');
      },
      afterDelete(event) 
      {       
          strapi.config.helpers.logActivity(event, 'DELETE');
      },
    })
  },
};
