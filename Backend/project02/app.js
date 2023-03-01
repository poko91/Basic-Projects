import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

import { getUsers, getUser, createUser } from './database.js'

const app = express()

app.use(express.json())

app.get('/users', async (req,res)=> {
    const users = await getUsers()
    res.send(users)
})

app.get('/users/:user_Id', async (req,res)=> {
    const user_Id = req.params.user_Id
    const user = await getUser(user_Id)
    res.send(user)
})

app.post('/users', async (req,res)=> {
    const { email, password, studio_name, business_add } = req.body
    const user = await createUser(email, password, studio_name, business_add)
    res.status(201).send(user)
})

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log("Server is running on port ", process.env.APP_PORT)
})