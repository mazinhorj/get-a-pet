const express = require('express')
const cors = require('cors')
const app = express()

app.use(
  express.json()
)

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(cors({
  credentials: true, origin: 'http://localhost:3000'
}))

//routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.use(express.static('public'))

const conn = require('./db/conn');
try {
  conn
    // .sync({ force: true })
    // .then(console.log("Limpando o banco e recriando tabelas..."))
    .sync()
    .then(console.log("Sincronizando tabelas..."))
}
catch (err) { console.log("Não conectou ao DB: " + err.message) };


app.listen(5000)