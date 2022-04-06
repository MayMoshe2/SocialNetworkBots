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

function runPyScript(input) {
  $.ajax({
      type: "GET",
      url: "/BOT/sendMessages.py",
      success: console.log("success")
  });
}



writeToFile = function () {
  console.log('test1')
  response= runPyScript('data to process');
  // console.log(response);
  alert("hi")
  // let chrome = require('selenium-webdriver/chrome');
  // let {Builder} = require('selenium-webdriver');
  // window.open('https://www.linkedin.com/checkpoint/rm/sign-in-another-account');
  // let driver = window.open('https://www.linkedin.com/checkpoint/rm/sign-in-another-account', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=2000,left=2000,width=1000,height=1000') 
  // var chromeOptions = new chrome.Options();
  // chromeOptions.addArguments('no-sandbox');
  // // email_element = window.evaluate("//*[@id='username']", window, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // // console.log('test2')
  // $x("//*[@id='username']").click()
  // password_element = window.evaluate("//*[@id='password']", window, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // // window.evaluate("//*[@id='username']", window, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.clik;
  // WebElement element = driver.findElement(By.id("id_of_element"));
  // ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
  // Thread.sleep(500); 
  // var username = "May"
  // document.getElementById('username').value=username;
  // document.getElementById('password').value='MyPassword';
  // document.querySelector("#organic-div > form > div.login__form_action_container > button").click()  
  // driver = web.Chrome("https://www.linkedin.com/checkpoint/rm/sign-in-another-account").open()
  // password = driver.getElementById("password")
  // // password = driver.find_element_by_id("password")
  // // username = driver.getElementById("username")
  // // find_element_by_name("username")  
  // // username = window.find_element_by_id("username")
  
  // username.send_keys("YourUsername")
  // password.send_keys("Pa55worD")
  
  // driver.find_element_by_name("submit").click()
}
