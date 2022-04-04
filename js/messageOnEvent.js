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

async function loadDetails() {
  let dropDown = '<select id = "users_name" style="width: 100%;" required>'
  const citiesRef = db.collection('users')
  const snapshot = await citiesRef.get()
  await snapshot.forEach((doc) => {
    if (doc.data.name == null || doc.data.value == null || doc.data.password == null || doc.data.username == null) {
      // console.log('the problem :' + doc.id)
    }
    // console.log(doc.id, '=>', doc.data())
    dropDown += '<option value = ' + doc.data().value + '>' + doc.data().name + '</option>'
  })
  dropDown += '</select>'
  // console.log(dropDown)
  document.getElementById('drop_down').innerHTML += dropDown
}
// <option value="0">ariel</option>

showT = function () {
  document.getElementById('Add_link_Id').type = ''
}
hideT = function () {
  document.getElementById('Add_link_Id').type = 'hidden'
}
writeToFile = function () {
  console.log('test1')
  window.open('https://www.w3schools.com')
  console.log('test2')
}
