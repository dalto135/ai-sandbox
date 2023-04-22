import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [temperatureInput, setTemperatureInput] = useState("");

  const [dalleInput, setDalleInput] = useState("");
  const [dalleImageNumber, setDalleImageNumber] = useState("");
  const [dalleImageSize, setDalleImageSize] = useState("");

  const [dalleEditImage1, setDalleEditImage1] = useState("");
  const [dalleEditImage2, setDalleEditImage2] = useState("");
  const [dalleEditPrompt, setDalleEditPrompt] = useState("");
  const [dalleEditImageNumber, setDalleEditImageNumber] = useState("");
  const [dalleEditImageSize, setDalleEditImageSize] = useState("");

  const [dalleVariationInput, setDalleVariationInput] = useState("");
  const [dalleVariationImageNumber, setDalleVariationImageNumber] = useState("");
  const [dalleVariationImageSize, setDalleVariationImageSize] = useState("");

  const [promptResult, setPromptResult] = useState();

  const [dalleResult, setDalleResult] = useState();

  const [dalleEditResult, setDalleEditResult] = useState();

  const [dalleVariationResult, setDalleVariationResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptInput,
          temperature: temperatureInput
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setPromptResult(data.result);
      setPromptInput("");
      setTemperatureInput("");

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
        body: JSON.stringify({
          prompt: dalleInput,
          imageNumber: dalleImageNumber,
          imageSize: dalleImageSize
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setDalleResult(data.result);
      setDalleInput("");
      setDalleImageNumber("");
      setDalleImageSize("");
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
          prompt: dalleEditPrompt,
          imageNumber: dalleEditImageNumber,
          imageSize: dalleEditImageSize
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
      setDalleEditImageNumber("");
      setDalleEditImageSize("");

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
        body: JSON.stringify({
          image: dalleVariationInput,
          imageNumber: dalleVariationImageNumber,
          imageSize: dalleVariationImageSize
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setDalleVariationResult(data.result);
      setDalleVariationInput("");
      setDalleVariationImageNumber("");
      setDalleVariationImageNumber("");

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

        <section className="section">
          <div className={styles.main}>
            <h3>ChatGPT</h3>

            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="prompt"
                placeholder="Enter an prompt or leave blank"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
              />
              <input
                type="text"
                name="temperature"
                placeholder="Temperature (0-2) (default 1)"
                value={temperatureInput}
                onChange={(e) => setTemperatureInput(e.target.value)}
              />
              <input type="submit" value="Submit" />
            </form>
            {promptResult?.map((result, i) => 
              <div key={i} className={styles.result}>{result}</div>
            )}
          </div>

          <div className={styles.main}>
            <h3>DALL•E Generate</h3>

            <form onSubmit={dalleOnSubmit}>
              <input
                type="text"
                name="image"
                placeholder="Enter a prompt (default 'unicorn')"
                value={dalleInput}
                onChange={(e) => setDalleInput(e.target.value)}
              />
              Number of images:
              <select name="imageNumber" onChange={(e) => setDalleImageNumber(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              Image size:
              <select name="imageSize" onChange={(e) => setDalleImageSize(e.target.value)}>
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
              <br></br>
              <input type="submit" value="Generate image" />
            </form>
            
            {dalleResult?.map((image, i) => 
              <img key={i} className={styles.result} src={image}/>
            )}
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
                placeholder="Enter a prompt (default 'cat')"
                value={dalleEditPrompt}
                onChange={(e) => setDalleEditPrompt(e.target.value)}
              />
              Number of images:
              <select name="imageNumber" onChange={(e) => setDalleEditImageNumber(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              Image size:
              <select name="imageSize" onChange={(e) => setDalleEditImageSize(e.target.value)}>
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
              <br></br>
              <input type="submit" value="Edit image" />
            </form>
            {dalleEditResult?.map((image, i) => 
              <img key={i} className={styles.result} src={image}/>
            )}
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
              Number of images:
              <select name="imageNumber" onChange={(e) => setDalleVariationImageNumber(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              Image size:
              <select name="imageSize" onChange={(e) => setDalleVariationImageSize(e.target.value)}>
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
              <br></br>
              <input type="submit" value="Alter image" />
            </form>
            {dalleVariationResult?.map((image, i) => 
              <img key={i} className={styles.result} src={image}/>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
