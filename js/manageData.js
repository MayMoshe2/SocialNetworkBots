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

toManage = function (value) {
  //Message:
  //value = 0 -  Extract data
  //value = 1  Delete Data
  //Bot Users:
  //value = 2 - Extract
  // value = 3 Delete
  //Withdraw
  //value = 4 - Extract
  //value = 5 Delete
  console.log(value)
  console.log(document.getElementById('users_name').value)
  $.ajax({
    type: 'get', // define the type of HTTP verb we want to use (POST for our form)
    url: '/manage_data/' + document.getElementById('users_name').value + '/' + value, // the url where we want to POST
    success: function () {
      console.log('manage_data is called from client')
      // window.location.href = '/mainPage'
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
      window.location.href = '/mainPage'
    },
  })
}

async function loadDetails() {
  let dropDown = '<select id = "users_name" style="width: 48%; background: black;" required>'
  const citiesRef = db.collection('users')
  const snapshot = await citiesRef.get()
  await snapshot.forEach((doc) => {
    if (doc.data.name == null || doc.data.value == null || doc.data.password == null || doc.data.username == null) {
      console.log('the problem :' + doc.id)
    }
    console.log(doc.id, '=>', doc.data())
    dropDown += '<option value = ' + doc.data().value + '>' + doc.data().name + '</option>'
  })
  dropDown += '</select>'
  console.log(dropDown)
  document.getElementById('drop_down').innerHTML += dropDown
}
