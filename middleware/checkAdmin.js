function checkAdmin(req,res,next){
    if(req.session.admin){
        next();
        return;
    }
    res.send(404);
    return;
}

module.exports = checkAdmin;