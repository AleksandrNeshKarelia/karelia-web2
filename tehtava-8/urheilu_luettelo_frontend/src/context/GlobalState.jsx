import { useReducer } from "react";
import PropTypes from "prop-types";
import AppReducer from "./AppReducer";
import YhteystiedotContext from "./YhteystiedotContext";
import { GET_URHEILIJAT } from "./types";
import axios from "axios";

const GlobalState = (props) => {
  // initial state
  let initialState = {
    urheilijat: [],
    urheilija: null,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getUrheilijat = async () => {
    try {
      let res = await axios.get("http://localhost:3001/urheilijat");
      let { data } = res;

      dispatch({ type: GET_URHEILIJAT, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getUrheilija = async (id) => {
    try {
      let sql = "http://localhost:3001/urheilijat/" + id;
      let res = await axios.get(sql);

      dispatch({ type: "GET_URHEILIJA", payload: res.data });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const setUrheilijat = async (uusiUrheilija) => {
    try {
      let res = await axios.post("http://localhost:3001/lisaa", uusiUrheilija);

      dispatch({ type: "ADD_URHEILIJA", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  const setUrheilija = async (id, paivitettyUrheilija) => {
    try {
      let res = await axios.put(
        "http://localhost:3001/urheilijat/" + id,
        paivitettyUrheilija,
      );

      dispatch({ type: "EDIT_URHEILIJA", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };

  const poistaUrheilija = async (id) => {
    try {
      await axios.delete("http://localhost:3001/urheilijat/" + id);

      dispatch({ type: "DELETE_URHEILIJA", payload: Number(id) });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <YhteystiedotContext.Provider
      value={{
        urheilijat: state.urheilijat,
        urheilija: state.urheilija,
        getUrheilijat,
        getUrheilija,
        setUrheilijat,
        setUrheilija,
        poistaUrheilija,
      }}
    >
      {props.children}
    </YhteystiedotContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalState;
