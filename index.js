const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = 3000

mongoose.connect(process.env.MONGO)

const Schema = mongoose.Schema

const planetSchema = new Schema({
  name: String
})

const Planet = mongoose.model('Planet', planetSchema)

app.use(bodyParser.json())

app.get('/planet', async (request, response) => {
  const planets = await Planet.find({})

  response.send({
    data: planets
  })
})

app.get('/planet/:id', async (request, response) => {
  const planetId = request.params.id

  const planet = await Planet.find({
    _id: planetId
  })

  response.send({
    data: planet
  })
})

app.put('/planet/:id', async (request, response) => {
  const planetId = request.params.id

  const newName = request.body.name

  const planet = await Planet.findByIdAndUpdate(planetId, {
    name: newName
  }, { new: true })

  response.send({
    data: planet
  })
})

app.post('/planet', async (request, response) => {
  const { name } = request.body

  const planet = new Planet({
    name
  })

  await planet.save()

  response.send({
    message: 'Ok',
    data: planet
  })
})

app.delete('/planet/:id', async (request, response) => {
  const planetId = request.params.id

  await Planet.remove({
    _id: planetId
  })

  const planets = await Planet.find({})

  response.send({
    data: planets
  })
})

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})
