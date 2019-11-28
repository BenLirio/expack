/**
 * Imports all of the packages explicitly
 * Some are not neccessary but since I am using
 * webpack I make them explicit
 */
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'
import http from 'http'
import socketio from 'socket.io'
import process from 'process'
import console from 'console'

/**
 * Define all of the variables to be used
 * TODO figure out a better way to use express
 * and app to run server instead of httpServer
 * main ones to use latter are 
 * app
 * io
 * httpServer
 */
const app = express()
const DIST_DIR = process.env.PWD
const HTML_FILE = path.join(DIST_DIR, 'index.html')
const compiler = webpack(config)
const httpServer = http.createServer(app)
const io = socketio(httpServer)

/**
 * This looks alot different in the prod
 * for dev we send error if there are any
 */
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))


/**
 * Double check that the html file actaully exists and then send it over
 * give an error if the file does not exist.
 */
app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})

/**
 * All socket io functions go here
 */
io.on('connection', function(socket){
  console.log('a user connected with socket',socket.id)
})


/**
 * Listen to port 8080 most of the time
 * console log which port is being used
 */
const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
