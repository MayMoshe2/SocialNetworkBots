const { log, assert } = require('console')
const fs = require('fs')
const { spawn } = require('child_process')
require('chromedriver')
var webdriver = require('selenium-webdriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { ThenableWebDriver } = require('selenium-webdriver')
const { Driver } = require('selenium-webdriver/chrome')
const { WebElement } = require('selenium-webdriver')
const { listeners } = require('process')
const console = require('console')
const { close } = require('inspector')
var tabToOpen
var tab

// helper methods

const login = (tab, email, pass) => {
  // tabToOpen = tab.get('https://www.linkedin.com/checkpoint/lg/sign-in-another-account')
  tabToOpen = tab.get("https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fsearch%2Fresults%2Fpeople%2F%3Fkeywords%3Dmay%2520moshe%26network%3D%255B%2522O%2522%255D%26origin%3DGLOBAL_SEARCH_HEADER%26sid%3DLt2&amp;fromSignIn=true&amp;trk=cold_join_sign_in")
  tabToOpen
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      })
      return findTimeOutP
    })
    .then(function () {
      // Step 2 - Finding the username input
      let promiseUsernameBox = tab.findElement(By.xpath('//*[@id="username"]'))
      return promiseUsernameBox
    })
    .then(function (usernameBox) {
      // Step 3 - Entering the username
      let promiseFillUsername = usernameBox.sendKeys(email)
      return promiseFillUsername
    })
    .then(function () {
      console.log('Username entered successfully in' + "'login demonstration' for GEEKSFORGEEKS")

      // Step 4 - Finding the password input
      let promisePasswordBox = tab.findElement(By.xpath('//*[@id="password"]'))
      return promisePasswordBox
    })
    .then(function (passwordBox) {
      // Step 5 - Entering the password
      let promiseFillPassword = passwordBox.sendKeys(pass)
      return promiseFillPassword
    })
    .then(function () {
      console.log('Password entered successfully in' + " 'login demonstration' for GEEKSFORGEEKS")

      // Step 6 - Finding the Sign In button
      let promiseSignInBtn = tab.findElement(By.xpath('//*[@id="organic-div"]/form/div[3]/button'))
      return promiseSignInBtn
    })
    .then(function (signInBtn) {
      // Step 7 - Clicking the Sign In button
      let promiseClickSignIn = signInBtn.click()
      return promiseClickSignIn
    })
    .then(function () {
      console.log('Successfully signed in GEEKSFORGEEKS!')
    })
    .catch(function (err) {
      console.log('Error ', err, ' occurred!')
    })
}

