import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import yhteystiedotContext from "../context/YhteystiedotContext";

const Urheilija = (props) => {
  const YhteystiedotContext = useContext(yhteystiedotContext);
  let history = useNavigate();
  const [naytaPuhelintieto, setnaytaPuhelintieto] = useState(false);

  const onShowClick = () => {
    let lippu = !naytaPuhelintieto;
    setnaytaPuhelintieto(lippu);
  };

  const onDeleteClick = (id) => {
    YhteystiedotContext.poistaUrheilija(id);
    history("/");
  };

  const urheilija = props.urheilija;
  const {
    id,
    etunimi,
    sukunimi,
    kutsumanimi,
    syntymavuosi,
    paino,
    kuva,
    laji,
    saavutukset,
  } = urheilija;

  return (
    <div className="card card-body mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {kuva ? (
          <img
            src={kuva}
            alt={etunimi}
            style={{ width: "100px", marginRight: "15px" }}
          />
        ) : null}

        <h4>
          {etunimi} {sukunimi}
          {kutsumanimi ? ` (${kutsumanimi})` : ""}
        </h4>

        <button className="button_left" onClick={onShowClick}>
          ...
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="btn-group mr-2 text-right" role="group">
          <button className="button_right" onClick={() => onDeleteClick(id)}>
            Poista
          </button>

          <Link to={`/urheilija/muokkaa/${id}`}>
            <button className="button_right">Muokkaa</button>
          </Link>
        </div>
      </div>

      {naytaPuhelintieto ? (
        <ul className="list-group mt-3">
          <li className="list-group-item">
            Syntymäaika: {syntymavuosi ? syntymavuosi.substring(0, 10) : ""}
          </li>
          <li className="list-group-item">Paino: {paino} kg</li>
          <li className="list-group-item">Laji: {laji}</li>
          <li className="list-group-item">Saavutukset: {saavutukset}</li>
        </ul>
      ) : null}
    </div>
  );
};

Urheilija.propTypes = {
  urheilija: PropTypes.shape({
    id: PropTypes.number.isRequired,
    etunimi: PropTypes.string,
    sukunimi: PropTypes.string,
    kutsumanimi: PropTypes.string,
    syntymavuosi: PropTypes.string,
    paino: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    kuva: PropTypes.string,
    laji: PropTypes.string,
    saavutukset: PropTypes.string,
  }).isRequired,
};

export default Urheilija;
