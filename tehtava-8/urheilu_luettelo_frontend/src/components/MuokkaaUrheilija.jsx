import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import yhteystiedotContext from "../context/YhteystiedotContext";

const MuokkaaUrheilija = () => {
  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [kutsumanimi, setKutsumanimi] = useState("");
  const [syntymavuosi, setSyntymavuosi] = useState("");
  const [paino, setPaino] = useState("");
  const [kuva, setKuva] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");

  const YhteystiedotContext = useContext(yhteystiedotContext);
  const { id } = useParams();
  let history = useNavigate();

  useEffect(() => {
    YhteystiedotContext.getUrheilija(id).then((res) => {
      if (res) {
        setEtunimi(res.etunimi || "");
        setSukunimi(res.sukunimi || "");
        setKutsumanimi(res.kutsumanimi || "");
        setSyntymavuosi(
          res.syntymavuosi ? res.syntymavuosi.substring(0, 10) : "",
        );
        setPaino(res.paino || "");
        setKuva(res.kuva || "");
        setLaji(res.laji || "");
        setSaavutukset(res.saavutukset || "");
      }
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paivitettyUrheilija = {
      etunimi: etunimi,
      sukunimi: sukunimi,
      kutsumanimi: kutsumanimi,
      syntymavuosi: syntymavuosi,
      paino: paino,
      kuva: kuva,
      laji: laji,
      saavutukset: saavutukset,
    };

    await YhteystiedotContext.setUrheilija(id, paivitettyUrheilija);
    history("/");
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Muokkaa urheilijaa</div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="etunimi">Etunimi</label>
            <input
              type="text"
              id="etunimi"
              className="form-control form-control-lg"
              value={etunimi}
              onChange={(e) => setEtunimi(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sukunimi">Sukunimi</label>
            <input
              type="text"
              id="sukunimi"
              className="form-control form-control-lg"
              value={sukunimi}
              onChange={(e) => setSukunimi(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="kutsumanimi">Kutsumanimi</label>
            <input
              type="text"
              id="kutsumanimi"
              className="form-control"
              value={kutsumanimi}
              onChange={(e) => setKutsumanimi(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="syntymavuosi">Syntymäaika</label>
            <input
              type="date"
              id="syntymavuosi"
              className="form-control"
              value={syntymavuosi}
              onChange={(e) => setSyntymavuosi(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paino">Paino (kg)</label>
            <input
              type="number"
              step="0.01"
              id="paino"
              className="form-control"
              value={paino}
              onChange={(e) => setPaino(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="kuva">Kuvan osoite</label>
            <input
              type="text"
              id="kuva"
              className="form-control"
              value={kuva}
              onChange={(e) => setKuva(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="laji">Laji</label>
            <input
              type="text"
              id="laji"
              className="form-control"
              value={laji}
              onChange={(e) => setLaji(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="saavutukset">Saavutukset</label>
            <textarea
              id="saavutukset"
              className="form-control"
              value={saavutukset}
              onChange={(e) => setSaavutukset(e.target.value)}
            />
          </div>

          <br />
          <input
            type="submit"
            value="Tallenna muutokset"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default MuokkaaUrheilija;
