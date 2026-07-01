const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname));

app.post("/submit", (req, res) => {
    const data = req.body;
    const id = data.name.toLowerCase().replace(" ", "");

    const portfolios = JSON.parse(fs.readFileSync(__dirname + "/data.json"));
    portfolios[id] = data;
    fs.writeFileSync(__dirname + "/data.json", JSON.stringify(portfolios));

    res.json({ id });
});

app.get("/portfolio/:id", (req, res) => {
    const portfolios = JSON.parse(fs.readFileSync(__dirname + "/data.json"));
    const data = portfolios[req.params.id];
    res.render("last", { data });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});