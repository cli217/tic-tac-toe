'use strict'

const app = require('./server')
const PORT = process.env.PORT || 8080heroku 


app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
