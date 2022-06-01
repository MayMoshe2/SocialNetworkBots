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
const { elementIsDisabled } = require('selenium-webdriver/lib/until')
const { Window } = require('selenium-webdriver/lib/webdriver')
const admin = require('firebase-admin')
const serviceAccount = require('../socialnetworksbots-firebase-adminsdk-ckg7j-0ed2aef80b.json')
const setDoc = require('firebase/firestore')
var nodemailer = require('nodemailer')
//var Vue = require('vue');
//var VueScrollTo = require('vue-scrollto');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()
const citiesRef = db.collection('users')

var tabToOpen
var tab

async function sendLinkdInMessag(req, res) {
  const userId = req.query.user
  const box = req.query.box
  try {
    //const snapshot =
    citiesRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (userId == doc.data().value) {
          const email = doc.data().username
          const pass = doc.data().password
          arrayInData = doc.data().msg_repo
        }
      })
    })
  } catch (err) {
    console.log(err)
    return
  }
  const link = req.query.link
  let message = req.query.message
  message = message + link
  const people = req.query.people
  const listPeople = []
  // const people = 10 /// from fireBase
  if (people == 0) {
    console.log('There are no people!')
    return
  }

  const filterLink = 'https://www.linkedin.com/search/results/people/?keywords=david&network=%5B%22F%22%5D&origin=GLOBAL_SEARCH_HEADER&sid=IcY'
  // const filterLink = req.query.filterLink

  if (box == 3 || (box == 1 && !req.query.filterLink)) {
    filterLink =
      'https://www.linkedin.com/search/results/people/?currentCompany=%5B%2227159493%22%5D&keywords=eagle%20point%20funding&origin=FACETED_SEARCH&position=1&searchId=542c02cc-6545-4615-b73f-7b19a91dece5&sid=lhE'
  }

  let numOfPages = Math.ceil(people / 10)
  tab = new webdriver.Builder().forBrowser('chrome').build()
  let email = 'nirmaman631@gmail.com'
  let pass = 'nir123456'
  tabToOpen = tab.get('https://www.linkedin.com/checkpoint/lg/sign-in-another-account')
  tabToOpen
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      })
      return findTimeOutP
    })
    .then(function () {
      let promiseUsernameBox = tab.findElement(By.xpath('//*[@id="username"]'))
      return promiseUsernameBox
    })
    .then(function (usernameBox) {
      let promiseFillUsername = usernameBox.sendKeys(email)
      return promiseFillUsername
    })
    .then(function () {
      console.log('Username entered successfully in' + "'login demonstration' for GEEKSFORGEEKS")
      let promisePasswordBox = tab.findElement(By.xpath('//*[@id="password"]'))
      return promisePasswordBox
    })
    .then(function (passwordBox) {
      let promiseFillPassword = passwordBox.sendKeys(pass)
      return promiseFillPassword
    })
    .then(function () {
      console.log('Password entered successfully in' + " 'login demonstration' for LinkedIn")
      let promiseSignInBtn = tab.findElement(By.xpath('//*[@id="organic-div"]/form/div[3]/button'))
      return promiseSignInBtn
    })
    .then(function (signInBtn) {
      let promiseClickSignIn = signInBtn.click()
      return promiseClickSignIn
    })
    .then(function () {
      console.log('Successfully signed in LinkedIn!')
    })
    .then(function () {
      tab
        .get(filterLink)
        .then(function () {
          let findTimeOutP = tab.manage().setTimeouts({
            implicit: 10000, // 10 seconds
          })
          console.log('wait11')
          Vue.use(VueScrollTo)
          return
          return findTimeOutP
        })
        .then(async function () {
          console.log('url: ', urlLink)
          let xpathNext = tab.findElement(By.xpath('//div/div/div[2]/div/button[2]')).then(function () {
            if (xpathNext) {
              xpathNext.click()
            } else {
              console.log('There is no more pages!!')
              console.log('End of action for the BOT :)')
              tab.close()
              return
            }
            return
          })
        })
        .then(async function () {
          for (let i = 1; i <= numOfPages; i++) {
            console.log('1')
            for (let j = 1; j <= 10; j++) {
              let change = j
              let messageButtonXpath = '//main/div/div/div[1]/ul/li[' + change + ']/div/div/div[3]/div/div/button/span'
              console.log('1.', j)
              let messageButton = await tab.findElement(By.xpath(messageButtonXpath)).then(async (found) => {
                console.log('found person')
                let nameXpath = '//div/div[1]/ul/li[' + change + ']/div/div/div[2]/div[1]/div[1]/div/span[1]/span/a/span/span[1]'
                var textPromise = tab.findElement(By.xpath(nameXpath)).getText()
                await textPromise.then((text) => {
                  console.log('name', text)
                  listPeople.push(text)
                })
                console.log(listPeople)
                await tab
                  .findElement(By.xpath(messageButtonXpath))
                  .click()
                  .then(async function () {
                    console.log('2.', j)
                    let messageBox = await tab.findElement(By.css('.msg-form__contenteditable'))
                    return messageBox
                  })
                  .then(async function (messageBox) {
                    console.log('2.', j)
                    let promiseFillMessage = await messageBox.sendKeys(message)
                    console.log('here4')
                    return promiseFillMessage
                  })
                  .then(async function () {
                    console.log('3.', j)
                    try {
                      let sendbutton = await tab.findElement(By.xpath("//button[contains(@class, 'send-button')]"))
                      await sleep(1000)
                      await sendbutton.click()
                      await sleep(1000)
                      console.log('after send ', j)
                    } catch {
                      console.log('cant send the message')
                    }
                  })
                  .then(
                    async function () {
                      let findTimeOutP = await tab.manage().setTimeouts({
                        implicit: 10000, // 10 seconds
                      })
                      console.log(listPeople)
                      await tab
                        .findElement(By.xpath(messageButtonXpath))
                        .click()
                        .then(async function () {
                          console.log('2.', j)
                          let messageBox = await tab.findElement(By.css('.msg-form__contenteditable'))
                          return messageBox
                        })
                        .then(async function (messageBox) {
                          console.log('2.', j)
                          let promiseFillMessage = await messageBox.sendKeys(message)
                          console.log('here4')
                          return promiseFillMessage
                        })
                        .then(async function () {
                          console.log('3.', j)
                          try {
                            let sendbutton = await tab.findElement(By.xpath("//button[contains(@class, 'send-button')]"))
                            await sleep(1000)
                            await sendbutton.click()
                            await sleep(1000)
                            console.log('after send ', j)
                          } catch {
                            console.log('cant send the message')
                          }
                        })
                        .then(async function () {
                          let findTimeOutP = await tab.manage().setTimeouts({
                            implicit: 10000, // 10 seconds
                          })
                          console.log('wait2')
                          return findTimeOutP
                        })
                        .then(async function () {
                          try {
                            let closeMessagexpath = await tab.findElement(By.xpath("//button[contains(.,'Close y')]"))
                            await closeMessagexpath.click()
                            if (tab.findElement(By.xpath("//h2[contains(.,'Discard')]"))) {
                              tab.findElement(By.xpath('//div/div/div[3]/button[2]')).click()
                            }
                            console.log('success')
                          } catch (err) {
                            console.log(err)
                          }
                        })
                    },
                    (error) => {
                      console.log('There are no more people to send messages to.')
                      return
                    }
                  )
              })
              let xpathNext = tab.findElement(By.xpath('//div/div/div[2]/div/button[2]')).then(function () {
                if (xpathNext) {
                  xpathNext.click()
                } else {
                  console.log('There is no more pages!!')
                  console.log('End of action for the BOT :)')
                  tab.close()
                  return
                }
              })
            }
          }
        })
        .then(async function () {
          try {
            //לקחתי את השורות הבאות :
            //const citiesRef = db.collection('users')
            //const snapshot = await citiesRef.get()
            //והעברתי אותם ללמעלה כדי שיהיו גלובאליות. אם יש בעיה אז להחזיר לפה.
            if (arrayInData.length + listPeople.length <= 100) {
              const snapshot = await citiesRef.get()
              snapshot.forEach((doc) => {
                if (userId == doc.data().value) {
                  const update = doc.ref.update({ msg_repo: listPeople })
                }
              })
            }
          } catch (err) {
            console.log('Error ', err, ' occurred!')
            console.log('There is no more pages!!')
            console.log('End of action for the BOT :)')
            tab.close()
            return
          }
        })
    })
    .catch(function (err) {
      console.log('Error ', err, ' occurred!')
    })
}

