require('dotenv').config()
const express = require('express')
const app = express()
const port = 8000

const auth = require('./auth/auth')
const database = require('./database/database')
const initial = require('./database/initial')
const patient_records = require('./patient_records/patient_records')

// Main
async function main() {
  // Insert async calls here

    // Body Parser
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())

    // Create db.sqlite Database
    const source = './database/db.sqlite'
    const db = await database.openOrCreateDB(source)
    // end Create db.sqlite Database

    // Initial
    await initial.createInitialTables(db)
    // end Initial

    // Passport Auth and Session
    await auth.main(app)
    await auth.configureLocalStrategy(db)
    // end Passport Auth and Session

    // Routers
    app.use('/', auth.router)
    app.use('/', patient_records.router)
    // end Routers

  // end Insert async calls here

  // Health
  // app.get('/', (req, res) => {
  //   res.send('Hello world!')
  // })
  // end health

    // Serving Frontend
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'dist'))) // added

    app.get('*', function(req, res) {
      // res.send('Yoooo')
      res.sendFile(__dirname + '/dist/index.html');
    })

  // Start express server
  app.listen(process.env.PORT, () => {
    console.log(`Express app listening on port ${process.env.PORT}`)
  })
  // end Start express server
}
main() // Main Call
