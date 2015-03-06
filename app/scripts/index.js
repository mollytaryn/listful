  var fbUrl = 'https://listful.firebaseio.com';
  var fb = new Firebase(fbUrl);

  //LOGIN FUNCTION//
  $('#loginButton').click(function() {
    // var $form = $($(this).closest('form'));
    var email = $('#loginEmail').val();
    var pass = $('#loginPassword').val();
    var loginData = {email: email, password: pass};
    userLogin(loginData);
    // $('div.viewForm').hide();
    // $('div.viewButton').show();
    });

  function userLogin(loginData) {
    fb.authWithPassword(loginData, function(err) {
      if (err) {
        $('.error').text('Invalid email or password. Please try again.');
      }
    });
  }

 //REGISTER .CLICK FUNCTION//

  $('#registerButton').click(function(event) {
    console.log('click working!');
    var email = $('#loginEmail').val();
    var pass = $('#loginPassword').val();
    var data = {email: email, password: pass};

    registerAndLogin(data, function(err, auth) {
      if (err) {
        $('.error').text(err);
      } else {
        location.reload(true);
      }
    });
  });

  //REGISTER AND LOGIN FUNCTION//
  function registerAndLogin(obj, cb) {
    fb.createUser(obj, function(err) {
      if (!err) {
        fb.authWithPassword(obj, function(err, auth) {
          if (!err) {
            cb(null, auth);
          } else {
            cb(err);
          }
        });
      } else {
        cb(err);
      }
    });
  }