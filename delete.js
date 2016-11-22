//===============================================================
//===============================================================
// var midnight = new Date();
// console.log(midnight);
// midnight.setHours(23,59,59,0);
// console.log(midnight);
// var passwordValidator = require('password-validator');
// var schema = new passwordValidator();
// schema.isMin(8)
// console.log(schema.validate('validPASS')); // true
// console.log(schema.validate('inval')); 

// console.log(Date.now() + 3600000 );

//===============================================================
// var validator = require('validator');
// var parseUrl = require("parse-url");
// var _ = require("underscore");

// var urlArray = ['','qwerqwer', 'http://www.codewars.com/1', 'http://www.codewars.com/2', 'http://www.facebook.com/1','http://www.facebook.com/2', 'http://www.facebook.com/3']
// var domains = []
// var distinctDomains = []
// var domainsAndUrls = []
// var arrOfObj = [];

// // parse domains from urls and add to two new arrrays
// urlArray.map(function(url){
//     if (validator.isURL(url)){
//       var getDomain = parseUrl(url).resource
//       domains.push(getDomain)
//       domainsAndUrls.push([getDomain, url])
//     } else {
//         return false;
//     }
// })

// // use underscore to select only unique domains
// distinctDomains = _.uniq(domains) 

// // creat json obj
// let createObj = function(arr, domain, index) {
//   var property = ''
//   var array = []
//   for(i = 0; i < arr.length ; i++) {
//     if(arr[i][0] === domain){
//       property = domain
//       array.push(arr[i][1])        
//     } else {
//       null;
//     }
//     arrOfObj[index] = {
//       domain: property,
//       urls: array
//     }
//   }
// }

// // call createOb for each distinct domain
// let runPerDomain = function(arr, domainsAndUrls){
//   for(i = 0; i < arr.length ; i++) {
//     createObj(domainsAndUrls, arr[i], i)
//   }
// }(distinctDomains, domainsAndUrls)

// // runPerDomain(distinctDomains, domainsAndUrls)

// console.log(arrOfObj);

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
var _ = require("underscore");
var urlsLeftToSubmit  = [['amazon', 4],['sears', 2],['walmart', 1]]
var urls = 
[
  {domain: 'amazon',
  domainAvailable: true, 
  urls: ['https://www.amazon.com/1', 'https://www.amazon.com/2', 'https://www.amazon.com/3']},
  {domain: 'sears',
  domainAvailable: true, 
  urls: ['https://www.sears.com/1', 'https://www.sears.com/2']},
  {domain: 'walmart',
  domainAvailable: true,
  urls: ['https://www.walmart.com/1']},
]

var potentialUrlsToSubmit = []
var urlsToSubmitNow = []
var newUrlsLeftToSubmit =[]

_.where(urls, {domainAvailable: true}).map(function(obj){
  // console.log(obj.domain, obj.urls.length );
  potentialUrlsToSubmit.push([obj.domain, obj.urls.length])
})

urlsLeftToSubmit.map(function(arr1){
  potentialUrlsToSubmit.map(function(arr2){
    if (arr1[0] === arr2[0]){
      var countToSubmitNow = ((arr1[1] - arr2[1]) >= 0) ? arr2[1] : 0
      var countLeftToSubmit = (arr1[1] - arr2[1] < 0) ? 0 : arr1[1] - arr2[1]
      // console.log(
      //   arr1[0], 
      //   'urlsLeftToSubmit ',arr1[1], 
      //   'potentialUrlsToSubmit', arr2[1], 
      //   'how many to submit now',  countToSubmitNow 
      // );
      newUrlsLeftToSubmit.push([arr1[0], countLeftToSubmit ])
      urlsToSubmitNow.push([ arr1[0], countToSubmitNow])
    }
  })
})

console.log('urlsLeftToSubmit',urlsLeftToSubmit);
console.log('potentialUrlsToSubmit',potentialUrlsToSubmit);
console.log('urlsToSubmitNow',urlsToSubmitNow);
console.log('newUrlsLeftToSubmit',newUrlsLeftToSubmit);

////////////////////////////////////////////////////////////////////////


// var activeDomains = ['amazon', 'sears', 'walmart']
// var urlsLeftToSubmit = activeDomains.map(function(item){return [item, 15]})

// console.log(urlsLeftToSubmit);







