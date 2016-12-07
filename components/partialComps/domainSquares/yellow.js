
var React = require('react');

var DomainYellow = React.createClass({
  render: function(){
    var obj = this.props.obj
    var domainInfo = this.props.domainInfo
    // console.log('in yellow', obj, (obj.countLeftToSubmit >= 0))
    var urlCount = (obj.urlCount > 0) ? obj.urlCount : null;
    var countLeftToSubmit = (obj.countLeftToSubmit === null) ? 15 : obj.countLeftToSubmit
      return (
      <div className="col-lg-3 col-md-6 col-xs-12 thumb noPadding grow">
            <div className="overlayWarningText" >
              <div className="overlayGreen">
                <a className="list-group-item" target="_blank" href={domainInfo.href}>
                <span className="badge yellow">{urlCount} of {countLeftToSubmit}</span>
                <img className="img-responsive Absolute-Center" src={domainInfo.src} alt={domainInfo.alt}/>
                </a>  
              </div>
            </div>
      </div>
      )
    }
});

module.exports = DomainYellow;