async function sendLinkdInMessag(req, res) {
  // const user = req.query.user
  // const box = req.query.box
  // const filterLink = req.query.filterLink
  const link = req.query.link
  //const message = req.query.message
  const message = "Hello!"
  // const pages = req.query.pages

  const people = 10 /// from fireBase
  if(people == 0){
    console.log("There are no people!");
    return;
  }
//  const filterLink  = "https://www.linkedin.com/search/results/people/?keywords=may%20moshe&network=%5B%22F%22%5D&origin=FACETED_SEARCH&position=0&searchId=c1bc2f06-baed-4b72-8561-547df677c1f4&sid=Va5"
  // const filterLink  = "https://www.linkedin.com/search/results/people/?connectionOf=%22ACoAABKD5zABxjSMSCW7ABT32D5qqC6NlqnaWp4%22&industry=%5B%224%22%5D&network=%5B%22F%22%5D&origin=FACETED_SEARCH&schoolFilter=%5B%2215106848%22%5D&sid=H9Y&title=cyber"
  const filterLink = "https://www.linkedin.com/search/results/people/?keywords=yotvat&lastName=yotvat&network=%5B%22F%22%5D&origin=GLOBAL_SEARCH_HEADER&sid=Y8T"
  let numOfPages = people/10
  tab = new webdriver.Builder().forBrowser('chrome').build()
  let email = 'nirmaman631@gmail.com'
  let pass = 'nir123456'
  // await login(tab, email, pass)
  //create csv file for tracker
  tabToOpen = tab.get("https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fsearch%2Fresults%2Fpeople%2F%3Fkeywords%3Dmay%2520moshe%26network%3D%255B%2522O%2522%255D%26origin%3DGLOBAL_SEARCH_HEADER%26sid%3DLt2&amp;fromSignIn=true&amp;trk=cold_join_sign_in")
  tabToOpen
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      })
      return findTimeOutP
    })
    .then(function () {
      // Step 2 - Finding the username input
      let promiseUsernameBox = tab.findElement(By.xpath('//*[@id="username"]'))
      return promiseUsernameBox
    })
    .then(function (usernameBox) {
      // Step 3 - Entering the username
      let promiseFillUsername = usernameBox.sendKeys(email)
      return promiseFillUsername
    })
    .then(function () {
      console.log('Username entered successfully in' + "'login demonstration' for GEEKSFORGEEKS")

      // Step 4 - Finding the password input
      let promisePasswordBox = tab.findElement(By.xpath('//*[@id="password"]'))
      return promisePasswordBox
    })
    .then(function (passwordBox) {
      // Step 5 - Entering the password
      let promiseFillPassword = passwordBox.sendKeys(pass)
      return promiseFillPassword
    })
    .then(function () {
      console.log('Password entered successfully in' + " 'login demonstration' for GEEKSFORGEEKS")

      // Step 6 - Finding the Sign In button
      let promiseSignInBtn = tab.findElement(By.xpath('//*[@id="organic-div"]/form/div[3]/button'))
      return promiseSignInBtn
    })
    .then(function (signInBtn) {
      // Step 7 - Clicking the Sign In button
      let promiseClickSignIn = signInBtn.click()
      return promiseClickSignIn
    })
    .then(function () {
      console.log('Successfully signed in GEEKSFORGEEKS!')
    })
  .then(function () {
    // tabToOpen = tab.get(filterLink)
    tab.get(filterLink). 
    then(function(){
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      })
      console.log("wait11");
      return findTimeOutP
    })
    .then (async function(){
       for (let i = 1; i <= numOfPages; i++) {
        console.log("1")
          for (let j = 1; j <= 10 ; j++) {
            let change = j
            let messageButtonXpath = "//main/div/div/div[1]/ul/li[" + change + "]/div/div/div[3]/div/div/button/span"
            console.log("1.", j);
            let messageButton = await tab.findElement(By.xpath(messageButtonXpath)).then(async found => {
              console.log("found person")
              // let nameXpath = "//ul/li[" + change + "]/div/div/div[2]/div[1]/div[1]/div/span[1]/span/a/span/span[1]"
              // let namePerson = tab.findElement(By.xpath(nameXpath))
              // console.log(namePerson);
              await tab.findElement(By.xpath(messageButtonXpath)).click().then(
                async function(){
                  console.log("2.",j);
                  let messageBox = await tab.findElement(By.css('.msg-form__contenteditable'))
                  return messageBox
                }
                ).then(async function(messageBox){
                  console.log("2.",j);
                  let promiseFillMessage = await messageBox.sendKeys(message)
                  console.log("here4");
                  return promiseFillMessage
                }
                ).then(async function(){
                  console.log("3.",j);
                  try{
                    let sendbutton = await tab.findElement(By.xpath("//button[contains(@class, 'send-button')]"))
                    await sleep(1000)
                    await sendbutton.click()
                    await sleep(1000)
                    console.log("after send ", j);
                  }
                  catch{
                    console.log("cant send the message");
                  }
                }).then(async function(){
                  let findTimeOutP = await tab.manage().setTimeouts({
                    implicit: 10000, // 10 seconds
                  })
                  console.log("wait2");
                  return findTimeOutP
                }).then(async function() {
                  try{
                    let closeMessagexpath = await tab.findElement(By.xpath("//button[contains(.,'Close y')]"))
                    await closeMessagexpath.click()
                    if(tab.findElement(By.xpath("//h2[contains(.,'Discard')]")))
                    {
                      tab.findElement(By.xpath("//div/div/div[3]/button[2]")).click()
                    }
                    console.log("success");
                  }
                  catch(err){
                    console.log(err);
                  }
                })
            }, error => {
              console.log("There are no more people to send messages to.");
              return ;
            })
          }
        }
     })
  })
  .catch(function (err) {
    console.log('Error ', err, ' occurred!')
  })
}

