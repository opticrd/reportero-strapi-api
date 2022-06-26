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
                    
                    if(!data.hasOwnProperty('institution')){
                        errors.push({ 
                            title: data.title,
                            message: 'The institution is not set',
                        });
                        return null;
                    }

                    const institution = await strapi.service('api::institution.institution').findOne(data.institution);
                    
                    if(institution === null){
                        errors.push({ 
                            title: data.title,
                            message: 'The institution doesnt exists',
                        });
                        return null;
                    }

                    //return strapi.service('plugin::users-permissions.user').create({data: data});
                    //return strapi.plugins['users-permissions'].services.create({data: data});
                    return await strapi.entityService.create('plugin::users-permissions.user', { data: data });
    
                } catch (err) {
                    console.log(err.details);
                    
                    // errors.push({ 
                    //     title: data.title,
                    //     message: 'The model is not valid',
                    // });
                    //Array.prototype.push.apply(errors, err.details.errors);
                    errors.push(err.details.errors);
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