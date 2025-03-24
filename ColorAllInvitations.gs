// Color all invitations in your google calender so that you can see its from someone else
function colorAllInvitations() {
  const calendar = CalendarApp.getDefaultCalendar();
  const myEmail = Session.getActiveUser().getEmail();
  const events = calendar.getEvents(
    new Date(), 
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
  );

  for (const event of events) {
    const creators = event.getCreators();
    // If you didn’t create the event, assume it's an invitation
    if (!creators.includes(myEmail)) {
      event.setColor(CalendarApp.EventColor.YELLOW); // Set your preferred color
    }
  }