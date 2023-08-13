import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [mode, setMode] = useState(0);
  const [lang, setLang] = useState(0);
  const [bgh, setbgh] = useState('brown');
  const [bge, setbge] = useState('brown');
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [isActive4, setActive4] = useState(false);



  //CSS
  const buttonStyleh = {

    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: bgh,
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '3px',
  };
  const buttonStylee = {
    
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: bge,
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '3px',
  };


  const buttonStyle = {
    
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'blue',
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
    backgroundColor: 'aqua',
    color: '#ffffff',
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
        body: JSON.stringify({ animal: animalInput ,mode: mode , lang : lang}),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
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
        <h3>Balwinder Chats</h3>
        <div>

          {/* lang */}
          <button style={buttonStyleh} onClick={()=> {
            
            setLang(1);
            setbgh('red');
            setbge('brown');
          }}>
            Hindi
          </button>

          <button style={buttonStylee} onClick={()=> {
            setLang(0);
            setbge('red');
            setbgh('brown');
          }}>
            English
          </button>
        </div>


        {/* Navbar */}
        <div className="nav">
        <button style={isActive1 ? activebtn : buttonStyle} onClick={()=> {
          setMode(1);
          setActive1(true);
          setActive2(false);
          setActive3(false);
          setActive4(false);
        }}>Master-Slave</button>
        <button style={isActive2 ? activebtn : buttonStyle} onClick={()=> {
          setMode(2);
          setActive1(false);
          setActive2(true);
          setActive3(false);
          setActive4(false);
        }}>Rude</button>
        <button style={isActive3 ? activebtn : buttonStyle} onClick={()=> {
          setMode(3);
          setActive1(false);
          setActive2(false);
          setActive3(true);
          setActive4(false);
        }}>Loving</button>
        <button style={isActive4 ? activebtn : buttonStyle} onClick={()=> {
          setMode(4);
          setActive1(false);
          setActive2(false);
          setActive3(false);
          setActive4(true);
        }}>Defult</button>
        </div>


        
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
      </main>
    </div>
  );
}
