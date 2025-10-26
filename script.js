async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userMessage = input.value.trim();
    if(!userMessage) return;

    chatBox.innerHTML += `<div className="user">🧑‍💻: ${userMessage}</div>`
    input.value = "";

    const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    chatBox.innerHTML += `<div className="bot">🤖: ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}


const input = document.getElementById("user-input");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});