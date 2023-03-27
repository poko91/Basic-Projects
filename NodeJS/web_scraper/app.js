const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const colors = require('colors')

const app = express()
const url = 'https://www.medicalnewstoday.com/'
axios.get(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('li.css-1ib8oek').each((i, element) => {
            const title = $(element).find('a.css-1xlgwie').text()
            const link = 'https://www.medicalnewstoday.com/' + $(element).find('a.css-1xlgwie').attr('href');
            articles.push({
                title,
                link
            })
        }) 
        console.log(articles)
        console.log("--------------\n")
    }).catch(err => console.log(err))
