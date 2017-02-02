$( document ).ready( function( ) {

      var config = {
            apiKey: "AIzaSyALn_c79BvSqEQAbNKGBNYYXVJCDEWER-Y",
            authDomain: "voting-d2df5.firebaseapp.com",
            databaseURL: "https://voting-d2df5.firebaseio.com",
            storageBucket: "voting-d2df5.appspot.com",
            messagingSenderId: "1032494254100"
      };
      firebase.initializeApp( config );

      var king_vote = firebase.database( ).ref( ).child( 'king_vote' );
      var queen_vote = firebase.database( ).ref( ).child( 'queen_vote' );
      var king_voted_list = firebase.database( ).ref( ).child( 'king' );
      var queen_voted_list = firebase.database( ).ref( ).child( 'queen' );

      $('#float').hide();

      $( '.king' ).click( function( e ) {
            e.preventDefault( );

            king_vote.child( e.target.id ).transaction( function( vote ) {
                  if ( vote != null ) {
                        vote++;
                        var updates = {};
                        updates[ 'king/' + firebase.auth( ).currentUser.uid ] = 1;
                        firebase.database( ).ref( ).update( updates );
                        $( '.king' ).prop( 'disabled', true );
                  }
                  return vote;
            } );
      } );

      $( '.queen' ).click( function( e ) {
            e.preventDefault( );

            queen_vote.child( e.target.id ).transaction( function( vote ) {
                  if ( vote != null ) {
                        vote++;
                        var updates = {};
                        updates[ 'queen/' + firebase.auth( ).currentUser.uid ] = 1;
                        firebase.database( ).ref( ).update( updates );
                        $( '.queen' ).prop( 'disabled', true );
                  }
                  return vote;
            } );
      } );




      $( '#facebook_login' ).click( function( e ) {

            e.preventDefault( );
            var provider = new firebase.auth.FacebookAuthProvider( );
            firebase.auth( ).signInWithPopup( provider )
                  .then( function( result ) {
                        
                        $( '#facebook_login' ).hide( );
                        $( '#float' ).show();

                        king_voted_list.orderByKey( )
                              .equalTo( result.user.uid )
                              .once( 'value' )
                              .then( function( snapshot ) {
                                    var value = snapshot.val( );
                                    if ( value ) {
                                          $( '.king' ).prop( 'disabled', true );
                                    }
                              } );

                        queen_voted_list.orderByKey( )
                              .equalTo( result.user.uid )
                              .once( 'value' )
                              .then( function( snapshot ) {
                                    var value = snapshot.val( );
                                    if ( value ) {
                                          $( '.queen' ).prop( 'disabled', true );
                                    }
                              } );

                  } )
                  .catch( function( error ) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        var email = error.email;
                        var credential = error.credential;
                        console.log( errorMessage );

                  } );


      } );

      firebase.auth( ).onAuthStateChanged( function( user ) {
            if ( user ) {
                  
                  $( '#facebook_login' ).hide( );
                  $( '#float' ).show( );
      
      
                  console.log( firebase.auth( ).currentUser.uid );
                  king_voted_list.orderByKey( )
                        .equalTo( user.uid )
                        .once( 'value' )
                        .then( function( snapshot ) {
                              var value = snapshot.val( );
                              if ( value ) {
                                    $( '.king' ).prop( 'disabled', true );
                              }
                        } );

                  queen_voted_list.orderByKey( )
                        .equalTo( user.uid )
                        .once( 'value' )
                        .then( function( snapshot ) {
                              var value = snapshot.val( );
                              if ( value ) {
                                    $( '.queen' ).prop( 'disabled', true );
                              }
                        } );


            } else {
                  console.log( "No User!" )
            }

      } );

      $( "#king" ).click( function( ) {
            $( "#panel" ).animate( {
                  left: "-100%"
            }, 1000 );

      } );

      $( "#queen" ).click( function( ) {
            $( "#panel" ).animate( {
                  left: "0"
            }, 1000 );
      } );
} );
