require("dotenv").config();

const bodyParser    = require("body-parser");
const cookieParser  = require("cookie-parser");
const express       = require("express");
const mongoose      = require("mongoose");
const logger        = require("morgan");
const path          = require("path");
const session       = require("express-session");
const passport      = require("passport");
const cors          = require("cors");

require("./config/passportConfig")

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});

const app_name = require("./package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}));

app.use((req, res, next)=>{
  res.locals.user = req.user;
  next();
})

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/trip", require("./routes/tripRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/detail", require("./routes/detailRoutes"));
app.use("api/google", require("./routes/googleRoutes"));

module.exports = app;