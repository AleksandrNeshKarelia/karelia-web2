import { useState } from "react";

function Lisayslomake() {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");

  function handleFinChange(e) {
    setFin(e.target.value);
  }

  function handleEngChange(e) {
    setEng(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const uusiSana = { fin, eng };

    try {
      const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uusiSana),
      });

      const vastaus = await response.json();
      console.log(vastaus.message);
    } catch (error) {
      console.log("Virhe:", error);
    }
  }

  return (
    <>
      <p>Lisäyslomake</p>

      <form onSubmit={handleSubmit}>
        <label>
          Suomeksi:
          <input type="text" value={fin} onChange={handleFinChange} />
        </label>

        <label>
          Englanniksi:
          <input type="text" value={eng} onChange={handleEngChange} />
        </label>

        <button type="submit">Lisää sana</button>
      </form>
    </>
  );
}

export default Lisayslomake;
