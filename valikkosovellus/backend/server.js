import express from "express";
import fs from "fs";

const app = express();
const port = 3000;
const sanakirja = [];

// Luetaan sanakirja tiedostosta
const data = fs.readFileSync("./sanakirja.txt", {
  encoding: "utf8",
});

const splitLines = data.split(/\r?\n/);

splitLines.forEach((line) => {
  if (line.trim() !== "") {
    const sanat = line.trim().split(/\s+/);

    const sana = {
      fin: sanat[0],
      eng: sanat[1],
    };

    sanakirja.push(sana);
  }
});

console.log(sanakirja);

// Käytetään JSON-muotoista dataa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS-määrittely
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

// GET /sanakirja – palauttaa koko sanakirjan
app.get("/sanakirja", (req, res) => {
  res.json(sanakirja);
});

// GET /get/:fin – hakee suomenkielisen sanan
app.get("/get/:fin", (req, res) => {
  const fin = String(req.params.fin);

  const sana = sanakirja.find((sana) => sana.fin === fin);

  res.json(sana ? sana : { message: "Not found" });
});

// POST /post – lisää uuden sanaparin
app.post("/post", (req, res) => {
  const { fin, eng } = req.body;

  if (
    typeof fin !== "string" ||
    typeof eng !== "string" ||
    fin.trim() === "" ||
    eng.trim() === ""
  ) {
    return res.status(400).json({
      message: "Molemmat sanat pitää antaa.",
    });
  }

  const uusiSana = {
    fin: fin.trim(),
    eng: eng.trim(),
  };

  sanakirja.push(uusiSana);

  fs.appendFileSync(
    "./sanakirja.txt",
    `${uusiSana.fin} ${uusiSana.eng}\n`,
    "utf8",
  );

  console.log(`Lisättiin sana: ${uusiSana.fin} ${uusiSana.eng}`);

  res.json({
    message: `Lisättiin sana: ${uusiSana.fin} ${uusiSana.eng}`,
  });
});

// Käynnistetään palvelin
app.listen(port, () => {
  console.log(`Kuunnellaan portissa ${port}`);
});
