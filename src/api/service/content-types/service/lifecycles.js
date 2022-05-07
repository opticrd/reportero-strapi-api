"use-strict";

module.exports = 
{ 
    afterCreate(event) 
    {       
        const { result, params, model   } = event;

        let author = strapi.config.helpers.removeAuthorCredentials(result.createdBy);

        strapi.service('api::log.log').create({
            data: {
                model: model.singularName,
                action: 'CREATE',
                content: params.data,
                timestamp: result.createdAt,
                origin_id: result.id.toString(),
                type: 'INFO',
                author: author,
            }
        });
    },
    afterUpdate(event) 
    {       
        console.log(event);
        const { result, params, model  } = event;

        let author = strapi.config.helpers.removeAuthorCredentials(result.updatedBy);

        strapi.service('api::log.log').create({
            data: {
                model: model.singularName,
                action: 'UPDATE',
                content: params.data,
                timestamp: result.updatedAt,
                origin_id: result.id.toString(),
                type: 'INFO',
                author: author,
            }
        });
    },
};