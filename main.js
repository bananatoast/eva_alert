'use strict';

const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
  var screen = require('screen');
  var displays = screen.getAllDisplays();
  var display = displays.length > 1 ? displays[1] : displays[0];

  mainWindow = new BrowserWindow({
    transparent: true, 
    frame: false,
    x: display.bounds.x,
    y: display.bounds.y,
    width: display.size.width,   
    height: display.size.height
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});