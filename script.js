// List of all timezones
const allTimezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Denver',
    'America/Toronto',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'America/Argentina/Buenos_Aires',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Amsterdam',
    'Europe/Brussels',
    'Europe/Vienna',
    'Europe/Prague',
    'Europe/Warsaw',
    'Europe/Moscow',
    'Europe/Istanbul',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Hong_Kong',
    'Asia/Shanghai',
    'Asia/Singapore',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Asia/Bangkok',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Brisbane',
    'Australia/Perth',
    'Pacific/Auckland',
    'Pacific/Fiji',
    'Pacific/Honolulu',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'Africa/Nairobi',
];

// Get DOM elements
const addTimezoneBtn = document.getElementById('addTimezoneBtn');
const modal = document.getElementById('timezoneModal');
const closeBtn = document.querySelector('.close');
const timezoneSearch = document.getElementById('timezoneSearch');
const timezoneList = document.getElementById('timezoneList');
const clocksContainer = document.getElementById('clocksContainer');
const defaultMessage = document.getElementById('defaultMessage');
const searchInput = document.getElementById('searchInput');

// Store selected timezones
let selectedTimezones = localStorage.getItem('selectedTimezones') 
    ? JSON.parse(localStorage.getItem('selectedTimezones')) 
    : ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

// Initialize
function init() {
    renderClocks();
    setupEventListeners();
    startClockUpdates();
}

// Setup event listeners
function setupEventListeners() {
    addTimezoneBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    timezoneSearch.addEventListener('input', filterTimezones);
    searchInput.addEventListener('input', filterLocalClocks);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Open modal
function openModal() {
    modal.style.display = 'block';
    populateTimezoneList('');
    timezoneSearch.value = '';
    timezoneSearch.focus();
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Populate timezone list
function populateTimezoneList(searchTerm) {
    const filtered = allTimezones.filter(tz => 
        tz.toLowerCase().includes(searchTerm.toLowerCase())
    );

    timezoneList.innerHTML = filtered.map(tz => `
        <div class="timezone-item" onclick="addTimezone('${tz}')">
            ${tz}
        </div>
    `).join('');
}

// Filter timezones in modal
function filterTimezones() {
    populateTimezoneList(timezoneSearch.value);
}

// Add timezone
function addTimezone(timezone) {
    if (!selectedTimezones.includes(timezone)) {
        selectedTimezones.push(timezone);
        saveTimezones();
        renderClocks();
    }
    closeModal();
}

// Remove timezone
function removeTimezone(timezone) {
    selectedTimezones = selectedTimezones.filter(tz => tz !== timezone);
    saveTimezones();
    renderClocks();
}

// Save timezones to localStorage
function saveTimezones() {
    localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
}

// Filter local clocks
function filterLocalClocks() {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.clock-card');
    
    cards.forEach(card => {
        const tzName = card.querySelector('.timezone-name').textContent.toLowerCase();
        card.style.display = tzName.includes(searchTerm) ? 'block' : 'none';
    });
}

// Format time for a timezone
function formatTime(timezone) {
    try {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const parts = formatter.formatToParts(date);
        const timeObj = {};
        
        parts.forEach(part => {
            timeObj[part.type] = part.value;
        });
        
        return {
            time: `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`,
            date: `${timeObj.month}/${timeObj.day}/${timeObj.year}`,
            dayOfWeek: new Date(date.toLocaleString('en-US', { timeZone: timezone })).toLocaleDateString('en-US', { weekday: 'long' }),
            hour: parseInt(timeObj.hour),
            minute: parseInt(timeObj.minute)
        };
    } catch (e) {
        console.error(`Invalid timezone: ${timezone}`);
        return null;
    }
}

// Get UTC offset
function getUTCOffset(timezone) {
    try {
        const date = new Date();
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        const offset = (tzDate - utcDate) / (1000 * 60 * 60);
        
        const sign = offset >= 0 ? '+' : '-';
        const hours = String(Math.floor(Math.abs(offset))).padStart(2, '0');
        const minutes = String((Math.abs(offset) % 1) * 60).padStart(2, '0');
        
        return `UTC ${sign}${hours}:${minutes}`;
    } catch (e) {
        return 'UTC';
    }
}

// Render clocks
function renderClocks() {
    if (selectedTimezones.length === 0) {
        clocksContainer.innerHTML = '';
        defaultMessage.style.display = 'block';
        return;
    }
    
    defaultMessage.style.display = 'none';
    
    clocksContainer.innerHTML = selectedTimezones.map(timezone => {
        const timeData = formatTime(timezone);
        if (!timeData) return '';
        
        return `
            <div class="clock-card">
                <div class="timezone-name">
                    <span>${timezone.replace(/_/g, ' ')}</span>
                    <button class="remove-btn" onclick="removeTimezone('${timezone}')">×</button>
                </div>
                <div class="digital-display" id="display-${timezone}">
                    ${timeData.time}
                </div>
                <div class="time-info">
                    <div class="info-item">
                        <div class="info-label">Date</div>
                        <div class="info-value">${timeData.date}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Offset</div>
                        <div class="info-value">${getUTCOffset(timezone)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Day</div>
                        <div class="info-value">${timeData.dayOfWeek}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Period</div>
                        <div class="info-value">${timeData.hour >= 12 ? 'PM' : 'AM'}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update clocks
function updateClocks() {
    selectedTimezones.forEach(timezone => {
        const display = document.getElementById(`display-${timezone}`);
        if (display) {
            const timeData = formatTime(timezone);
            if (timeData) {
                display.textContent = timeData.time;
            }
        }
    });
}

// Start clock updates
function startClockUpdates() {
    updateClocks();
    setInterval(updateClocks, 1000);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);