'use strict';

/**
 * Empdesignation.js controller
 *
 * @description: A set of functions called "actions" for managing `Empdesignation`.
 */

module.exports = {

  /**
   * Retrieve empdesignation records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    ctx.set('Content-Range', await strapi.services.empdesignation.count());
    if (ctx.query._q) {
      return strapi.services.empdesignation.search(ctx.query);
    } else {
      return strapi.services.empdesignation.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a empdesignation record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.empdesignation.fetch(ctx.params);
  },

  /**
   * Count empdesignation records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.empdesignation.count(ctx.query, populate);
  },

  /**
   * Create a/an empdesignation record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.empdesignation.add(ctx.request.body);
  },

  /**
   * Update a/an empdesignation record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.empdesignation.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an empdesignation record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.empdesignation.remove(ctx.params);
  }
};
