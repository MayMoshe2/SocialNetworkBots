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

function load() {
  document.getElementById('employee').disabled = true
}
function validation() {
  let name = document.getElementById('name').value
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value
  let sec_password = document.getElementById('sec_password').value
  if (name == '' || username == '' || password == '' || sec_password == '') {
    document.getElementById('employee').disabled = true
    console.log('All fields are required')
    document.getElementById('wrong_option').innerHTML = '*All fields are required'
    return
  }
  if (!username.match(/\S+@\S+\.\S+/)) {
    document.getElementById('employee').disabled = true
    console.log('Invalid mail')
    document.getElementById('wrong_option').innerHTML = '*Invalid mail'
    return
  }
  if (username.indexOf(' ') != -1 || username.indexOf('..') != -1) {
    document.getElementById('employee').disabled = true
    console.log('Invalid mail')
    document.getElementById('wrong_option').innerHTML = '*Invalid mail'

    return
  }
  if (password != sec_password) {
    document.getElementById('wrong_option').innerHTML = '*Incompatible passwords'
    document.getElementById('employee').disabled = true
    console.log('Incompatible passwords')
    return
  }
  document.getElementById('employee').disabled = false
  document.getElementById('wrong_option').innerHTML = ''
  return
}
async function addEmployee() {
  const citiesRef = db.collection('users')
  const snapshot = await citiesRef.get()
  let maxVal = 0
  await snapshot.forEach((doc) => {
    if (doc.data().value > maxVal) {
      maxVal = doc.data().value
    }
    console.log(doc.id, '=>', doc.data())
    console.log(maxVal)
  })
  maxVal = maxVal + 1
  let name = document.getElementById('name').value
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value
  let sec_password = document.getElementById('sec_password').value
  db.collection('users')
    .add({
      name: document.getElementById('name').value,
      password: document.getElementById('password').value,
      username: document.getElementById('username').value,
      value: maxVal,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
      alert(name + ' Added successfully!')
    })
    .catch((error) => {
      console.log(error)
    })
}
