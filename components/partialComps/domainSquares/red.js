
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
      <div className="col-lg-3 col-md-6 col-xs-6 thumb noPadding grow">
         <div className="overlaySubmittedText">
          <div className="overlayOffline">
            <a className="list-group-item" target="_blank" href={domainInfo.href}>
            <span className="badge red">{urlCount}</span>
            <img className="img-responsive Absolute-Center" src={domainInfo.src} alt={domainInfo.alt}/>
            </a>
          </div>
        </div>
      </div>
    )
  } else{
    return (
      <div className="col-lg-3 col-md-6 col-xs-6 thumb noPadding grow">
        <div className="overlayOfflineText">
          <div className="overlayOffline">
           <a className="list-group-item" target="_blank" href={domainInfo.href}>
            <span className="badge red">{urlCount}</span>
            <img className="img-responsive Absolute-Center" src={domainInfo.src} alt={domainInfo.alt}/>
           </a>
          </div>
        </div>
      </div>
    )
  }
}
});

module.exports = DomainRed;
