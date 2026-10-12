import { useState } from "react";

function Hakulomake() {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");

  function handleFinChange(e) {
    setFin(e.target.value);
  }

  /* function handleEngChange(e) {
    setEng(e.target.value);
  } */

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/get/${fin}`);

      const vastaus = await response.json();
      console.log(vastaus.message);
      if (vastaus.message === "Not found") {
        setEng("Sanaa ei löytynyt");
      } else {
        setEng(vastaus.eng);
      }
    } catch (error) {
      console.log("Virhe:", error);
    }
  }

  return (
    <>
      <p>Hakulomake</p>

      <form onSubmit={handleSubmit}>
        <label>
          Suomeksi:
          <input type="text" value={fin} onChange={handleFinChange} />
        </label>

        <button type="submit">Hae sana</button>
      </form>
      <p>Englanniksi: {eng}</p>
    </>
  );
}

export default Hakulomake;
