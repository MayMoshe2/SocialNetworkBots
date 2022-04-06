firebase.initializeApp({
  apiKey: 'AIzaSyCxzOG5wE6-A9PTPlQUSJEGHoz1Acbetm8',
  authDomain: 'socialnetworksbots.firebaseapp.com',
  projectId: 'socialnetworksbots',
  // storageBucket: 'socialnetworksbots.appspot.com',
  // messagingSenderId: '180389196591',
  // appId: '1:180389196591:web:a00c8fc35f5c496e55e7da',
  // measurementId: 'G-XN1SBKC3B4',
})
var db = firebase.firestore()

async function submitForm() {
  let userName = document.getElementById('username').value
  let password = document.getElementById('password').value

  const usersRef = db.collection('usersBot')
  const snapshot = await usersRef.get()
  snapshot.forEach((doc) => {
    //console.log(doc.data().userName);
    if (userName === doc.data().userName && password === doc.data().password) {
      window.location.href = '/html/mainPage.html'
      return
    }
  })
  document.getElementById('wrong_option').innerHTML = '*Emploee not found'
  console.log('not found')
}

function add_emploee() {
  db.collection('users')
    .add({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
}