async function withrowPy(req, res) {
  const userId = req.params['value']
  try {
    const snapshot = await citiesRef.get()

    snapshot.forEach((doc) => {
      if (userId == doc.data().value) {
        const email = doc.data().username
        const pass = doc.data().password
        arrayInData = doc.data().withdrow_repo
      }
    })
  } catch (err) {
    console.log(err)
    return
  }

  tab = new webdriver.Builder().forBrowser('chrome').build()
  let email = 'nirmaman631@gmail.com' //'maymoshe222@gmail.com'
  let pass = 'nir123456' //'Ma208832873'
  const listPeople = []

  filterLink = 'https://www.linkedin.com/mynetwork/invitation-manager/sent/'
  tabToOpen = tab.get('https://www.linkedin.com/checkpoint/lg/sign-in-another-account')

  tabToOpen
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      })
      return findTimeOutP
    })
    .then(function () {
      let promiseUsernameBox = tab.findElement(By.xpath('//*[@id="username"]'))
      return promiseUsernameBox
    })
    .then(function (usernameBox) {
      let promiseFillUsername = usernameBox.sendKeys(email)
      return promiseFillUsername
    })
    .then(function () {
      console.log('Username entered successfully in' + "'login demonstration' for GEEKSFORGEEKS")
      let promisePasswordBox = tab.findElement(By.xpath('//*[@id="password"]'))
      return promisePasswordBox
    })
    .then(function (passwordBox) {
      let promiseFillPassword = passwordBox.sendKeys(pass)
      return promiseFillPassword
    })
    .then(function () {
      console.log('Password entered successfully in' + " 'login demonstration' for LinkedIn")
      let promiseSignInBtn = tab.findElement(By.xpath('//*[@id="organic-div"]/form/div[3]/button'))
      return promiseSignInBtn
    })
    .then(function (signInBtn) {
      let promiseClickSignIn = signInBtn.click()
      return promiseClickSignIn
    })
    .then(function () {
      console.log('Successfully signed in LinkedIn!')
    })

    .then(function () {
      tab
        .get(filterLink)
        .then(function () {
          let findTimeOutP = tab.manage().setTimeouts({
            implicit: 10000, // 10 seconds
          })
          console.log('wait11')
          return findTimeOutP
        })
        .then(async function () {
          let numOfPeople = await tab.findElement(By.xpath('//section/div[2]/div[1]/button[1]/span')).getText()
          let result = numOfPeople.slice(8)
          result = result.slice(0, -1)
          console.log('result ', result)
          result = Number(result)
          console.log('result ', result)
          return result
        })
        .then(async function (result) {
          console.log('im here', result)
          for (let j = 1; j <= result; j++) {
            let change = j
            let connectionButtonXpath = '//section/div[2]/ul/li[' + change + ']/div/div[2]/button'
            console.log('1.', j)
            let connectionButton = await tab.findElement(By.xpath(connectionButtonXpath)).then(
              async (found) => {
                console.log('found person')
                let nameXpath = '//section/div[2]/ul/li[' + change + ']/div/div[1]/div/a/span[2]'
                var textPromise = tab.findElement(By.xpath(nameXpath)).getText()
                await textPromise.then((text) => {
                  console.log('name', text)
                  listPeople.push(text)
                })
                console.log(listPeople)
                await tab
                  .findElement(By.xpath(connectionButtonXpath))
                  .click()
                  .then(async function () {
                    let findTimeOutP = await tab.manage().setTimeouts({
                      implicit: 10000, // 10 seconds
                    })
                    console.log('wait2')
                    return findTimeOutP
                  })
                  .then(async function () {
                    console.log('3.', j)
                    try {
                      let withdrawButton = await tab.findElement(By.xpath('/html/body/div[3]/div/div/div[3]/button[2]'))
                      await sleep(1000)
                      await withdrawButton.click()
                      await sleep(1000)
                      console.log('after withdraw ', j)
                      let successWithdrawXpath = '/html/body/div[1]/section/div/div/button'
                      let successWithdraw = await tab.findElement(By.xpath(successWithdrawXpath)).then(async (found) => {
                        await tab
                          .findElement(By.xpath(successWithdrawXpath))
                          .click()
                          .then(async function () {
                            let findTimeOutP = await tab.manage().setTimeouts({
                              implicit: 10000, // 10 seconds
                            })
                            console.log('wait4')
                            return findTimeOutP
                          })
                      })
                    } catch {
                      console.log('cant withdraw the message')
                    }
                  })
              },
              (error) => {
                console.log('There are no more people to withdraw.')
                return
              }
            )
          }
        })
        .then(async function () {
          try {
            //לקחתי את השורות הבאות :
            //const citiesRef = db.collection('users')
            //const snapshot = await citiesRef.get()
            //והעברתי אותם ללמעלה כדי שיהיו גלובאליות. אם יש בעיה אז להחזיר לפה.
            if (arrayInData.length + listPeople.length <= 100) {
              const snapshot = await citiesRef.get()
              snapshot.forEach((doc) => {
                if (userId == doc.data().value) {
                  const update = doc.ref.update({ withdrow_repo: listPeople })
                }
              })
            }
          } catch (err) {
            console.log('Error ', err, ' occurred!')
            console.log('There is no more pages!!')
            console.log('End of action for the BOT :)')
            tab.close()
            return
          }
        })
    })
    .catch(function (err) {
      console.log('Error ', err, ' occurred!')
    })
}

