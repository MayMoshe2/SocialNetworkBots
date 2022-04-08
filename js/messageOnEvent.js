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
      //return
    }
    dropDown += '<option value = ' + doc.data().value + '>' + doc.data().name + '</option>'
  })
  dropDown += '</select>'
  document.getElementById('drop_down').innerHTML += dropDown
}

showT = function () {
  document.getElementById('Add_link_Id').type = ''
}
hideT = function () {
  document.getElementById('Add_link_Id').type = 'hidden'
}
writeToFile = function () {
  let user = document.getElementById('users_name').value
  let box = document.getElementById('option1').checked
  let filterLink = document.getElementById('Add_link_Id').value
  let link = document.getElementById('event_link').value
  let message = document.getElementById('message').value
  let pages = document.getElementById('num_of_page').value

  if (box == true) {
    box = '1'
  } else {
    box = 3
  }

  const json = {
    user: user,
    box: box,
    filterLink: filterLink,
    link: link,
    message: message,
    pages: pages,
  }

  $.ajax({
    method: 'get',
    url: '/sendLinkdInMessag', // the url where we want to POST
    data: json,
    success: function (data) {
      console.log(data)
    },
    error: function (xhr, desc, err) {
      console.log(xhr)
      console.log('Details0: ' + desc + '\nError:' + err)
    },
  })
}
