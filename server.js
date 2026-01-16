import express from 'express'
import ollama from 'ollama'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000
app.use(express.json())

app.post('/ask', async (req, res) => {
    console.log('Received prompt:', req.body.prompt);
  const userPrompt = req.body.prompt;
  try{
    const response = await ollama.chat({
        model: 'llama2:latest',
        messages: [{ role: 'user', content: userPrompt }],
    })

    res.json({reply: response.message.content})
    } catch (error) {
        console.error('Error communicating with the model:', error)
        res.status(500).json({reply: 'Error: Could not get a response from the model.'})
    }
  })

  app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
