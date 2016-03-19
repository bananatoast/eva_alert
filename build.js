'use strict';

var packager = require('electron-packager');  
var config = require('./package.json');

packager({  
  dir: './',        
  out: './dist',     
  name: config.name,
  platform: 'all',
  arch: 'x64',     
  version: '0.36.11',  
  'app-version': config.version,      
  overwrite: true, 
  asar: true,      
  prune: true,
  ignore: ".node_modules",
}, function done (err, appPath) {
  if(err) {
    throw new Error(err);
  }
  console.log('Done!!');
});
