import { Mongo } from 'meteor/mongo';
// import { Index } from 'meteor/easy:search'
// import { ElasticSearchEngine } from 'meteor/easysearch:elasticsearch'

var Products = new Mongo.Collection('products')
var Schemas = {}

// var ProductsIndex = new Index({
//   collection: Products,
//   fields: ['name', 'desc'],
//   engine: new ElasticSearchEngine({
//     body: () => {} // modify the body that's sent when searching
//   }),
// })

Schemas.Product = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    min: 2,
    max: 200
  },
  price: {
    type: Number,
    decimal: true,
    label: 'Price of product.',
    min: 10
  },
  desc: {
    type: String,
    label: 'Description',
    max: 1000,
    optional: true
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

Products.attachSchema(Schemas.Product)

export { Products }
