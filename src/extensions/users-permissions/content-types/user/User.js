"use-strict";

module.exports = 
{ 
    afterCreate(event) 
    {      
        strapi.config.helpers.logActivity(event, 'CREATE');
    },
    afterUpdate(event) 
    {       
        console.log(event);
        strapi.config.helpers.logActivity(event, 'UPDATE');
    },
    afterDelete(event) 
    {       
        strapi.config.helpers.logActivity(event, 'DELETE');
    },
};