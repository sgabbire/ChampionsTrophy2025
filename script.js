// API Configuration
const API_KEY = 'b9dc411505msh700c2efc4095195p13cde7jsnf83e5f65d28f';
const BASE_URL = 'https://cricket-live-data.p.rapidapi.com';

// Common headers for API requests
const API_HEADERS = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com'
};

// Loading state
let isLoading = true;

// Helper function to convert time to UTC
function convertToUTC(date, time, timezone) {
    const [day, month, year] = date.split(' ');
    const [hours, minutes] = time.split(':');
    
    // Create date in local timezone
    const localDate = new Date(year, getMonthNumber(month), parseInt(day));
    
    // Convert time based on timezone
    if (timezone === 'PKT') { // Pakistan is UTC+5
        localDate.setUTCHours(parseInt(hours) - 5, parseInt(minutes));
    } else if (timezone === 'GST') { // Gulf Standard Time is UTC+4
        localDate.setUTCHours(parseInt(hours) - 4, parseInt(minutes));
    }
    
    return localDate.toISOString();
}

// Helper function to get month number
function getMonthNumber(month) {
    const months = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return months[month];
}

// Function to get Champions Trophy matches
function getChampionsTrophyMatches() {
    return [
        {
            id: 1,
            team1: { name: 'Pakistan', flag: 'https://flagcdn.com/pk.svg' },
            team2: { name: 'New Zealand', flag: 'https://flagcdn.com/nz.svg' },
            date: convertToUTC('19 Feb 2025', '14:00', 'PKT'),
            venue: 'National Stadium, Karachi, Pakistan'
        },
        {
            id: 2,
            team1: { name: 'Bangladesh', flag: 'https://flagcdn.com/bd.svg' },
            team2: { name: 'India', flag: 'https://flagcdn.com/in.svg' },
            date: convertToUTC('20 Feb 2025', '13:00', 'GST'),
            venue: 'Dubai International Cricket Stadium, Dubai'
        },
        {
            id: 3,
            team1: { name: 'Afghanistan', flag: 'https://flagcdn.com/af.svg' },
            team2: { name: 'South Africa', flag: 'https://flagcdn.com/za.svg' },
            date: convertToUTC('21 Feb 2025', '14:00', 'PKT'),
            venue: 'National Stadium, Karachi, Pakistan'
        },
        {
            id: 4,
            team1: { name: 'Australia', flag: 'https://flagcdn.com/au.svg' },
            team2: { name: 'England', flag: 'https://flagcdn.com/gb-eng.svg' },
            date: convertToUTC('22 Feb 2025', '14:00', 'PKT'),
            venue: 'Gaddafi Stadium, Lahore, Pakistan'
        },
        {
            id: 5,
            team1: { name: 'Pakistan', flag: 'https://flagcdn.com/pk.svg' },
            team2: { name: 'India', flag: 'https://flagcdn.com/in.svg' },
            date: convertToUTC('23 Feb 2025', '13:00', 'GST'),
            venue: 'Dubai International Cricket Stadium, Dubai'
        },
        {
            id: 6,
            team1: { name: 'Bangladesh', flag: 'https://flagcdn.com/bd.svg' },
            team2: { name: 'New Zealand', flag: 'https://flagcdn.com/nz.svg' },
            date: convertToUTC('24 Feb 2025', '14:00', 'PKT'),
            venue: 'Rawalpindi Cricket Stadium, Rawalpindi, Pakistan'
        },
        {
            id: 7,
            team1: { name: 'Australia', flag: 'https://flagcdn.com/au.svg' },
            team2: { name: 'South Africa', flag: 'https://flagcdn.com/za.svg' },
            date: convertToUTC('25 Feb 2025', '14:00', 'PKT'),
            venue: 'Rawalpindi Cricket Stadium, Rawalpindi, Pakistan'
        },
        {
            id: 8,
            team1: { name: 'Afghanistan', flag: 'https://flagcdn.com/af.svg' },
            team2: { name: 'England', flag: 'https://flagcdn.com/gb-eng.svg' },
            date: convertToUTC('26 Feb 2025', '14:00', 'PKT'),
            venue: 'Gaddafi Stadium, Lahore, Pakistan'
        },
        {
            id: 9,
            team1: { name: 'Pakistan', flag: 'https://flagcdn.com/pk.svg' },
            team2: { name: 'Bangladesh', flag: 'https://flagcdn.com/bd.svg' },
            date: convertToUTC('27 Feb 2025', '14:00', 'PKT'),
            venue: 'Rawalpindi Cricket Stadium, Rawalpindi, Pakistan'
        },
        {
            id: 10,
            team1: { name: 'Afghanistan', flag: 'https://flagcdn.com/af.svg' },
            team2: { name: 'Australia', flag: 'https://flagcdn.com/au.svg' },
            date: convertToUTC('28 Feb 2025', '14:00', 'PKT'),
            venue: 'Gaddafi Stadium, Lahore, Pakistan'
        },
        {
            id: 11,
            team1: { name: 'South Africa', flag: 'https://flagcdn.com/za.svg' },
            team2: { name: 'England', flag: 'https://flagcdn.com/gb-eng.svg' },
            date: convertToUTC('1 Mar 2025', '14:00', 'PKT'),
            venue: 'National Stadium, Karachi, Pakistan'
        },
        {
            id: 12,
            team1: { name: 'New Zealand', flag: 'https://flagcdn.com/nz.svg' },
            team2: { name: 'India', flag: 'https://flagcdn.com/in.svg' },
            date: convertToUTC('2 Mar 2025', '13:00', 'GST'),
            venue: 'Dubai International Cricket Stadium, Dubai'
        }
    ];
}

