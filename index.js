// require Twilio and env file
const client = require('twilio')(accountSid, authToken);
const fs = require('fs');
const env = require('dotenv').config()
// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


// Bring in the answers
const answers = require('./answers.json')
const current = require('./current-answer.json')


answers.find((answer, i) => {
  if (answer == current) {
    fs.writeFile('./current-answer.json', `["${answers[i+1]}"]`, err => {
      if (err) {
        console.error(err)
        return
      }
    })
  }
})

Promise.all(
    brahz.map(number => {
      return client.messages
        .create({
          to: number,
          from: 'MGb243af5404272f10f0d0474809718022',
          body: `WordLe of the day: ${current}`,
        })
    })
  )
  .then(messages => {
    console.log('Messages sent!');
  })
  .catch(err => console.error(err));
