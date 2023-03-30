const getdata = require("../service/getdata");
const insert = require("../service/insert");
const update = require("../service/update");

const addtocart = async(req,res)=>{
    let { id } = req.query;
    let username = req.session.username;
    let flag = false;
    let quant = 1;
    // let collection = db.collection("cart");
    // let response = await collection.find({}).toArray();
    getdata("cart",req,res,(response)=>{
        response.forEach(element=>{
            if(element.username ==username && element.id==id){
                flag = true;
                quant = (element.quantity + 1);
                console.log(quant);
                
            }
        })
        if(flag==true){
            var myquery = {username:username,id:id};
            var newvalues = {$set:{quantity:quant++}};
            update("cart",myquery,newvalues);
            
        }
        else{
            let temp = {username:username,id:id,quantity:quant};
            insert("cart",req,res,temp);
        }
    })
    
    
    res.redirect("/home");
}

module.exports = addtocart;