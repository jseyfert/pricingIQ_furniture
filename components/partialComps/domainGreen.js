
var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group')

var DomainGreen = React.createClass({
  render: function(){
    var obj = this.props.obj
    var domainInfo = this.props.domainInfo
    // console.log('obj', obj)
    var urlCount = (obj.urlCount > 0) ? obj.urlCount : null;
    var countLeftToSubmit = (obj.countLeftToSubmit) ? obj.countLeftToSubmit : 15
    return (
      <div className="col-lg-3 col-md-6 col-xs-12 thumb noPadding grow">
          <div className="overlayGreen">
            <a className="list-group-item" target="_blank" href={domainInfo.href}>
            <span className="badge green">{urlCount} of {countLeftToSubmit}</span>
            <img className="img-responsive Absolute-Center"  src={domainInfo.src} alt={domainInfo.alt}/>
            </a>
         </div>
      </div>
    )
    }
});

module.exports = DomainGreen;

