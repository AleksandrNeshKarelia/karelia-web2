"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
//const fs = require("fs");
const app = (0, express_1.default)();
const port = 3000;
const sanakirja = [];
const data = fs_1.default.readFileSync("./sanakirja.txt", {
  encoding: "utf8",
  flag: "r",
});
const splitLines = data.split(/\r?\n/); //jaetaan merkkijono rivin vaihtojen perusteella
splitLines.forEach((line) => {
  //const sanat = line.split(" "); //jaetaan yhden rivin merkkijono kahteen osaan
  const sanat = line.trim().split(/\s+/);
  const sana = {
    fin: sanat[0],
    eng: sanat[1],
  };
  sanakirja.push(sana);
});
console.log(sanakirja);
app.use(express_1.default.json()); //käytetään json -muotoista dataa
app.use(express_1.default.urlencoded({ extended: true })); //käytetään tiedonsiirrossa laajennettua muotoa
//CORS -määrittely
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token",
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-type", "application/json");
  next();
});

// GET /sanakirja – palauttaa koko sanakirjan
app.get("/sanakirja", (req, res) => {
  res.json(sanakirja);
});

// GET /hae/:fin – hakee suomenkielisen sanan ja palauttaa englanninkielisen vastine
app.get("/hae/:fin", (req, res) => {
  const fin = String(req.params.fin); // otetaan parametri
  const eng = sanakirja.find((sana) => sana.fin === fin); // etsitään tauluko-sanakirjasta suomenkielinen sana
  res.json(eng ? eng : { message: "Not found" }); //palautetaan tulos tai virheilmoitus
});

// POST /lisaa – lisää uuden sanaparin sanakirjaan ja tallentaa sen tiedostoon
app.post("/lisaa", (req, res) => {
  const { fin, eng } = req.body; // luetaan JSON-datasta sanat
  sanakirja.push({ fin, eng }); // lisätään sanapari taulukkoon
  fs_1.default.appendFileSync("sanakirja.txt", `${fin} ${eng}\n`, "utf8"); // tallennetaan uusi rivi sanakirja.txt -tiedostoon
  console.log(`Lisättiin sana: ${fin} ${eng}`); // lokitetaan lisäys
});

// Käynnistetään palvelin
app.listen(port, () => {
  console.log(`Kuunnellaan portissa ${port}`);
});
//# sourceMappingURL=server.js.map
