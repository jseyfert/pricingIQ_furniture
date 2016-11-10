
var React = require('react');
var ReactDOM = require('react-dom');

var ShowWhichComponent = require('./showWhichComponent.js');
var Header = require('./header.js');
var Footer = require('./footer.js');
var _ = require("underscore");

var Index = React.createClass({
	
  getInitialState: function(){
		return {
			user: null,
      errorMessage: null,
      submittedToday: null,
      noActiveDomains: null,
      activeComponent: 'landing',
			allUrls: [],
			allDomains: 
			[{domain: 'amazon' , domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png'},
			{domain: 'walmart', domainAvailable: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png'},
			{domain: 'sears' ,  domainAvailable: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png'}]
		}
	},

	getOneUserFromServer: function(){
		var currentTime = new Date().getTime()
		var self = this;

		$.ajax({
			method: 'GET', 
			url: '/oneUser'
		}).done(function(data){
			self.setState({ 
        user: data,
        errorMessage: null,
        submittedToday: data.canSubmitAfter ? (currentTime < data.canSubmitAfter) : null
			});
		})
	},

  updateUser: function(user){
    // var midnightTonight = new Date().setHours(23,59,59,0);

    if (user){
      $.ajax({
        method: 'PUT',
        url: '/updateUser',
        data: { user: this.state.user, newCanSubmitAfter: midnightTonight},
        success: function(data){
          console.log("in update user CLIENT SIDE", data);
          self.setState({ 
            user: data,
            errorMessage: null,
            submittedToday: true // midnightTonight
          });
        },
        error: function(xhr, status, err){
          console.error('/updateUser', status, err.toString())
        }
      })
    }
  },

  handleSubmitClick: function(urls){
    var user = (this.state.user.user === 'anonymous') ? false : true;
    var errorNoUrls = (urls.length === 0) ? true : false;
    var submittedToday = this.state.submittedToday
    var noActiveDomains = (_.where(urls, {domainAvailable: true}).length === 0) ? true : false

    if(user){
      if (errorNoUrls) {
        this.setState({ activeComponent: 'landing', errorMessage: 'Please submit at least one valid Url' })
      } else if (submittedToday) {
        this.setState({ activeComponent: 'submittedToday'})
      } else if (noActiveDomains){
        this.setState({ activeComponent: 'noActiveDomains'})
      } else {
        console.log('#1 SUBMIT W/ USER-ID');                                            //submit with userID   #1
        console.log('#1 UPDATE USER');                                                  //***UPDATE USER***
        this.setState({ activeComponent: 'confirm'})
      }
    } else if (!user) {   
      if (errorNoUrls) {
        this.setState({ activeComponent: 'landing', errorMessage: 'Please submit at least one valid Url' })
      } else {
        console.log('#2 SUBMIT W/OUT USER-ID');                                         //submit withOUT userID #2
        this.setState({ activeComponent: 'login', noActiveDomains: noActiveDomains, errorMessage: null})
      }
    }
  },

  loginUserFromServer: function(user){
    var currentTime = new Date().getTime()
    var self = this;

    $.ajax({
      method: 'POST',
      url: '/login',
      data: user,
      success: function(data){
        var submittedToday = (currentTime < data.user.canSubmitAfter);
        var noActiveDomains = self.state.noActiveDomains;
        // console.log("in loginUserFromServer1", data);
        // console.log("in loginUserFromServer1", self.state);
        if (submittedToday) {
          self.setState({ 
            user: data.user,
            errorMessage: null,
            submittedToday: submittedToday,
            noActiveDomains: noActiveDomains,
            activeComponent: 'submittedToday'
          })
        } else if (noActiveDomains){
          self.setState({ 
            user: data.user,
            errorMessage: null,
            submittedToday: submittedToday, 
            noActiveDomains: noActiveDomains,
            activeComponent: 'noActiveDomains'
          })
        } else {
          console.log('#3 SUBMIT W/ USER-ID');                                            //submit with userID #3
          console.log('#3 UPDATE USER');                                                  //***UPDATE USER***
          self.setState({ 
            user: data.user,
            errorMessage: null,
            submittedToday: submittedToday,
            noActiveDomains: noActiveDomains,
            activeComponent: 'confirm'
          })
        }
      },
      error: function(xhr, status, err){
        console.error('/login', status, err)
        self.setState({ 
          errorMessage: 'Email or password incorrect',
          activeComponent: 'login'
        });
      }
    })  
  },	

  signupUserFromServer: function(user){
    var self = this;

    $.ajax({
      method: 'POST',
      url: '/signup',
      data: user, 
      success: function(data){
        var noActiveDomains = self.state.noActiveDomains;
        // console.log("in loginUserFromServer1", data);
        // console.log("in loginUserFromServer1", self.state);
        if (noActiveDomains){
          self.setState({ 
            user: data.user,
            errorMessage: null,
            submittedToday: false, 
            noActiveDomains: noActiveDomains,
            activeComponent: 'noActiveDomains'
          })
        } else {
          console.log('#4 SUBMIT W/ USER-ID');                                            //submit with userID #4
          console.log('#4 UPDATE USER');                                                  //***UPDATE USER***
          self.setState({ 
            user: data.user,
            errorMessage: null,
            submittedToday: false,
            noActiveDomains: noActiveDomains,
            activeComponent: 'confirm'
          })
        }
      },
      error: function(xhr, status, err){
        console.error('/signup', status, err)
        self.setState({ 
          errorMessage: 'That email is taken',
          activeComponent: 'signup'
        });
      }
    })
  },

  logoutUser: function(user){
    var self = this;

    $.ajax({
      url: '/logout',
      method: 'GET', 
      success: function(data){
        $.ajax({
          method: 'GET', 
          url: '/oneUser'
        }).done(function(data){
          self.setState({ 
            user: data,
            errorMessage: null,
            submittedToday: null
          });
        })
      }.bind(self),
      error: function(xhr, status, err){
        console.error('/logout', status, err.toString());
      }
    })
  },

  setActiveComponent: function(componentName) {
    this.setState({
      activeComponent: componentName,
      errorMessage: null,
    })
  },

	componentDidMount: function(){
		this.getOneUserFromServer();
	},


	render: function(){
			if (!this.state.user) {
				return null;
			} else {
			return (
				<div>
					<Header 
          user={ this.state.user } 
          logoutUser={ this.logoutUser }
          />
					<ShowWhichComponent 
          user={ this.state.user } 
          errorMessage={ this.state.errorMessage } 
          allDomains={ this.state.allDomains } 
          allUrls={ this.state.allUrls } 
          activeComponent={ this.state.activeComponent } 
          setActiveComponent={ this.setActiveComponent } 
          loginUserFromServer={ this.loginUserFromServer } 
          signupUserFromServer={ this.signupUserFromServer }
          logoutUser={ this.logoutUser } 
          handleSubmitClick={ this.handleSubmitClick } 
          />
        </div>
					// <Footer />
			)
			}
	}
});

ReactDOM.render(	<Index />,	document.getElementById('app'));

