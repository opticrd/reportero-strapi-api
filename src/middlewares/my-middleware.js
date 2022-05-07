module.exports = (config, { strapi })=> 
{
    // console.log(config);
    // console.log(strapi);

    return async (context, next) => 
    {
        console.log(context);
        console.log(next);

        await next();
    };
};