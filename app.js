
const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function (req, res) {
    const query = req.body.city
    const cityName = query.charAt(0).toUpperCase()+query.slice(1)
    
    const unit = "metric"
    const apiKey = "e221d14f517b771240582c56e2caa578"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&units=" +unit+ "&appid=" +apiKey
    https.get(url, function (response) {  //callback fun will give a response only i.e. the output
        response.on('data', function (data) {
            const weatherData = JSON.parse(data)
            // console.log(weatherData);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
            
            res.write("<h1><u>Temperature for " +cityName+ "</u></h1>")
            res.write("<h1> Temp: " + temp + " &#176"+"C"+ "</h1>")
            res.write("<h1> Weather type: " + description + "</h1>")
            res.write("<img src=" + imageURL+ "> ")
            res.send()
        });
    });
});


app.listen(3000, function () {
    console.log("listening on 3000")
})
