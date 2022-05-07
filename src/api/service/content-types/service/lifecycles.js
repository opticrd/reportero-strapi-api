"use-strict";

module.exports = 
{ 
    afterCreate(event) 
    {       
        const { result, params  } = event;

        console.log("----------------------------");
        console.log(result);
        console.log(params);
        console.log("----------------------------");

        let author = result.createdBy;
        delete author.password;
        delete author.resetPasswordToken;
        delete author.registrationToken;
        delete author.preferedLanguage;

        strapi.service('api::log.log').create({
            data: {
                model: 'service',
                action: 'CREATE',
                content: params.data,
                timestamp: result.createdAt,
                origin_id: result.id.toString(),
                type: 'INFO',
                author: result.createdBy,
            }
        });
    },
};