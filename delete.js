//===============================================================
//===============================================================
//===============================================================
var parseUrl = require("parse-url");
var _ = require("underscore");

var urlArray = ['tim.com/asdf', 'http://www.codewars.com/tomf', 'http://www.codewars.com/toma', 'http://www.codewars.com/tomsdf', 'http://www.facebook.com/tom1','http://www.facebook.com/john2', 'http://www.facebook.com/tom3','http://www.facebook.com/john4', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john', 'http://www.facebook.com/tom','http://www.facebook.com/john']
var domains = []
var distinctDomains = []
var domainsAndUrls = []
var arrOfObj = [];

// parse domains from urls and add to two new arrrays
urlArray.map(function(url){
  var getDomain = parseUrl(url).resource
  domains.push(getDomain)
  domainsAndUrls.push([getDomain, url])
})

// use underscore to select only unique domains
distinctDomains = _.uniq(domains) 

// creat json obj
var createObj = function(arr, domain, index) {
  var property = ''
  var array = []
  for(i = 0; i < arr.length ; i++) {
    if(arr[i][0] === domain){
      property = domain
      array.push(arr[i][1])        
    } else {
      null;
    }
    arrOfObj[index] = {
      domain: property,
      urls: array
    }
  }
}

// call createOb for each distinct domain
var runPerDomain = function(arr, domainsAndUrls){
  for(j = 0; j < arr.length ; j++) {
    createObj(domainsAndUrls, arr[j], j)
  }
}

runPerDomain(distinctDomains, domainsAndUrls)

console.log(arrOfObj);

////////////////////////////////////////////////////////////////////////


// ///////this will be used to get the count of URls///////////////////////
// var count = domainsAndUrls.filter(function(item, index, array){
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
// var getTop15 = function(arr, domain) {
//   newArray = [];
//   // count15 = 0;
//   for(i = 0; i < arr.length ; i++) {
//     if(arr[i][0] === domain){
//       newArray.push(arr[i][1])
//       // count15 += 1;
//     } else {
//       null;
//     }
//   }
//   // console.log(count15, 'total records');
//   return newArray.slice(0, 15);
// }

// var facebook = getTop15(domainsAndUrls, 'www.facebook.com' )
// console.log(facebook);
////////////////////////////////////////////////////////////////////////





