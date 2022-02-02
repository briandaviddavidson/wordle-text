// require env file
const env = require('dotenv').config().parsed

// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require Twilio
const client = require('twilio')(env.accountSid, env.authToken);
const fs = require('fs');

// Bring in the answers
const answers = require('./answers.json')
const current = require('./current-answer.json')
let brahz = env.brahz.split(',');


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
