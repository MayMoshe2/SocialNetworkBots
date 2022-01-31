const { log } = require('console')
const fs = require('fs')
const { spawn } = require('child_process')
const { required } = require('nodemon/lib/config')
// const collection = db.collection('users')

{
  /* <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script> */
}

// variables
const dataPath = './data/detailsFromUser.json'

// var db = firebase.firestore()

// firebase.initializeApp({
//   apiKey: 'AIzaSyCxzOG5wE6-A9PTPlQUSJEGHoz1Acbetm8',
//   authDomain: 'socialnetworksbots.firebaseapp.com',
//   projectId: 'socialnetworksbots',
//   // storageBucket: 'socialnetworksbots.appspot.com',
//   // messagingSenderId: '180389196591',
//   // appId: '1:180389196591:web:a00c8fc35f5c496e55e7da',
//   // measurementId: 'G-XN1SBKC3B4',
// })

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      console.log(err)
    }
    if (!data) data = '{}'
    callback(returnJson ? JSON.parse(data) : data)
  })
}

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      console.log(err)
    }
    callback()
  })
}

const firstPython = (req, res) => {
  try {
    var dataToSend
    const python = spawn('python', ['temp.py'])
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...')
      dataToSend = data.toString()
    })
    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`)
      // send data to browser
      res.send(dataToSend)
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const addCon = (req, res) => {
  try {
    var dataToSend
    const python = spawn('python', ['addConnections.py'])
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('add Connections from backend ...')
      dataToSend = data.toString()
    })
    python.on('close', (code) => {
      console.log(`'add Connections child process close all stdio with code ${code}`)
      // send data to browser
      res.send(dataToSend)
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const updateJson = function (req, res) {
  try {
    readFile((data) => {
      const userId = req.params['id']
      if (data[userId]) {
        delete data[userId]
      }
      data[userId] = req.body
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send('user Updated')
      })
    }, true)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const addEmployee = (req, res) => {
  //let name = req.data.name
  console.log('addEmploeefrom backend')
  console.log(req.query.name)
  console.log(req.query.username)
  console.log(req.query.password)

  firstName = req.query.name
  linkdinName = req.query.username
  passlink = req.query.password

  // db.collection('users')
  //   .add({
  //     firstName: nameUser,
  //     username: linkdinName,
  //     password: passlink,
  //   })
  //   .then((docRef) => {
  //     console.log('Document written with ID: ', docRef.id)
  //     console.log(firstName + ' ' + username + ' ' + password)
  //   })
  //   .catch((error) => {
  //     console.error('Error adding document: ', error)
  //   })
}

// const updateJsonConnection = function (req, res) {
//   try {
//     readFile((data) => {
//       const userId = req.params['id']
//       if (data[userId]) {
//         delete data[userId]
//       }
//       data[userId] = req.body
//       writeFile(JSON.stringify(data, null, 2), () => {
//         res.status(200).send('user Updated')
//       })
//     }, true)
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// }

module.exports = {
  updateJson,
  firstPython,
  writeFile,
  readFile,
  addCon,
  addEmployee,
}
