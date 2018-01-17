function feed(parent, args, context, info) {
  const { filter, first, skip } = args // destructure input arguments
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  return context.db.query.links({ first, skip, where }, info)
}

function product(parent, args, context, info) {
  const { filter } = args // destructure input arguments
  const where = filter
    ? { OR: [{ name_contains: filter }, { description_contains: filter }] }
    : {}

  return context.db.query.products({ where }, info)
}

module.exports = {
  feed,
  product
}
