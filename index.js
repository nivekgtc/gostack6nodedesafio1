const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: true }))

const checkParams = (req, res, next) => {
  const age = req.query.age
  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('create')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', checkParams, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.get('/minor', checkParams, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.listen(3333)
