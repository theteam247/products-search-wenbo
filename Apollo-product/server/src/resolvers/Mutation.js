function post(parent, args, context, info) {
  const { url, description } = args
  return context.db.mutation.createLink({ data: { url, description } }, info)
}

function createProduct(parent, args, context, info) {
  const { name, price, description } = args
  return context.db.mutation.createProduct({ data: {
    name, price, description
  } }, info)
}

function updateProduct(parent, args, context, info) {
  const { id, name, price, description } = args
  return context.db.mutation.updateProduct({ data: {
    id, name, price, description
  } }, info)
}

function deleteProduct(parent, { id }, context, info) {
  return context.db.mutation.deleteProduct({
    where: { id }
  }, info)
}

module.exports = {
  post,
  createProduct
}
