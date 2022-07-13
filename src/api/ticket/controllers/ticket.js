'use strict';

/**
 *  ticket controller
 */

const utils = require("@strapi/utils");
const { sanitize } = utils;
const { ForbiddenError, ValidationError } = utils.errors;

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', ({ strapi }) =>  
({
    async createMany(ctx) 
    {
        // const { user } = ctx.state;
        // const { auth } = ctx.state;
        
        if (!ctx.state.isAuthenticated) 
            throw new ForbiddenError("You are not authorized");

        let errors = [];

        if (Array.isArray(ctx.request.body)) 
        { 
            const response = await Promise.all(ctx.request.body.map(async (data) =>
            {
                try {
                    if(!data.hasOwnProperty('beneficiary')){
                        errors.push({ 
                            title: data.title,
                            message: 'The beneficiary is not set',
                        });
                        return null;
                    }

                    const beneficiary = await strapi.service('api::beneficiary.beneficiary').findOne(data.beneficiary);
                    
                    if(beneficiary === null){
                        errors.push({ 
                            title: data.title,
                            message: 'The beneficiary doesnt exists',
                        });
                        return null;
                    }
                    //const response = await strapi.service('api::beneficiary.beneficiary').getOrInsertBeneficiary(data.beneficiary);
    
                    if(!data.hasOwnProperty('services') || !Array.isArray(data.services)){
                        errors.push({ 
                            title: data.title,
                            message: 'The services are not set or have invalid sintax',
                        });
                        return null;
                    }

                    data.services.forEach(async serviceId => {
                        const service = await strapi.service('api::service.service').findOne(serviceId);
                    
                        if(service === null){
                            errors.push({ 
                                title: data.title,
                                message: 'The service doesnt exists',
                            });
                            return null;
                        }
                    });

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

                    if(!data.hasOwnProperty('owner')){
                        errors.push({ 
                            title: data.title,
                            message: 'The owner is not set',
                        });
                        return null;
                    }

                    const owner = await strapi.db.query('plugin::users-permissions.user').findOne({where: { id: data.owner } });
                    
                    if(owner === null){
                        errors.push({ 
                            title: data.title,
                            message: 'The owner doesnt exists',
                        });
                        return null;
                    }
                   
                    return strapi.service('api::ticket.ticket').create({data: data});
    
                    // const response = await strapi.service('api::ticket.ticket').create(data);
                    // console.log(response);
    	            // return response;
                } catch (err) {
                    console.log(err);
                    errors.push({ 
                        title: data.title,
                        message: 'The model is not valid',
                    });
                    return null;
                }
            }));

            //const sanitizedEntity = await sanitize.contentAPI.output(response, ctx);
            const sanitizedEntity = await this.sanitizeOutput(response, ctx);         
            const transformedResponse = this.transformResponse(sanitizedEntity); 

            if(errors.length > 0){
                transformedResponse.errors = errors;
            }
          
            return transformedResponse;
        } 

        return await super.create(ctx);        
    }    
}));
