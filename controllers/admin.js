const getdata = require("../service/getdata");
const insert = require("../service/insert");

const adminpage = (req,res)=>{
    if (req.session.logged_in) {
        res.render("admin", { name: req.session.username });
    }
}

const newpro = (req, res) => {
    if (req.session.logged_in) {
        res.render("new", { name: req.session.username });
    }
}

const upload = async (req, res) => {
    const pn = req.body.pname;
    const pp = req.body.pprice;
    const pd = req.body.pd;
    const pf = req.file.filename;
    let count = 0;
    // let collection = db.collection("products");
    // let response = await collection.find({}).toArray();
    getdata("products", req, res, (response) => {
        response.forEach(element => {
            // console.log(element.name);
            count = element.id;
        });
        count++;
        // console.log(count);
        var product = { "id": count, "image": pf, "name": pn, "price": pp, "details": pd };
        // collection.insertOne(product);
        insert("products",req,res,product);
        res.redirect("/new");
    })
}

module.exports = { newpro, upload,adminpage };