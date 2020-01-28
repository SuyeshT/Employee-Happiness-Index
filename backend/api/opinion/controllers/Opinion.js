'use strict';

/**
 * Opinion.js controller
 *
 * @description: A set of functions called "actions" for managing `Opinion`.
 */

module.exports = {

  /**
   * Retrieve opinion records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.opinion.search(ctx.query);
    } else {
      return strapi.services.opinion.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a opinion record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.opinion.fetch(ctx.params);
  },

  /**
   * Count opinion records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.opinion.count(ctx.query, populate);
  },

  /**
   * Create a/an opinion record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.opinion.add(ctx.request.body);
  },

  /**
   * Update a/an opinion record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.opinion.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an opinion record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.opinion.remove(ctx.params);
  }
};
