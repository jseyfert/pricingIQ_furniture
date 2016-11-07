
var React = require('react');

var UploadConfirmHtml = React.createClass({

  render: function(){
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
           <h1>Thank You</h1>
           <p>Please check your email to recieve your data</p>
           <hr className="showHr"/>
           <h3>URLs currently being processed</h3>
           <br/>
           { this.props.displayWhichUrls('amazon', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.png') }
            <ul className="list-group">
              <li className="list-group-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Amazon.com-Logo.svg/200px-Amazon.com-Logo.svg.pngzzz" alt=""/>
                <span className="badge">14</span>
              </li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/LG-Electronics-43LH5000-43-Inch-1080p/dp/B01CF3L4YA/ref=sr_1_1?s=tv&ie=UTF8&qid=1477108399&sr=1-1&keywords=tvs</li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs</li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/LG-Electronics-55LH5750-55-Inch-1080p/dp/B01CF1G3S4/ref=sr_1_3?s=tv&ie=UTF8&qid=1477108424&sr=1-3&keywords=tvs</li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sears_logo_2010-present.svg/170px-Sears_logo_2010-present.svg.png" alt=""/>
                <span className="badge">14</span>
              </li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/LG-Electronics-43LH5000-43-Inch-1080p/dp/B01CF3L4YA/ref=sr_1_1?s=tv&ie=UTF8&qid=1477108399&sr=1-1&keywords=tvs</li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs</li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/LG-Electronics-55LH5750-55-Inch-1080p/dp/B01CF1G3S4/ref=sr_1_3?s=tv&ie=UTF8&qid=1477108424&sr=1-3&keywords=tvs</li>
            </ul>
            <ul className="list-group">
              <li className="list-group-item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Wal-Mart_logo.svg/200px-Wal-Mart_logo.svg.png" alt=""/>
                <span className="badge">14</span>
              </li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/LG-Electronics-43LH5000-43-Inch-1080p/dp/B01CF3L4YA/ref=sr_1_1?s=tv&ie=UTF8&qid=1477108399&sr=1-1&keywords=tvs</li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/TCL-32S3800-32-Inch-Smart-Model/dp/B00UB9UJBA/ref=sr_1_2?s=tv&ie=UTF8&qid=1477108424&sr=1-2&keywords=tvs</li>
              <li className="list-group-item smallUrlText">https://www.amazon.com/LG-Electronics-55LH5750-55-Inch-1080p/dp/B01CF1G3S4/ref=sr_1_3?s=tv&ie=UTF8&qid=1477108424&sr=1-3&keywords=tvs</li>
            </ul>
        </div>
        </div>
      </div>
      )
  }
});

module.exports = UploadConfirmHtml;









