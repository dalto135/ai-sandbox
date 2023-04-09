import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [dalleInput, setDalleInput] = useState("");
  const [dalleEditInput, setDalleEditInput] = useState("");
  const [dalleVariationInput, setDalleVariationInput] = useState("");
  const [whisperInput, setWhisperInput] = useState("");

  const [animalResult, setAnimalResult] = useState();
  const [dalleResult, setDalleResult] = useState();
  const [dalleEditResult, setDalleEditResult] = useState();
  const [dalleVariationResult, setDalleVariationResult] = useState();
  const [whisperResult, setWhisperResult] = useState();

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

      setAnimalResult(data.result);
      setAnimalInput("");

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function dalleOnSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/dalle-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: dalleInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setDalleResult(data.result);
      setDalleInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function dalleEditOnSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/dalle-edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: dalleEditInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setDalleEditResult(data.result);
      setDalleEditInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function dalleVariationOnSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/dalle-variation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: dalleVariationInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setDalleVariationResult(data.result);
      setDalleVariationInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function whisperOnSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/whisper-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: whisperInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setWhisperResult(data.result);
      setWhisperInput("");
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
        <div className={styles.result}>{animalResult}</div>

        <div className={styles.main}>
          <h3>DALL•E Generate</h3>

          <form onSubmit={dalleOnSubmit}>
            <input
              type="text"
              name="image"
              placeholder="Enter a prompt to generate an image"
              value={dalleInput}
              onChange={(e) => setDalleInput(e.target.value)}
            />
            <input type="submit" value="Generate image" />
          </form>
          <div className={styles.result}>{dalleResult}</div>
        </div>

        <div className={styles.main}>
          <h3>DALL•E Edit</h3>

          <form onSubmit={dalleEditOnSubmit}>
            <input
              type="text"
              name="image"
              placeholder="Enter a prompt to generate an image"
              value={dalleEditInput}
              onChange={(e) => setDalleEditInput(e.target.value)}
            />
            <input type="submit" value="Edit image" />
          </form>
          <div className={styles.result}>{dalleEditResult}</div>
        </div>

        <div className={styles.main}>
          <h3>DALL•E Variation</h3>

          <form onSubmit={dalleVariationOnSubmit}>
            <input
              type="text"
              name="image"
              placeholder="Enter a prompt to generate an image"
              value={dalleVariationInput}
              onChange={(e) => setDalleVariationInput(e.target.value)}
            />
            <input type="submit" value="Alter image" />
          </form>
          <div className={styles.result}>{dalleVariationResult}</div>
        </div>

        <div className={styles.main}>
          <h3>Whisper</h3>

          <form onSubmit={whisperOnSubmit}>
            <input
              type="text"
              name="image"
              placeholder="Submit an audio clip for transcription"
              value={whisperInput}
              onChange={(e) => setWhisperInput(e.target.value)}
            />
            <input type="submit" value="Transcribe" />
          </form>
          <div className={styles.result}>{whisperResult}</div>
        </div>
      </main>
    </div>
  );
}
