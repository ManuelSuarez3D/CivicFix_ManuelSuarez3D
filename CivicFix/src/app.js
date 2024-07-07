const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const hbs = require('hbs');

require('./db/mongoose.js')

const HomeRouter = require('./routers/homeRouter');
const PartRouter = require('./routers/partRouter');
const CartRouter = require('./routers/cartRouter');
const PurchaseRouter = require('./routers/purchaseRouter');
const LoginRouter = require('./routers/loginRouter');
const ManageRouter = require('./routers/manageRouter');
const ApiRouter = require('./routers/apiRouter');

const publicPath = path.join(__dirname, '../public');
const srcPath = path.join(__dirname, '../src');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath));
app.use('/public', express.static(publicPath));
app.use('/src', express.static(srcPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'civicfix2024',
    saveUninitialized: true,
    resave: true,
    cookie:{
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

hbs.registerHelper('toLowerCase', function (text) {
    return text.toLowerCase();
});
hbs.registerHelper('formatPrice', function (price) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    }).format(price);

});

hbs.registerHelper('getUniqueModels', function(inventory) {
    let uniqueModels = new Set();

    inventory.forEach(item => {
        item.models.forEach(model => {
            uniqueModels.add(model);
        });
    });
    return Array.from(uniqueModels);
});

hbs.registerHelper('yearsInRange', function(startYear, endYear) {
    let years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return years;
});

app.use('', HomeRouter);
app.use('', PartRouter);
app.use('', CartRouter);
app.use('', PurchaseRouter);
app.use('', LoginRouter);
app.use('', ManageRouter);
app.use('/api', ApiRouter);

app.get('*', (req,res)=>{
    res.render('404');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port http://localhost:${port}`);
});

