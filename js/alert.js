'use strict';

var remote = nodeRequire('remote');
var RtmClient = remote.require('@slack/client').RtmClient;
var RTM_EVENTS = remote.require('@slack/client').RTM_EVENTS;

var rtm = null;
var slackToken = process.env.SLACK_API_TOKEN || '';

function sleep(ms) {
  return function(func) {
    setTimeout(function() {
      func();
    }, ms);
  }
}

function draw() {
    var shuffle = function() {return Math.random()-.5};
    var context = $("#canvas")[0].getContext('2d');
    var image = new Image();
    image.src = 'img/emergency.png';
    image.addEventListener('load', function() {
        $.each(imagePositions(7, 13).sort(shuffle), function(idx, pos){
            sleep(10*idx)(function(){
                context.drawImage(image, pos.x, pos.y);
            });
        });
    }, false);
}

function clean() {
    var context = $("#canvas")[0].getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function setupScreen() {
    $("#canvas").attr({height:$("#screen").height()});
    $("#canvas").attr({width:$("#screen").width()});
    var context = $("#canvas")[0].getContext('2d');
}

function imagePositions(width, height) {
    var array = [];
    for(var i=0; i<height; i++) {
        for(var j=0; j<width; j++) {
          array.push({x: j*208+(i%2)*104, y: i*60});
        }
    }
    return array;
}

function startListeningSlack() {
    rtm = new RtmClient(slackToken, {logLevel: 'info'});
    rtm.start();
    rtm.on(RTM_EVENTS.MESSAGE, function (message) {
        if(message.text.match(/critical/i)) {
            console.log("critical:" + message.text);
            draw();
        } else if (message.text.match(/ok/i)) {
            console.log("clean:" + message.text);
            clean();
        }
    });    
}

$(document).ready(function() {
    setupScreen();
    startListeningSlack();
});
