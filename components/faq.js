var React = require('react');
var Logo = require('./partialComps/logo');

var Faq = React.createClass({

  render: function(){
      return (
        <div>

          <Logo delay={true} />

          <br/>

          <div className="container">
            <br/>
            <div className="container ">
              <div className="panel-group" id="faqAccordion">

                <div className="panel panel-default">
                  <div className="panel-heading accordion-toggle question-toggle collapsed" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question0">
                    <h4 className="panel-title">
                      <a href="#" className="ing blackText">Q: What is Lorem Ipsum?</a>
                    </h4>
                  </div>
                  <div id="question0" className="panel-collapse collapse" style={{height: '0px'}}>
                    <div className="panel-body">
                      <p className="blackText">Lorem Ipsum </p>
                    </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                    <h4 className="panel-title">
                      <a href="#" className="ing blackText">Q: Why do we use it?</a>
                    </h4>
                  </div>
                  <div id="question1" className="panel-collapse collapse" style={{height: '0px'}}>
                    <div className="panel-body">
                      <p className="blackText">It is a long </p>
                    </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question2">
                    <h4 className="panel-title">
                      <a href="#" className="ing blackText">Q: Where does it come from?</a>
                    </h4>
                  </div>
                  <div id="question2" className="panel-collapse collapse" style={{height: '0px'}}>
                    <div className="panel-body">
                      <p className="blackText">Contrary to popular</p>
                    </div>
                  </div>
                </div>

                <div className="panel panel-default">
                  <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question3">
                    <h4 className="panel-title">
                      <a href="#" className="ing blackText">Q: Where can I get some?</a>
                    </h4>
                  </div>
                  <div id="question3" className="panel-collapse collapse" style={{height: '0px'}}>
                    <div className="panel-body">
                      <p className="blackText">There are many variations</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div> 

        </div>
      )
    }
});

module.exports = Faq;
