firebase.initializeApp({
  apiKey: 'AIzaSyCxzOG5wE6-A9PTPlQUSJEGHoz1Acbetm8',
  authDomain: 'socialnetworksbots.firebaseapp.com',
  projectId: 'socialnetworksbots',
})
var db = firebase.firestore()

toManage = function (value) {
  try {
    $.ajax({
      type: 'get',
      url: '/manage_data/' + document.getElementById('users_name').value + '/' + value,
    })
    alert('The operation was successful. Please wait a minute')
  } catch (err) {
    console.log(err)
  }
  window.location.href = '/mainPage.html'
}

async function loadDetails() {
  let dropDown = '<select id = "users_name" style="width: 48%; background: black;" required>'
  const citiesRef = db.collection('users')
  const snapshot = await citiesRef.get()
  await snapshot.forEach((doc) => {
    dropDown += '<option value = ' + doc.data().value + '>' + doc.data().name + '</option>'
  })
  dropDown += '</select>'
  document.getElementById('drop_down').innerHTML += dropDown
}
