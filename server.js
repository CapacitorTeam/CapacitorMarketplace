// require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working

const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./Controllers/userController");
const genericController = require("./Controllers/genericController");

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send(
    "Dear fellow traveler, it is dangerous to go alone; so please turn back."
  );
});

app.get("/user", async (req, res) => {
  let body = req.body;
  if (!(body.username || body.email || body.id)) {
    res
      .status(400)
      .send(
        "A parameter to filter by is required ('username', 'email', or 'id')"
      );
    return;
  }

  let user = await genericController.getSingleRowByFilters("users_table", body);
  if (user == null) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).send(user);
});

app.listen(port, () => {
  console.log("App listening at http://localhost:" + port);
});
