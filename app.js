const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: false,
  })
);

const items = [
  { title: "Max Verstappen", img: "/images/mv1-1.jpg" },
  { title: "Max Verstappen", img: "/images/mv1-2.jpg" },
  { title: "Max Verstappen", img: "/images/mv1-3.jpg" },
  { title: "Max Verstappen", img: "/images/mv1-4.jpg" },
  { title: "Max Verstappen", img: "/images/mv1-5.jpg" },
];


app.get("/", (req, res) => {
  if (req.session.logged) {
    res.render("index", { items, logged: true });
  } else {
    res.render("index", { items: [], logged: false });
  }
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  const { user, pass } = req.body;

  if (user === "mv1" && pass === "1234") {
    req.session.logged = true;
    return res.redirect("/private");
  }

  res.render("login", { error: "Usuario o contraseña incorrectos" });
});

app.get("/private", (req, res) => {
  if (!req.session.logged) return res.redirect("/login");
  res.render("private", { user: "admin" });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
