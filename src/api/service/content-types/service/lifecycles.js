"use-strict";

module.exports = 
{ 
    async afterCreate(event) 
    {       
        const { result, params  } = event;

        let author = await strapi.config.helpers.removeAuthorCredentials(result.createdBy);

        strapi.service('api::log.log').create({
            data: {
                model: 'service',
                action: 'CREATE',
                content: params.data,
                timestamp: result.createdAt,
                origin_id: result.id.toString(),
                type: 'INFO',
                author: author,
            }
        });
    },
};