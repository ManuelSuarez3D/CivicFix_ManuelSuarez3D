const home = (req, res) => {
    const data = {
        year: new Date().getFullYear(),
        title: 'CivicFix - Home',
        isLoggedIn: req.session.isLoggedIn ?? false,
        isDev: req.session.isDev ?? false
    };

    res.render('index', data);
};

module.exports = {
    home
};