//פונקציה שנועדה עבור נסיונות
async function tryMe(req, res) {
  const snapshot = await citiesRef.get()
  snapshot.forEach((doc) => {
    if (userId == doc.data().value) {
      const numOfWithdrow = doc.ref.withdrow_repo
    }
  })
  console.log(numOfWithdrow.length)
}

async function addCon(req, res) {
  const userId = req.query.user
  try {
    const snapshot = await citiesRef.get()
    snapshot.forEach((doc) => {
      if (userId == doc.data().value) {
        const email = doc.data().username
        const pass = doc.data().password
        arrayInData = doc.data().con_repo
      }
    })
  } catch (err) {
    console.log(err)
    return
  }
  const connections = req.query.connections
  const start_from = req.query.start_from
  const filterLink = 'https://www.linkedin.com/mynetwork/import-contacts/results/member/'
  const listPeople = []
  tab = new webdriver.Builder().forBrowser('chrome').build()
  let email = 'maymoshe222@gmail.com'
  let pass = 'Ma208832873'
  let numOfPages = Math.ceil(connections / 10)
  tabToOpen = tab.get('https://www.linkedin.com/checkpoint/lg/sign-in-another-account')
  tabToOpen
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      })
      return findTimeOutP
    })
    .then(function () {
      let promiseUsernameBox = tab.findElement(By.xpath('//*[@id="username"]'))
      return promiseUsernameBox
    })
    .then(function (usernameBox) {
      let promiseFillUsername = usernameBox.sendKeys(email)
      return promiseFillUsername
    })
    .then(function () {
      console.log('Username entered successfully in' + "'login demonstration' for GEEKSFORGEEKS")
      let promisePasswordBox = tab.findElement(By.xpath('//*[@id="password"]'))
      return promisePasswordBox
    })
    .then(function (passwordBox) {
      let promiseFillPassword = passwordBox.sendKeys(pass)
      return promiseFillPassword
    })
    .then(function () {
      console.log('Password entered successfully in' + " 'login demonstration' for LinkedIn")
      let promiseSignInBtn = tab.findElement(By.xpath('//*[@id="organic-div"]/form/div[3]/button'))
      return promiseSignInBtn
    })
    .then(function (signInBtn) {
      let promiseClickSignIn = signInBtn.click()
      return promiseClickSignIn
    })
    .then(function () {
      console.log('Successfully signed in LinkedIn!')
    })
    .then(function () {
      tab
        .get(filterLink)
        .then(function () {
          let findTimeOutP = tab.manage().setTimeouts({
            implicit: 10000, // 10 seconds
          })
          console.log('wait11')
          return findTimeOutP
        })
        .then(async function () {
          for (let i = 1; i <= numOfPages; i++) {
            console.log('1')
            for (let j = start_from; j <= 10; j++) {
              let change = j
              let connectionButtonXpath = "//*[@id='main']/div/div/div[2]/div/div[1]/ul/li[" + change + ']/div/*/*/*/label'
              console.log('1.', j)
              let connectionButton = await tab.findElement(By.xpath(connectionButtonXpath)).then(
                async (found) => {
                  console.log('found person')
                  // let nameXpath = "//div/div[1]/ul/li[" + change + "]/div/div/div[2]/div[1]/div[1]/div/span[1]/span/a/span/span[1]"
                  let nameXpath = '//ul/li[' + change + ']//*/h4'
                  var textPromise = tab.findElement(By.xpath(nameXpath)).getText()
                  await textPromise.then((text) => {
                    console.log('name', text)
                    listPeople.push(text)
                  })
                  console.log(listPeople)
                  await tab
                    .findElement(By.xpath(connectionButtonXpath))
                    .click()
                    .then(async function () {
                      let findTimeOutP = await tab.manage().setTimeouts({
                        implicit: 10000, // 10 seconds
                      })
                      console.log('wait2')
                      return findTimeOutP
                    })
                    .then(async function () {
                      console.log('3.', j)
                      try {
                        let addButton = await tab.findElement(By.xpath("//*[contains(span, 'Add')]"))
                        await sleep(1000)
                        await addButton.click()
                        await sleep(1000)
                        console.log('after adding ', j)
                      } catch {
                        console.log('cant add the message')
                      }
                    })
                },
                (error) => {
                  console.log('There are no more people to connect.')
                  return
                }
              )
            }
            // let xpathNext = tab.findElement(By.xpath('//div/div/div[2]/div/button[2]')).then(function () {
            //   if (xpathNext) {
            //     xpathNext.click()
            //   } else {
            //     console.log('There is no more pages!!')
            //     console.log('End of action for the BOT :)')
            //     tab.close()
            //     return
            //   }
            // })
          }
        })
        .then(async function () {
          try {
            //לקחתי את השורות הבאות :
            //const citiesRef = db.collection('users')
            //const snapshot = await citiesRef.get()
            //והעברתי אותם ללמעלה כדי שיהיו גלובאליות. אם יש בעיה אז להחזיר לפה.
            if (arrayInData.length + listPeople.length <= 100) {
              const snapshot = await citiesRef.get()
              snapshot.forEach((doc) => {
                if (userId == doc.data().value) {
                  const update = doc.data().update({ con_repo: listPeople })
                }
              })
            }
          } catch (err) {
            console.log('Error ', err, ' occurred!')
            console.log('There is no more pages!!')
            console.log('End of action for the BOT :)')
            tab.close()
            return
          }
        })
    })
    .catch(function (err) {
      console.log('Error ', err, ' occurred!')
    })
}

