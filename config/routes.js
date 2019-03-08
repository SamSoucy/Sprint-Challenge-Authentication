const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");


const {authenticate, generateToken} = require("../auth/authenticate");



module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};




function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db("users")
    .insert(creds)
    .then(ids => {
      const token = generateToken(creds);
      res.status(201).json({
        ids,
        message: "registered",
        token
      });
    })
    .catch(err => res.status(500).json(err));
}

function login(req, res) {
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${
            user.username
          }here's a cookie and a token`,
          token
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => console.log(err));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };
  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}