// Function to calculate time remaining
function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

// Function to initialize countdown
function initializeCountdown(matchElement, endtime) {
    const countdown = matchElement.querySelector('.countdown');
    const daysSpan = countdown.querySelector('.days');
    const hoursSpan = countdown.querySelector('.hours');
    const minutesSpan = countdown.querySelector('.minutes');
    const secondsSpan = countdown.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days.toString().padStart(2, '0');
        hoursSpan.innerHTML = t.hours.toString().padStart(2, '0');
        minutesSpan.innerHTML = t.minutes.toString().padStart(2, '0');
        secondsSpan.innerHTML = t.seconds.toString().padStart(2, '0');

        if (t.total <= 0) {
            clearInterval(timeinterval);
            daysSpan.innerHTML = '00';
            hoursSpan.innerHTML = '00';
            minutesSpan.innerHTML = '00';
            secondsSpan.innerHTML = '00';
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
    return timeinterval;
}

// Function to create match cards with animation
function createMatchCard(match) {
    const template = document.getElementById('match-template');
    const matchCard = template.content.cloneNode(true);
    const card = matchCard.querySelector('.match-card');
    
    // Add animation class
    card.classList.add('animate__animated', 'animate__fadeInUp');
    
    // Set match date and venue
    const matchDate = new Date(match.date);
    matchCard.querySelector('.match-date').textContent = matchDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
    matchCard.querySelector('.venue-text').textContent = match.venue;

    // Set team information with flag loading animation
    const team1Element = matchCard.querySelector('.team-1');
    const team2Element = matchCard.querySelector('.team-2');

    const team1Flag = team1Element.querySelector('.team-flag');
    const team2Flag = team2Element.querySelector('.team-flag');

    team1Flag.onload = () => team1Flag.classList.add('loaded');
    team2Flag.onload = () => team2Flag.classList.add('loaded');

    team1Flag.src = match.team1.flag;
    team1Flag.alt = `${match.team1.name} flag`;
    team1Element.querySelector('.team-name').textContent = match.team1.name;

    team2Flag.src = match.team2.flag;
    team2Flag.alt = `${match.team2.name} flag`;
    team2Element.querySelector('.team-name').textContent = match.team2.name;

    // Add the match card to the container
    document.querySelector('.matches-container').appendChild(matchCard);

    // Initialize countdown for this match
    const matchElement = document.querySelector('.matches-container').lastElementChild;
    initializeCountdown(matchElement, match.date);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const matches = getChampionsTrophyMatches();
    
    // Add matches with staggered animation
    matches.forEach((match, index) => {
        setTimeout(() => createMatchCard(match), index * 200);
    });
}); 
