import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Products } from './products.js';

const callService = (type, url, options) => new Promise((resolve, reject) => {
  HTTP.call(type, url, options, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

const elasticURL = 'http://localhost:9200/easysearch/products/_search'

Meteor.methods({
  elasticSearch(searchBody) {
    return callService(
      'GET',
      elasticURL,
      {data: searchBody}
    ).then((result) => result).catch((error) => {
      throw new Meteor.Error('500', `${error.message}`);
    });
  },
  getProducts() {
    return Products.find({}, { sort: { createdAt: -1 } }).fetch()
  }
});
