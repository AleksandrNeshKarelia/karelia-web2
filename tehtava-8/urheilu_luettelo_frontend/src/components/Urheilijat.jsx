import React, { useContext, useEffect } from "react";
import yhteystiedotContext from "../context/YhteystiedotContext";
import Urheilija from "./Urheilija";

const Urheilijat = () => {
  const YhteystiedotContext = useContext(yhteystiedotContext);

  useEffect(() => {
    YhteystiedotContext.getUrheilijat();
  }, []);

  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="text-primary">Urheilijat</span>
      </h1>

      <React.Fragment>
        {YhteystiedotContext.urheilijat.length ? (
          YhteystiedotContext.urheilijat.map((urheilija) => (
            <Urheilija key={urheilija.id} urheilija={urheilija} />
          ))
        ) : (
          <p>Ei urheilijoita.</p>
        )}
      </React.Fragment>
    </>
  );
};

export default Urheilijat;
