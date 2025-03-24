# automatic-google-calender-scheduling
Automatic Google Calender Scheduling

## 📘 README: Schedule a Google Apps Script to Run Automatically

### 🔧 Prerequisites
- A Google account
- Access to [Google Apps Script](https://script.google.com/)
- A working script (e.g., `colorAllInvitations()`)

---

### ✅ Step 1: Open Google Apps Script

1. Go to [script.google.com](https://script.google.com/)
2. Click **`+ New Project`**
3. Give your project a name (e.g., `AutoColorInvites`)
4. Paste your function, e.g.:

```javascript
function colorAllInvitations() {
  const calendar = CalendarApp.getDefaultCalendar();
  const myEmail = Session.getActiveUser().getEmail();
  const events = calendar.getEvents(
    new Date(), 
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );

  for (const event of events) {
    const creators = event.getCreators();
    if (!creators.includes(myEmail)) {
      event.setColor(CalendarApp.EventColor.PALE_RED);
    }
  }
}
```

---

### ✅ Step 2: Test the Script Manually (Optional but recommended)

1. Click the **`▶ Run`** button in the toolbar.
2. Grant necessary permissions (Google will prompt you).
3. Check your calendar to confirm the events changed color.

---

### 🔁 Step 3: Add a Time-Based Trigger

1. Click the **clock icon** on the left bar (🕒 “Triggers”), or go to `Triggers` > `Add Trigger`
2. Click **`+ Add Trigger`** (bottom-right)
3. Configure:
   - **Function to run:** `colorAllInvitations`
   - **Deployment:** Head (default)
   - **Event source:** Time-driven
   - **Type of time-based trigger:**
     - Choose one:
       - Every hour
       - Every day
       - Every week
   - (Optional) Pick specific time of day

4. Click **Save**

✅ Done! Your script will now run on the schedule you selected.

---

### 🧼 Optional Tips

- **Limit event range** (e.g., next 7 days instead of 30) to improve performance.
- **Add logging** with `Logger.log()` for debugging.
- **Email yourself** on completion (for notification/debugging).

