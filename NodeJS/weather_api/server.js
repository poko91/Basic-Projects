const express = require('express')
const request = require('request')
require('dotenv').config()
const PORT = 8080
const API_KEY = process.env.API_KEY
const app = express()

app.get("/", (req,res)=> {
    let city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=`
    request(url + process.env.API_KEY, (err, response, body)=> {
        let data = JSON.parse(body)
        // res.send(data)
        if (response.statusCode === 200){
            res.send(`
            <h2>The weather forecast in your city ${data.city.name} is ${data.list[0].weather[0].description}</h2>
            <p>Temperature: ${data.list[0].main.temp}º</p>
            <p>Feels Like: ${data.list[0].main.feels_like}º</p>
            <p>Humidity: ${data.list[0].main.humidity}%</p>`)
        }
    })
})

app.listen(PORT, ()=> console.log(`Server running on port $(PORT)`))