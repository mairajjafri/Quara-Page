const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [{
        id: uuidv4(),
        username: "Mairaj Jafri",
        content: "I love coding",
    },
    {
        id: uuidv4(),
        username: "Akshat Chaudhary",
        content: "Studying in Pune",
    },
    {
        id: uuidv4(),
        username: "Aryan Satle",
        content: "Learning Tamil Language",
    },
    {
        id: uuidv4(),
        username: "Ameya Laad",
        content: "Eating Indori Poha",
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let { content } = req.body;

    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = content;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

app.listen(port, () => {
    console.log(`listening to port: ${port}`);
});