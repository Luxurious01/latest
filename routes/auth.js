const { request, json } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const hbs = require("hbs");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
const facebookStrategy = require('passport-facebook').Strategy


//const requireLogin = require("../middleware/requireLogin");
require("../db/conn");
require('./passport_setup.js'); 

//path for all the views
const static_path = path.join(__dirname,"../public");
const templatPath = path.join(__dirname,"../server/templates/views");
const partialPath = path.join(__dirname,"../server/templates/partials");

const User = require("../model/userSchema");

router.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templatPath);
hbs.registerPartials(partialPath);

//UI Code here
//home page code here
router.get("/",(req , res) =>{
    res.render("index");
});

router.get("/signin",(req , res) =>{
    res.render("signin");
});

router.get("/register",(req , res) =>{
    res.render("register");
});

router.get("/skincare", (req, res) => {
    res.render("skincare")
})

router.get("/haircare", (req, res) => {
    res.render("haircare")
})
router.get("/bodycare", (req, res) => {
    res.render("bodycare")
})
router.get("/baby", (req, res) => {
    res.render("baby")
})
router.get("/men", (req, res) => {
    res.render("men")
})
router.get("/healthcare", (req, res) => {
    res.render("healthcare")
})
router.get("/sexualwellness", (req, res) => {
    res.render("sexualwellness")
})

router.get("/men", (req, res) => {
    res.render("men")
})

//skincare dropdowns routers...........
router.get("/cream", (req, res) => {
    res.render("cream")
})
router.get("/scrub", (req, res) => {
    res.render("scrub")
})
router.get("/mask", (req, res) => {
    res.render("mask")
})
router.get("/toner", (req, res) => {
    res.render("toner")
})
router.get("/mist", (req, res) => {
    res.render("mist")
})
router.get("/facewash", (req, res) => {
    res.render("facewash")
})

//haircare routers...........
router.get("/shampoo", (req, res) => {
    res.render("shampoo")
})
router.get("/conditioner", (req, res) => {
    res.render("conditioner")
})
router.get("/oil", (req, res) => {
    res.render("oil")
})
router.get("/serum", (req, res) => {
    res.render("serum")
})

//body care routers....
router.get("/lotion", (req, res) => {
    res.render("lotion")
})
router.get("/bodywash", (req, res) => {
    res.render("bodywash")
})

//baby routers........
router.get("/babyshampoo", (req, res) => {
    res.render("babyshampoo")
})
router.get("/babyhairoil", (req, res) => {
    res.render("babyhairoil")
})
router.get("/babymassageoil", (req, res) => {
    res.render("babymassageoil")
})
router.get("/babytoothpaste", (req, res) => {
    res.render("babytoothpaste")
})

router.get("/babycream", (req, res) => {
    res.render("babycream")
})
router.get("/babydustingpowerd", (req, res) => {
    res.render("babydustingpowerd")
})

//mens routers...........
router.get("/mensshampoo", (req, res) => {
    res.render("mensshampoo")
})
router.get("/mensconditioner", (req, res) => {
    res.render("mensconditioner")
})
router.get("/beardoil", (req, res) => {
    res.render("beardoil")
})
router.get("/beardwash", (req, res) => {
    res.render("beardwash")
})

router.get("/beardwax", (req, res) => {
    res.render("beardwax")
})
router.get("/menshairoil", (req, res) => {
    res.render("menshairoil")
})
router.get("/hairwax", (req, res) => {
    res.render("hairwax")
})
router.get("/detantcleanfacewash", (req, res) => {
    res.render("detantcleanfacewash")
})

//healthcare routers.....
router.get("/pilescurecapsules", (req, res) => {
    res.render("pilescurecapsules")
})
router.get("/glucontrolcapsules", (req, res) => {
    res.render("glucontrolcapsules")
})
router.get("/noniextractcapsules", (req, res) => {
    res.render("noniextractcapsules")
})
router.get("/amlaextractcapsules", (req, res) => {
    res.render("amlaextractcapsules")
})

router.get("/greencoffeebeanscapsules", (req, res) => {
    res.render("greencoffeebeanscapsules")
})
router.get("/goliyextractcapsules", (req, res) => {
    res.render("goliyextractcapsules")
})
router.get("/fatfreecapsules", (req, res) => {
    res.render("fatfreecapsules")
})
router.get("/greenlippedcapsules", (req, res) => {
    res.render("greenlippedcapsules")
})
router.get("/jointremedypainrelief", (req, res) => {
    res.render("jointremedypainrelief")
})

router.get("/jointremedysachet", (req, res) => {
    res.render("jointremedysachet")
})
router.get("/madirakillersachet", (req, res) => {
    res.render("madirakillersachet")
})
router.get("/weightonweightgainsachet", (req, res) => {
    res.render("weightonweightgainsachet")
})
router.get("/stratchmarksremovergel", (req, res) => {
    res.render("stratchmarksremovergel")
})

//sexualwellness routers........
router.get("/ashwauttejnaoil", (req, res) => {
    res.render("ashwauttejnaoil")
})
router.get("/brexelantcream", (req, res) => {
    res.render("brexelantcream")
})
router.get("/vaginaltighteninggel", (req, res) => {
    res.render("vaginaltighteninggel")
})

//google login here
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }));

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

app.get('/good', isLoggedIn, (req, res) =>{
    res.render("index");
})

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
//logout here


//facebook login here
app.use(passport.initialize());
    app.use(passport.session()); 

passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : "603496006962121",
    clientSecret    : "c63a6f6f8189ed75b5958b2c0c0e7341",
    callbackURL     : "http://localhost:5000/facebook/callback",
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({ "email":email }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) {
                console.log("user found")
                console.log(user)
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser = new User();

                // set all of the facebook information in our user model                
                newUser.token = token; // we will save the token that facebook provides to the user                    
                newUser.firstName  = profile.name.givenName; // look at the passport user profile to see how names are returned
                newUser.lastname =  profile.name.familyName;
                newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                //newUser.gender = profile.gender
                //newUser.pic = profile.photos[0].value
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    else{
                        console.log("done");
                    }

                    // if successful, return the new user
                    return done(null, newUser);
                });
            }

        });

    })

}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    return done(null,user)
});

app.get('/profile',(req,res) => {
    res.send("you are authenticated")
})

app.get("/auth/facebook", passport.authenticate('facebook', { scope : 'email,user_photos' }));

app.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
//save values here
//registration page code here
router.post("/register",async (req,res) => {
    //create variables of feilds
    const {firstName,lastName,email,password} = req.body;

    try{

        const userExist = await User.findOne({email:email})     //check if user exist
        
        if(userExist){
            return res.status(422).json({error:"user already exists with that email"})
        }
        else{
            const user = new User({firstName,lastName,email,password});     //create current user

            const done = await user.save();

            if(done){
                res.render("index");
            }else{
                res.render("signin");
            }

        }

    }catch(err){
        console.log(err);
    }


});


//login page code here
router.post("/signin",async (req,res) => {

    try{

        let token;
        const {email,password} = req.body;

        //check empty feilds
        if(!email || !password){
            res.status(422).json({error: "please fill all the field"})
        }

        const userLogin = await User.findOne({email:email});        //my current user

        if(userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password);      //authencticating password

            token = await userLogin.generateAuthToken();
            

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch){

                res.json({message:"please check your credentials pass"});

            }else{
                
                res.render("index");

            }

        }else{
            res.json({message:"please check your credentials"});
        }


    }catch(err){
        console.log(err);
    }

});


module.exports = router;
