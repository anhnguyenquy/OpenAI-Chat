import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("API_KEY")

conversation = """
Human: {}
AI:
""".format(input("Human: "))

while True:
    response = openai.Completion.create(
      engine="text-davinci-001",
      prompt=conversation,
      temperature=0.8,
      max_tokens=60,
      top_p=1.0,
      frequency_penalty=0.5,
      presence_penalty=0.0,
      stop=["Human:"]
    )
    
    print("AI: ", end='')
    res = response.choices[0].text
    print(res)    
    conversation+=res
    conversation+="\nHuman: {}".format(input("Human: "))
    conversation+="\nAi: "
