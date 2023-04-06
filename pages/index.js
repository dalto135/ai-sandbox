import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [whisperInput, setwhisperInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
      setImageInput("");
      setwhisperInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />

        <h3>Name my pet</h3>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>

        <div className={styles.main}>
          <h3>DALL•E</h3>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="image"
              placeholder="Enter a prompt to generate an image"
              value={imageInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <input type="submit" value="Generate image" />
          </form>
          <div className={styles.result}>{result}</div>
        </div>

        <div className={styles.main}>
          <h3>Whisper</h3>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="image"
              placeholder="Submit an audio clip for transcription"
              value={whisperInput}
              onChange={(e) => setWhisperInput(e.target.value)}
            />
            <input type="submit" value="Transcribe" />
            <div className={styles.result}>{result}</div>
          </form>
        </div>
      </main>
    </div>
  );
}
