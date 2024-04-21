function copyCalendarEvents() {
  var sourceCalendarId = 'source@import.calendar.google.com';
  var destinationCalendarId = 'destination@gmail.com';
  var weintraubeColorId = 3; // Replace 7 with the actual color ID https://google-calendar-simple-api.readthedocs.io/en/latest/colors.html

  var sourceCalendar = CalendarApp.getCalendarById(sourceCalendarId);
  var destinationCalendar = CalendarApp.getCalendarById(destinationCalendarId);

  var today = new Date();
  var twoYearsAhead = new Date();
  twoYearsAhead.setFullYear(today.getFullYear() + 2);

  var sourceEvents = sourceCalendar.getEvents(today, twoYearsAhead);
  var destEvents = destinationCalendar.getEvents(today, twoYearsAhead);

  var destEventsMap = {};
  destEvents.forEach(function(event) {
    var key = generateEventKey(event);
    if (!destEventsMap[key]) {
      destEventsMap[key] = [];
    }
    destEventsMap[key].push(event);
  });

  for (var i = 0; i < sourceEvents.length; i++) {
    var event = sourceEvents[i];
    var eventKey = generateEventKey(event);

    if (!destEventsMap[eventKey]) {
      // Create event if it does not exist
      var options = {location: event.getLocation(), description: event.getDescription()};
      var newEvent = destinationCalendar.createEvent(event.getTitle(), event.getStartTime(), event.getEndTime(), options);
      newEvent.setColor(weintraubeColorId);
      Logger.log('Event created: ' + event.getTitle());
    } else {
      // Check if the color needs updating
      destEventsMap[eventKey].forEach(function(existingEvent) {
        if (existingEvent.getColor() !== weintraubeColorId) {
          existingEvent.setColor(weintraubeColorId);
          Logger.log('Event color updated: ' + existingEvent.getTitle());
        }
      });
    }
  }
}

function generateEventKey(event) {
  return [
    event.getTitle(),
    event.getStartTime().toISOString(),
    event.getEndTime().toISOString(),
    event.getDescription(),
    event.getLocation()
  ].join('|');
}
