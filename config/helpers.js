module.exports = 
{
    removeAuthorCredentials(author) 
    {
        if(author == undefined) 
        {
            return null;
        }

        delete author.password;
        delete author.resetPasswordToken;
        delete author.registrationToken;
        delete author.preferedLanguage;

        return author;
    },
    logActivity(event, action, type = 'INFO') 
    {
        const { result, params, model  } = event;
        let authorTemp;

        if(action === 'CREATE')
            authorTemp = result.createdBy;
        else
            authorTemp = result.updatedBy;

        let author = strapi.config.helpers.removeAuthorCredentials(authorTemp);

        strapi.service('api::log.log').create({
            data: {
                model: model.singularName,
                action: action,
                content: params.data,
                timestamp: new Date(),
                origin_id: result.id.toString(),
                type: type,
                author: author,
            }
        });
    },
};