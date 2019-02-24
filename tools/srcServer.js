const express = require('express');
const webpack =require('webpack');
const path =require('path');
const config =require('../webpack.config.dev');
const open =require('open');
const mongoose =require('mongoose');
/* eslint-disable no-console */


const session =require('express-session');
const sessionStore =require('session-file-store');

const bodyParser=require('body-parser');
const FileStore=sessionStore(session);
const port = 3001;
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({

  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
const compiler = webpack(config);



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static(__dirname+'../src'))
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
 
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    //open(`http://localhost:${port}`);
  }
});
