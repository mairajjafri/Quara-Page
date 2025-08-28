const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [{
        username: "Mairaj Jafri",
        content: "I love coding",
    },
    {
        username: "Akshat Chaudhary",
        content: "Studying in Pune",
    },
    {
        username: "Aryan Satle",
        content: "Learning Tamil Language",
    },
    {
        username: "Ameya Laad",
        content: "Eating Indori Poha",
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.listen(port, () => {
    console.log(`listening to port: ${port}`);
})