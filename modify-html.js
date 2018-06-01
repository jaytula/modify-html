#!/usr/bin/env node

var program = require('commander');
var jsdom = require('jsdom');
const jquery = require('jquery');
const { JSDOM } = jsdom;

var data = '';

function callback(selector, styles, html) {
  var root = selector; //'.content';
  var rootAll = root + ' *'; 

  var dom = new JSDOM("<div id='body'>"+html+"</div");
  const $ = jquery(dom.window);
  for(let style of styles) {
    $(rootAll).css(style, '');
  }
  $(rootAll).each(function() {
    var style = $(this).attr('style');
    if(!style) $(this).removeAttr('style');
  })
  var body = $('#body').html().trim();
  
  console.log(body);
}

program
  .version('0.1.0')
  .arguments('<selector> <styles...>')
  .action(function(selector, styles) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
      data += chunk;
    });

    process.stdin.on('end', function() {
      callback(selector, styles, data)
      process.exit()
    });
  });

program.parse(process.argv);
/*setInterval(function() {
  console.error('working');
}, 1e3);*/


