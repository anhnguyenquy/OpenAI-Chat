import promptSync from 'https://cdn.skypack.dev/prompt-sync'
import { Configuration, OpenAIApi } from 'https://cdn.skypack.dev/openai'
import { config } from 'https://deno.land/x/dotenv/mod.ts'
const env = config()

const prompt = promptSync()
const configuration = new Configuration({
  apiKey: env.API_KEY,
})
const openai = new OpenAIApi(configuration)

const input = prompt('Human: ')
let conversation = `
Human: ${input}
AI: 
`

while (true) {
  const response = await openai.createCompletion(
    'text-davinci-002',
    {
      prompt: conversation,
      temperature: 1.0,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['Human:']
    }
  )
  const res = response.data.choices[0].text
  console.log('AI: ' + res)
  conversation += res
  conversation += `\nHuman: ${prompt('Human: ')}`
  conversation += '\nAi: '
}