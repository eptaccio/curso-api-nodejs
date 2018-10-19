const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = 3000

app.use(bodyParser.json())

let planets = [
  {
    id: 1,
    name: 'Mercúrio'
  },
  {
    id: 2,
    name: 'Venus'
  }
]

app.get('/planet', (request, response) => {
  response.send({
    data: planets
  })
})

app.get('/planet/:id', (request, response) => {
  const planetId = request.params.id

  const planet = planets
    .find(planet => planet.id === parseInt(planetId))

  response.send({
    data: planet
  })
})

app.put('/planet/:id', (request, response) => {
  const planetId = request.params.id

  const newName = request.body.name

  const planet = planets
    .find(planet => planet.id === parseInt(planetId))

  planet.name = newName

  response.send({
    data: planet
  })
})

app.post('/planet', (request, response) => {
  const newPlanet = request.body
  planets.push(newPlanet)

  response.send({
    message: 'Ok'
  })
})

app.delete('/planet/:id', (request, response) => {
  const planetId = request.params.id

  planets = planets
    .filter(planet => planet.id !== parseInt(planetId))

  response.send({
    data: planets
  })
})

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})
