var mongoose = require('mongoose');

module.exports = {

  submitUrlsId: function(req, res){
    console.log('######## SUBMIT URLS WITH ID ########', req.body.urlsToSubmit);

    user = req.body.user
    userId = req.body.user._id
    urlsToSubmit = req.body.urlsToSubmit
    newCountLeftToSubmit = req.body.newCountLeftToSubmit
    // console.log('urlsToSubmit', urlsToSubmit, 'newCountLeftToSubmit', newCountLeftToSubmit);
   
    if(user) {
      mongoose.model('User').findById({ _id: userId },
        function(err, user) {
          if (err) {
            // return console.log('in updateUser > mongoose > findById', err);
          } else {
            // console.log('countLeftToSubmit', user.countLeftToSubmit);
            user.countLeftToSubmit = newCountLeftToSubmit
            user.save(function(err) { 
                if (err) {
                  res.send(err);
                } else {
                  // console.log('success!!!!!!!!');
                  res.json({
                    user: user,
                    activeComponent: 'confirm'
                  })
                }
            });
          }
        });
      } else {
        console.log("could not submit urls");
        res.json({ message: { message: "could not submit urls"} })
      }
  },

  submitUrlsNoId: function(req, res){
    console.log('*/*/*/*/*/* submit urls witout id */*/*/*/*', req.body.urls);
    res.json({ activeComponent: 'login' })
  },

};

