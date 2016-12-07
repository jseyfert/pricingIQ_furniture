// var _ = require("underscore");
// var validator = require('validator');
// var parseDomain = require("parse-domain");

// var allDomains = [['amazon', true ],['sears', false],['walmart', true ]]
// var countLeftToSubmit = [['amazon', 10 ],['sears', 3],['walmart',0 ]]
// // var urlArray = ['','qwerqwer','amazon.com/1','amazon.com/2','walmart.com/1', 'http://www.codewars.com/1', 'http://www.codewars.com/2', 'http://www.facebook.com/1','http://www.facebook.com/2', 'http://www.facebook.com/3']
// var urlArray = ['amazon.com/1', 'sears.com/2', 'asdf.com']
// // var urlArray = ['amazon.com/1','amazon.com/2', 'amazon.com/3','amazon.com/4','walmart.com/1', 'http://www.codewars.com/1']

// var domains = allDomains.map(function(arr){ return arr[0]})

// var distinctDomains = []
// var domainsAndUrls = []
// var arrOfObj = [];

// urlArray.map(function(url){
//     if (validator.isURL(url) && parseDomain(url)){
//       var getDomain = parseDomain(url).domain
//       domains.push(getDomain)
//       domainsAndUrls.push([getDomain, url])
//     } else {
//       return null;
//     }
// })

// // use underscore to select only unique domains
// distinctDomains = _.uniq(domains) 
// // console.log(domains)
// // console.log(distinctDomains)

// // url object factory
// var newObj = function(index, domain){
//   var temp ={}

//   temp.domain = domain

//   temp.domainActive = function(){
//     for(i = 0; i < allDomains.length ; i++) {
//       if (domain === allDomains[i][0] && allDomains[i][1] === true ){ return true;} 
//       if (domain === allDomains[i][0] && allDomains[i][1] === false ){return false;} 
//     }
//   }()

//   temp.domainOffered = (temp.domainActive === true || temp.domainActive === false );
  
//   temp.urls = function(){
//     var urlArr =  [];
//     for(i = 0; i < domainsAndUrls.length ; i++) {
//       if (domain === domainsAndUrls[i][0]){ urlArr.push(domainsAndUrls[i][1]) } 
//     }
//     return urlArr;
//   }()

//   temp.urlsCount = temp.urls.length

//   if (temp.domainOffered){
//     temp.countLeftToSubmit = function(){
//       for(i = 0; i < countLeftToSubmit.length ; i++) {
//         if (domain === countLeftToSubmit[i][0]){ return countLeftToSubmit[i][1] } 
//       }
//     }()

//     if (temp.domainActive){ 
//       temp.countLeftToSubmitNow = temp.countLeftToSubmit - temp.urls.length <= 0 ? 0 : temp.countLeftToSubmit - temp.urls.length 
//       temp.countToSubmitNow = temp.countLeftToSubmit >= temp.urls.length ? temp.urls.length : temp.countLeftToSubmit
//     }
//     if (!temp.domainActive){ 
//       temp.countLeftToSubmitNow = temp.countLeftToSubmit 
//       temp.countToSubmitNow = 0
//     }
//   } else {
//     temp.domainOffered = false;
//     temp.domainActive = null;
//     temp.countLeftToSubmit = null;
//     temp.countLeftToSubmitNow = null;
//     temp.countToSubmitNow = null;
//   }

//   return temp;
// }


//   creatObjPerDomain = function(distinctDomains){
//     for(j = 0; j < distinctDomains.length ; j++) {
//       // console.log('test', distinctDomains[i]);
//       arrOfObj.push(newObj(j, distinctDomains[j]))
//     }
//   }(distinctDomains)


// console.log(arrOfObj);



/////////////////////////////////////////////////////////////////////========

// var _ = require("underscore");
// var validator = require('validator');
// var parseDomain = require("parse-domain");

