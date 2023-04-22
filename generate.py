# import os
import openai

# Load your API key from an environment variable or secret management service
# openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
    model="text-davinci-003",
    prompt="Give me a list of some cool places to check out in Columbus, Ohio",
    n=1,
    temperature=1,
    max_tokens=100,
    # suffix="3. COSI"
)

for choice in response.choices:
    print(choice.text)

# print(response)
