const userInput = document.getElementById("userInput")
const sendButton = document.getElementById("sendButton")
const chatBox = document.getElementById("chatBox")

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value


    if (!userMessage) return
    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`

    try{
        const res = await fetch('/ask', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ prompt: userMessage }) 
        })

        const data = await res.json()

        chatBox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`
        console.log(data.reply)

        userInput.value = ''
    } catch (error) {
        console.error('Error communicating with the model:', error)
        chatBox.innerHTML += `<p><strong>Error:</strong> Could not get a response from the model.</p>`
    }
})