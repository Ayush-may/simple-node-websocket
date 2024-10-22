const webSocket = require("ws");
const express = require("express");
const app = express();
const http = require("http");

const PORT = 8000;
const server = http.createServer(express);
const wss = new webSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', data => {
    const message = JSON.parse(data);

    if (message.event === "sendMessage") {
      wss.clients.forEach(client => {
        if (client != ws && client.readyState === webSocket.OPEN) {

          const response = JSON.stringify({
            event: "recieveMessage",
            data: message.data
          })

          client.send(response);
        }
      })
    }


  })
})

server.listen(PORT, () => console.log("Server is working"));