// var allDomains = [['amazon', true ],['sears', false],['walmart', true ]]
// var countLeftToSubmit = [['amazon', 0 ],['walmart',1 ],['sears', 3]]
// // var urlArray = ['','qwerqwer','amazon.com/1','amazon.com/2','walmart.com/1', 'http://www.codewars.com/1', 'http://www.codewars.com/2', 'http://www.facebook.com/1','http://www.facebook.com/2', 'http://www.facebook.com/3']
// var urlArray = ['walmart.com/1', 'walmart.com/2']
// // var urlArray = ['amazon.com/1','amazon.com/2', 'amazon.com/3','amazon.com/4','walmart.com/1', 'http://www.codewars.com/1']

// var domains = []
// var distinctDomains = []
// var domainsAndUrls = []
// var arrOfObj = [];

// //**//**//
// urlArray.map(function(url){
//     if (validator.isURL(url) && parseDomain(url)){
//       var getDomain = parseDomain(url).domain
//       domains.push(getDomain)
//       domainsAndUrls.push([getDomain, url])
//     } else {
//       return null;
//     }
// })

// // use underscore to select only unique domains
// distinctDomains = _.uniq(domains) 

// // url object factory
// var newObj = function(index, domain){
//   var temp ={}

//   temp.domain = domain

//   temp.domainAvailable = function(){
//     for(i = 0; i < allDomains.length ; i++) {
//       if (domain === allDomains[i][0] && allDomains[i][1] === true ){ return true;} 
//       if (domain === allDomains[i][0] && allDomains[i][1] === false ){return false;} 
//     }
//   }()

//   temp.countLeftToSubmit = function(){
//     for(i = 0; i < countLeftToSubmit.length ; i++) {
//       if (domain === countLeftToSubmit[i][0]){ return countLeftToSubmit[i][1] } 
//     }
//   }()

//   temp.urls = function(){
//     var urlArr =  [];
//     for(i = 0; i < domainsAndUrls.length ; i++) {
//       if (domain === domainsAndUrls[i][0]){ urlArr.push(domainsAndUrls[i][1]) } 
//     }
//     return urlArr;
//   }()

//   temp.urlsCount = temp.urls.length

//   if (temp.domainAvailable === true || temp.domainAvailable === false ){
//     if (temp.domainAvailable){ 
//       temp.countLeftToSubmitNow = temp.countLeftToSubmit - temp.urls.length <= 0 ? 0 : temp.countLeftToSubmit - temp.urls.length 
//       temp.countToSubmitNow = temp.countLeftToSubmit >= temp.urls.length ? temp.urls.length : temp.countLeftToSubmit
//     }
//     if (!temp.domainAvailable){ 
//       temp.countLeftToSubmitNow = temp.countLeftToSubmit 
//       temp.countToSubmitNow = 0
//     }
//   } else {
//     temp.domainAvailable = null;
//     temp.countLeftToSubmit = null;
//     temp.countLeftToSubmitNow = null;
//     temp.countToSubmitNow = null;
//   }

//   return temp;
// }


// creatObjPerDomain = function(distinctDomains){
//     for(j = 0; j < distinctDomains.length ; j++) {
//       // console.log('test', distinctDomains[i]);
//       arrOfObj.push(newObj(j, distinctDomains[j]))
//     }
//   }(distinctDomains)


// console.log(arrOfObj);



//===============================================================
// var activeDomains = [['amazon', true ],['walmart', false ],['sears', true]]
// var countLeftToSubmit = activeDomains.map(function(arr){ return [arr[0], 15]})

// console.log(countLeftToSubmit);

//===============================================================
// var allDomains = [ [ 'amazon', true ],  [ 'walmart', true ],  [ 'sears', true ], [ 'tom', true ] ]
// var userCountLeftToSubmit = [['walmart',1],['sears',13]]

// var allDomainsOnly = allDomains.map(function(arr){ return arr[0] })
// var userCountLeftToSubmitOnly = userCountLeftToSubmit.map(function(arr){ return arr[0] })
// var newDomains = allDomainsOnly.filter(function(arr) { return userCountLeftToSubmitOnly.indexOf(arr) == -1; });

// var addNewDomains = function(newDomains){
//   newDomains.map(function(domain){
//     // console.log([[domain], 15]);
//     userCountLeftToSubmit.push([domain, 15])
//   })
// }(newDomains)

// console.log(userCountLeftToSubmit);

