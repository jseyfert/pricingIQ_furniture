
var React = require('react');
var UploadUrlsForm = require('./uploadUrlsForm.js');
var validator = require('validator');

var UploadUrlsData = React.createClass({

  getInitialState: function(){
		return {
			url: [],
      maxUrls: false
		}
	},

	parseAndValidateUrls: function(text){
    var urlArray = text.split("\n");
      
    var validUrlArray = urlArray.map(function(url){
        if (validator.isURL(url)){
            return url;
        } else {
            return false;
        }
    }).filter(function(n){ return n != false })

    return validUrlArray;
	},

  countValidUrls: function(array){
    if (array.length <= 3){
      return false;
    } else {
      return true;
    }
  },

	onUrlChange: function(e){
		 var validatedUrlArray = this.parseAndValidateUrls(e.target.value);
     var maxUrls = this.countValidUrls(validatedUrlArray);

		this.setState({ 
      url: validatedUrlArray,
      maxUrls: maxUrls
    })
	},

	handleUrlSubmit: function(e){
		e.preventDefault();

		console.log('boom yes');
	},

	render: function(){
		return (
			<div>
				<UploadUrlsForm 
        logoutUser={ this.props.logoutUser } 
				usernamePass={ this.props.usernamePass } 
				handleUrlSubmit={ this.handleUrlSubmit }
				onUrlChange={ this.onUrlChange }
        maxUrls={ this.state.maxUrls }
        url={ this.state.url }
				/>
			</div>
			)
	}
});

module.exports = UploadUrlsData;
				// url={ this.state.url }