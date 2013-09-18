/**
  EventLogger can be used for simple logging and audit logging - but also as a timer for test and debugging
  use EventLogger.events to retrieve the logged events
*/
module.exports = EventLogger = function(name) {
  name = name || '';
  if(name) {
    this.name = name;
  }
  this.events = [];
  this.started = new Date().getTime();
  this.lastEvent = this.started;
  this.event({ event: 'started', type: 'system' });
};

/**
  End the logger and calculate total time (ms) of all events
*/
EventLogger.prototype.end = function() {
  this.event({ event: 'ended', type: 'system' });
  this.ended = new Date().getTime();
  this.total = this.ended - this.started;
  return this.total;
};

/**
  This is for logging events with exact elapsed time
*/
EventLogger.prototype.startEvent = function(data) {
  var event = this.event(data);
  event.end = this.endEvent;
  return event;
};

/**
  End the event - you can add more data to the event object
*/
EventLogger.prototype.endEvent = function(data) {
  // Get the time before updating the event object
  // What we are logging are done now and the time to calculate and build the event object,
  // shouldn't be counted as time spent on the logged event.
  var tmpTime = new Date().getTime();

  // Make sure we have an object
  data = data || {};
  if(typeof data !== 'object') {
    this.event = data;
  } else {
    for(var i in data) {
      this[i] = data[i];
    }
  }

  // Calculate the timers
  this.ended = tmpTime;
  this.elapsed = tmpTime - this.time;
  this.elapsedTotal += this.elapsed;

  // Don't wait for the garbage collector...
  delete tmpTime;
  delete data;
  delete this.end;

  return this;
};


/**
  Log an event and assume elapsed time is since last event
  This is more than enough for audit logging as we don't need to know the exact time it took
*/
EventLogger.prototype.event = function(data) {
  // Start by making sure the event gets into the event array in the right order
  var newLength = this.events.push({});

  // Get the time before building the event object
  // What we are logging are done now and the time to calculate and build the event object,
  // shouldn't be counted as time spent on the logged event.
  var tmpTime = new Date().getTime();

  // Make sure the lastEvent are as much up to date as possible,
  // by copying it's value and setting it to the new emediatly
  var lastEvent = this.lastEvent;
  this.lastEvent = tmpTime;

  // Make sure we have an object
  data = data || {};
  if(typeof data !== 'object') {
    data = { event: data };
  }

  // Calculate the timers
  data.time = tmpTime;
  data.elapsed = tmpTime - lastEvent;
  data.elapsedTotal = tmpTime - this.started;

  // Don't wait for the garbage collector...
  delete tmpTime;
  delete data;
  delete lastEvent;

  // Set the event data and return it
  return this.events[newLength - 1] = data;
};
