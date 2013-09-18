// Logging events by start and end time to get better accuracy

var EventLogger = require('../');

// Initialize the event logger
var logger = new EventLogger();

// Start a new event
// If you do not end it, it will act like a normal event
var event1 = logger.startEvent('test 1');

// After 30ms from initializing the logger - end the "test 1" event - this should result in the elapsed time being very close to 30ms
setTimeout(function() {
  var eventRes = event1.end({ result: 'test 2' });
  console.log(eventRes);
}, 30);

// End the event logger and show everything
setTimeout(function() {
  logger.end();
  console.log(logger);
}, 100);
