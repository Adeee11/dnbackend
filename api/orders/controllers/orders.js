"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  create: async (ctx) => {
    if (Array.isArray(ctx.request.body)) {
      return await Promise.all(
        ctx.request.body.map(strapi.services.orders.create)
      );
    } else {
      entity = await strapi.services.orders.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.orders });
  },
};