// console.log(newDomains);
// var countLeftToSubmit = activeDomains.map(function(item){return [item, 15]})
// var countLeftToSubmit =     [['amazon',1],['sears',1],['walmart',1]]
// var usercountLeftToSubmit = [['amazon',15],['sears',15]]
// var newuserCountLeftToSubmit = []

// countLeftToSubmit.map(function(arr1){
//   // countLeftToSubmit.map(function(arr2){
//   //   if (arr1[0] === arr2[0]) {return}
//   //     console.log(arr1[0], arr2[0]);
//   //   usercountLeftToSubmit.push(arr1)
//   // })
//   // console.log(arr1[0]);
//   // console.log(_.include(usercountLeftToSubmit, arr1[0]));
//   // countLeftToSubmit.map(function(arr2){
//   //   console.log(arr1[0],'=',arr2[0]);
//   // })
// })
// console.log(usercountLeftToSubmit);

//===============================================================
//===============================================================
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
// var _ = require("underscore");
// var urlsLeftToSubmit  = [['amazon', 4],['sears', 2],['walmart', 1]]
// var urls = 
// [
//   {domain: 'amazon',
//   domainAvailable: true, 
//   urls: ['https://www.amazon.com/1', 'https://www.amazon.com/2', 'https://www.amazon.com/3']},
//   {domain: 'sears',
//   domainAvailable: true, 
//   urls: ['https://www.sears.com/1', 'https://www.sears.com/2']},
//   {domain: 'walmart',
//   domainAvailable: true,
//   urls: ['https://www.walmart.com/1']},
// ]

// var potentialUrlsToSubmit = []
// var urlsToSubmitNow = []
// var newUrlsLeftToSubmit =[]

// _.where(urls, {domainAvailable: true}).map(function(obj){
//   // console.log(obj.domain, obj.urls.length );
//   potentialUrlsToSubmit.push([obj.domain, obj.urls.length])
// })

// urlsLeftToSubmit.map(function(arr1){
//   potentialUrlsToSubmit.map(function(arr2){
//     if (arr1[0] === arr2[0]){
//       var countToSubmitNow = ((arr1[1] - arr2[1]) >= 0) ? arr2[1] : 0
//       var countLeftToSubmit = (arr1[1] - arr2[1] < 0) ? 0 : arr1[1] - arr2[1]
//       // console.log(
//       //   arr1[0], 
//       //   'urlsLeftToSubmit ',arr1[1], 
//       //   'potentialUrlsToSubmit', arr2[1], 
//       //   'how many to submit now',  countToSubmitNow 
//       // );
//       newUrlsLeftToSubmit.push([arr1[0], countLeftToSubmit ])
//       urlsToSubmitNow.push([ arr1[0], countToSubmitNow])
//     }
//   })
// })

// console.log('urlsLeftToSubmit',urlsLeftToSubmit);
// console.log('potentialUrlsToSubmit',potentialUrlsToSubmit);
// console.log('urlsToSubmitNow',urlsToSubmitNow);
// console.log('newUrlsLeftToSubmit',newUrlsLeftToSubmit);

////////////////////////////////////////////////////////////////////////

//////////////save////////////////////
  // temp.domainAvailable = (function(){
  //     for(i = 0; i < allDomains.length ; i++) {
  //       // console.log(index, i, domain, allDomains[i])
  //       if (domain === allDomains[i][0] && allDomains[i][1] === true ){
  //         // console.log(index, domain, allDomains[i][0], allDomains[i][1])
  //         return true;
  //       } 
  //       if (domain === allDomains[i][0] && allDomains[i][1] === false ){
  //         // console.log(index, domain, allDomains[i][0], allDomains[i][1])
  //         return false;
  //       } 
  //     }
  //   }() === true || false ? true : false)
  ////////////////////////////////////

// var countLeftToSubmit = [['amazon', 01 ],['sears', 0],['walmart',0 ]]
// var sum = countLeftToSubmit.reduce(function(a, b) { return a + b[1]; }, 0);

// console.log(sum)

  ////////////////////////////////////

  // var array = [1,2,3,4,5,6,7,8,9,10];
  // array.splice(0,2)
  // console.log(array)








