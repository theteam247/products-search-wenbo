const newLink = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.link(
      { where: { mutation_in: ['CREATED'] } },
      info,
    )
  },
}

module.exports = {
  newLink,
}
