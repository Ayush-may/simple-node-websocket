const ws = new WebSocket("ws://localhost:8000"); // Replace with your server URL
ws.onopen = () => console.log("connected");

const ul = document.getElementById('ul');
const inputField = document.getElementById("messageInput");

ws.onmessage = ({ data }) => {
  const message = JSON.parse(data)
  console.log(message);

  if (message.event === "recieveMessage") {
    const li = document.createElement("li");
    li.innerText = message.data;
    ul.appendChild(li);
  }
};

const sendMessage = () => {

  ws.send(JSON.stringify({
    event: "sendMessage",
    data: `${inputField.value}`
  }));

  const li = document.createElement("li");
  li.innerText = inputField.value;
  ul.appendChild(li);
}