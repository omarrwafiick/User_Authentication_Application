const { MailtrapClient } = require("mailtrap"); 
require('../../node_modules/dotenv').config();

const client = new MailtrapClient({
  endPoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN
});

const sender = {
  email:  process.env.MAILTRAP_SENDER,
  name: "mailing",
}; 

module.exports = {sender, client} ;