'use strict';

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::post.post', ( {strapi}) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;

    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const post = await strapi.entityService.findMany("api::post.post", query);
    const sanitizedEntity = await this.sanitizeOutput(post);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));