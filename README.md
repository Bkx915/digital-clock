# 🕐 Digital Clock - Multiple Time Zones

A modern web application that displays the current time across multiple time zones around the world.

## Features

✨ **Key Features:**
- 📍 Display time for 40+ timezones worldwide
- 🎯 Add or remove timezones on the fly
- 🔍 Search functionality for both global and local timezone filtering
- 💾 Automatic saving of selected timezones (localStorage)
- 🌍 Shows UTC offset, date, and day of the week for each timezone
- 📱 Responsive design - works on mobile and desktop
- ⚡ Real-time updates every second
- 🎨 Modern gradient UI with smooth animations

## Supported Timezones

Includes major timezones from:
- **Americas**: New York, Los Angeles, Chicago, Toronto, Mexico City, São Paulo, Buenos Aires
- **Europe**: London, Paris, Berlin, Madrid, Rome, Moscow, Istanbul
- **Asia**: Dubai, India, Bangkok, Hong Kong, Shanghai, Tokyo, Seoul
- **Australia & Pacific**: Sydney, Melbourne, Auckland, Fiji, Honolulu
- **Africa**: Cairo, Johannesburg, Lagos, Nairobi
- **UTC**: Universal Coordinated Time

## How to Use

1. **View Default Clocks**: The app starts with 4 popular timezones (UTC, New York, London, Tokyo)
2. **Add a Timezone**: Click the **"+ Add Timezone"** button
3. **Search**: Use the search box in the modal to find a specific timezone
4. **Remove a Timezone**: Click the **×** button on any clock card
5. **Filter**: Use the search box at the top to filter displayed clocks

## Information Displayed

For each timezone:
- **Digital Time**: HH:MM:SS in 24-hour format
- **Date**: MM/DD/YYYY
- **UTC Offset**: Time difference from UTC
- **Day of Week**: Current day name
- **AM/PM**: Current period indicator

## Technical Details

**Technologies Used:**
- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (ES6+)
- localStorage API for persistence
- Intl.DateTimeFormat API for accurate timezone conversion

**Browser Compatibility:**
- Chrome/Edge 24+
- Firefox 29+
- Safari 10+
- Opera 15+

## File Structure

```
digital-clock/
├── index.html      # HTML structure
├── styles.css      # Styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Features Explained

### Real-time Updates
The clock updates every second, displaying the exact current time for each timezone.

### Persistent Storage
Your selected timezones are automatically saved to your browser's localStorage, so they'll be remembered when you return.

### Search Functionality
- **Global Search**: Search for timezones in the modal before adding
- **Local Search**: Filter currently displayed clocks by timezone name

### Responsive Design
Adapts beautifully to different screen sizes from mobile phones to desktop computers.

## Installation

No installation needed! Simply:
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start adding timezones!

Or use GitHub Pages if available.

## License

Open source - feel free to use, modify, and distribute.

## Contributing

Feel free to fork, modify, and create pull requests with improvements!
