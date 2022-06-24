'use strict';

/**
 * ticket custom routes.
 */

 module.exports = {
  routes: [
    { 
      method: 'POST',
      path: '/tickets/import', 
      handler: 'ticket.createMany',
    },
  ]
}
