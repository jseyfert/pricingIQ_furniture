
var React = require('react');
var validator = require('validator');
var parseDomain = require("parse-domain");
var _ = require("underscore");
var LandingHtml = require('./landingHtml.js');


var LandingData = React.createClass({

  getInitialState: function(){
		return {
			allUrls: []
		}
	},

	parseAndValidateUrls: function(text){
    var urlArray = text.split("\n");
    var domains = [];
    var domainsAndUrls = [];
    var distinctDomains = [];
    var arrOfObj = [];
    var allDomains = this.props.allDomains;
    // console.log(allDomains, 'in allDomains');
    var availableDomains = []

    allDomains.map(function(obj){
      // console.log(obj);
      if (obj.domainAvailable){
        availableDomains.push(obj.domain)
      }
    })
    // console.log(availableDomains, 'in availableDomains');

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
      var domainAvailable = false;
      for(var i = 0; i < arr.length ; i++) {
        if(arr[i][0] === domain){
          setDomain = domain;
          array.push(arr[i][1])        
          domainAvailable = _.include(availableDomains, domain);
          // console.log(domainAvailable, availableDomains, 'in domainAvailable');
        } else {
          null;
        }
        arrOfObj[index] = {
          domain: setDomain,
          urls: array,
          domainAvailable: domainAvailable
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

	onUrlChange: function(e){    
		var validatedUrlArray = this.parseAndValidateUrls(e.target.value);
		this.setState({ 
      allUrls: validatedUrlArray
    })
	},

	handleUrlSubmit: function(e){
    e.preventDefault();
    var urls = [];
    urls = this.state.allUrls;

    this.props.handleSubmitClick(urls);
    // this.setState({ 
    //   allUrls: []
    // });
	},

	render: function(){
    // console.log('here we go', this.props.message);
		return (
			<div>
				<LandingHtml 
        message={this.props.message}
        setActiveComponent={ this.props.setActiveComponent }
        allDomains={ this.props.allDomains }
        allUrls={ this.state.allUrls } 
				handleUrlSubmit={ this.handleUrlSubmit }
				onUrlChange={ this.onUrlChange }
				/>
			</div>
			)
	}
});

module.exports = LandingData;
