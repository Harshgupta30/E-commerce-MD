const getdata = require("../service/getdata");

const login = async (req, res) => {
    let { username, password } = req.body;
    getdata("users", req, res, (response) => {
        let flag = false;
        response.forEach(element => {
            // console.log(element);
            if (element.username == username && element.password == password) {
                // console.log(element);
                req.session.logged_in = true;
                req.session.username = element.username;
                req.session.isVerified = element.isVerified;
                req.session.admin = element.admin;
                if(req.session.admin){
                    res.redirect("adminpage");
                }
                else{
                    res.redirect("/home");
                }
                flag = true;
                return;
            }
        });
        if (flag == false) {
            res.render("login", { error: "username or password is incorrect" });
        }
    });

}

const getlogin = (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/home");
        return;
    }
    res.render('login', { error: "" });
}

module.exports = { login, getlogin };