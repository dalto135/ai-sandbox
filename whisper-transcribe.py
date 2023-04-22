# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
import openai
audio_file = open("public/hello.m4a", "rb")
transcript = openai.Audio.transcribe(
    model="whisper-1",
    file=audio_file
)

print(transcript.text)