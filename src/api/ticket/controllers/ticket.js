'use strict';

/**
 *  ticket controller
 */

const utils = require("@strapi/utils");
const { sanitize } = utils;
const { ForbiddenError } = utils.errors;

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ticket.ticket', ({ strapi }) =>  
({
    async createMany(ctx) 
    {
        // const { user } = ctx.state;
        // const { auth } = ctx.state;
        
        if (!ctx.state.isAuthenticated) 
            throw new ForbiddenError("You are not authorized");

        if (Array.isArray(ctx.request.body)) 
        { 
            const response = await Promise.all(ctx.request.body.map(async (data) =>
            {
                return strapi.service('api::ticket.ticket').create(data);
                // const response = await strapi.service('api::ticket.ticket').create(data);
                // console.log(response);
	            // return response;
            }));

            //const sanitizedEntity = await sanitize.contentAPI.output(response, ctx);
            const sanitizedEntity = await this.sanitizeOutput(response, ctx);            
            return this.transformResponse(sanitizedEntity); 
        } 

        return await super.create(ctx);        
    }    
}));
