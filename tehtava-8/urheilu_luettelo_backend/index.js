const mysql = require("mysql");
const express = require("express");
//const bodyParser = require("body-parser");
/* const app = express().use(bodyParser.json()); //vanha tapa - ei enää voimassa. 
kts. https://devdocs.io/express/ -> req.body*/
var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
const server = app.listen(3001, () => console.log("Serveri valmiina"));

const conn = mysql.createConnection({
  host: "localhost", //tässä host
  user: "aleks", //tässä käyttäjä
  password: "aleks", //tässä salasana
  database: "urheilijat", //tässä tietokanta
  multipleStatements: true, //tämä mahdollistaa useamman sql-kyselyn yhdellä kertaa
});

conn.connect((err) => {
  if (err) {
    console.log("Tapahtui virhe yhdistettäessä tietokantaan");
    return;
  }
  console.log("Yhteys muodostettu");
});

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
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
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// Haetaan kaikki urheilijat
app.get("/urheilijat", (req, res) => {
  conn.query("SELECT * FROM urheilijat", (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Tietokantavirhe" });
    }

    return res.status(200).json(rows);
  });
});

// Haetaan yksi urheilija
app.get("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);

  conn.query("SELECT * FROM urheilijat WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Tietokantavirhe" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: "Urheilijaa ei löydy" });
    }

    return res.status(200).json(rows[0]);
  });
});

app.put("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUrheilija = req.body;

  conn.query(
    "UPDATE urheilijat SET ? WHERE id = ?;",
    [updatedUrheilija, id],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Päivittäminen epäonnistui" });
      }

      conn.query("SELECT * FROM urheilijat WHERE id = ?", [id], (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Tietokantavirhe" });
        }

        if (rows.length === 0) {
          return res.status(404).json({ error: "Urheilijaa ei löydy" });
        }

        res.status(200).json(rows[0]);
      });
    },
  );
});

// DELETE a user

app.delete("/urheilijat/:id", (req, res) => {
  console.log("serverin poiston id:");
  const id = Number(req.params.id);
  console.log(id);

  conn.query(
    "DELETE FROM urheilijat WHERE id = ?",
    [id],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Poistaminen epäonnistui" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Urheilijaa ei löydy" });
      }

      return res.status(200).json({ message: "Urheilija poistettu" });
    },
  );
});

// Lisätään uusi urheilija
app.post("/lisaa", (req, res) => {
  const urheilija = req.body;

  if (!urheilija || !urheilija.etunimi || !urheilija.sukunimi) {
    return res.status(400).json({
      error: "Etunimi ja sukunimi ovat pakollisia",
    });
  }

  delete urheilija.id;

  conn.query("INSERT INTO urheilijat SET ?", urheilija, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Lisääminen epäonnistui" });
    }

    return res.status(201).json({
      id: results.insertId,
      ...urheilija,
    });
  });
});

module.exports = app;
