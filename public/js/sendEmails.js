file = {}
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCxzOG5wE6-A9PTPlQUSJEGHoz1Acbetm8',
    authDomain: 'socialnetworksbots.firebaseapp.com',
    projectId: 'socialnetworksbots',
    // storageBucket: 'socialnetworksbots.appspot.com',
    // messagingSenderId: '180389196591',
    // appId: '1:180389196591:web:a00c8fc35f5c496e55e7da',
    // measurementId: 'G-XN1SBKC3B4',
  })
}
var db = firebase.firestore()

function sendEmail() {
  console.log('nir')
  console.log(document.getElementById('message').value)
  console.log(document.getElementById('event_link').value)
  var headLine = document.getElementById('message').value
  var mess = document.getElementById('event_link').value

  $.ajax({
    type: 'get', // define the type of HTTP verb we want to use (POST for our form)
    url: '/sendEmailsUrl/' + headLine + '/' + mess, // the url where we want to POST
    success: function () {
      console.log('Send Emails is called from client')
      window.location.href = '/mainPage'
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
      window.location.href = '/mainPage'
    },
  })
}
