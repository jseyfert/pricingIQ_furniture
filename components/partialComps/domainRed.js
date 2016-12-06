
var React = require('react');

var DomainRed = React.createClass({
  render: function(){
  var obj = this.props.obj
  var domainInfo = this.props.domainInfo
  // console.log(obj)
  var countLeftToSubmit = (obj.countLeftToSubmit === null) ? 15 : obj.countLeftToSubmit
  var urlCount = (obj.urlCount > 0) ? obj.urlCount + ' of ' + countLeftToSubmit : null;

  if (obj.countLeftToSubmit === 0) {
    return (
      <div className="col-lg-3 col-md-6 col-xs-12 thumb noPadding grow">
          <a className="list-group-item" target="_blank" href={domainInfo.href}>
             <div className="overlaySubmittedText">
              <div className="overlayOffline">
                <span className="badge red">{urlCount}</span>
                <img className="img-responsive Absolute-Center" src={domainInfo.src} alt={domainInfo.alt}/>
              </div>
            </div>
          </a>
      </div>
    )
  } else{
    return (
      <div className="col-lg-3 col-md-6 col-xs-12 thumb noPadding grow">
          <a className="list-group-item" target="_blank" href={domainInfo.href}>
            <div className="overlayOfflineText">
              <div className="overlayOffline">
                <span className="badge red">{urlCount}</span>
                <img className="img-responsive Absolute-Center" src={domainInfo.src} alt={domainInfo.alt}/>
              </div>
            </div>
          </a>
      </div>
    )
  }
}
});

module.exports = DomainRed;
