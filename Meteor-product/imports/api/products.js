import { Mongo } from 'meteor/mongo';
import { Index } from 'meteor/easy:search'
import { ElasticSearchEngine } from 'meteor/easysearch:elasticsearch'

var Products = new Mongo.Collection('products')
var Schemas = {}

var ProductsIndex = new Index({
  collection: Products,
  fields: ['name', 'desc'],
  engine: new ElasticSearchEngine({
    body: () => {}
  })
})

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
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
})

Products.attachSchema(Schemas.Product)

export { Products, ProductsIndex }