async function help_to_send_mail(send_to, text, headLine) {
  try {
    if (!headLine) {
      headLine = 'DoNotReplay'
    }
    let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'EaglePointBot@gmail.com', // generated ethereal user
        pass: 'jairmhxsvtqqhvcx', // generated ethereal password
      },
    })

    let info = await transporter.sendMail({
      from: 'EaglePointBot@gmail.com', // sender address
      to: send_to, // list of receivers
      subject: headLine, // Subject line
      text: text, // plain text body
    })

    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (err) {
    console.log(err)
  }
}

async function manage_data(req, res) {
  //Message: 0 -  Extract 1 - Delete
  //connection: 2 - Extract 3 - Delete
  //Withdraw 4 - Extract 5 Delete
  try {
    let send_mail_with_data = ''
    let get_from_FB
    let sendTo = ''
    const user = req.params['value']
    const option = req.params['option']
    const snapshot = await citiesRef.get()
    if (option == 0) {
      send_mail_with_data = 'Hi! \n Here is the list of the poeple you sent message to: \n'
      snapshot.forEach((doc) => {
        if (user == doc.data().value) {
          // get all the msg_repo from the firebase
          get_from_FB = doc.data().msg_repo
          sendTo += doc.data().username
        }
      })
      send_mail_with_data += get_from_FB
      send_mail_with_data += '\n Have a great day :)'
      help_to_send_mail(sendTo, send_mail_with_data)
    } else if (option == 1) {
      try {
        const snapshot = await citiesRef.get()
        snapshot.forEach((doc) => {
          if (user == doc.data().value) {
            const update = doc.ref.update({ msg_repo: [] })
          }
        })
        console.log('msg_repo deleted')
      } catch (err) {
        console.log(err)
        return
      }
    } else if (option == 2) {
      send_mail_with_data = 'Hi! \n Here is the list of the poeple you connected with: \n'
      snapshot.forEach((doc) => {
        if (user == doc.data().value) {
          // get all the msg_repo from the firebase
          get_from_FB = doc.data().con_repo
          sendTo += doc.data().username
        }
      })
      send_mail_with_data += get_from_FB
      send_mail_with_data += '\n Have a great day :)'
      help_to_send_mail(sendTo, send_mail_with_data)
    } else if (option == 3) {
      try {
        const snapshot = await citiesRef.get()
        snapshot.forEach((doc) => {
          if (user == doc.data().value) {
            const update = doc.ref.update({ con_repo: [] })
          }
        })
        console.log('con_repo deleted')
      } catch (err) {
        console.log(err)
        return
      }
    } else if (option == 4) {
      send_mail_with_data = 'Hi! \n Here is the list of the poeple you withdrow: \n'
      snapshot.forEach((doc) => {
        if (user == doc.data().value) {
          get_from_FB = doc.data().withdrow_repo
          sendTo += doc.data().username
        }
      })
      send_mail_with_data += get_from_FB
      send_mail_with_data += '\n Have a great day :)'
      help_to_send_mail(sendTo, send_mail_with_data)
    } else if (option == 5) {
      try {
        const snapshot = await citiesRef.get()
        snapshot.forEach((doc) => {
          if (user == doc.data().value) {
            const update = doc.ref.update({ withdrow_repo: [] })
          }
        })
        console.log('withdrow_repo deleted')
      } catch (err) {
        console.log(err)
        return
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

async function sendEmailsUrl(req, res) {
  try {
    const headLine = req.params['headLine']
    const mess = req.params['mess']
    let sendTo = []
    const snapshot = await citiesRef.get()
    snapshot.forEach((doc) => {
      sendTo.push(doc.data().username)
    })
    help_to_send_mail(sendTo, mess, headLine)
    console.log(sendTo)
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
    setTimeout(resolve, ms)
  })
}
