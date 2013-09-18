// Simple logging

var EventLogger = require('../');

// Initialize the event logger
var logger = new EventLogger('Test logger');

// Log an event
setTimeout(function() {
  logger.event('test 1');
}, 20);

// Log an event
setTimeout(function() {
  logger.event('test 2');
}, 68);

// Log an event
setTimeout(function() {
  logger.event('test 3');
}, 102);

// End the event logger and show everything
setTimeout(function() {
  logger.end();
  console.log(logger);
}, 200);

