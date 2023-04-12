import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [dalleInput, setDalleInput] = useState("");
  const [dalleEditImage1, setDalleEditImage1] = useState("");
  const [dalleEditImage2, setDalleEditImage2] = useState("");
  const [dalleEditPrompt, setDalleEditPrompt] = useState("");
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
        body: JSON.stringify({ prompt: animalInput }),
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
        body: JSON.stringify({ prompt: dalleInput }),
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
        body: JSON.stringify({
          image1: dalleEditImage1,
          image2: dalleEditImage2,
          prompt: dalleEditPrompt
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setDalleEditResult(data.result);
      setDalleEditImage1("");
      setDalleEditImage2("");
      setDalleEditPrompt("");
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
        body: JSON.stringify({ image: dalleVariationInput }),
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

  // async function whisperOnSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("/api/whisper-generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ animal: whisperInput }),
  //     });

  //     const data = await response.json();
  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }

  //     setWhisperResult(data.result);
  //     setWhisperInput("");
  //   } catch(error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />

        <section className="section">
          <div className={styles.main}>
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
          </div>

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
            <img className={styles.result} src={dalleResult}/>
          </div>
        </section>

        <section className="section">
          <div className={styles.main}>
            <h3>DALL•E Edit</h3>

            <form onSubmit={dalleEditOnSubmit}>
              <input
                type="text"
                name="image1"
                placeholder="Enter image 1 location or leave blank"
                value={dalleEditImage1}
                onChange={(e) => setDalleEditImage1(e.target.value)}
              />
              <input
                type="text"
                name="image2"
                placeholder="Enter image 2 location or leave blank"
                value={dalleEditImage2}
                onChange={(e) => setDalleEditImage2(e.target.value)}
              />
              <input
                type="text"
                name="prompt"
                placeholder="Enter prompt or leave blank"
                value={dalleEditPrompt}
                onChange={(e) => setDalleEditPrompt(e.target.value)}
              />
              <input type="submit" value="Edit image" />
            </form>
            <img className={styles.result} src={dalleEditResult}/>
          </div>

          <div className={styles.main}>
            <h3>DALL•E Variation</h3>

            <form onSubmit={dalleVariationOnSubmit}>
              <input
                type="text"
                name="image"
                placeholder="Enter image location or leave blank"
                value={dalleVariationInput}
                onChange={(e) => setDalleVariationInput(e.target.value)}
              />
              <input type="submit" value="Alter image" />
            </form>
            <img className={styles.result} src={dalleVariationResult}/>
          </div>
        </section>

        {/* <section className="section">
          <div className={styles.main}>
            <h3>Whisper</h3>

            <form onSubmit={whisperOnSubmit}>
              <input
                type="text"
                name="image"
                placeholder="Submit an audio clip for transcription/translation"
                value={whisperInput}
                onChange={(e) => setWhisperInput(e.target.value)}
              />
              <input type="submit" value="Transcribe" />
            </form>
            <div className={styles.result}>{whisperResult}</div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
