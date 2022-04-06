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
  let user = document.getElementById('users_name').value
  let box1 = document.getElementById('option1').checked
  let box3 = document.getElementById('option3').checked
  let filterLink = document.getElementById('Add_link_Id').value
  let link = document.getElementById('event_link').value
  let message = document.getElementById('message').value
  let pages = document.getElementById('num_of_page').value
  let box

  if (box1 == true) {
    box = '1'
  } else {
    box = 3
  }

  console.log('user ' + user)
  console.log('box ' + box)
  console.log('filterLink ' + filterLink)
  console.log('link ' + link)
  console.log('message ' + message)
  console.log('pages ' + pages)
  $.ajax({
    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
    url: '/updateJson/0', // the url where we want to POST
    contentType: 'application/json',
    data: JSON.stringify({
      user: user,
      box: box,
      filterLink: filterLink,
      link: link,
      message: message,
      pages: pages,
    }),
    processData: false,
    encode: true,
    success: function () {
      // console.log("success");
      callPython()
      alert('Before making more action, please wait until this action end.')
      window.location.href = 'mainPage.html'
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
      window.location.href = 'mainPage.html'
    },
  })
  window.location.href = 'mainPage.html' // alert('stop')
}

callPython = function () {
  console.log('call python first line')
  $.ajax({
    type: 'get', // define the type of HTTP verb we want to use (POST for our form)
    url: '/firstPython', // the url where we want to POST
    success: function () {
      console.log('firstPython is called from client')
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
    },
  })
}
