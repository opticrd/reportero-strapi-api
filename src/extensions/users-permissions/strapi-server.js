"use strict";

//module.exports = require('./server');


const utils = require("@strapi/utils");
const { sanitize } = require('@strapi/utils');
const { ForbiddenError, ValidationError } = utils.errors;

module.exports = (plugin) => 
{
    plugin.controllers.user.createMany = async (ctx) => 
    {
        if (!ctx.state.isAuthenticated) 
            throw new ForbiddenError("You are not authorized");

        let errors = [];

        if (Array.isArray(ctx.request.body)) 
        { 
            const response = await Promise.all(ctx.request.body.map(async (data) =>
            {
                try {
                    
                    if(!data.hasOwnProperty('cedula')){
                        errors.push({ 
                            username: data.username,
                            message: 'The cedula is not set',
                        });
                        return null;
                    }

                    if(!data.hasOwnProperty('institution')){
                        errors.push({ 
                            cedula: data.cedula,
                            message: 'The institution is not set',
                        });
                        return null;
                    }

                    const institution = await strapi.service('api::institution.institution').findOne(data.institution);
                    
                    if(institution === null){
                        errors.push({ 
                            cedula: data.cedula,
                            message: 'The institution doesnt exists',
                        });
                        return null;
                    }

                    //return strapi.service('plugin::users-permissions.user').create({data: data});
                    //return strapi.plugins['users-permissions'].services.create({data: data});
                    return await strapi.entityService.create('plugin::users-permissions.user', { data: data });
    
                } catch (err) {
                    console.log(err.details);
                    
                    errors.push({ cedula: data.cedula, errors: err.details.errors});
                    return null;
                }
            }));

            //const sanitizedEntity = await sanitize.contentAPI.output(response, ctx);
            const sanitizedEntity = await sanitize.contentAPI.output(response);
            //const sanitizedEntity = await this.sanitizeOutput(response, ctx);         
            //const transformedResponse = this.transformResponse(sanitizedEntity); 
            const transformedResponse = { data: sanitizedEntity }; 

            if(errors.length > 0){
                transformedResponse.errors = errors;
            }
          
            return transformedResponse;
        } 

        throw new ValidationError("Data format is not correct. We are expecting an array of objects");       
    };
  
    plugin.routes['content-api'].routes.push({
      method: 'POST',
      path: '/users/import',
      handler: 'user.createMany',
      config: {
          prefix: ''
      }
    });
    
    return plugin;
};