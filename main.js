'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
  var screen = require('screen');
  var size = screen.getPrimaryDisplay().size;

  mainWindow = new BrowserWindow({
    transparent: true, 
    frame: false,
    left: 0,
    top: 0,
    width: size.width,   
    height: size.height
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});