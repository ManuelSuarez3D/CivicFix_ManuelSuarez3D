const getLogin = (req, res) => {
    res.render('login', {
        title: 'CivicFix - Login',
        now: new Date(),
        isLoggedIn: req.session.isLoggedIn ?? false,
        isDev: req.session.isDev ?? false
    });
};

const login = (req, res) => {

    if(req.body.user === 'employee' && req.body.password === 'employee1234'){
        req.session.isLoggedIn = true;
        res.redirect('manage');
    }
    if(req.body.user === 'dev' && req.body.password === 'dev1234'){
        req.session.isLoggedIn = true;
        req.session.isDev = true;
        res.redirect('manage');
    }
    else {
        res.render('login', {
            title:'CivicFix - Login',
            now: new Date(),
            error: 'Failed login',
            isLoggedIn: req.session.isLoggedIn ?? false,
            isDev: req.session.isDev ?? false
        })
    }
};

const logout = (req, res) => {
    req.session.isLoggedIn = false;
    req.session.isDev = false;

    res.render('logout', {
        title: 'CivicFix - Goodbye!',
        now: new Date(),
        isLoggedIn: req.session.isLoggedIn ?? false,
    })
};

module.exports = {
    getLogin,
    login,
    logout
}