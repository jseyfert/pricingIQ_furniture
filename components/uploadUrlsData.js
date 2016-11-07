
var React = require('react');
var validator = require('validator');
var parseDomain = require("parse-domain");
var _ = require("underscore");
var UploadUrlsHtml = require('./uploadUrlsHtml.js');

var domainImages = [
  {domain: 'amazon',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png'},
  {domain: 'walmart', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png'},
  {domain: 'sears',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png'}
]

var UploadUrlsData = React.createClass({
  getInitialState: function(){
    // console.log(this.props.allDomains, 'boom boom room');
		return {
			allSubmittedUrls: []
		}
	},


	parseAndValidateUrls: function(text){
    var urlArray = text.split("\n");
    var domains = [];
    var domainsAndUrls = [];
    var distinctDomains = [];
    var arrOfObj = [];
    var allDomains = this.props.allDomains;
    var availableDomains = []
    allDomains.map(function(obj){
      if (obj.available){
        availableDomains.push(obj.domain)
      }
    })

    // validate urls and parse domain
    urlArray.map(function(url){
        if (validator.isURL(url) && parseDomain(url)){
          var getDomain = parseDomain(url).domain
          domains.push(getDomain)
          domainsAndUrls.push([getDomain, url])
        } else {
          return null;
        }
    })
      
    // use underscore to select only unique domains
    distinctDomains = _.uniq(domains) 

    // creat json obj
    var createObj = function(arr, domain, index) {
      var setDomain = '';
      var array = [];
      var img = '';
      var domainAvailable = false;
      for(var i = 0; i < arr.length ; i++) {
        if(arr[i][0] === domain){
          setDomain = domain;
          domainAvailable = _.include(availableDomains, domain);
          (domainAvailable) ? img = _.where(domainImages, {domain: domain})[0].img : null;
          array.push(arr[i][1])        
        } else {
          null;
        }

        arrOfObj[index] = {
          domain: setDomain,
          domainAvailable: domainAvailable,
          urls: array,
          img: img
        }
      }
    }

    // call createOb for each distinct domain
    var runPerDomain = function(arr, domainsAndUrls){
      for(var i = 0; i < arr.length ; i++) {
        createObj(domainsAndUrls, arr[i], i)
      }
    }(distinctDomains, domainsAndUrls)

    // console.log('end of function', arrOfObj);
    return arrOfObj;
	},


  // displayWhichDomainOLD: function(domain){
  //   var arrOfObj = this.state.allSubmittedUrls;
  //   var availableDomains = this.props.availableDomains;
  //   var count = 0;
  //   var domainAvailable = _.include(availableDomains, domain)

  //   arrOfObj.map(function(item){
  //     if (domain === item.domain){
  //       count = item.urls.length
  //     }
  //   })

  //   if(!domainAvailable){
  //     return <span className="label label-danger label-as-badge">N/A</span>
  //   } else if (count === 0){
  //     return null;
  //   } else if (count > 15){
  //     return <span className="label label-warning label-as-badge">{ count }</span>
  //   } else {
  //     return <span className="label label-success label-as-badge">{ count }</span>
  //   }
  // },

	onUrlChange: function(e){
		var validatedUrlArray = this.parseAndValidateUrls(e.target.value);
		this.setState({ 
      allSubmittedUrls: validatedUrlArray
    })
	},

	handleUrlSubmit: function(e){
    e.preventDefault();
    console.log('here');
    var urls = [];
    urls = this.state.allSubmittedUrls;

    this.props.submitUrlsToServer(urls);
    // this.setState({ 
    //   allSubmittedUrls: []
    // });
	},

	render: function(){
		return (
			<div>
				<UploadUrlsHtml 
        allDomains={ this.props.allDomains }
        allSubmittedUrls={ this.state.allSubmittedUrls } 
				handleUrlSubmit={ this.handleUrlSubmit }
				onUrlChange={ this.onUrlChange }
				/>
			</div>
			)
	}
});

module.exports = UploadUrlsData;
