const sendEmail = require("../methods/sendEmail");
const getdata = require("../service/getdata");
const insert = require("../service/insert");

const signup = async (req, res) => {
    let { name, username, password, email } = req.body;
    // let collection = db.collection("users");
    // let response = await collection.find({}).toArray();
    getdata("users", req, res, (response) => {
        let flag = false;
        response.forEach(element => {
            // console.log(element.name);
            if (element.username == username) {
                flag = true;
                return;
            }
        });
        // console.log(response.name);
        if (flag == true) {
            res.render("signup", { error: "userexist" });
        }
        if (flag == false) {
            let user = { name: name, username: username, password: password, email: email, isVerified: false, token: Date.now() };
            insert("users",req,res,user);
            // collection.insertOne(user);
            sendEmail(user, function (err, data) {
                // console.log(data);
                // console.log(err);
                if (err) {
                    res.render("signup", { error: "something went wrong" });
                    // console.log("err");
                }
                else {
                    req.session.logged_in = true;
                    req.session.username = username;
                    req.session.isVerified = false;
                    res.redirect("/home");
                }
            })
        }
    })

}
const getsignup = async (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/home");
        return;
    }
    res.render('signup', { error: "" });
}
const mailcheck = async (req, res) => {
    let token = req.params;
    let user;
    // res.send(token.token);
    let collection = db.collection("users");
    let response = await collection.find({}).toArray();
    response.forEach(element => {
        // console.log(element.name);
        if (element.token == token.token) {
            user = element;
        }
    });
    var myquery = { token: parseInt(token.token) };
    var newvalues = { $set: { isVerified: true } };
    var result = await collection.updateOne(myquery, newvalues).then(
        fun()
    );
    function fun() {
        req.session.logged_in = true;

        req.session.username = user.username;
        req.session.isVerified = true;
        res.redirect("/home");
    }


};

module.exports = { signup, getsignup, mailcheck }