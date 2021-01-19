const VkBot = require('./src/vkBot')

const express = require('express')
const app = express()

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port,host, () => {
  console.log(`listening at http://${host}:${port}`)
  VkBot.startBot()
})