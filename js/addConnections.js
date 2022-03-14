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
      console.log('the problem :' + doc.id)
    }
    console.log(doc.id, '=>', doc.data())
    dropDown += '<option value = ' + doc.data().value + '>' + doc.data().name + '</option>'
  })
  dropDown += '</select>'
  console.log(dropDown)
  document.getElementById('drop_down').innerHTML += dropDown
}
run_python = function () {
  let user = document.getElementById('users_name').value
  let connections = document.getElementById('num_of_connections').value
  let start_from = document.getElementById('start_from').value
  if (user == '' || connections == '' || start_from == '') {
    return
  }
  console.log('user: ' + user + 'connections : ' + connections + 'start_from : ' + start_from)
  console.log('run python from client')
  $.ajax({
    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
    url: '/updateJson/1', // the url where we want to POST
    contentType: 'application/json',
    data: JSON.stringify({
      user: user,
      connections: connections,
      start_from: start_from,
    }),
    processData: false,
    encode: true,
    success: function () {
      // console.log("success");
      callPython2()
      alert('Before making more action, please wait until this action end.')
      //window.location.href = "/runPy";
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
      window.location.href = '/mainPage'
    },
  })
  // alert('1')

  // alert('nir')
}
callPython2 = function () {
  console.log('callpython2')
  $.ajax({
    type: 'get', // define the type of HTTP verb we want to use (POST for our form)
    url: '/addCon/' + document.getElementById('users_name').value, // the url where we want to POST
    success: function () {
      console.log('addCon is called from client')
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
    },
  })

  // alert('nir')
}
