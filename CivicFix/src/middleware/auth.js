const isEmployeeMiddleware =  (req, res, next) => {
    if(!req.session.isLoggedIn){
        res.redirect('/login');
    } else {
        next();
    }
}

const isCustomerMiddleware =  (req, res, next) => {
    if(req.session.isLoggedIn){
        res.redirect('/manage');
    } else {
        next();
    }
}

const isDeveloperMiddleware =  (req, res, next) => {
    console.log('Session:', req.session);
    if(!req.session.isDev){
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
}

module.exports = {
    isEmployeeMiddleware,
    isCustomerMiddleware,
    isDeveloperMiddleware
}