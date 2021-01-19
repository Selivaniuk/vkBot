const VkBot = require('./src/vkBot')
const http = require('http');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer(()=>{})
server.listen(port,host,()=>{
    console.log('Server running on port 3000')
})
