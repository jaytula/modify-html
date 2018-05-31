#!/usr/bin/env node

var jsdom = require('jsdom');
const jquery = require('jquery');
const { JSDOM } = jsdom;

var data = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  data += chunk;
});

process.stdin.on('end', function() {
  callback(data)
  process.exit()
});

/*setInterval(function() {
  console.error('working');
}, 1e3);*/

function callback(html) {
  var root = '.content';
  var rootAll = root + ' *'; 

  var dom = new JSDOM("<div id='body'>"+html+"</div");
  const $ = jquery(dom.window);
  $(rootAll).css('color', '');
  $(rootAll).css('background-color', '');
  $(rootAll).each(function() {
    var style = $(this).attr('style');
    if(!style) $(this).removeAttr('style');
  })
  var body = $('#body').html().trim();
  
  console.log(body);
}
