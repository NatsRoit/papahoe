module.exports = {
    auth: (req, res, next) => {
        console.log(req.session.usuario);
        if(req.session.usuario){
            let user = req.session.usuario ;
            console.log('req.params.id' + req.params.id);
            if(user.id == req.params.id || user.role_id == 1){
                next();
            }else{
                res.redirect('/');
            }
        }else{
            res.redirect('/user/login')
        }
    }
}