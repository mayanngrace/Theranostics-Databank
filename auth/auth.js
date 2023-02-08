const express = require('express')
const LocalStrategy = require('passport-local')
const passport = require('passport')
const router = express.Router()
const session = require('express-session')
const e = require('express')
const SQLiteStore = require('connect-sqlite3')(session)

async function main(app) {
  return new Promise(async (resolve, reject) => {
    try {
      app.use(session({
        secret: 'zrfvnzr',
        resave: false,
        saveUninitialized: false,
        store: new SQLiteStore({ db: 'session.db', dir: './database' })
      }))
      app.use(passport.initialize())
      app.use(passport.session())
      resolve()
    } catch (error) {
      console.log('Error on auth.js > main')
      console.log(error)
      reject()
    }
  })
}

async function configureLocalStrategy(db) {
  return new Promise(async (resolve, reject) => {
    try {
      // Local Strategy Configuration
      passport.use(new LocalStrategy(async function verify(username, password, done) {
        try {
          const my_user = {
            username: 'admin',
            password: 'admin'
          }
          if (username == my_user.username && password == my_user.password) {
            return done(null, my_user)
          } else {
            return done(null, false)
          }
        } catch(err) {
          console.log('Error on LocalStrategy > verify')
          console.log(err)
          return done(null, false)
        }
      }
      ))

      passport.serializeUser(function(user, cb) {
      process.nextTick(function() {
        // console.log('serializingUser > user is', user) // temp
        cb(null, user)
      })
      })

      passport.deserializeUser(function(user, cb) {
      process.nextTick(function() {
        // console.log('deserializeUser > user is', user) // temp
        return cb(null, user);
      })
      })

      // end LocalStrategy Configuration
      resolve()     
    } catch (error) {
      console.log('Error on auth.js > configureLocalStrategy', error) // temp
      reject()
    }
  })
}

// Routes

  // authorize
  router.post('/api/authorize', (req, res) => {
    try {
      if (req.user) {
        res.json({username: req.user.username, password: req.user.password})
      } else {
        throw 'User not logged in'
      }
    } catch (error) {
      // console.log('Error on api > authorize', error) // debug
      res.status(401).json({message: error}).send()
    }
  })
  // end authorize

  // login
  router.post('/api/login', (req, res) => {
    try {
      passport.authenticate('local', (err, user, info, status) => {
        if (user) {
          req.logIn(user, (err) => {
            if (err) {
              console.log('Error on req.logIn', err) // temp
              res.status(401).json({messsage: `Login error: ${err}`}).send()
            } else {
              res.json({messsage: 'Login success'}).send()
            }
          })
        } else {
          res.status(401).json({messsage: 'Login error'}).send()
        }
      })(req, res)
    } catch (error) {
      console.log('Error on api > login', error)
      res.status(401).json({message: error}).send()
    }
  })
  // end login  

  // logout
  router.post('/api/logout', function(req, res) {
    try {
      req.logout(function(err) {
        if (err) { res.json({message: `Error on logout: ${err}`}).send() }
        else {
          res.json({redirect: '/toLoggedOut'}).send()
          // res.send('Success')
        }
      })
    } catch (error) {
      // res.json({message: error}).send()
      res.send('Error')
    }
  })
  // end logout

  // logout redirect
  router.get('/toLoggedOut', (req, res) => {
    res.redirect('/login')
  })
  // end logout redirect

// end Routes

module.exports = {main, configureLocalStrategy, router}