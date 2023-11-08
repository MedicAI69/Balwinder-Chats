import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
export default function Home() {
  const [Input, setInput] = useState("");
  const [mode, setMode] = useState(5);
  const [lang, setLang] = useState(0);

  //onsubmit ki bachodi
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: Input, mode: mode, lang: lang }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      let msg = document.getElementById('msg');
      let newMsgMe = document.createElement('me');
      newMsgMe.textContent = Input;
      msg.appendChild(newMsgMe);
      msg.innerHTML += '<br/><br/>';
      let newMsgAi = document.createElement('ai');
      newMsgAi.textContent = data.result;
      msg.appendChild(newMsgAi);
      msg.innerHTML += '<br/><br/>';
      setInput("");
    } catch (error) {
      let msg = document.getElementById('msg');
      let newMsgMe = document.createElement('me');
      newMsgMe.textContent = Input;
      msg.appendChild(newMsgMe);
      msg.innerHTML += '<br/><br/>';
      let newMsgAi = document.createElement('ai');
      newMsgAi.textContent = `Unable to process your request. Please try again later.
      Error: ${error.message}`;
      msg.appendChild(newMsgAi);
      msg.innerHTML += '<br/><br/>';
      setInput("");
      console.error(error);
    }
  }

  //scroll to bottom
  const msgbox = useRef();
  useEffect(() => {
    msgbox.scrollTop = msgbox.scrollHeight;
  }, []);


  return (
    <div className={styles.fullScreen}>
      <main className={styles.main}>
        <div className={styles.title}>
          <div className={styles.logo}></div>
          <h1>BALWINDER CHATS</h1>
        </div>

        <div>
          <button className={lang ? styles.activebtn : styles.buttonStyle} onClick={() => {
            setLang(1);
          }}>
            Hindi
          </button>

          <button className={!lang ? styles.activebtn : styles.buttonStyle} onClick={() => {
            setLang(0);
          }}>
            English
          </button>
        </div>


        {/* Navbar */}
        <div className="nav">
          <button className={mode == 1 ? styles.activebtn : styles.buttonStyle} onClick={() => {
            setMode(1);
          }}>Master-Slave</button>
          <button className={mode == 2 ? styles.activebtn : styles.buttonStyle} onClick={() => {
            setMode(2);
          }}>Rude</button>
          <button className={mode == 3 ? styles.activebtn : styles.buttonStyle} onClick={() => {
            setMode(3);
          }}>Loving</button>
          <button className={mode == 4 ? styles.activebtn : styles.buttonStyle} onClick={() => {
            setMode(4);
          }}>Dank</button>
          <button className={mode == 5 ? styles.activebtn : styles.buttonStyle} onClick={() => {
            setMode(5);
          }}>Defult</button>
        </div>

        <div className={styles.container}>
          <div id="msg" className={styles.result} ref={msgbox}>
            {/* <me>hi</me>
            <br></br>
            <ai>hii</ai> */}
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Ask me anything...."
              value={Input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input type="submit" value="" />
          </form>
        </div>
      </main>
    </div>
  );
}
