
var React = require('react');
var _ = require("underscore");

var ConfirmHtml = React.createClass({

  displayRow: function(){
    var rows = [];
    var allUrls = this.props.allUrls;
    var allDomains = this.props.allDomains;

    // console.log('in confirm html', allUrls);

    var displayListItem = function(urls, count){
      var listItem = [];
      var count = count;
      urls.map(function(url, index){
        if (index >= 15 ) {
          listItem.push( <li className="list-group-item smallUrlText yellowText" key={ url + index }>{ url } (not processing)</li>)
        } else {
          listItem.push(<li className="list-group-item smallUrlText" key={ url + index }>{ url }</li>)
        }
      })
      return listItem;
    }



    allUrls.map(function(obj){
      var count = obj.urls.length
      var urls = obj.urls
      var domain = obj.domain
      var img = ( _.where(allDomains, {domain: domain}).length > 0 ) ? _.where(allDomains, {domain: domain})[0].img : null;
      if (obj.domainAvailable && count <= 15) {
        rows.push(
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">{ domain } <span className="label label-success label-as-badge" key='success'>{ count }</span></h3>
            </div>
              { displayListItem(urls) }
          </div>
          )
      } 
      else if( obj.domainAvailable && count > 15){
        rows.push(
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">{ domain } <span className="label label-warning label-as-badge" key='danger'>{ count } </span> &nbsp; ( we are only processing the first 15 URLs)</h3>
            </div>
              { displayListItem(urls, count) }
          </div>
          )
      }
      else {
        rows.push(
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">{ domain } <span className="label label-danger label-as-badge" key='danger'>{ count } </span> &nbsp; ( domain unavailable - we are not processing these urls)</h3>
            </div>
              { displayListItem(urls) }
          </div>
          )
      }
    })  
    return rows;
  },

  render: function(){
    return (
<div>

<div className="container text-center">
  <h1 className="mainLogo">pricingIQ</h1>
  <div id="fadeIn"><p className="lead whiteText">Product Pricing Done Right</p></div>
  <br/>
</div>

<br/>


<div className="container">   

    <div className="panel-group" id="faqAccordion3">
      <div className="panel panel-success">
        <li className="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#faqAccordion3" data-target="#question5">
          <span className="badge greenBackground">14</span>
          <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
          <strong> Amazon</strong>
        </li>
        <div id="question5" className="panel-collapse collapse" style={{height: '0px'}}>
          <ul className="list-group"> 
            <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion3" data-target="#question5">
              <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li> 
            <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion3" data-target="#question5">
              <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li> 
            <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion3" data-target="#question5">
              <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li> 
          </ul>
        </div>
      </div>
    </div>

    <div className="panel-group" id="faqAccordion5">
      <div className="panel panel-danger">
        <li className="list-group-item list-group-item-danger" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
          <span className="badge redBackground">3</span>
          <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
          <strong> Walmart</strong>
        </li>
        <div id="question7" className="panel-collapse collapse" style={{height: '0px'}}>
          <ul className="list-group"> 
            <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
              <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li> 
            <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
              <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li> 
            <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
              <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li>  
          </ul>
        </div>
      </div>
    </div>


    <div className="panel-group" id="faqAccordion4">
      <div className="panel panel-warning">
        <li className="list-group-item list-group-item-warning" data-toggle="collapse" data-parent="#faqAccordion4" data-target="#question6">
          <span className="badge yellowBackground">24</span>
          <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
          <strong> Sears</strong>
        </li>
        <div id="question6" className="panel-collapse collapse" style={{height: '0px'}}>
          <ul className="list-group"> 
            <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion4" data-target="#question6">
              <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li> 
            <li className="list-group-item greenText" data-toggle="collapse" data-parent="#faqAccordion4" data-target="#question6">
              <span className="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li> 
            <li className="list-group-item redText" data-toggle="collapse" data-parent="#faqAccordion5" data-target="#question7">
              <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
              https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs
            </li>  
          </ul>
        </div>
      </div>
    </div>



</div>
</div>

      )
  }
});



module.exports = ConfirmHtml;


      // <div>
      //   <div className="container">
      //     <div className="jumbotron">
      //        <h1>Thank You</h1>
      //        <p>Please check your email to recieve your data</p>
      //        <hr className="showHr"/>
      //        { this.displayRow() }
      //     </div>
      //   </div>
      // </div>











