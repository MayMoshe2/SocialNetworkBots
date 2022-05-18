file = {}
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCxzOG5wE6-A9PTPlQUSJEGHoz1Acbetm8',
    authDomain: 'socialnetworksbots.firebaseapp.com',
    projectId: 'socialnetworksbots',
  })
}
var db = firebase.firestore()
var web = 'https://social-network-bot-eagle-point.herokuapp.com'
function sendEmail() {
  console.log('nir')

  var headLine = document.getElementById('message').value
  var mess = document.getElementById('event_link').value
  console.log('headLine', headLine)
  console.log('mess', mess)
  try {
    $.ajax({
      type: 'get',
      url: 'sendEmailsUrl/' + headLine + '/' + mess,
    })
    alert('The operation was successful. Please wait a minute')
  } catch (err) {
    console.log(err)
  }
  window.location.href = '/mainPage.html'
}
