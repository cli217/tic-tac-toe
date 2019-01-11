'use strict'

const app = require('./server')
const PORT = 1337


app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
