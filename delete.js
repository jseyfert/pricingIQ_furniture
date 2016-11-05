//===============================================================
//===============================================================
// var funcs = [];
// for (var i = 0; i < 3; i++) {          // let's create 3 functions
//     funcs[i] = function() {            // and store them in funcs
//         console.log("My value: " + i); // each should log its value.
//     };
// }
// for (var j = 0; j < 3; j++) {
//     funcs[j]();                        // and now let's run each one to see
// }
//===============================================================
var validator = require('validator');
var parseUrl = require("parse-url");
var _ = require("underscore");

var urlArray = ['','qwerqwer', 'http://www.codewars.com/1', 'http://www.codewars.com/2', 'http://www.facebook.com/1','http://www.facebook.com/2', 'http://www.facebook.com/3']
var domains = []
var distinctDomains = []
var domainsAndUrls = []
var arrOfObj = [];

// parse domains from urls and add to two new arrrays
urlArray.map(function(url){
    if (validator.isURL(url)){
      var getDomain = parseUrl(url).resource
      domains.push(getDomain)
      domainsAndUrls.push([getDomain, url])
    } else {
        return false;
    }
})

// use underscore to select only unique domains
distinctDomains = _.uniq(domains) 

// creat json obj
let createObj = function(arr, domain, index) {
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
let runPerDomain = function(arr, domainsAndUrls){
  for(i = 0; i < arr.length ; i++) {
    createObj(domainsAndUrls, arr[i], i)
  }
}(distinctDomains, domainsAndUrls)

// runPerDomain(distinctDomains, domainsAndUrls)

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





