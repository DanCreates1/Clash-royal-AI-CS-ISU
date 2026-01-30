//All the imports needed for the server to run
import express from 'express'
import ollama from 'ollama'
import path from 'path'
import { fileURLToPath } from 'url'

//Setting up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Creating an express app
const app = express()
//Setting the port for the server
const port = 3000
//Middleware to parse JSON bodies
app.use(express.json())

//Endpoint to handle user prompts
app.post('/ask', async (req, res) => {
  console.log('Received prompt:', req.body.prompt);
  const userPrompt = req.body.prompt;
  try{
    const response = await ollama.chat({
        model: 'phi3:mini',
        messages: [{ role: 'user', content: userPrompt }],
    })

    res.json({reply: response.message.content}) // Send back only the content of the message
    } catch (error) {                           // Error handling
        console.error('Error communicating with the model:', error)
        res.status(500).json({reply: 'Error: Could not get a response from the model.'})
    }
  })

//Serving static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')))

//Starting the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})