import express from 'express'
import ollama from 'ollama'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 3000
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/ask', async (req, res) => {
  const userPrompt = req.body.prompt;

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
