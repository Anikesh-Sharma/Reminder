let reminders = [];

function addReminder(title, time) {
    const reminderId = setTimeout(() => {
        alert(`Reminder: ${title}`);
        removeReminder(reminderId);
    }, new Date(time) - new Date());

    reminders.push({ id: reminderId, title, time });
    renderReminders();
}

function modifyReminder(reminderId) {
    const reminder = reminders.find(r => r.id === reminderId);
    const newTitle = prompt('Update reminder title:', reminder.title);
    const newTime = prompt('Update reminder time (yyyy-mm-ddThh:mm):', reminder.time);

    if (newTitle && newTime) {
        clearTimeout(reminderId);
        reminders = reminders.filter(r => r.id !== reminderId);
        addReminder(newTitle, newTime);
    }
}

function removeReminder(reminderId) {
    clearTimeout(reminderId);
    reminders = reminders.filter(r => r.id !== reminderId);
    renderReminders();
}

function renderReminders() {
    const reminderList = document.getElementById('reminder-list');
    reminderList.innerHTML = '';

    reminders.forEach(reminder => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${reminder.title} - ${new Date(reminder.time).toLocaleString()}
            <div>
                <button onclick="modifyReminder(${reminder.id})">Edit</button>
                <button onclick="removeReminder(${reminder.id})">Delete</button>
            </div>
        `;
        reminderList.appendChild(li);
    });
}

document.getElementById('add-reminder').addEventListener('click', () => {
    const title = document.getElementById('reminder-title').value;
    const time = document.getElementById('reminder-time').value;

    if (title && time) {
        addReminder(title, time);
        document.getElementById('reminder-form').reset();
    } else {
        alert('Please enter both title and time.');
    }
});
