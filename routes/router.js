const express = require("express");
const router = express.Router();

//routes
const root = require("../controllers/root");
const {login,getlogin} = require("../controllers/login");
const {signup,getsignup,mailcheck} = require("../controllers/signup");
const home = require("../controllers/home");
const addtocart = require("../controllers/addtocart");
const {reset,confirm,mailver} = require("../controllers/forgetpassword");
const logout = require("../controllers/logout")
const {newpro,upload, adminpage} = require("../controllers/admin")
const getpro = require("../controllers/product");
const{changepass,changepassword,change} = require("../controllers/chnagepassword");
const {mycart,getcart,savedata,del} = require("../controllers/cart")

//middleware
const checkAuth = require("../middleware/checkAuth");
const checkVerfication = require("../middleware/checkVerfication");
const verifyemail = require("../middleware/verifyemail");
const checkAdmin = require("../middleware/checkAdmin");


//product img
const multer = require('multer');
const uploade = multer({ dest: 'uploads' })

//routes
router.get("/",root);

router.get("/login",getlogin);
router.post("/login",login);

router.get("/signup",getsignup);
router.post("/signup",signup);
router.get("/check/:token",mailcheck);

router.get("/home", checkAuth, checkVerfication,home);

router.post("/addtocart",checkAuth,addtocart);

router.get("/reset",reset);
router.post("/confirm",confirm);
router.get("/ver/:token",mailver);

router.get("/logout",checkAuth,logout);

router.get("/new",checkAdmin,newpro);
router.post("/addproduct",uploade.single('pf'),upload);
router.get("/adminpage",adminpage);

router.get("/getpro",getpro);

router.get("/changepass",verifyemail,changepass);
router.get("/changepassword",changepassword);
router.post("/change",change);

router.get("/mycart",checkAuth,mycart);
router.get("/getcart",checkAuth,getcart);
router.post("/savedata",checkAuth,savedata);
router.post("/del",checkAuth,del);

module.exports = router;
