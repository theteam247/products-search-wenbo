import { Meteor } from 'meteor/meteor';

const bodyMaker = {
  nameDesc: bodyMakerOne,
  allData: bodyMakerTwo
}

// combine search query
function bodyMakerOne(keyword) {
  return {
    "query": {
      "bool": {
        "should": [
          {
            "match": {
              "name": {
                "query": keyword,
                "boost": 2
              }
            }
          },              
          {
            "match": {
              "desc": {
                "query": keyword
              }
            }
          }
        ]
      }
    },
    "size": 100
  }
}

function bodyMakerTwo(params) {
  return {
    "size": 100,
    "sort": [{"createdAt": "desc"}]
  }
}

var elasticSearch = (searchBody) => new Promise((resolve, reject) => {
  Meteor.call('elasticSearch', searchBody, (error, result) => {

    if (error) {
      reject(error)
    } else {
      let sourceArray = result.data.hits.hits.map(source => {
        source._source._id = source._id
        return source._source
      })

      resolve(sourceArray)
    }
  })
})

var getProducts = () => new Promise((resolve, reject) => {
  Meteor.call('getProducts', (error, result) => {
    if (error) {
      reject(error)
    } else {
      resolve(result)
    }
  })
})

export { bodyMaker, elasticSearch, getProducts }
