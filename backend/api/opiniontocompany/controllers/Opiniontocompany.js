'use strict';

/**
 * Opiniontocompany.js controller
 *
 * @description: A set of functions called "actions" for managing `Opiniontocompany`.
 */

module.exports = {

  /**
   * Retrieve opiniontocompany records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.opiniontocompany.search(ctx.query);
    } else {
      return strapi.services.opiniontocompany.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a opiniontocompany record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.opiniontocompany.fetch(ctx.params);
  },

  /**
   * Count opiniontocompany records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.opiniontocompany.count(ctx.query, populate);
  },

  /**
   * Create a/an opiniontocompany record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.opiniontocompany.add(ctx.request.body);
  },

  /**
   * Update a/an opiniontocompany record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.opiniontocompany.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an opiniontocompany record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.opiniontocompany.remove(ctx.params);
  }
};
