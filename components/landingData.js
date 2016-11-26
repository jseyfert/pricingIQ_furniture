
var React = require('react');
var validator = require('validator');
var parseDomain = require("parse-domain");
var _ = require("underscore");
var LandingHtml = require('./landingHtml.js');


var LandingData = React.createClass({



	// onTextChange: function(e){    
	// 	var validatedUrlArray = this.parseAndValidateUrls(e.target.value);
	// 	this.setState({ 
 //      allUrls: validatedUrlArray
 //    })
	// },

	// handleUrlSubmit: function(e){
 //    e.preventDefault();
 //    var urls = [];
 //    urls = this.state.allUrls;

 //    this.props.handleSubmitClick(urls);
 //    // this.setState({ 
 //    //   allUrls: []
 //    // });
 //  },

  render: function(){
    // console.log(this.props.urlsNoUser);
    // console.log('here we go', this.props.onTextChange);
		return (
			<div>
				<LandingHtml 
        domainsLoading={ this.props.domainsLoading } 
        userLoading={ this.props.userLoading } 
        user={ this.props.user }
        message={this.props.message}
        setActiveComponent={ this.props.setActiveComponent }
        allDomains={ this.props.allDomains }
        allUrls={ this.props.allUrls } 

        handleUrlSubmit={ this.props.handleUrlSubmit }
				onTextChange={ this.props.onTextChange }
        rawText={ this.props.rawText } 
				/>
			</div>
			)
	}
});

module.exports = LandingData;
