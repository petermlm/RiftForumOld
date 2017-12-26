// Modules and Libraries
var express      = require("express");
var bodyParser   = require("body-parser");
var cookieParser = require("cookie-parser");
var jwt          = require("jsonwebtoken");
var path         = require("path");

var config = require("./libs/config");
var models = require("./models");
var default_data = require("./libs/default_data");

/* ============================================================================
 * Setup Models
 * ============================================================================
 */

models.sequelize.sync().then(() => {
    console.log('Models Sync');
    default_data.create();
});

/* ============================================================================
 * Setup Express Application
 * ============================================================================
 */

var app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* ============================================================================
 * Setup Routes
 * ============================================================================
 */

var routes = {
    index:     require("./routes/index"),
    auth:      require("./routes/auth"),
    topics:    require("./routes/topics"),
    users:     require("./routes/users"),
    register:  require("./routes/register"),
    admin:     require("./routes/admin"),
    api:       require("./routes/api"),
    errors:    require("./routes/errors")
};

app.use("/",         routes.index);
app.use("/login",    routes.auth.login);
app.use("/logout",   routes.auth.logout);
app.use("/topics",   routes.topics);
app.use("/users",    routes.users);
app.use("/register", routes.register);
app.use("/admin",    routes.admin);
app.use("/api",      routes.api);
app.use("/404",      routes.errors.router404);
app.use("/500",      routes.errors.router500);
app.use("*",         routes.errors.router404);

/* ============================================================================
 * Listen
 * ============================================================================
 */

app.listen(config.port, function(){
    console.log("Live at Port ", config.port);
});
