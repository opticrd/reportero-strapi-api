'use strict';

/**
 * beneficiary service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::beneficiary.beneficiary', ({ strapi }) =>  
({
    async getOrInsertBeneficiary(cedula) {

        //console.log(cedula);
        const result = await super.find({filters: { cedula: cedula }});
    
        // console.log(result);
        // console.log(result.results[0]);
        //console.log(result.pagination.total > 0);

        if (result.pagination.total > 0) {
            return { okey: true, data: result.results[0] };
        }

        // TODO: If its not create, lets create it!

        return { okey: false, data: {} };
    },
}));
