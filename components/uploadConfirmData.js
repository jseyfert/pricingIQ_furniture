
var React = require('react');
var UploadConfirmHtml = require('./uploadConfirmHtml.js');
var _ = require("underscore");

var UploadConfirmData = React.createClass({

  // getInitialState: function(){
  //   return {
  //     password: "" 
  //   }
  // },

  // handleUserLoginSubmit: function(e){
  //   e.preventDefault();

  //   var user = {};
  //   user.email = this.state.email;
  //   user.password = this.state.password;

  //   this.props.loginUserFromServer(user);
  //   this.setState({ email: '', password: '' });
  // },


 displayWhichUrls: function(domain, imgUrl){
  var allDomains = this.props.allSubmittedUrls
  console.log(domain, imgUrl);


  allDomains.forEach(function(obj){
    if (obj.domainAvailable){

      console.log(obj.domainAvailable, obj.domain, obj, 'test');
    }
  })
},

  render: function(){
    return (
      <div>
        <UploadConfirmHtml 
          displayWhichUrls={ this.displayWhichUrls }
          />
      </div>
      )
  }
});

module.exports = UploadConfirmData;