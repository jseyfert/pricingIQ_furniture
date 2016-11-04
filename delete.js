// if (!Date.now) {
//     Date.now = function() { return new Date().getTime(); }
// }

// var now1 = new Date();
// var now2 =  Date.now();

// console.log(now1, 'now1');
// console.log(now2, 'now2');

//===============================================================
//===============================================================
//===============================================================
var parseUrl = require("parse-url");
var _ = require("underscore");

var urlArray = ['http://www.codewars.com/tom', 'http://www.codewars.com/tom', 'http://www.codewars.com/tom', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john']
var domainArray = []
var urlAndDomainArray = []
var uniqueDomainArray = []
var arrayOfObjects = []

urlArray.map(function(url){
  var getDomain = parseUrl(url).resource
  domainArray.push(getDomain)
})

uniqueDomainArray = _.uniq(domainArray) // use underscore to select only unique domains

uniqueDomainArray.map(function(domain){
  arrayOfObjects.push({
    domain: domain,
    urls: []
  })
})

urlArray.map(function(url, index, array){
  var getDomain = parseUrl(url).resource
  urlAndDomainArray.push([getDomain, url])
})

// ///////this will be used to get the count of URls///////////////////////
// var count = urlAndDomainArray.filter(function(item, index, array){
//   return item[0]=='www.codewars.com'
// }).length
// console.log(count);

// //this will be used to get the count of URls ***a more dinamic option***
// function domainCount(element) {
//     return element.indexOf(this) === 0;
// }
// console.log(domainArray.filter(domainCount, 'www.facebook.com').length);
// ////////////////////////////////////////////////////////////////////////



//////////////get top 15 of URls for each domain////////////////////////
var getTop15 = function(arr, domain) {
  newArray = [];
  count15 = 0;
  for(i = 0; i < arr.length ; i++) {
    if(arr[i][0] === domain){
      newArray.push(arr[i][1])
      count15 += 1;
    } else {
      null;
    }
  }
  console.log(count15, 'total records');
  return newArray.slice(0, 15);
}

var facebook = getTop15(urlAndDomainArray, 'www.facebook.com' )
console.log(facebook);
////////////////////////////////////////////////////////////////////////



// for (*start w/ this(only executed once)*;*expression is true?*;*do this after each loop*){
//   *Do Some Code* }

// console.log(obj.hasOwnProperty("www.codewars.com")); // going to be used in an if statemt to see if it should add it to the aray 