const withrowPy = (req, res) => {
  try {
    //console.log(req)
    const userId = req.params['value']
    console.log(userId)

    // print(userId)
    const python = spawn('python', ['BOT/withdrawConnections.py', userId])
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...')
    })
    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`)
      // send data to browser
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

async function addCon(req, res) {
  // try {
    const user = req.query.user
    const connections = req.query.connections
    const start_from = req.query.start_from
    const filterLink  = "https://www.linkedin.com/mynetwork/import-contacts/results/member/"

    tab = new webdriver.Builder().forBrowser('chrome').build()
    let email = 'nirmaman631@gmail.com'
    let pass = 'nir123456'
    await login(tab, email, pass)
    //create csv file for tracker
    console.log("2")
    tabToOpen = tab.get(filterLink)
    if(tab.findElement(By.xpath("//*[@id='main']//*/h2"))){
        console.log("There are no more connections to add!")
       tab.close()
       return
      }
    tabToOpen
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      })
      return findTimeOutP
    }).then(function () {
      let numPeopleInPage = tab.findElement(By.xpath("//*[@id='main']/div/div/div[2]/div/div[1]/ul/li"))
      console.log("Found " + numPeopleInPage.toString() +" users on this page")
      if (numPeopleInPage== 0){
        console.log("No more users on this page. My work here is done")
      }
      if(numPeopleInPage < start_from || numPeopleInPage < connections){
        if(numPeopleInPage < start_from){
          console.log("There arent enough connections! Please choose a different number to start from.")
        }
        else{
          connections = numPeopleInPage
        }
      }
      let howManyPeople = connections+start_from
      for(let i = start_from ; i < howManyPeople ; i++){
        let fullName = "//ul/li[z]//*/h4"
        fullName.replace("z", i.toString())
        tab.findElement(By.xpath(fullName))
        //add fulle name to tracker
        let xpathOfCon = "//*[@id='main']/div/div/div[2]/div/div[1]/ul/li[change]/div/*/*/*/label"
        xpathOfCon.replace("change", i.toString())
        tab.findElement(By.xpath(xpathOfCon)).click()
      }
      tab.findElement(By.xpath("//*[contains(span, 'Add')]")).click()
    })
  
//     const python = spawn('python', ['BOT/addConnections.py', user, connections, start_from])
//     // collect data from script
//     python.stdout.on('data', function (data) {
//       console.log('addCon from backend ...')
//       dataToSend = data.toString()
//     })
//     python.on('close', (code) => {
//       console.log(`'add Connections child process close all stdio with code ${code}`)
//       res.send(dataToSend)
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
}

const manage_data = (req, res) => {
  try {
    var dataToSend
    const value = req.params['value']
    const option = req.params['option']

    console.log(value)
    console.log(option)

    const python = spawn('python', ['BOT/exportReports.py', value, option])
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('manage_data from backend ...')
      dataToSend = data.toString()
    })
    python.on('close', (code) => {
      console.log(`'manage data child process close all stdio with code ${code}`)
      // send data to browser
      res.send(dataToSend)
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

const sendEmailsUrl = (req, res) => {
  try {
    var dataToSend
    const headLine = req.params['headLine']
    const mess = req.params['mess']

    const python = spawn('python', ['BOT/sendEmails.py', headLine, mess])
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('sendEmails from backend ...')
      console.log(headLine)
      console.log(mess)
      dataToSend = data.toString()
    })
    python.on('close', (code) => {
      console.log(`'sendEmails data child process close all stdio with code ${code}`)
      // send data to browser
      res.send(dataToSend + 'TEST')
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
}

module.exports = {
  updateJson,
  sendLinkdInMessag,
  addCon,
  addEmployee,
  withrowPy,
  manage_data,
  sendEmailsUrl,
}






function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}