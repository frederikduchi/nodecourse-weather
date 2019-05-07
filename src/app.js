const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT  || 3000;

const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index',{
        title: "Dynamic title",
        name: "Frederik"
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: "About",
        name: "Frederik"
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help",
        message: "Dit is een voorbeeld van een boodschap",
        name: "Frederik"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide a address'
        });
    }
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: 'Something went wrong in the geocode'
            });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: 'Something went wrong in the forecast'
                });
            }
            res.send({
                forecast: forecastData, 
                location: data.place,
                address: req.query.address
            });
        });
    });
});


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Article not found',
        name: 'Frederik',
        errorMessage : 'Article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Page not found',
        name: 'Frederik',
        errorMessage : 'Pag not found'
    })
});

app.listen(port, () => {
    console.log('server is up at port ' + port);
});