import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import yhteystiedotContext from "../context/YhteystiedotContext";

export default function LisaaUrheilija() {
  let history = useNavigate();

  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [kutsumanimi, setKutsumanimi] = useState("");
  const [syntymavuosi, setSyntymavuosi] = useState("");
  const [paino, setPaino] = useState("");
  const [kuva, setKuva] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");

  const YhteystiedotContext = useContext(yhteystiedotContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uusiUrheilija = {
      etunimi: etunimi,
      sukunimi: sukunimi,
      kutsumanimi: kutsumanimi,
      syntymavuosi: syntymavuosi,
      paino: paino,
      kuva: kuva,
      laji: laji,
      saavutukset: saavutukset,
    };

    console.log("Tarkistetaan uusiUrheilija -objekti:");
    console.log(uusiUrheilija);

    await YhteystiedotContext.setUrheilijat(uusiUrheilija);
    history("/");
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Lisää urheilija</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="etunimi">Etunimi</label>
            <input
              id="etunimi"
              type="text"
              className="form-control form-control-lg"
              placeholder="Syötä etunimi..."
              value={etunimi}
              onChange={(event) => setEtunimi(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sukunimi">Sukunimi</label>
            <input
              id="sukunimi"
              type="text"
              className="form-control form-control-lg"
              placeholder="Syötä sukunimi..."
              value={sukunimi}
              onChange={(event) => setSukunimi(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="kutsumanimi">Kutsumanimi</label>
            <input
              id="kutsumanimi"
              type="text"
              className="form-control"
              placeholder="Syötä kutsumanimi..."
              value={kutsumanimi}
              onChange={(event) => setKutsumanimi(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="syntymavuosi">Syntymäaika</label>
            <input
              id="syntymavuosi"
              type="date"
              className="form-control"
              value={syntymavuosi}
              onChange={(event) => setSyntymavuosi(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paino">Paino (kg)</label>
            <input
              id="paino"
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Syötä paino..."
              value={paino}
              onChange={(event) => setPaino(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="kuva">Kuvan osoite</label>
            <input
              id="kuva"
              type="text"
              className="form-control"
              placeholder="Syötä kuvan URL..."
              value={kuva}
              onChange={(event) => setKuva(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="laji">Laji</label>
            <input
              id="laji"
              type="text"
              className="form-control"
              placeholder="Syötä laji..."
              value={laji}
              onChange={(event) => setLaji(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="saavutukset">Saavutukset</label>
            <textarea
              id="saavutukset"
              className="form-control"
              placeholder="Syötä saavutukset..."
              value={saavutukset}
              onChange={(event) => setSaavutukset(event.target.value)}
            />
          </div>

          <br />
          <input
            type="submit"
            value="Lisää urheilija"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
}
