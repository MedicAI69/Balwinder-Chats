import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState(0);
  const [lang, setLang] = useState(0);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [isActive4, setActive4] = useState(false);
  const [isActive5, setActive5] = useState(true);



  //CSS

  const buttonStyle = {

    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#E4BAD4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '3px',
  };
  const activebtn = {

    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#F6DFEB',
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '3px',
  };


  //onsubmit ki bachodi


  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, mode: mode, lang: lang }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // setResult(result + data.result);
      let msg = document.getElementById('msg');
      let newMsgMe = document.createElement('me');
      newMsgMe.textContent = animalInput;
      msg.appendChild(newMsgMe);
      msg.innerHTML += '<br/><br/>';
      // newMsgMe.style=me;
      // setTimeout(() => console.log('Initial timeout!'), 100);
      let newMsgAi = document.createElement('ai');
      newMsgAi.textContent = data.result;
      msg.appendChild(newMsgAi);
      msg.innerHTML += '<br/><br/>';
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
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
          <button style={lang ? activebtn : buttonStyle} onClick={() => {
            setLang(1);
          }}>
            Hindi
          </button>

          <button style={!lang ? activebtn : buttonStyle} onClick={() => {
            setLang(0);
          }}>
            English
          </button>
        </div>


        {/* Navbar */}
        <div className="nav">
          <button style={isActive1 ? activebtn : buttonStyle} onClick={() => {
            setMode(1);
            setActive1(true);
            setActive2(false);
            setActive3(false);
            setActive4(false);
            setActive5(false);
          }}>Master-Slave</button>
          <button style={isActive2 ? activebtn : buttonStyle} onClick={() => {
            setMode(2);
            setActive1(false);
            setActive2(true);
            setActive3(false);
            setActive4(false);
            setActive5(false);
          }}>Rude</button>
          <button style={isActive3 ? activebtn : buttonStyle} onClick={() => {
            setMode(3);
            setActive1(false);
            setActive2(false);
            setActive3(true);
            setActive4(false);
            setActive5(false);
          }}>Loving</button>
          <button style={isActive4 ? activebtn : buttonStyle} onClick={() => {
            setMode(4);
            setActive1(false);
            setActive2(false);
            setActive3(false);
            setActive4(true);
            setActive5(false);
          }}>Dank</button>
          <button style={isActive5 ? activebtn : buttonStyle} onClick={() => {
            setMode(5);
            setActive1(false);
            setActive2(false);
            setActive3(false);
            setActive4(false);
            setActive5(true);
          }}>Defult</button>
        </div>

        <div className={styles.container}>
          <div id="msg" className={styles.result} ref={msgbox}>
            <me>hi</me>
            {result}
            <br></br>
            <ai>hii</ai>
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Ask me anything...."
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <input type="submit" value="" />
          </form>
        </div>
      </main>
    </div>
  );
}
