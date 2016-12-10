
var React = require('react');
var _ = require("underscore");
var Message = require('./partialComps/message');
var Logo = require('./partialComps/logo');
var UrlItemGreen = require('./partialComps/urlDisplay/itemGreen');
var UrlItemRed = require('./partialComps/urlDisplay/itemRed');
var UrlGroupGreen = require('./partialComps/urlDisplay/groupGreen');
var UrlGroupRed = require('./partialComps/urlDisplay/groupRed');
var UrlGroupYellow = require('./partialComps/urlDisplay/groupYellow');

var ConfirmHtml = React.createClass({

  displayRow: function(){
    
    var rows = [];

    var allUrls = this.props.allUrls;
    var allDomains = this.props.allDomains;

    var displayListItemGreen = function(urls, urlCount, countLeftToSubmit, index){
      var listItem = [];
      urls.map(function(url, thisIndex){
        listItem.push( <UrlItemGreen url={url} index={index} key={thisIndex} /> )    
      })
      return listItem;
    }    

    var displayListItemRed = function(urls, urlCount, countLeftToSubmit, index){
      var listItem = [];
      urls.map(function(url, thisIndex){
        listItem.push(<UrlItemRed url={url} index={index} key={thisIndex} />)
      })
      return listItem;
    }

    var displayListItemYellow = function(urls, urlCount, countLeftToSubmit, index){
      var listItem = [];
      // console.log('urls',urls)
      urls.map(function(url, thisIndex){
        // console.log('homedepot.com',thisIndex)
        if(thisIndex < countLeftToSubmit ) {
          listItem.push( <UrlItemGreen url={url} index={index} key={thisIndex} /> ) 
        } else {

          listItem.push( <UrlItemRed url={url} index={index} key={thisIndex} />)
        }
      })
      return listItem;
    }

    allUrls.map(function(obj, index){
      var domain = obj.domain.toUpperCase()
      var domainActive = obj.domainActive
      var domainOffered = obj.domainOffered
      var countLeftToSubmit = obj.countLeftToSubmit
      var urlCount = obj.urlCount
      var urls = obj.urls
      // console.log('in them urls', urls)

      if(urlCount > 0){
        if(domainActive && countLeftToSubmit > 0){
          if (urlCount > 15 || urlCount > countLeftToSubmit) {
            rows.unshift( 
              <UrlGroupYellow urls={urls} urlCount={urlCount} domain={domain} index={index} key={index} displayListItem={displayListItemYellow} countLeftToSubmit={countLeftToSubmit} /> 
              )
          } else {
            rows.unshift( 
              <UrlGroupGreen urls={urls} urlCount={urlCount} domain={domain} index={index} key={index} displayListItem={displayListItemGreen} countLeftToSubmit={countLeftToSubmit}  /> 
              )
          }
        } else {
          rows.push( 
            <UrlGroupRed urls={urls} urlCount={urlCount} domain={domain} index={index} key={index} displayListItem={displayListItemRed} countLeftToSubmit={countLeftToSubmit} domainOffered={domainOffered} domainActive={domainActive} /> 
          )
        }
      }
    })
    // console.log('rows',rows)
    return rows;
  },

  render: function(){
return (

<div>
  <Logo delay={false} /> 
  <div className="container">   
    <h3 className="text-center">The Urls in green are now being processed.</h3>
    <h3 className="text-center">Check your email to recieve your data.</h3>
    <div className="text-center"><Message message={this.props.message} /></div>
    <br/>
    {this.displayRow()}
  </div>
</div>
    // <div className="panel-group" id="faqAccordion3">
    //   <div className="panel panel-success">
    //     <li className="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#faqAccordion3" data-target="#question5">
    //       <span className="badge greenBackground">14</span>
    //       <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
    //       <strong> Amazon</strong>
    //     </li>
    //     <div id="question5" className="panel-collapse collapse" style={{height: '0px'}}>
    //       <ul className="list-group"> 

    //         <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion3" data-target="#question5">
    //           <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
    //           https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
    //         </li>

    //       </ul>
    //     </div>
    //   </div>
    // </div>

    // <div className="panel-group" id="faqAccordion5">
    //   <div className="panel panel-danger">
    //     <li className="list-group-item list-group-item-danger" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
    //       <span className="badge redBackground">3</span>
    //       <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
    //       <strong> Walmart</strong>
    //     </li>
    //     <div id="question7" className="panel-collapse collapse" style={{height: '0px'}}>
    //       <ul className="list-group"> 
    //         <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
    //           <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
    //           https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
    //         </li> 
    //         <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
    //           <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
    //           https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
    //         </li> 
    //         <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
    //           <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
    //           https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
    //         </li>  
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    // <div className="panel-group" id="faqAccordion4">
    //   <div className="panel panel-warning">
    //     <li className="list-group-item list-group-item-warning" data-toggle="collapse" data-parent="#faqAccordion4" data-target="#question6">
    //       <span className="badge yellowBackground">24</span>
    //       <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
    //       <strong> Sears</strong>
    //     </li>
    //     <div id="question6" className="panel-collapse collapse" style={{height: '0px'}}>
    //       <ul className="list-group"> 
    //         <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion4" data-target="#question6">
    //           <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
    //           https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
    //         </li> 
    //         <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion4" data-target="#question6">
    //           <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
    //           https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
    //         </li> 
    //         <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion4" data-target="#question6">
    //           <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
    //           https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
    //         </li>  
    //       </ul>
    //     </div>
    //   </div>
    // </div>


      )
  }
});

module.exports = ConfirmHtml;

