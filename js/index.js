$(document).ready(function(){
      var config = {
            apiKey: "AIzaSyALn_c79BvSqEQAbNKGBNYYXVJCDEWER-Y",
            authDomain: "voting-d2df5.firebaseapp.com",
            databaseURL: "https://voting-d2df5.firebaseio.com",
            storageBucket: "voting-d2df5.appspot.com",
            messagingSenderId: "1032494254100"
      };
      firebase.initializeApp(config);
      
      $('.container').hide();

      $('.king_vote').click( function(e){ 
            e.preventDefault();
            var ref = firebase.database().ref().child('numberone/vote/king');
            ref.transaction(function(vote) {
                  if(vote != null){
                        vote++;
                  }
                  return vote;
            });
      });

      $('button').click( function(e){
            $('#facebook').hide();
                  $('.container').show();
            e.preventDefault();
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then( function(result) {
                  
            })
            .catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  var email = error.email;
                  var credential = error.credential;
                  console.log(errorMessage);

            });

            
      });

      firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                        console.log(user);
                  } else {
                        console.log("No User!")
                  }

      });

});
      
