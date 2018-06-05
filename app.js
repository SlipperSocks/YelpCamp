const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

const url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //seed the database
// Comment.remove({}, function (err) {
//     console.log("emptied comments!");
// });
// Campground.remove({}, function (err) {
//     console.log("empties campgrounds!");
// });


// ======================================================
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Don't tell Neptune but Oddball is still my favorite",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ======================================================

// pass user data to every template, technically a middleware
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//to use the routes that we are importing
app.use("/", indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP);