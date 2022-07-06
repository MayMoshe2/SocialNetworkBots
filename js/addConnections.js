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
run_python = function () {
  let user = document.getElementById('users_name').value
  let connections = document.getElementById('num_of_connections').value
  let start_from = document.getElementById('start_from').value
  if (user == '' || connections == '' || start_from == '') {
    return
  }

  const json = {
    user: user,
    connections: connections,
    start_from: start_from,
  }

  $.ajax({
    method: 'get',
    url: '/addCon',
    data: json,
    success: function (data) {
      console.log('run python from client')
      console.log(data)
    },
    error: function (xhr, desc, err) {
      console.log(xhr)
      console.log('Details0: ' + desc + '\nError:' + err + '/n' + xhr)
    },
  })
  window.location.href = '/mainPage.html'
}
