// Popular baby names from the last 10 years
const POPULAR_NAMES = [
    // Required names
    'Harry', 'Jude', 'Hugh', 'Kajewski',
    // Top 200 popular names (mixed from 2015-2025)
    'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Theodore',
    'Jack', 'Levi', 'Alexander', 'Jackson', 'Mateo', 'Daniel', 'Michael', 'Mason', 'Sebastian', 'Ethan',
    'Logan', 'Owen', 'Samuel', 'Jacob', 'Asher', 'Aiden', 'John', 'Joseph', 'Wyatt', 'David',
    'Leo', 'Luke', 'Julian', 'Hudson', 'Grayson', 'Matthew', 'Ezra', 'Gabriel', 'Carter', 'Isaac',
    'Jayden', 'Luca', 'Anthony', 'Dylan', 'Lincoln', 'Thomas', 'Maverick', 'Elias', 'Josiah', 'Charles',
    'Caleb', 'Christopher', 'Ezekiel', 'Miles', 'Jaxon', 'Isaiah', 'Andrew', 'Joshua', 'Nathan', 'Nolan',
    'Adrian', 'Cameron', 'Santiago', 'Eli', 'Aaron', 'Ryan', 'Angel', 'Cooper', 'Waylon', 'Easton',
    'Kai', 'Christian', 'Landon', 'Colton', 'Roman', 'Axel', 'Brooks', 'Jonathan', 'Robert', 'Jameson',
    'Ian', 'Everett', 'Greyson', 'Wesley', 'Jeremiah', 'Hunter', 'Leonardo', 'Jordan', 'Jose', 'Bennett',
    'Silas', 'Nicholas', 'Parker', 'Beau', 'Weston', 'Austin', 'Connor', 'Carson', 'Dominic', 'Xavier',
    'Jaxson', 'Jace', 'Emmett', 'Adam', 'Declan', 'Rowan', 'Micah', 'Kayden', 'Gael', 'River',
    'Ryder', 'Kingston', 'Damian', 'Sawyer', 'Luka', 'Jonah', 'Evan', 'Cole', 'Brody', 'Ayden',
    'Braxton', 'Maxwell', 'Bryson', 'Thiago', 'Theo', 'Ashton', 'August', 'Ace', 'Rhett', 'Elliott',
    'Finn', 'Vincent', 'Elliot', 'Enzo', 'Maximus', 'Maddox', 'Archer', 'Jasper', 'Knox', 'Milo',
    'Simon', 'Ryker', 'Arthur', 'Kai', 'Kingston', 'Dean', 'Bodhi', 'Hayes', 'Zachary', 'Tucker',
    'Tyler', 'Matteo', 'Beckett', 'Bradley', 'Jeremy', 'Zion', 'Blake', 'Carlos', 'Kaiden', 'Tristan',
    'Calvin', 'Karter', 'Richard', 'Hayden', 'Griffin', 'Ivan', 'Jesse', 'Marcus', 'Camden', 'Judah',
    'Peter', 'Felix', 'Timothy', 'Eduardo', 'Rylan', 'Steven', 'Preston', 'Oscar', 'Lukas', 'George',
    'Harrison', 'Patrick', 'Kyrie', 'Louis', 'Emmanuel', 'Bruce', 'Kingston', 'Cody', 'Graham', 'Callum',
    'Jensen', 'Johnny', 'Crew', 'Legend', 'Brayden', 'Atlas', 'Phoenix', 'Jax', 'Messiah', 'Myles'
];

// Sound effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let soundMuted = true;

// Custom audio files
const customSounds = {};

// Sound queue to prevent overlapping
let soundQueue = [];
let currentlyPlaying = null;
let announcementTimeouts = []; // Track setTimeout IDs for announcements

// Preload custom audio files
function preloadCustomSounds() {
    const soundFiles = {
        'strike': [
            'sounds/Strike.m4a',
            'sounds/Swing miss - serious.m4a',
            'sounds/Swing miss what is that.m4a',
            'sounds/Turn belly button missed swing.m4a'
        ],
        'strikeout': [
            'sounds/Strike 3.m4a',
            'sounds/Struck out swinging.m4a',
            'sounds/Swing and miss kid doesn\'t play baseball.m4a',
            'sounds/Take a seat.m4a'
        ],
        'out': [
            'sounds/Out.m4a',
            'sounds/You are out.m4a'
        ],
        'popout': [
            'sounds/Pop out.m4a',
            'sounds/Great catch.m4a'
        ],
        'ball': [
            'sounds/Ball.m4a'
        ],
        'walk': [
            'sounds/Ball 4 take your base.m4a',
            'sounds/Walk 1.m4a',
            'sounds/Walk 2.m4a'
        ],
        'hit': [
            'sounds/Great hit.m4a',
            'sounds/Did you just see that.m4a'
        ],
        'single': [
            'sounds/Single.m4a',
            'sounds/Single 2.m4a'
        ],
        'double': [
            'sounds/Double 1.m4a',
            'sounds/Double 2.m4a'
        ],
        'triple': [
            'sounds/Triple 1.m4a',
            'sounds/Triple 2.m4a'
        ],
        'homerun': [
            'sounds/Home run buddy boy.m4a',
            'sounds/Home run outta here.m4a',
            'sounds/That\'s a home run.m4a',
            'sounds/Unbelievable.m4a'
        ],
        'crowd': [
            'sounds/Clapping.m4a'
        ],
        'foul': [
            // No sound for foul balls - removed bunt sounds per user request
        ],
        'bunt': [
            'sounds/Bunt.m4a'
        ],
        'buntSacrifice': [
            'sounds/Bunt sacrifice.m4a'
        ],
        'buntOut': [
            'sounds/Bunt out.m4a'
        ],
        'buntHit': [
            'sounds/Bunt successful hit.m4a'
        ],
        'error': [
            'sounds/Error.m4a'
        ],
        'endInning': [
            'sounds/End of inning.m4a'
        ],
        'endTopInning': [
            'sounds/End of top inning.m4a'
        ],
        'gameOver': [
            'sounds/That\'s ballgame.m4a'
        ],
        'undo': [
            'sounds/Undo.m4a'
        ],
        'simulate': [
            'sounds/Simulate batter.m4a'
        ],
        'scoreNumbers': {},
        'scoreTheScoreIs': 'sounds/ScoreSounds/The score is.m4a',
        'scoreTo': 'sounds/ScoreSounds/To.m4a',
        'scoreHomeLeads': 'sounds/ScoreSounds/Home team leads.m4a',
        'scoreAwayLeads': 'sounds/ScoreSounds/Away team leads.m4a',
        'scoreTie': 'sounds/ScoreSounds/Tie ball game.m4a',
        'scoreHomeWins': 'sounds/ScoreSounds/Home team wins.m4a',
        'scoreVisitorWins': 'sounds/ScoreSounds/Visitor team wins.m4a',
        'scoreThatsTheBallgame': 'sounds/ScoreSounds/That\'s the ballgame.m4a',
        'scoreTooMany': 'sounds/ScoreSounds/Too many to count.m4a',
        'scoreAlsoTooMany': 'sounds/ScoreSounds/Also too many to count.m4a'
    };
    
    // Preload number sounds 0-25
    for (let i = 0; i <= 25; i++) {
        soundFiles.scoreNumbers[i] = `sounds/ScoreSounds/${i}.m4a`;
    }
    
    for (const [type, paths] of Object.entries(soundFiles)) {
        // Skip scoreNumbers object - handle it separately
        if (type === 'scoreNumbers') {
            customSounds[type] = {};
            for (const [num, path] of Object.entries(paths)) {
                const audio = new Audio(path);
                audio.preload = 'auto';
                audio.onerror = () => {
                    console.log(`Score number sound '${num}' not found`);
                };
                customSounds[type][num] = audio;
            }
            continue;
        }
        
        // Handle special score sounds (single files)
        if (type.startsWith('score') && typeof paths === 'string') {
            const audio = new Audio(paths);
            audio.preload = 'auto';
            audio.onerror = () => {
                console.log(`Score sound '${type}' not found`);
            };
            customSounds[type] = audio;
            continue;
        }
        
        customSounds[type] = [];
        const pathArray = Array.isArray(paths) ? paths : [paths];
        pathArray.forEach(path => {
            const audio = new Audio(path);
            audio.preload = 'auto';
            audio.onerror = () => {
                console.log(`Custom sound '${type}' at '${path}' not found`);
            };
            customSounds[type].push(audio);
        });
    }
}

// Call preload when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCustomSounds);
} else {
    preloadCustomSounds();
}

function toggleSound() {
    soundMuted = !soundMuted;
    const muteBtn = document.getElementById('muteBtn');
    const unmuteBtn = document.getElementById('unmuteBtn');
    
    if (soundMuted) {
        if (muteBtn) muteBtn.style.display = 'none';
        if (unmuteBtn) unmuteBtn.style.display = 'inline-flex';
    } else {
        if (muteBtn) muteBtn.style.display = 'inline-flex';
        if (unmuteBtn) unmuteBtn.style.display = 'none';
    }
}

function cancelAllSounds() {
    // Clear the queue
    soundQueue = [];
    
    // Clear all pending announcement timeouts
    announcementTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    announcementTimeouts = [];
    
    // Stop currently playing sound
    if (currentlyPlaying) {
        try {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
        } catch (e) {
            // Ignore errors if sound can't be stopped
        }
        currentlyPlaying = null;
    }
}

function playSound(type, allowOverlap = false) {
    if (soundMuted) return; // Don't play if muted
    
    // Clapping/crowd sounds can overlap with anything
    if (type === 'crowd' || allowOverlap) {
        playImmediately(type);
        return;
    }
    
    // Handle special score sound types
    if (type.startsWith('score')) {
        playImmediately(type);
        return;
    }
    
    // Add to queue for sequential playback
    soundQueue.push(type);
    processNextSound();
}

function processNextSound() {
    // If already playing something, wait
    if (currentlyPlaying) return;
    
    // If queue is empty, nothing to do
    if (soundQueue.length === 0) return;
    
    // Get next sound from queue
    const type = soundQueue.shift();
    playImmediately(type);
}

function playImmediately(type) {
    // Handle score number sounds
    if (type.startsWith('scoreNum_')) {
        const num = type.replace('scoreNum_', '');
        if (customSounds.scoreNumbers && customSounds.scoreNumbers[num]) {
            const audio = customSounds.scoreNumbers[num].cloneNode();
            audio.volume = 0.7;
            
            currentlyPlaying = audio;
            audio.onended = () => {
                currentlyPlaying = null;
                setTimeout(processNextSound, 100);
            };
            audio.onerror = () => {
                currentlyPlaying = null;
                setTimeout(processNextSound, 100);
            };
            audio.play().catch(() => {
                currentlyPlaying = null;
                setTimeout(processNextSound, 100);
            });
            return;
        }
    }
    
    // Handle special single-file score sounds
    if (type.startsWith('score') && customSounds[type] && !Array.isArray(customSounds[type])) {
        const audio = customSounds[type].cloneNode();
        audio.volume = 0.7;
        
        currentlyPlaying = audio;
        audio.onended = () => {
            currentlyPlaying = null;
            setTimeout(processNextSound, 100);
        };
        audio.onerror = () => {
            currentlyPlaying = null;
            setTimeout(processNextSound, 100);
        };
        audio.play().catch(() => {
            currentlyPlaying = null;
            setTimeout(processNextSound, 100);
        });
        return;
    }
    
    // Try to play custom sound first
    if (customSounds[type] && customSounds[type].length > 0) {
        // Randomly select from available sounds of this type
        const randomIndex = Math.floor(Math.random() * customSounds[type].length);
        const audio = customSounds[type][randomIndex].cloneNode();
        audio.volume = 0.7; // Adjust volume as needed
        
        currentlyPlaying = audio;
        
        audio.onended = () => {
            currentlyPlaying = null;
            // Process next sound in queue after a small delay
            setTimeout(processNextSound, 100);
        };
        
        audio.onerror = () => {
            currentlyPlaying = null;
            // If custom sound fails, fall back to synthesized
            playSynthesizedSound(type);
            setTimeout(processNextSound, 100);
        };
        
        audio.play().catch(() => {
            currentlyPlaying = null;
            playSynthesizedSound(type);
            setTimeout(processNextSound, 100);
        });
        return;
    }
    
    // Fall back to synthesized sound
    playSynthesizedSound(type);
    // Synthesized sounds are short, mark as done quickly
    setTimeout(() => {
        currentlyPlaying = null;
        processNextSound();
    }, 500);
}

function playSynthesizedSound(type) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sounds for different events
    switch(type) {
        case 'strike':
            oscillator.frequency.value = 440; // A4
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'ball':
            oscillator.frequency.value = 330; // E4
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'foul':
            oscillator.frequency.value = 550; // C#5
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.08);
            break;
        case 'out':
            // Buzzer sound - harsh square wave
            oscillator.frequency.value = 120; // Low frequency buzzer
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
        case 'hit':
            oscillator.frequency.value = 660; // E5
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'homerun':
            // Ascending tone
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.6);
            break;
        case 'crowd':
            // Crowd roar simulation (white noise)
            const bufferSize = audioContext.sampleRate * 1; // 1 second
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = audioContext.createBufferSource();
            noise.buffer = buffer;
            const filter = audioContext.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1000;
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            noise.start(audioContext.currentTime);
            noise.stop(audioContext.currentTime + 0.8);
            return; // Exit early since we're not using oscillator
        case 'gameOver':
            // Victory music - 10 second melody
            const melody = [
                {freq: 523, time: 0, duration: 0.3},    // C5
                {freq: 587, time: 0.35, duration: 0.3},  // D5
                {freq: 659, time: 0.7, duration: 0.3},   // E5
                {freq: 698, time: 1.05, duration: 0.3},  // F5
                {freq: 784, time: 1.4, duration: 0.6},   // G5
                {freq: 784, time: 2.1, duration: 0.3},   // G5
                {freq: 784, time: 2.5, duration: 0.6},   // G5
                // Repeat pattern
                {freq: 659, time: 3.3, duration: 0.3},   // E5
                {freq: 698, time: 3.65, duration: 0.3},  // F5
                {freq: 784, time: 4.0, duration: 0.3},   // G5
                {freq: 880, time: 4.35, duration: 0.6},  // A5
                {freq: 880, time: 5.05, duration: 0.3},  // A5
                {freq: 880, time: 5.45, duration: 0.6},  // A5
                // Final flourish
                {freq: 1047, time: 6.2, duration: 0.4},  // C6
                {freq: 880, time: 6.7, duration: 0.3},   // A5
                {freq: 784, time: 7.1, duration: 0.3},   // G5
                {freq: 659, time: 7.5, duration: 0.8},   // E5
                {freq: 523, time: 8.4, duration: 1.2}    // C5 (hold)
            ];
            
            melody.forEach(note => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = note.freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.25, audioContext.currentTime + note.time);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.time + note.duration);
                osc.start(audioContext.currentTime + note.time);
                osc.stop(audioContext.currentTime + note.time + note.duration);
            });
            return; // Exit early
    }
}

// Capitalize first letter of team name input
function capitalizeTeamName(inputId) {
    const input = document.getElementById(inputId);
    if (input && input.value.length > 0) {
        const cursorPosition = input.selectionStart;
        const value = input.value;
        input.value = value.charAt(0).toUpperCase() + value.slice(1);
        // Restore cursor position
        input.setSelectionRange(cursorPosition, cursorPosition);
    }
}

// Game state
let gameState = {
    homeScore: 0,
    awayScore: 0,
    homeHits: 0,
    awayHits: 0,
    homeErrors: 0,
    awayErrors: 0,
    inning: 1,
    inningHalf: 'top',
    outs: 0,
    strikes: 0,
    balls: 0,
    runners: {
        first: false,
        second: false,
        third: false
    },
    currentContact: null,
    homeInnings: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
    awayInnings: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
    currentInningRuns: 0,
    lastPlay: '',
    strikeouts: 0,
    homeStrikeouts: 0, // Strikeouts by home pitcher
    awayStrikeouts: 0, // Strikeouts by away pitcher
    homePitchCount: 0, // Pitch count by home pitcher
    awayPitchCount: 0, // Pitch count by away pitcher
    homeStrikes: 0, // Strike count by home pitcher
    awayStrikes: 0, // Strike count by away pitcher
    homeHitsAllowed: 0, // Hits allowed by home pitcher
    awayHitsAllowed: 0, // Hits allowed by away pitcher
    homeLineup: [],
    awayLineup: [],
    currentHomeBatter: 0,
    currentAwayBatter: 0,
    homeTeamName: 'Home',
    awayTeamName: 'Away',
    gameMode: '2player', // '2player' or '1player'
    totalInnings: 6, // 3, 6, or 9
    gameOver: false // Track if game has ended
};

// DOM elements
const homeScoreEl = document.getElementById('homeScore');
const awayScoreEl = document.getElementById('awayScore');
const homeHitsEl = document.getElementById('homeHits');
const awayHitsEl = document.getElementById('awayHits');
const homeErrorsEl = document.getElementById('homeErrors');
const awayErrorsEl = document.getElementById('awayErrors');
const inningEl = document.getElementById('inning');
const messageEl = document.getElementById('message');
const pitchInputEl = document.getElementById('pitchInput');
const qualityInputEl = document.getElementById('qualityInput');
const batterEl = document.getElementById('batter');

// Home run animation tracking
let homeRunAnimationInterval = null;
let homeRunAnimationCount = 0;

// Game state history for undo functionality
let gameStateHistory = [];
const MAX_HISTORY = 50; // Keep last 50 states

// Save current state to history
function saveState() {
    // Deep clone the current state
    const stateCopy = JSON.parse(JSON.stringify({
        homeScore: gameState.homeScore,
        awayScore: gameState.awayScore,
        homeHits: gameState.homeHits,
        awayHits: gameState.awayHits,
        homeErrors: gameState.homeErrors,
        awayErrors: gameState.awayErrors,
        inning: gameState.inning,
        inningHalf: gameState.inningHalf,
        outs: gameState.outs,
        strikes: gameState.strikes,
        balls: gameState.balls,
        runners: gameState.runners,
        homeInnings: gameState.homeInnings,
        awayInnings: gameState.awayInnings,
        currentInningRuns: gameState.currentInningRuns,
        lastPlay: gameState.lastPlay,
        strikeouts: gameState.strikeouts,
        homeStrikeouts: gameState.homeStrikeouts,
        awayStrikeouts: gameState.awayStrikeouts,
        homePitchCount: gameState.homePitchCount,
        awayPitchCount: gameState.awayPitchCount,
        homeStrikes: gameState.homeStrikes,
        awayStrikes: gameState.awayStrikes,
        homeHitsAllowed: gameState.homeHitsAllowed,
        awayHitsAllowed: gameState.awayHitsAllowed,
        homeLineup: gameState.homeLineup,
        awayLineup: gameState.awayLineup,
        currentHomeBatter: gameState.currentHomeBatter,
        currentAwayBatter: gameState.currentAwayBatter,
        gameOver: gameState.gameOver
    }));
    
    gameStateHistory.push(stateCopy);
    
    // Keep history size manageable
    if (gameStateHistory.length > MAX_HISTORY) {
        gameStateHistory.shift();
    }
    
    updateUndoButton();
}

// Undo last action
function undoLastAction() {
    cancelAllSounds(); // Cancel any playing sounds
    if (gameStateHistory.length === 0) {
        showMessage('Nothing to undo!');
        return;
    }
    
    playSound('undo'); // Play undo sound
    
    // Get the last saved state
    const previousState = gameStateHistory.pop();
    
    // Restore all state properties
    gameState.homeScore = previousState.homeScore;
    gameState.awayScore = previousState.awayScore;
    gameState.homeHits = previousState.homeHits;
    gameState.awayHits = previousState.awayHits;
    gameState.homeErrors = previousState.homeErrors;
    gameState.awayErrors = previousState.awayErrors;
    gameState.inning = previousState.inning;
    gameState.inningHalf = previousState.inningHalf;
    gameState.outs = previousState.outs;
    gameState.strikes = previousState.strikes;
    gameState.balls = previousState.balls;
    gameState.runners = previousState.runners;
    gameState.homeInnings = previousState.homeInnings;
    gameState.awayInnings = previousState.awayInnings;
    gameState.currentInningRuns = previousState.currentInningRuns;
    gameState.lastPlay = previousState.lastPlay;
    gameState.strikeouts = previousState.strikeouts;
    gameState.homeStrikeouts = previousState.homeStrikeouts;
    gameState.awayStrikeouts = previousState.awayStrikeouts;
    gameState.homePitchCount = previousState.homePitchCount;
    gameState.awayPitchCount = previousState.awayPitchCount;
    gameState.homeStrikes = previousState.homeStrikes;
    gameState.awayStrikes = previousState.awayStrikes;
    gameState.homeHitsAllowed = previousState.homeHitsAllowed;
    gameState.awayHitsAllowed = previousState.awayHitsAllowed;
    gameState.homeLineup = previousState.homeLineup;
    gameState.awayLineup = previousState.awayLineup;
    gameState.currentHomeBatter = previousState.currentHomeBatter;
    gameState.currentAwayBatter = previousState.currentAwayBatter;
    gameState.gameOver = previousState.gameOver || false; // Restore gameOver flag
    
    updateDisplay();
    updateUndoButton();
    showMessage('Action undone! ↩️');
}

// Update undo button state
function updateUndoButton() {
    const undoBtn = document.getElementById('undoBtn');
    if (undoBtn) {
        undoBtn.disabled = gameStateHistory.length === 0;
        undoBtn.style.opacity = gameStateHistory.length === 0 ? '0.5' : '1';
    }
}

// Shuffle array function for randomizing lineups
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate lineup with required names guaranteed
// Generate both lineups with required names distributed across teams
function generateBothLineups(homeTeamName = 'Home', awayTeamName = 'Away') {
    const requiredNames = ['Harry', 'Jude', 'Hugh', 'Kajewski'];
    
    // Get all available names (excluding required ones initially)
    const availableNames = POPULAR_NAMES.filter(name => !requiredNames.includes(name));
    
    // Check if team names match any player names and force them to correct team
    const homeReservedPlayers = [];
    const awayReservedPlayers = [];
    const allPlayerNames = [...requiredNames, ...availableNames];
    
    // Always add team name as a player on that team (if not 'Home' or 'Away')
    if (homeTeamName !== 'Home' && homeTeamName !== 'home') {
        homeReservedPlayers.push(homeTeamName);
    }
    
    // Always add away team name as a player on that team (if not 'Home' or 'Away')
    if (awayTeamName !== 'Away' && awayTeamName !== 'away') {
        awayReservedPlayers.push(awayTeamName);
    }
    
    // Get remaining required names (not already reserved)
    const remainingRequiredNames = requiredNames.filter(
        name => !homeReservedPlayers.includes(name) && !awayReservedPlayers.includes(name)
    );
    
    // Calculate how many random players we need
    // Total: 18 players (9 per team)
    // Already reserved: homeReservedPlayers.length + awayReservedPlayers.length
    // Still need from required: remainingRequiredNames.length
    const totalReserved = homeReservedPlayers.length + awayReservedPlayers.length;
    const randomNeeded = 18 - totalReserved - remainingRequiredNames.length;
    
    // Get random names (excluding any reserved players)
    const excludedNames = [...requiredNames, ...homeReservedPlayers, ...awayReservedPlayers];
    const availableForRandom = POPULAR_NAMES.filter(name => !excludedNames.includes(name));
    const randomNames = [];
    const usedIndices = new Set();
    
    while (randomNames.length < randomNeeded) {
        const randomIndex = Math.floor(Math.random() * availableForRandom.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            randomNames.push(availableForRandom[randomIndex]);
        }
    }
    
    // Combine remaining required names and random names, then shuffle
    const poolNames = [...remainingRequiredNames, ...randomNames];
    shuffleArray(poolNames);
    
    // Build teams starting with reserved players
    const homeNames = [...homeReservedPlayers];
    const awayNames = [...awayReservedPlayers];
    
    // Distribute remaining players
    poolNames.forEach(name => {
        if (homeNames.length < 9) {
            homeNames.push(name);
        } else {
            awayNames.push(name);
        }
    });
    
    // Shuffle each team's lineup
    shuffleArray(homeNames);
    shuffleArray(awayNames);
    
    // Shuffle positions for each team
    const homePositions = ['CF', 'SS', 'RF', '1B', 'LF', '3B', '2B', 'C', 'P'];
    const awayPositions = ['CF', 'SS', 'RF', '1B', 'LF', '3B', '2B', 'C', 'P'];
    shuffleArray(homePositions);
    shuffleArray(awayPositions);
    
    // Create lineups
    const homeLineup = homeNames.map((name, index) => ({
        name: name,
        pos: homePositions[index],
        ab: 0,
        h: 0,
        k: 0,
        bb: 0,
        r: 0,
        hr: 0,
        rbi: 0
    }));
    
    const awayLineup = awayNames.map((name, index) => ({
        name: name,
        pos: awayPositions[index],
        ab: 0,
        h: 0,
        k: 0,
        bb: 0,
        r: 0,
        hr: 0,
        rbi: 0
    }));
    
    return { homeLineup, awayLineup };
}

// Initialize game with random lineups
function initializeGame() {
    // Generate both lineups together to ensure required names are distributed
    const lineups = generateBothLineups(gameState.homeTeamName, gameState.awayTeamName);
    gameState.homeLineup = lineups.homeLineup;
    gameState.awayLineup = lineups.awayLineup;
    
    // Show settings modal on first load
    showGameSettings();
}

// Show game settings modal
function showGameSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        // Populate form with current values
        const homeTeamInput = document.getElementById('homeTeamName');
        const awayTeamInput = document.getElementById('awayTeamName');
        const gameModeRadios = document.querySelectorAll('input[name="gameMode"]');
        const inningsRadios = document.querySelectorAll('input[name="innings"]');
        
        if (homeTeamInput) homeTeamInput.value = gameState.homeTeamName;
        if (awayTeamInput) awayTeamInput.value = gameState.awayTeamName;
        
        gameModeRadios.forEach(radio => {
            radio.checked = radio.value === gameState.gameMode;
        });
        
        inningsRadios.forEach(radio => {
            radio.checked = parseInt(radio.value) === gameState.totalInnings;
        });
        
        modal.style.display = 'flex';
    }
}

// Hide game settings modal
function hideGameSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show rules modal
function showRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Hide rules modal
function hideRules() {
    const modal = document.getElementById('rulesModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Start new game with selected settings
function startNewGame() {
    let homeTeam = document.getElementById('homeTeamName')?.value || 'Home';
    let awayTeam = document.getElementById('awayTeamName')?.value || 'Away';
    
    // Capitalize first letter of team names
    if (homeTeam.length > 0) {
        homeTeam = homeTeam.charAt(0).toUpperCase() + homeTeam.slice(1);
    }
    if (awayTeam.length > 0) {
        awayTeam = awayTeam.charAt(0).toUpperCase() + awayTeam.slice(1);
    }
    
    const gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || '2player';
    const totalInnings = parseInt(document.querySelector('input[name="innings"]:checked')?.value || '6');
    
    // Generate both lineups with required names distributed
    const lineups = generateBothLineups(homeTeam, awayTeam);
    
    // Reset game state completely
    gameState = {
        homeScore: 0,
        awayScore: 0,
        homeHits: 0,
        awayHits: 0,
        homeErrors: 0,
        awayErrors: 0,
        inning: 1,
        inningHalf: 'top',
        outs: 0,
        strikes: 0,
        balls: 0,
        runners: {
            first: false,
            second: false,
            third: false
        },
        currentContact: null,
        homeInnings: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
        awayInnings: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
        currentInningRuns: 0,
        lastPlay: '',
        strikeouts: 0,
        homeStrikeouts: 0,
        awayStrikeouts: 0,
        homePitchCount: 0,
        awayPitchCount: 0,
        homeStrikes: 0,
        awayStrikes: 0,
        homeHitsAllowed: 0,
        awayHitsAllowed: 0,
        homeLineup: lineups.homeLineup,
        awayLineup: lineups.awayLineup,
        currentHomeBatter: 0,
        currentAwayBatter: 0,
        homeTeamName: homeTeam,
        awayTeamName: awayTeam,
        gameMode: gameMode,
        totalInnings: totalInnings
    };
    
    // Clear history
    gameStateHistory = [];
    
    // Set first inning for away to 0
    gameState.awayInnings[0] = 0;
    
    // Update team name displays
    updateTeamNames();
    
    hideGameSettings();
    updateDisplay();
    updateUndoButton();
    showMessage('New game started! Play Ball! ⚾️');
    
    // Start computer simulation if in 1-player mode
    if (gameState.gameMode === '1player') {
        setTimeout(() => {
            simulateComputerAtBat();
        }, 2000);
    }
}

// Update team name displays
function updateTeamNames() {
    const homeNameEls = document.querySelectorAll('.home-team-name');
    const awayNameEls = document.querySelectorAll('.away-team-name');
    
    homeNameEls.forEach(el => el.textContent = gameState.homeTeamName);
    awayNameEls.forEach(el => el.textContent = gameState.awayTeamName);
}

// Fullscreen functions
function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    
    // Update button visibility
    setTimeout(() => {
        const enterBtn = document.getElementById('enterFullscreenBtn');
        const exitBtn = document.getElementById('exitFullscreenBtn');
        if (enterBtn) enterBtn.style.display = 'none';
        if (exitBtn) exitBtn.style.display = 'inline-flex';
    }, 100);
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    // Update button visibility
    setTimeout(() => {
        const enterBtn = document.getElementById('enterFullscreenBtn');
        const exitBtn = document.getElementById('exitFullscreenBtn');
        if (enterBtn) enterBtn.style.display = 'inline-flex';
        if (exitBtn) exitBtn.style.display = 'none';
    }, 100);
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', () => {
    const enterBtn = document.getElementById('enterFullscreenBtn');
    const exitBtn = document.getElementById('exitFullscreenBtn');
    if (document.fullscreenElement) {
        if (enterBtn) enterBtn.style.display = 'none';
        if (exitBtn) exitBtn.style.display = 'inline-flex';
    } else {
        if (enterBtn) enterBtn.style.display = 'inline-flex';
        if (exitBtn) exitBtn.style.display = 'none';
    }
});

// Call initialize when page loads
window.addEventListener('DOMContentLoaded', initializeGame);

// Call initialize when page loads
window.addEventListener('DOMContentLoaded', initializeGame);

// Update display
function updateDisplay() {
    homeScoreEl.textContent = gameState.homeScore;
    awayScoreEl.textContent = gameState.awayScore;
    homeHitsEl.textContent = gameState.homeHits;
    awayHitsEl.textContent = gameState.awayHits;
    homeErrorsEl.textContent = gameState.homeErrors;
    awayErrorsEl.textContent = gameState.awayErrors;
    inningEl.textContent = gameState.inning;
    
    // Update lineup scores
    const homeLineupScore = document.getElementById('home-lineup-score');
    const awayLineupScore = document.getElementById('away-lineup-score');
    if (homeLineupScore) homeLineupScore.textContent = gameState.homeScore;
    if (awayLineupScore) awayLineupScore.textContent = gameState.awayScore;
    
    updateCountCircles();
    updateDiamond();
    updateScoreboard();
    updateInningIndicator();
    updateBaseIndicators();
    updateLineups();
}

// Update lineups display
function updateLineups() {
    const homeLineupEl = document.querySelector('.home-lineup');
    const awayLineupEl = document.querySelector('.away-lineup');
    
    // Show/hide lineups based on who's batting
    if (gameState.inningHalf === 'top') {
        awayLineupEl.classList.remove('lineup-hidden');
        homeLineupEl.classList.add('lineup-hidden');
    } else {
        homeLineupEl.classList.remove('lineup-hidden');
        awayLineupEl.classList.add('lineup-hidden');
    }
    
    // Update home lineup
    for (let i = 0; i < 9; i++) {
        const player = gameState.homeLineup[i];
        const battingNow = gameState.inningHalf === 'bottom' && i === gameState.currentHomeBatter;
        const spotEl = document.getElementById(`home-batter-${i + 1}`);
        if (spotEl) {
            const avg = player.ab > 0 ? (player.h / player.ab).toFixed(3).substring(1) : '.000';
            const stats = `${player.h}-${player.ab}${player.rbi > 0 ? ' ' + player.rbi + 'RBI' : ''}${player.hr > 0 ? ' ' + player.hr + 'HR' : ''}${player.k > 0 ? ' ' + player.k + 'K' : ''}${player.bb > 0 ? ' ' + player.bb + 'BB' : ''}`;
            // Add extra spaces for single-letter positions (C, P)
            // Show pitcher strikeouts next to pitcher name
            let posDisplay = (player.pos === 'C' || player.pos === 'P') ? `${player.pos}  ` : player.pos;
            let nameDisplay = player.name;
            if (player.pos === 'P') {
                if (gameState.homePitchCount > 0) {
                    const pitchStats = `(${gameState.homePitchCount}-${gameState.homeStrikes})`;
                    const hitStats = gameState.homeHitsAllowed > 0 ? ` ${gameState.homeHitsAllowed}H` : '';
                    const kStats = gameState.homeStrikeouts > 0 ? ` ${gameState.homeStrikeouts}K` : '';
                    nameDisplay = `${player.name} ${pitchStats}${hitStats}${kStats}`;
                }
            }
            spotEl.innerHTML = `<div>${posDisplay} ${nameDisplay}</div><div class="player-stats">${stats}</div>`;
            // Apply batting-now class to the batter-spot element
            if (battingNow) {
                spotEl.classList.add('batting-now');
            } else {
                spotEl.classList.remove('batting-now');
            }
        }
    }
    
    // Update away lineup
    for (let i = 0; i < 9; i++) {
        const player = gameState.awayLineup[i];
        const battingNow = gameState.inningHalf === 'top' && i === gameState.currentAwayBatter;
        const spotEl = document.getElementById(`away-batter-${i + 1}`);
        if (spotEl) {
            const avg = player.ab > 0 ? (player.h / player.ab).toFixed(3).substring(1) : '.000';
            const stats = `${player.h}-${player.ab}${player.rbi > 0 ? ' ' + player.rbi + 'RBI' : ''}${player.hr > 0 ? ' ' + player.hr + 'HR' : ''}${player.k > 0 ? ' ' + player.k + 'K' : ''}${player.bb > 0 ? ' ' + player.bb + 'BB' : ''}`;
            // Add extra spaces for single-letter positions (C, P)
            // Show pitcher strikeouts next to pitcher name
            let posDisplay = (player.pos === 'C' || player.pos === 'P') ? `${player.pos}  ` : player.pos;
            let nameDisplay = player.name;
            if (player.pos === 'P') {
                if (gameState.awayPitchCount > 0) {
                    const pitchStats = `(${gameState.awayPitchCount}-${gameState.awayStrikes})`;
                    const hitStats = gameState.awayHitsAllowed > 0 ? ` ${gameState.awayHitsAllowed}H` : '';
                    const kStats = gameState.awayStrikeouts > 0 ? ` ${gameState.awayStrikeouts}K` : '';
                    nameDisplay = `${player.name} ${pitchStats}${hitStats}${kStats}`;
                }
            }
            spotEl.innerHTML = `<div>${posDisplay} ${nameDisplay}</div><div class="player-stats">${stats}</div>`;
            // Apply batting-now class to the batter-spot element
            if (battingNow) {
                spotEl.classList.add('batting-now');
            } else {
                spotEl.classList.remove('batting-now');
            }
        }
    }
}

// Update count circles (balls, strikes, outs)
function updateCountCircles() {
    // Update balls (max 3 shown)
    for (let i = 1; i <= 3; i++) {
        const circle = document.getElementById(`ball-${i}`);
        if (circle) {
            circle.classList.toggle('filled', i <= gameState.balls);
        }
    }
    
    // Update strikes (max 2 shown)
    for (let i = 1; i <= 2; i++) {
        const circle = document.getElementById(`strike-${i}`);
        if (circle) {
            circle.classList.toggle('filled', i <= gameState.strikes);
        }
    }
    
    // Update outs (max 2 shown)
    for (let i = 1; i <= 2; i++) {
        const circle = document.getElementById(`out-${i}`);
        if (circle) {
            circle.classList.toggle('filled', i <= gameState.outs);
        }
    }
}

// Update MLB scoreboard
function updateScoreboard() {
    // Determine which innings to display
    const currentInning = gameState.inning;
    const totalInnings = gameState.totalInnings;
    let startInning = 1;
    let endInning = 9;
    
    // If we're in extra innings, shift the window
    if (currentInning > 9) {
        startInning = currentInning - 8; // Show 9 innings ending at current
        endInning = currentInning;
    }
    
    // Update header row with correct inning numbers and disable unused cells
    const headerRow = document.querySelector('.scoreboard-table thead tr');
    if (headerRow) {
        // Get all th elements (skip first one which is team header)
        const headers = headerRow.querySelectorAll('th');
        for (let i = 1; i <= 9; i++) {
            const inningNumber = startInning + i - 1;
            if (headers[i]) {
                headers[i].textContent = inningNumber;
                
                // Disable if beyond total innings and not yet reached
                if (inningNumber > totalInnings && currentInning <= totalInnings) {
                    headers[i].classList.add('disabled-inning');
                } else {
                    headers[i].classList.remove('disabled-inning');
                }
            }
        }
    }
    
    // Remove all current inning highlighting first
    for (let i = 1; i <= 9; i++) {
        const homeCell = document.getElementById(`home-inning-${i}`);
        const awayCell = document.getElementById(`away-inning-${i}`);
        if (homeCell) {
            homeCell.classList.remove('current-inning-home');
        }
        if (awayCell) {
            awayCell.classList.remove('current-inning-away');
        }
    }
    
    // Update away and home innings based on the window
    for (let i = 0; i < 9; i++) {
        const inningNumber = startInning + i;
        const dataIndex = inningNumber - 1; // Array index (0-based)
        
        const homeCell = document.getElementById(`home-inning-${i + 1}`);
        const awayCell = document.getElementById(`away-inning-${i + 1}`);
        
        // Disable if beyond total innings and not yet reached
        const shouldDisable = inningNumber > totalInnings && currentInning <= totalInnings;
        
        if (homeCell) {
            const value = gameState.homeInnings[dataIndex];
            homeCell.textContent = shouldDisable ? '' : (value !== undefined ? value : '-');
            if (shouldDisable) {
                homeCell.classList.add('disabled-inning');
            } else {
                homeCell.classList.remove('disabled-inning');
            }
        }
        if (awayCell) {
            const value = gameState.awayInnings[dataIndex];
            awayCell.textContent = shouldDisable ? '' : (value !== undefined ? value : '-');
            if (shouldDisable) {
                awayCell.classList.add('disabled-inning');
            } else {
                awayCell.classList.remove('disabled-inning');
            }
        }
    }
    
    // Update current inning live and add highlighting
    const currentInningIndex = currentInning - 1;
    // Find which display column the current inning is in
    const displayColumn = currentInning - startInning + 1;
    
    if (displayColumn >= 1 && displayColumn <= 9) {
        if (gameState.inningHalf === 'top') {
            const cell = document.getElementById(`away-inning-${displayColumn}`);
            if (cell) {
                // Update live display during the inning
                // Update if the inning is still in progress (not finalized)
                const inningValue = gameState.awayInnings[currentInningIndex];
                if (inningValue === '-' || inningValue === undefined || typeof inningValue === 'number') {
                    cell.textContent = gameState.currentInningRuns;
                }
                // Add highlighting to current inning
                cell.classList.add('current-inning-away');
            }
        } else {
            const cell = document.getElementById(`home-inning-${displayColumn}`);
            if (cell) {
                // Update live display during the inning
                // Update if the inning is still in progress (not finalized)
                const inningValue = gameState.homeInnings[currentInningIndex];
                if (inningValue === '-' || inningValue === undefined || typeof inningValue === 'number') {
                    cell.textContent = gameState.currentInningRuns;
                }
                // Add highlighting to current inning
                cell.classList.add('current-inning-home');
            }
        }
    }
}

// Update inning indicator (top/bottom)
function updateInningIndicator() {
    const topIndicator = document.querySelector('.top-indicator');
    const bottomIndicator = document.querySelector('.bottom-indicator');
    
    if (topIndicator && bottomIndicator) {
        topIndicator.classList.toggle('active', gameState.inningHalf === 'top');
        bottomIndicator.classList.toggle('active', gameState.inningHalf === 'bottom');
    }
}

// Update base indicators (SVG)
function updateBaseIndicators() {
    const base1Indicator = document.getElementById('base1-indicator');
    const base2Indicator = document.getElementById('base2-indicator');
    const base3Indicator = document.getElementById('base3-indicator');
    
    // Determine which team is batting for color
    const battingClass = gameState.inningHalf === 'top' ? 'away-batting' : 'home-batting';
    
    if (base1Indicator) {
        base1Indicator.classList.toggle('runner-on', gameState.runners.first);
        base1Indicator.classList.remove('away-batting', 'home-batting');
        if (gameState.runners.first) base1Indicator.classList.add(battingClass);
    }
    if (base2Indicator) {
        base2Indicator.classList.toggle('runner-on', gameState.runners.second);
        base2Indicator.classList.remove('away-batting', 'home-batting');
        if (gameState.runners.second) base2Indicator.classList.add(battingClass);
    }
    if (base3Indicator) {
        base3Indicator.classList.toggle('runner-on', gameState.runners.third);
        base3Indicator.classList.remove('away-batting', 'home-batting');
        if (gameState.runners.third) base3Indicator.classList.add(battingClass);
    }
}

// Update diamond display
function updateDiamond() {
    const base1 = document.getElementById('base1');
    const base2 = document.getElementById('base2');
    const base3 = document.getElementById('base3');
    
    const runner1 = document.getElementById('runner1');
    const runner2 = document.getElementById('runner2');
    const runner3 = document.getElementById('runner3');
    
    // Update base highlighting if elements exist
    if (base1) base1.classList.toggle('has-runner', gameState.runners.first);
    if (base2) base2.classList.toggle('has-runner', gameState.runners.second);
    if (base3) base3.classList.toggle('has-runner', gameState.runners.third);
    
    // Show/hide runners only when on base
    if (runner1) runner1.classList.toggle('visible', gameState.runners.first);
    if (runner2) runner2.classList.toggle('visible', gameState.runners.second);
    if (runner3) runner3.classList.toggle('visible', gameState.runners.third);
}

// Animate runner movement
function animateRunners() {
    const runners = document.querySelectorAll('.runner.visible');
    runners.forEach(runner => {
        runner.classList.add('running');
        setTimeout(() => runner.classList.remove('running'), 500);
    });
}

// Flash runner on base (for hits)
function flashRunner(baseNumber) {
    const baseIndicator = document.getElementById(`base${baseNumber}-indicator`);
    if (baseIndicator) {
        // Flash twice
        baseIndicator.style.animation = 'none';
        setTimeout(() => {
            baseIndicator.style.animation = 'flashBase 0.3s ease-in-out 2';
        }, 10);
    }
}

// Show hit type label on base
function showHitLabel(hitType) {
    let labelId = '';
    
    switch(hitType) {
        case 1:
            labelId = 'base1-label';
            break;
        case 2:
            labelId = 'base2-label';
            break;
        case 3:
            labelId = 'base3-label';
            break;
        case 4:
            labelId = 'home-label';
            break;
    }
    
    if (labelId) {
        const label = document.getElementById(labelId);
        if (label) {
            label.classList.remove('show');
            // Force reflow to restart animation
            void label.offsetWidth;
            label.classList.add('show');
            
            // Remove class after animation
            setTimeout(() => {
                label.classList.remove('show');
            }, 2000);
        }
    }
}

// Flash home plate when runner scores
function flashHomePlate() {
    const homeIndicator = document.getElementById('home-indicator');
    if (homeIndicator) {
        homeIndicator.style.animation = 'none';
        setTimeout(() => {
            homeIndicator.style.animation = 'flashBase 0.4s ease-in-out 3';
        }, 10);
    }
}

// Flash scoreboard when runs are scored
function flashScoreboardRuns(runsScored) {
    if (runsScored <= 0) return;
    
    // Determine which innings to display (same logic as updateScoreboard)
    const currentInning = gameState.inning;
    let startInning = 1;
    
    if (currentInning > 9) {
        startInning = currentInning - 8;
    }
    
    // Find which display column the current inning is in
    const displayColumn = currentInning - startInning + 1;
    
    // Flash the inning cell and total runs cell
    if (gameState.inningHalf === 'top') {
        // Flash away team cells
        const inningCell = document.getElementById(`away-inning-${displayColumn}`);
        const totalCell = document.getElementById('awayScore');
        
        if (inningCell) {
            inningCell.classList.add('flash-run');
            setTimeout(() => inningCell.classList.remove('flash-run'), 1000);
        }
        if (totalCell) {
            totalCell.classList.add('flash-run');
            setTimeout(() => totalCell.classList.remove('flash-run'), 1000);
        }
    } else {
        // Flash home team cells
        const inningCell = document.getElementById(`home-inning-${displayColumn}`);
        const totalCell = document.getElementById('homeScore');
        
        if (inningCell) {
            inningCell.classList.add('flash-run');
            setTimeout(() => inningCell.classList.remove('flash-run'), 1000);
        }
        if (totalCell) {
            totalCell.classList.add('flash-run');
            setTimeout(() => totalCell.classList.remove('flash-run'), 1000);
        }
    }
}

// Flash ball circle when added
function flashBall(ballNumber) {
    const circle = document.getElementById(`ball-${ballNumber}`);
    if (circle) {
        circle.classList.add('flash-count');
        setTimeout(() => circle.classList.remove('flash-count'), 600);
    }
}

// Flash strike circle when added
function flashStrike(strikeNumber) {
    const circle = document.getElementById(`strike-${strikeNumber}`);
    if (circle) {
        circle.classList.add('flash-count');
        setTimeout(() => circle.classList.remove('flash-count'), 600);
    }
}

// Flash out circle when added
function flashOut(outNumber) {
    const circle = document.getElementById(`out-${outNumber}`);
    if (circle) {
        circle.classList.add('flash-count');
        setTimeout(() => circle.classList.remove('flash-count'), 600);
    }
}

// Show X on base where out occurred
function showOutX(position) {
    const validPositions = ['base1-out', 'base2-out', 'base3-out', 'home-out', 'P-out', 'SS-out', '2B-out', 'LF-out', 'CF-out', 'RF-out', 'C-out'];
    
    let markerId;
    // Handle both base numbers and position codes
    if (position === 1) markerId = 'base1-out';
    else if (position === 2) markerId = 'base2-out';
    else if (position === 3) markerId = 'base3-out';
    else if (position === 'home') markerId = 'home-out';
    else markerId = position + '-out';
    
    const outMarker = document.getElementById(markerId);
    if (outMarker) {
        // Remove any existing animation
        outMarker.classList.remove('show');
        
        // Force reflow to restart animation
        void outMarker.offsetWidth;
        
        // Add show class to trigger animation
        outMarker.classList.add('show');
        
        // Remove class after animation completes
        setTimeout(() => {
            outMarker.classList.remove('show');
        }, 2000);
    } else {
        console.log('Out marker not found for position:', position, 'tried:', markerId);
    }
}

// Animate home run - show runner going around all bases
// Animate home run - show runner going around all bases with flashing
function animateHomeRunBases() {
    // Stop any existing animation
    stopHomeRunAnimation();
    
    const base1 = document.getElementById('base1-indicator');
    const base2 = document.getElementById('base2-indicator');
    const base3 = document.getElementById('base3-indicator');
    const homeBase = document.querySelector('.home-indicator');
    const battingClass = gameState.inningHalf === 'top' ? 'away-batting' : 'home-batting';
    
    homeRunAnimationCount = 0;
    let isLit = false;
    
    // Flash all bases including home plate 5 times
    homeRunAnimationInterval = setInterval(() => {
        if (isLit) {
            // Turn off
            if (base1) base1.classList.remove('runner-on', 'away-batting', 'home-batting');
            if (base2) base2.classList.remove('runner-on', 'away-batting', 'home-batting');
            if (base3) base3.classList.remove('runner-on', 'away-batting', 'home-batting');
            if (homeBase) homeBase.classList.remove('runner-on', 'away-batting', 'home-batting');
            homeRunAnimationCount++;
        } else {
            // Turn on
            if (base1) base1.classList.add('runner-on', battingClass);
            if (base2) base2.classList.add('runner-on', battingClass);
            if (base3) base3.classList.add('runner-on', battingClass);
            if (homeBase) homeBase.classList.add('runner-on', battingClass);
        }
        
        isLit = !isLit;
        
        // Stop after 5 complete flashes (10 toggles)
        if (homeRunAnimationCount >= 5) {
            stopHomeRunAnimation();
        }
    }, 300); // Flash every 300ms
}

// Stop home run animation
function stopHomeRunAnimation() {
    if (homeRunAnimationInterval) {
        clearInterval(homeRunAnimationInterval);
        homeRunAnimationInterval = null;
        homeRunAnimationCount = 0;
        
        // Clear all bases
        const base1 = document.getElementById('base1-indicator');
        const base2 = document.getElementById('base2-indicator');
        const base3 = document.getElementById('base3-indicator');
        const homeBase = document.querySelector('.home-indicator');
        
        if (base1) base1.classList.remove('runner-on', 'away-batting', 'home-batting');
        if (base2) base2.classList.remove('runner-on', 'away-batting', 'home-batting');
        if (base3) base3.classList.remove('runner-on', 'away-batting', 'home-batting');
        if (homeBase) homeBase.classList.remove('runner-on', 'away-batting', 'home-batting');
    }
}

// Launch fireworks for home runs
function launchFireworks() {
    const container = document.getElementById('fireworksContainer');
    if (!container) return;
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ff0088'];
    const fireworkCount = 5;
    
    for (let f = 0; f < fireworkCount; f++) {
        setTimeout(() => {
            // Random position across entire screen
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Create 40 particles per firework for more impressive display
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Random direction in full circle
                const angle = (Math.PI * 2 * i) / 40;
                const velocity = 80 + Math.random() * 80; // Increased velocity for bigger spread
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                container.appendChild(particle);
                
                // Remove particle after animation (matching CSS duration)
                setTimeout(() => {
                    particle.remove();
                }, 2500);
            }
        }, f * 400); // Stagger fireworks every 400ms
    }
}

// Get current batter
function getCurrentBatter() {
    if (gameState.inningHalf === 'top') {
        return gameState.awayLineup[gameState.currentAwayBatter];
    } else {
        return gameState.homeLineup[gameState.currentHomeBatter];
    }
}

// Advance to next batter
function nextBatter() {
    if (gameState.inningHalf === 'top') {
        gameState.currentAwayBatter = (gameState.currentAwayBatter + 1) % 9;
    } else {
        gameState.currentHomeBatter = (gameState.currentHomeBatter + 1) % 9;
    }
}

// Record at-bat
function recordAtBat(result) {
    const batter = getCurrentBatter();
    
    switch(result) {
        case 'hit':
            batter.ab++;
            batter.h++;
            // Increment team hits
            if (gameState.inningHalf === 'top') {
                gameState.awayHits++;
                gameState.homeHitsAllowed++; // Home pitcher gave up a hit
            } else {
                gameState.homeHits++;
                gameState.awayHitsAllowed++; // Away pitcher gave up a hit
            }
            break;
        case 'homerun':
            batter.ab++;
            batter.h++;
            batter.hr++;
            // Increment team hits
            if (gameState.inningHalf === 'top') {
                gameState.awayHits++;
                gameState.homeHitsAllowed++; // Home pitcher gave up a home run
            } else {
                gameState.homeHits++;
                gameState.awayHitsAllowed++; // Away pitcher gave up a home run
            }
            break;
        case 'out':
            batter.ab++;
            break;
        case 'strikeout':
            batter.ab++;
            batter.k++;
            gameState.strikeouts++;
            // Credit the pitching team with the strikeout
            if (gameState.inningHalf === 'top') {
                gameState.homeStrikeouts++; // Home is pitching when away is batting
            } else {
                gameState.awayStrikeouts++; // Away is pitching when home is batting
            }
            break;
        case 'walk':
            batter.bb++;
            break;
        case 'sacrificefly':
            // Sac fly doesn't count as AB
            break;
        case 'error':
            // Reached on Error (ROE): counts as AB but NOT a hit
            // This lowers batting average since AB increases but H doesn't
            batter.ab++;
            // Note: Team hits are NOT incremented for errors
            break;
    }
    
    nextBatter();
    updateDisplay();
}

// Show message with animation
function showMessage(text) {
    messageEl.innerHTML = text;
    messageEl.style.animation = 'none';
    setTimeout(() => {
        messageEl.style.animation = 'fadeIn 0.3s ease-in';
    }, 10);
}

// Pitch input handlers
function processContact(type) {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    stopHomeRunAnimation();
    incrementPitchCount();
    // Directly process the contact without quality selection
    let outcome = determineOutcome(type);
    executeOutcome(outcome);
    resetCount();
}

function backWallHomeRun() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    stopHomeRunAnimation();
    incrementPitchCount();
    gameState.lastPlay = 'Back Wall Home Run';
    homeRun();
    resetCount();
}

function selectContact(type) {
    // Legacy function, no longer used
}

function selectQuality(quality) {
    // Legacy function, no longer used
}

function determineOutcome(contact) {
    let outcome;
    const hasRunners = gameState.runners.first || gameState.runners.second || gameState.runners.third;
    
    if (contact === 'grounder') {
        // Real baseball stats: ~24% hits, ~72% outs, ~4% errors
        // With runners: higher chance of DP/FC based on runner configuration
        
        // Check for double play or fielder's choice first (with runners and <2 outs)
        if (hasRunners && gameState.outs < 2) {
            // Calculate double play probability based on runners on base
            let dpChance = 0;
            if (gameState.runners.first) {
                // Runner on first creates force situation
                if (gameState.runners.second && gameState.runners.third) {
                    dpChance = 0.18; // Bases loaded: ~18% DP rate
                } else if (gameState.runners.second) {
                    dpChance = 0.16; // First and second: ~16% DP rate
                } else if (gameState.runners.third) {
                    dpChance = 0.11; // First and third: ~11% DP rate
                } else {
                    dpChance = 0.12; // First only: ~12% DP rate
                }
            }
            
            // Use separate roll for DP/FC to not affect base hit probabilities
            const dpRoll = Math.random();
            if (dpChance > 0 && dpRoll < dpChance) {
                // Double play!
                outcome = 'doubleplay';
                return outcome;
            } else if (gameState.runners.first && dpRoll < (dpChance + 0.05)) {
                // Additional ~5% chance of fielder's choice when runner on first
                outcome = 'fielderschoice';
                return outcome;
            }
        }
        
        // Standard grounder outcomes (only if no DP/FC)
        const roll = Math.random();
        // Check for error (4% of grounders)
        if (roll < 0.04) {
            outcome = 'error';
        }
        // Singles (22% of grounders)
        else if (roll < 0.26) {
            outcome = 'single';
        }
        // Doubles (2% of grounders - rare but possible)
        else if (roll < 0.28) {
            outcome = 'double';
        }
        // Ground outs (rest, ~72%)
        else {
            outcome = 'groundout';
        }
    } else if (contact === 'linedrive') {
        // Real baseball stats: ~68% hits, ~30% outs, ~2% errors
        // Line drives have highest batting average
        // Hard-hit line drives can be home runs (not too often)
        const roll = Math.random();
        const hardHit = Math.random() > 0.5; // 50% chance of being hard hit
        
        // Error on line drive (2% - misplayed or dropped)
        if (roll < 0.02) {
            outcome = 'error';
        }
        // Singles (38% of line drives)
        else if (roll < 0.40) {
            outcome = 'single';
        }
        // Doubles (24% of line drives)
        else if (roll < 0.64) {
            outcome = 'double';
        }
        // Triples (2% of line drives)
        else if (roll < 0.66) {
            outcome = 'triple';
        }
        // Home runs - more likely if hard hit
        // Hard hit: 3% chance, soft: 0.5% chance (avg ~1.75%)
        else if (roll < (hardHit ? 0.69 : 0.665)) {
            outcome = 'homerun';
        }
        // Line outs (rest, ~30%)
        else {
            outcome = 'lineout';
        }
    } else if (contact === 'popup') {
        // Pop flies - rarely home runs but possible
        const roll = Math.random();
        if (roll < 0.73) {
            // Check for sacrifice fly
            if (hasRunners && gameState.runners.third && gameState.outs < 2 && roll < 0.20) {
                outcome = 'sacrificefly';
            } else {
                outcome = 'flyout';
            }
        } else if (roll < 0.88) {
            outcome = 'single'; // Blooper
        } else if (roll < 0.98) {
            outcome = 'double'; // Down the line
        } else {
            // Very rare pop fly home run (2% - towering fly ball)
            outcome = 'homerun';
        }
    }
    
    return outcome;
}

// Increment pitch count for the pitching team
function incrementPitchCount() {
    if (gameState.inningHalf === 'top') {
        gameState.homePitchCount++; // Home is pitching when away is batting
    } else {
        gameState.awayPitchCount++; // Away is pitching when home is batting
    }
}

// Increment strike count for the pitching team
function incrementStrikeCount() {
    if (gameState.inningHalf === 'top') {
        gameState.homeStrikes++; // Home is pitching when away is batting
    } else {
        gameState.awayStrikes++; // Away is pitching when home is batting
    }
}

function swingAndMiss() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    stopHomeRunAnimation();
    incrementPitchCount();
    gameState.strikes++;
    incrementStrikeCount();
    flashStrike(gameState.strikes);
    if (gameState.strikes >= 3) {
        playSound('strikeout'); // Strikeout sound only, not regular strike
        gameState.lastPlay = 'Strikeout';
        showMessage(`Swings and misses!<br>Strikeout by pitcher! (${gameState.strikeouts + 1} K) ⚡`);
        showOutX('home');
        recordAtBat('strikeout');
        recordOut(true); // Skip generic out sound, we played strikeout sound
        resetCount();
    } else {
        playSound('strike'); // Sound effect
        showMessage(`Strike ${gameState.strikes}! ❌`);
        updateDisplay();
    }
}

function noSwing() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    stopHomeRunAnimation();
    incrementPitchCount();
    // Random ball or strike
    const isBall = Math.random() > 0.5;
    if (isBall) {
        gameState.balls++;
        flashBall(gameState.balls);
        if (gameState.balls >= 4) {
            gameState.lastPlay = 'Walk';
            playSound('walk'); // Walk sound
            showMessage('Ball 4! Walk! Take your base! 🚶');
            walk();
            recordAtBat('walk');
            resetCount();
        } else {
            playSound('ball'); // Ball sound
            showMessage(`Ball ${gameState.balls} 🟢`);
            updateDisplay();
        }
    } else {
        gameState.strikes++;
        incrementStrikeCount();
        flashStrike(gameState.strikes);
        if (gameState.strikes >= 3) {
            playSound('strikeout'); // Strikeout sound only, not regular strike
            gameState.lastPlay = 'Called strikeout';
            showMessage(`Called strike three!<br>Strikeout! (${gameState.strikeouts + 1} K) 👨‍⚖️`);
            showOutX('home');
            recordAtBat('strikeout');
            recordOut();
            resetCount();
        } else {
            playSound('strike'); // Strike sound
            showMessage(`Called strike ${gameState.strikes}! 📢`);
            updateDisplay();
        }
    }
}

function foulBall() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    stopHomeRunAnimation();
    incrementPitchCount();
    playSound('foul'); // Sound effect
    
    // ~17% of foul balls are caught for an out
    const catchRoll = Math.random();
    
    if (catchRoll < 0.17) {
        // Foul ball caught for an out
        gameState.lastPlay = 'Foul out';
        playSound('out'); // Sound effect
        
        // Determine who catches it based on probabilities
        const locationRoll = Math.random();
        let fielder, fielderName, message;
        
        if (locationRoll < 0.50) {
            // Catcher - 50% of caught fouls (~8.5% of all fouls)
            fielder = 'C';
            fielderName = 'catcher';
            const catcherMessages = [
                'High pop-up!<br>Catcher settles under it! Out! 🥎',
                'Foul pop behind plate!<br>Catcher makes the catch! ⚾',
                'Pop-up in foul territory!<br>Catcher squeezes it! Out! 🥎',
                'Foul ball straight up!<br>Catcher has it! ⚾'
            ];
            message = catcherMessages[Math.floor(Math.random() * catcherMessages.length)];
        } else if (locationRoll < 0.70) {
            // First baseman - 20% of caught fouls (~3.4% of all fouls)
            fielder = 'base1';
            fielderName = 'first baseman';
            const firstBaseMessages = [
                'Foul ball down the line!<br>First baseman tracks it down! Out! ⚾',
                'Pop-up in foul ground!<br>First baseman makes the catch! 🥎',
                'Foul territory!<br>First baseman runs it down! Out! ⚾'
            ];
            message = firstBaseMessages[Math.floor(Math.random() * firstBaseMessages.length)];
        } else if (locationRoll < 0.90) {
            // Third baseman - 20% of caught fouls (~3.4% of all fouls)
            fielder = 'base3';
            fielderName = 'third baseman';
            const thirdBaseMessages = [
                'Foul ball down third!<br>Third baseman hauls it in! Out! ⚾',
                'Pop-up in foul territory!<br>Third baseman makes the play! 🥎',
                'Down the line!<br>Third baseman with a nice catch! ⚾'
            ];
            message = thirdBaseMessages[Math.floor(Math.random() * thirdBaseMessages.length)];
        } else {
            // Outfielder - 10% of caught fouls (~1.7% of all fouls)
            const outfieldRoll = Math.random();
            if (outfieldRoll < 0.5) {
                fielder = 'LF';
                fielderName = 'left fielder';
            } else {
                fielder = 'RF';
                fielderName = 'right fielder';
            }
            const outfieldMessages = [
                `Deep foul ball!<br>${fielderName.charAt(0).toUpperCase() + fielderName.slice(1)} runs it down! Out! ⚾`,
                `Foul ball into the corner!<br>Great catch by ${fielderName}! 🥎`,
                `Long foul ball!<br>${fielderName.charAt(0).toUpperCase() + fielderName.slice(1)} makes a sliding catch! Out! ⚾`
            ];
            message = outfieldMessages[Math.floor(Math.random() * outfieldMessages.length)];
        }
        
        showMessage(message);
        showOutX(fielder); // Show out marker at fielder position
        recordAtBat('out');
        recordOut();
        resetCount();
        return;
    }
    
    if (gameState.strikes < 2) {
        playSound('strike'); // Strike sound for foul ball
        gameState.strikes++;
        incrementStrikeCount();
    }
    showMessage(`Foul ball! ${gameState.strikes} strike${gameState.strikes !== 1 ? 's' : ''} ⚠️`);
    updateDisplay();
}

function resetCount() {
    gameState.strikes = 0;
    gameState.balls = 0;
    updateDisplay();
}

function processHit(contact, quality) {
    // Legacy function, no longer used
    let outcome = determineOutcome(contact);
    executeOutcome(outcome);
}

function executeOutcome(outcome) {
    switch(outcome) {
        case 'single':
            gameState.lastPlay = 'Single';
            hit(1);
            recordAtBat('hit');
            break;
        case 'double':
            gameState.lastPlay = 'Double';
            hit(2);
            recordAtBat('hit');
            break;
        case 'triple':
            gameState.lastPlay = 'Triple';
            hit(3);
            recordAtBat('hit');
            break;
        case 'homerun':
            gameState.lastPlay = 'Home Run';
            homeRun();
            break;
        case 'groundout':
            gameState.lastPlay = 'Ground out';
            const groundOutData = [
                { msg: 'Ground ball to short!<br>Out at first! ⚾', pos: 'SS' },
                { msg: 'Grounder to second!<br>Throws to first for the out! ⚾', pos: '2B' },
                { msg: 'Ground ball!<br>Routine play at first! ⚾', pos: 'SS' },
                { msg: 'Chopper to third!<br>Out at first! ⚾', pos: 'base3' },
                { msg: 'Ground ball up the middle!<br>Second baseman makes the play! ⚾', pos: '2B' },
                { msg: 'Slow roller to the mound!<br>Pitcher gets the out at first! ⚾', pos: 'P' },
                { msg: 'Ground ball to first!<br>Unassisted putout! ⚾', pos: 'base1' },
                { msg: 'Weak grounder!<br>Easy out at first! ⚾', pos: 'SS' }
            ];
            const groundOut = groundOutData[Math.floor(Math.random() * groundOutData.length)];
            showMessage(groundOut.msg);
            showOutX(groundOut.pos);
            recordAtBat('out');
            recordOut();
            break;
        case 'flyout':
            gameState.lastPlay = 'Fly out';
            
            // Check if runner on third can tag up (60% of fly balls are deep enough)
            if (gameState.runners.third && Math.random() < 0.60) {
                recordAtBat('out');
                tagUpAttempt();
            } else {
                // Regular flyout - no tag up
                const flyOutData = [
                    { msg: 'Fly ball to left field!<br>Runner under it for the catch! 🥎', pos: 'LF' },
                    { msg: 'Pop fly to center!<br>Easy catch for the out! 🥎', pos: 'CF' },
                    { msg: 'Fly ball to right!<br>Outfielder settles under it! 🥎', pos: 'RF' },
                    { msg: 'High fly to deep center!<br>Warning track catch! 🥎', pos: 'CF' },
                    { msg: 'Pop fly in foul territory!<br>First baseman makes the catch! 🥎', pos: 'base1' },
                    { msg: 'Fly ball to shallow left!<br>Diving catch! What a play! 🥎', pos: 'LF' },
                    { msg: 'Pop up behind second!<br>Shortstop calls it and makes the catch! 🥎', pos: 'SS' },
                    { msg: 'Fly ball to right-center!<br>Outfielder runs it down! 🥎', pos: 'RF' }
                ];
                const flyOut = flyOutData[Math.floor(Math.random() * flyOutData.length)];
                playSound('popout'); // Pop out sound
                showMessage(flyOut.msg);
                showOutX(flyOut.pos);
                recordAtBat('out');
                recordOut(true); // Skip generic out sound, we played popout sound
            }
            break;
        case 'lineout':
            gameState.lastPlay = 'Line out';
            
            // Check for line drive double play (runner caught off base)
            // Real baseball: ~5-7% of line outs with runners on become double plays
            const hasRunnersForLineDP = gameState.runners.first || gameState.runners.second || gameState.runners.third;
            if (hasRunnersForLineDP && gameState.outs < 2 && Math.random() < 0.06) {
                // Line drive double play!
                lineDriveDoublePlay();
                recordAtBat('out');
                break;
            }
            
            const lineOutData = [
                { msg: 'Line drive to short!<br>Shortstop snags it! 🧤', pos: 'SS' },
                { msg: 'Screaming liner to third!<br>Third baseman stabs at it and makes the catch! 🧤', pos: 'base3' },
                { msg: 'Line drive up the middle!<br>Second baseman dives and gets it! 🧤', pos: '2B' },
                { msg: 'Hard liner to first!<br>Nice reflexes for the out! 🧤', pos: 'base1' },
                { msg: 'Line drive to left field!<br>Left fielder charges in and makes the catch! 🧤', pos: 'LF' },
                { msg: 'Rocket to right field!<br>Diving catch! 🧤', pos: 'RF' },
                { msg: 'Line drive back at the pitcher!<br>Pitcher snares it! Great reaction! 🧤', pos: 'P' }
            ];
            const lineOut = lineOutData[Math.floor(Math.random() * lineOutData.length)];
            showMessage(lineOut.msg);
            showOutX(lineOut.pos);
            recordAtBat('out');
            recordOut();
            break;
        case 'fielderschoice':
            gameState.lastPlay = "Fielder's choice";
            recordAtBat('out');
            fieldersChoice();
            break;
        case 'doubleplay':
            gameState.lastPlay = 'Double play';
            recordAtBat('out');
            doublePlay();
            break;
        case 'sacrificefly':
            gameState.lastPlay = 'Sacrifice fly';
            recordAtBat('sacrificefly');
            sacrificeFly();
            break;
        case 'error':
            gameState.lastPlay = 'Error';
            playSound('error'); // Error sound
            const errorMessages = [
                'Ground ball to short!<br>Bobbled! Error! Runner safe at first! ⚠️',
                'Grounder to second!<br>Ball goes through the legs! Error! 🙈',
                'Ground ball to third!<br>Throw is wild! Error! Runner safe! ⚠️',
                'Line drive to left!<br>Dropped! Error on the outfielder! 🥎',
                'Ground ball!<br>Bad hop! Ball gets by the fielder! Error! ⚠️',
                'Routine grounder!<br>Fielder boots it! Error! Safe at first! 🙈',
                'Line drive!<br>Off the glove! Error! Runner reaches! ⚠️',
                'Ground ball up the middle!<br>Misplayed! Error! Safe! ⚠️',
                'Sharp grounder!<br>Charging in, can\'t handle it! Error! 🙈',
                'Fly ball to center!<br>Misjudged! Drops in! Error! ⚠️'
            ];
            showMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
            // Increment team errors (defensive team makes the error)
            if (gameState.inningHalf === 'top') {
                gameState.homeErrors++; // Defensive error by home team
            } else {
                gameState.awayErrors++; // Defensive error by away team
            }
            // Record at-bat (error doesn't count as AB or hit, but advances batter)
            // Batter reaches base on error (treated like a single for base running)
            hit(1, true); // Pass true to skip the "Great hit!" message
            recordAtBat('error');
            break;
    }
}

// Fielder's choice - batter safe, lead runner out
function fieldersChoice() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    gameState.outs += 1;
    
    if (gameState.outs >= 3) {
        gameState.lastPlay = "Fielder's choice";
        recordOut();
        return;
    }
    
    // Remove lead runner, batter goes to first
    let fcMessages = [];
    let outBase = null;
    if (gameState.runners.third) {
        gameState.runners.third = false;
        outBase = 'home';
        fcMessages = [
            "Fielder's choice!<br>Runner OUT at home! ⚾",
            "Fielder's choice!<br>Throw gets the runner! OUT! ⚾",
            "Fielder's choice!<br>Runner caught in rundown! OUT! ⚾"
        ];
    } else if (gameState.runners.second) {
        gameState.runners.second = false;
        outBase = 3;
        fcMessages = [
            "Fielder's choice!<br>Runner OUT at third! ⚾",
            "Fielder's choice!<br>Runner OUT advancing! ⚾",
            "Fielder's choice!<br>Caught in rundown! OUT! ⚾"
        ];
    } else if (gameState.runners.first) {
        gameState.runners.first = false;
        outBase = 2;
        fcMessages = [
            "Fielder's choice!<br>Force OUT at second! ⚾",
            "Fielder's choice!<br>Runner OUT at second! ⚾",
            "Fielder's choice!<br>Runner caught stealing! OUT! ⚾"
        ];
    }
    
    if (outBase !== null) {
        showOutX(outBase);
    }
    
    gameState.runners.first = true;
    showMessage(fcMessages[Math.floor(Math.random() * fcMessages.length)]);
    updateDisplay();
}

// Double play - two outs
function doublePlay() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    gameState.outs += 2;
    
    const dpMessages = [
        'Ground ball to short!<br>6-4-3 double play! 🔄',
        'Ground ball to third!<br>Around the horn! 5-4-3! 🔄',
        'Sharp grounder!<br>Shortstop to second to first! 🔄',
        'Ground ball up the middle!<br>Second to short to first! Twin killing! 🔄',
        'Ground ball!<br>4-6-3 double play! Two quick outs! 🔄',
        'Tailor-made double play!<br>6-4-3! 🔄',
        'Ground ball to pitcher!<br>1-4-3 double play! 🔄'
    ];
    
    if (gameState.outs >= 3) {
        gameState.outs = 3;
        gameState.lastPlay = 'Double play';
        showMessage('Double play!<br>Inning over! 🔄');
        recordOut();
        return;
    }
    
    // Show X at first base (double play almost always at 1st base)
    showOutX(1);
    // Also show X at second base after a delay
    setTimeout(() => showOutX(2), 400);
    
    // Clear all runners
    gameState.runners = {
        first: false,
        second: false,
        third: false
    };
    
    showMessage(dpMessages[Math.floor(Math.random() * dpMessages.length)]);
    updateDisplay();
}

// Line drive double play - catch and runner doubled off base
function lineDriveDoublePlay() {
    gameState.outs += 2;
    gameState.lastPlay = 'Line drive double play';
    
    // Determine which runner gets doubled off (prioritize the runner furthest from home)
    let doubledOffBase = null;
    let catchPosition = ['SS', '2B', '3B', 'LF', 'CF', 'RF', 'P'][Math.floor(Math.random() * 7)];
    
    if (gameState.runners.third) {
        doubledOffBase = 3;
    } else if (gameState.runners.second) {
        doubledOffBase = 2;
    } else if (gameState.runners.first) {
        doubledOffBase = 1;
    }
    
    const ldDPMessages = [
        'Line drive caught!<br>Throws to the base! Runner can\'t get back! DOUBLE PLAY! 🔄',
        'Liner snagged!<br>Quick throw doubles off the runner! 🔄',
        'Line drive caught by diving fielder!<br>Tosses to base - runner too far! DP! 🔄',
        'Sharp liner caught!<br>Easy toss to double off the runner! 🔄',
        'Line drive speared!<br>Step on the bag! DOUBLE PLAY! 🔄',
        'Caught! Runner was going!<br>Easy double play! 🔄'
    ];
    
    if (gameState.outs >= 3) {
        gameState.outs = 3;
        showMessage('Line drive caught! Doubles off runner!<br>Inning over! 🔄');
        recordOut();
        return;
    }
    
    // Show X where line drive was caught (vary by position)
    const catchPositions = ['SS', '2B', '3B', 'P', 'LF', 'CF', 'RF'];
    showOutX(catchPositions[Math.floor(Math.random() * catchPositions.length)]);
    
    // Show X at the base where runner was doubled off after a delay
    if (doubledOffBase) {
        setTimeout(() => showOutX(doubledOffBase), 500);
        
        // Clear the runner who was doubled off
        if (doubledOffBase === 1) gameState.runners.first = false;
        else if (doubledOffBase === 2) gameState.runners.second = false;
        else if (doubledOffBase === 3) gameState.runners.third = false;
    }
    
    showMessage(ldDPMessages[Math.floor(Math.random() * ldDPMessages.length)]);
    updateDisplay();
}

// Tag up attempt - runner on third tries to score on fly ball
function tagUpAttempt() {
    gameState.outs += 1;
    
    // 85% chance runner scores, 15% chance thrown out at home
    const scores = Math.random() < 0.85;
    
    if (scores) {
        // Runner successfully tags and scores (unless it's the 3rd out)
        if (gameState.outs < 3) {
            flashHomePlate();
            if (gameState.inningHalf === 'top') {
                gameState.awayScore += 1;
                gameState.currentInningRuns += 1;
                flashScoreboardRuns(1);
            } else {
                gameState.homeScore += 1;
                gameState.currentInningRuns += 1;
                flashScoreboardRuns(1);
            }
            gameState.runners.third = false;
            
            const successMessages = [
                { msg: 'Deep fly to left field!<br>Runner tags and scores! OUT! 🎯', pos: 'LF' },
                { msg: 'Fly ball to center!<br>Runner tags up and beats the throw! OUT! 🎯', pos: 'CF' },
                { msg: 'Long fly to right!<br>Tag up! Runner scores easily! OUT! 🎯', pos: 'RF' },
                { msg: 'Deep fly to left-center!<br>Throw home is too late! Run scores! OUT! 🎯', pos: 'LF' },
                { msg: 'Warning track catch in center!<br>Runner tags and trots home! OUT! 🎯', pos: 'CF' }
            ];
            const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
            showMessage(msg.msg);
            showOutX(msg.pos);
        } else {
            // 3rd out - runner doesn't score
            gameState.runners.third = false;
            const msg = 'Deep fly ball caught!<br>3rd out - runner cannot score! 🥎';
            showMessage(msg);
            showOutX('CF');
        }
    } else {
        // Runner thrown out at home!
        gameState.outs += 1; // Double play - batter out + runner out
        gameState.runners.third = false;
        
        const thrownOutMessages = [
            'Deep fly to left!<br>Runner tags... CANNON throw home! OUT! Double play! 🔥',
            'Fly ball to right!<br>Strong arm! Throw beats the runner! OUT at home! 🏠',
            'Deep fly to center!<br>Perfect throw! Runner OUT at the plate! 🏠',
            'Fly ball caught!<br>Relay throw nails the runner at home! Double play! 🔥'
        ];
        showMessage(thrownOutMessages[Math.floor(Math.random() * thrownOutMessages.length)]);
        showOutX('home'); // Show out at home plate
    }
    
    if (gameState.outs >= 3) {
        recordOut();
        return;
    }
    
    updateDisplay();
}

// Sacrifice fly - runner scores, batter out
function sacrificeFly() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    gameState.outs += 1;
    
    // Only score runner from third if not the 3rd out, or if it is the 3rd out,
    // the runner tags and scores before the out is made (which is the assumption here)
    // However, if this became the 3rd out, this assumes it was not a force out
    if (gameState.runners.third && gameState.outs < 3) {
        flashHomePlate();
        if (gameState.inningHalf === 'top') {
            gameState.awayScore += 1;
            gameState.currentInningRuns += 1;
            flashScoreboardRuns(1);
        } else {
            gameState.homeScore += 1;
            gameState.currentInningRuns += 1;
            flashScoreboardRuns(1);
            
            // Check for walk-off IMMEDIATELY when home team goes ahead in final inning or later
            if (gameState.inning >= gameState.totalInnings && gameState.homeScore > gameState.awayScore) {
                gameState.gameOver = true;
                updateDisplay(); // Update scoreboard before game over message
                playSound('gameOver'); // Play game over music
                const timeoutId = setTimeout(() => {
                    announceScore(true, false); // true = game over, false = don't play end of inning sound
                    showMessage(`🎉 GAME OVER! ${gameState.homeTeamName} wins ${gameState.homeScore}-${gameState.awayScore}! Walk-off sacrifice fly! 🎊`);
                }, 1000);
                announcementTimeouts.push(timeoutId);
                return; // Walk-off!
            }
        }
        gameState.runners.third = false;
    } else if (gameState.runners.third && gameState.outs >= 3) {
        // 3rd out - runner doesn't score
        gameState.runners.third = false;
    }
    
    const sacFlyData = [
        { msg: 'Fly ball to deep center!<br>Runner tags and scores! OUT at first! 🎯', pos: 'CF' },
        { msg: 'Fly ball to left field!<br>Runner scores on the sac fly! OUT! 🎯', pos: 'LF' },
        { msg: 'Deep fly to right field!<br>Tag up! Runner scores! Batter OUT! 🎯', pos: 'RF' },
        { msg: 'Long fly ball to center!<br>Runner tags from third and scores! OUT! 🎯', pos: 'CF' },
        { msg: 'Fly ball to left-center!<br>Throw home is too late! Run scores! OUT! 🎯', pos: 'LF' }
    ];
    
    const sacFly = sacFlyData[Math.floor(Math.random() * sacFlyData.length)];
    
    if (gameState.outs >= 3) {
        gameState.lastPlay = 'Sacrifice fly';
        const thirdOutMsg = sacFly.msg.replace('scores', 'cannot score - 3rd out');
        showMessage(thirdOutMsg);
        showOutX(sacFly.pos);
        recordOut();
        return;
    }
    
    showMessage(sacFly.msg);
    showOutX(sacFly.pos);
    updateDisplay();
}

// Handle hits
function hit(bases, skipMessage = false) {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    // Play specific hit sound based on bases
    if (!skipMessage) {
        if (bases === 1) {
            playSound('single');
        } else if (bases === 2) {
            playSound('double');
        } else if (bases === 3) {
            playSound('triple');
        }
    }
    let hitType;
    let runsScored = 0;
    let extraBaseAttempt = false;
    let thrownOut = false;
    let outAtBase = ''; // Track which base the out occurred at
    let successBase = ''; // Track successful extra base advancement
    const batter = getCurrentBatter();
    
    // Score runners based on hit type
    if (bases >= 1 && gameState.runners.third) runsScored++;
    if (bases >= 2 && gameState.runners.second) runsScored++;
    if (bases >= 3 && gameState.runners.first) runsScored++;
    
    // Advance remaining runners
    const newRunners = {
        first: false,
        second: false,
        third: false
    };
    
    if (bases === 1) {
        // Single
        hitType = 'Single';
        newRunners.first = true;
        
        // Handle runner on second - might try to score
        if (gameState.runners.second) {
            // 40% chance runner tries to score from 2nd on a single
            if (Math.random() < 0.40) {
                extraBaseAttempt = true;
                // 35% chance they're thrown out at home
                if (Math.random() < 0.35) {
                    thrownOut = true;
                    outAtBase = 'home';
                    gameState.outs++;
                    flashOut(gameState.outs);
                    showOutX('home'); // Out at home plate
                } else {
                    runsScored++;
                    successBase = 'home';
                }
            } else {
                newRunners.third = true; // Stops at third
            }
        }
        
        // Handle runner on first - might try for third
        if (gameState.runners.first && !gameState.runners.second) {
            // Only if second base was empty (otherwise they go to second safely)
            // 25% chance runner tries to stretch to third
            if (Math.random() < 0.25) {
                extraBaseAttempt = true;
                // 40% chance they're thrown out at third
                if (Math.random() < 0.40) {
                    thrownOut = true;
                    outAtBase = 'third';
                    gameState.outs++;
                    flashOut(gameState.outs);
                    showOutX('third'); // Out at third base
                } else {
                    newRunners.third = true;
                    newRunners.second = false;
                    successBase = 'third';
                }
            } else {
                newRunners.second = true; // Safely to second
            }
        } else if (gameState.runners.first) {
            newRunners.second = true; // Go to second if runner was on second
        }
        
        if (!skipMessage) {
            flashRunner(1); // Flash first base only for actual hits
            showHitLabel(1); // Show 1B label
        }
    } else if (bases === 2) {
        // Double - runner on 1st might try to score
        hitType = 'Double';
        newRunners.second = true;
        
        if (gameState.runners.first) {
            // 30% chance runner tries to score from 1st on a double
            if (Math.random() < 0.30) {
                extraBaseAttempt = true;
                // 45% chance they're thrown out
                if (Math.random() < 0.45) {
                    thrownOut = true;
                    outAtBase = 'home';
                    gameState.outs++;
                    flashOut(gameState.outs);
                    showOutX('home'); // Out at home plate
                } else {
                    runsScored++;
                    successBase = 'home';
                }
            } else {
                newRunners.third = true;
            }
        }
        flashRunner(2); // Flash second base
        showHitLabel(2); // Show 2B label
    } else if (bases === 3) {
        // Triple - runner on 1st might try to score (normally stops at 2nd)
        hitType = 'Triple';
        newRunners.third = true;
        
        if (gameState.runners.first) {
            // 20% chance runner tries to score from 1st on a triple
            if (Math.random() < 0.20) {
                extraBaseAttempt = true;
                // 40% chance they're thrown out
                if (Math.random() < 0.40) {
                    thrownOut = true;
                    outAtBase = 'home';
                    gameState.outs++;
                    flashOut(gameState.outs);
                    showOutX('home'); // Out at home plate
                } else {
                    runsScored++;
                    successBase = 'home';
                }
            } else {
                // Normal advance - 1st goes to 2nd on triple
                // Actually on a triple, runner on 1st usually scores, so let's score them
                runsScored++;
            }
        }
        flashRunner(3); // Flash third base
        showHitLabel(3); // Show 3B label
    }
    
    animateRunners();
    
    setTimeout(() => {
        gameState.runners = newRunners;
        
        // Flash home plate if runs scored
        if (runsScored > 0) {
            playSound('crowd'); // Crowd cheers for runs
            flashHomePlate();
        }
        
        // Add runs to correct team
        if (gameState.inningHalf === 'top') {
            gameState.awayScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
        } else {
            gameState.homeScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
            
            // Check for walk-off IMMEDIATELY when home team goes ahead in final inning or later
            if (gameState.inning >= gameState.totalInnings && gameState.homeScore > gameState.awayScore) {
                gameState.gameOver = true;
                updateDisplay(); // Update scoreboard before game over message
                playSound('gameOver'); // Play game over music
                const timeoutId = setTimeout(() => {
                    announceScore(true, false); // true = game over, false = don't play end of inning sound
                    showMessage(`🎉 GAME OVER! ${gameState.homeTeamName} wins ${gameState.homeScore}-${gameState.awayScore}! Walk-off victory! 🎊`);
                }, 1000);
                announcementTimeouts.push(timeoutId);
                return; // Walk-off!
            }
        }
        
        // Track RBIs
        if (runsScored > 0 && batter) {
            batter.rbi += runsScored;
        }
        
        // Only show message for actual hits, not walks
        if (!skipMessage) {
            let message = `${hitType}! Great hit!`;
            
            if (extraBaseAttempt) {
                if (thrownOut) {
                    const baseNames = { 'home': 'home', 'third': 'third', 'second': 'second' };
                    message += `<br>Runner attempts extra base! OUT at ${baseNames[outAtBase]}!`;
                } else {
                    if (successBase === 'third') {
                        message += '<br>Runner takes extra base! Stretches to third!';
                    } else if (successBase === 'home') {
                        message += '<br>Runner takes extra base! Scores!';
                    }
                }
            } else if (runsScored > 0) {
                message += `<br>${runsScored} RBI${runsScored > 1 ? 's' : ''}!`;
            }
            
            message += ' 🎉';
            
            showMessage(message);
        }
        
        // Check if 3 outs from extra base attempt
        if (gameState.outs >= 3) {
            recordOut();
        } else {
            updateDisplay();
        }
    }, 500);
}

// Handle walk - only advance runners on force plays
function walk() {
    if (gameState.gameOver) return; // Prevent actions after game over
    const batter = getCurrentBatter();
    let runsScored = 0;
    
    // Check if bases are loaded (force everywhere)
    const basesLoaded = gameState.runners.first && gameState.runners.second && gameState.runners.third;
    
    if (basesLoaded) {
        // Bases loaded: walk forces everyone to advance, runner on third scores
        runsScored = 1;
        
        // Track RBI for bases loaded walk
        if (batter) {
            batter.rbi += 1;
        }
        
        // Keep bases loaded
        gameState.runners.first = true;
        gameState.runners.second = true;
        gameState.runners.third = true;
        
        flashHomePlate();
        
        // Add run to correct team
        if (gameState.inningHalf === 'top') {
            gameState.awayScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
        } else {
            gameState.homeScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
            
            // Check for walk-off IMMEDIATELY when home team goes ahead in final inning or later
            if (gameState.inning >= gameState.totalInnings && gameState.homeScore > gameState.awayScore) {
                gameState.gameOver = true;
                updateDisplay(); // Update scoreboard before game over message
                playSound('gameOver'); // Play game over music
                const timeoutId = setTimeout(() => {
                    announceScore(true, false); // true = game over, false = don't play end of inning sound
                    showMessage(`🎉 GAME OVER! ${gameState.homeTeamName} wins ${gameState.homeScore}-${gameState.awayScore}! Walk-off victory! 🎊`);
                }, 1000);
                announcementTimeouts.push(timeoutId);
                return;
            }
        }
        
        showMessage('Walk! Bases loaded!<br>Runner scores from third! 1 RBI! 🚶');
    } else {
        // Not bases loaded: advance runners only on force plays
        const newRunners = {
            first: true, // Batter always takes first
            second: false,
            third: false
        };
        
        // Check runner on first
        if (gameState.runners.first) {
            // Runner on first is always forced to second
            newRunners.second = true;
            
            // Check runner on second
            if (gameState.runners.second) {
                // Runner on second is forced to third (because 1st is going to 2nd)
                newRunners.third = true;
                // Note: If there's ALSO a runner on 3rd, we'd have bases loaded
                // which is handled above, so we don't get here
            } else if (gameState.runners.third) {
                // Runner on 1st and 3rd: 1st forced to 2nd, 3rd stays
                newRunners.third = true;
            }
        } else {
            // No runner on first - no force plays beyond batter going to first
            // Runners on 2nd and/or 3rd stay where they are
            if (gameState.runners.second) {
                newRunners.second = true;
            }
            if (gameState.runners.third) {
                newRunners.third = true;
            }
        }
        
        gameState.runners = newRunners;
        showMessage('Walk! Take your base! 🚶');
    }
    
    updateDisplay();
}

// Handle home run
function homeRun() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    // Play home run sound once
    playSound('homerun');
    
    const batter = getCurrentBatter();
    let runsScored = 1; // Batter
    if (gameState.runners.first) runsScored++;
    if (gameState.runners.second) runsScored++;
    if (gameState.runners.third) runsScored++;
    
    // Track RBIs
    if (batter) {
        batter.rbi += runsScored;
    }
    
    // Record the at-bat AFTER tracking RBIs but BEFORE animation
    recordAtBat('homerun');
    
    // Launch fireworks!
    launchFireworks();
    
    // Variety of home run descriptions
    const homeRunDescriptions = [
        'Deep blast to left field!',
        'Monster shot to center!',
        'Towering fly ball to right!',
        'Sky-high bomb to left-center!',
        'Crushed over the right field fence!',
        'Moonshot to deep center!',
        'Line drive home run! Gone to left!',
        'No doubt about it! Deep to right!',
        'Upper deck shot to left!',
        'Absolute bomb to center field!',
        'Majestic fly ball! Out to right!',
        'Way back! Deep left field!',
        'High and deep to right-center!',
        'Hammered to left! Going, going, gone!',
        'Rocket shot over the center field wall!'
    ];
    
    const description = homeRunDescriptions[Math.floor(Math.random() * homeRunDescriptions.length)];
    
    // Animate batter running around bases
    animateHomeRunBases();
    
    setTimeout(() => {
        // Flash home plate if runs scored
        if (runsScored > 0) {
            playSound('crowd'); // Crowd goes wild!
            flashHomePlate();
            showHitLabel(4); // Show HR label
        }
        
        // Add runs to correct team
        if (gameState.inningHalf === 'top') {
            gameState.awayScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
        } else {
            gameState.homeScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
            
            // Check for walk-off IMMEDIATELY when home team goes ahead in final inning or later
            if (gameState.inning >= gameState.totalInnings && gameState.homeScore > gameState.awayScore) {
                gameState.gameOver = true;
                updateDisplay(); // Update scoreboard before game over message
                playSound('gameOver'); // Play game over music
                const timeoutId = setTimeout(() => {
                    announceScore(true, false); // true = game over, false = don't play end of inning sound
                    showMessage(`🎉 GAME OVER! ${gameState.homeTeamName} wins ${gameState.homeScore}-${gameState.awayScore}! Walk-off HOME RUN! 🎇🎊`);
                }, 1000);
                announcementTimeouts.push(timeoutId);
                return; // Walk-off!
            }
        }
        
        // Clear all bases
        gameState.runners = {
            first: false,
            second: false,
            third: false
        };
        
        showMessage(`${description}<br>🎉 HOME RUN! ${runsScored} RBI${runsScored > 1 ? 's' : ''}! 🎇`);
        updateDisplay();
        
        // Don't check for walk-off here - already checked above
    }, 1300);
    
    celebrateHomeRun();
}

// Check for walk-off or game end
function checkWalkOff() {
    // Check if game is in final inning or later during bottom half
    if (gameState.inning >= gameState.totalInnings && gameState.inningHalf === 'bottom') {
        // If home team is ahead, they win! (walk-off)
        if (gameState.homeScore > gameState.awayScore) {
            gameState.gameOver = true;
            updateDisplay(); // Update scoreboard before game over message
            playSound('gameOver'); // Play game over music
            const timeoutId = setTimeout(() => {
                announceScore(true); // true = game over
                showMessage(`🎉 GAME OVER! ${gameState.homeTeamName} wins ${gameState.homeScore}-${gameState.awayScore}! Walk-off victory! 🎊`);
            }, 1000);
            announcementTimeouts.push(timeoutId);
            return true;
        }
    }
    
    // Check if game ends in extra innings after top half (one team ahead)
    if (gameState.inning > gameState.totalInnings && gameState.inningHalf === 'top') {
        if (gameState.homeScore !== gameState.awayScore) {
            gameState.gameOver = true;
            updateDisplay(); // Update scoreboard before game over message
            playSound('gameOver'); // Play game over music
            const winner = gameState.homeScore > gameState.awayScore ? gameState.homeTeamName : gameState.awayTeamName;
            const finalScore = `${gameState.awayScore}-${gameState.homeScore}`;
            const timeoutId = setTimeout(() => {
                announceScore(true); // true = game over
                showMessage(`🎉 GAME OVER! ${winner} wins ${finalScore}! 🎊`);
            }, 1000);
            announcementTimeouts.push(timeoutId);
            return true;
        }
    }
    
    return false;
}

// Computer simulation for 1-player mode
function simulateComputerAtBat() {
    if (gameState.gameMode !== '1player' || gameState.inningHalf !== 'top') {
        return; // Only simulate when computer is batting (away team, top of inning)
    }
    
    simulateOneBatter();
}

// Manual simulate button - works for any game mode
function manualSimulateBatter() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    playSound('simulate'); // Play simulate sound
    saveState(); // Save state before action
    simulateOneBatter();
}

// Core simulation logic
function simulateOneBatter() {
    // Simulate a realistic at-bat with complete plate appearance outcomes only
    // No intermediate balls/strikes - only final results
    const outcomes = [
        { action: () => processContact('grounder'), weight: 25 },
        { action: () => processContact('linedrive'), weight: 20 },
        { action: () => processContact('popup'), weight: 15 },
        { action: () => { completeStrikeout(); }, weight: 27 },  // Increased to compensate for removed swing/miss/foul
        { action: () => { completeWalk(); }, weight: 13 }  // Increased to compensate
    ];
    
    const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const outcome of outcomes) {
        random -= outcome.weight;
        if (random <= 0) {
            // Delay so user can see what happens
            setTimeout(() => {
                outcome.action();
                
                // If in 1-player mode and computer is still batting, continue automatically
                if (gameState.gameMode === '1player' && gameState.inningHalf === 'top' && gameState.outs < 3) {
                    setTimeout(() => {
                        simulateComputerAtBat();
                    }, 1500);
                }
            }, 800);
            return;
        }
    }
}

// Complete a strikeout in simulation
function completeStrikeout() {
    gameState.strikes = 3;
    gameState.lastPlay = 'Strikeout';
    playSound('strikeout'); // Strikeout sound
    showMessage(`Strike three!<br>Strikeout by pitcher! (${gameState.strikeouts + 1} K) ⚡`);
    showOutX('home');
    recordAtBat('strikeout');
    recordOut(true); // Skip generic out sound, we played strikeout sound
    resetCount();
}

// Complete a walk in simulation
function completeWalk() {
    gameState.balls = 4;
    gameState.lastPlay = 'Walk';
    playSound('walk'); // Walk sound
    walk();
    recordAtBat('walk');
    resetCount();
}

// Convert number to ordinal (1st, 2nd, 3rd, etc.)
function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Announce score at end of inning or game
function announceScore(isGameOver = false, playEndOfInningSound = true) {
    const homeScore = gameState.homeScore;
    const awayScore = gameState.awayScore;
    
    // Determine leading team
    let leadStatus;
    
    if (homeScore > awayScore) {
        leadStatus = isGameOver ? 'scoreHomeWins' : 'scoreHomeLeads';
    } else if (awayScore > homeScore) {
        leadStatus = isGameOver ? 'scoreVisitorWins' : 'scoreAwayLeads';
    } else {
        // Tie game
        leadStatus = 'scoreTie';
    }
    
    // Play end of inning sound FIRST (if not game over and requested)
    if (!isGameOver && playEndOfInningSound) {
        if (gameState.inningHalf === 'top') {
            playSound('endTopInning');
        } else {
            playSound('endInning');
        }
    }
    
    // THEN delay before announcing lead status (let end of inning sound play and finish)
    const timeoutId = setTimeout(() => {
        if (isGameOver) {
            playSound('scoreThatsTheBallgame');
            const winTimeoutId = setTimeout(() => playSound(leadStatus), 500); // Home/Visitor team wins
            announcementTimeouts.push(winTimeoutId);
        } else {
            playSound(leadStatus); // Home/Away leads or Tie
        }
    }, 5000); // 5 second delay to let end of inning sound finish completely
    announcementTimeouts.push(timeoutId);
}

// Record an out
function recordOut(skipSound = false) {
    if (!skipSound) {
        playSound('out'); // Play out sound for every out (unless specific sound already played)
    }
    gameState.outs += 1;
    flashOut(gameState.outs);
    
    if (gameState.outs >= 3) {
        // Show what caused the third out
        setTimeout(() => {
            const battingTeam = gameState.inningHalf === 'top' ? 'Away' : 'Home';
            const inningOrdinal = getOrdinal(gameState.inning);
            
            // Record runs for this inning
            if (gameState.inningHalf === 'top') {
                gameState.awayInnings[gameState.inning - 1] = gameState.currentInningRuns;
                
                // Check if home team wins without batting (ahead after top of final inning or later)
                const gameOverNow = gameState.inning >= gameState.totalInnings && gameState.homeScore > gameState.awayScore;
                
                if (gameOverNow) {
                    // Game over - announce game over with score
                    gameState.gameOver = true;
                    playSound('gameOver'); // Play game over music
                    const timeoutId = setTimeout(() => {
                        announceScore(true); // true = game over
                        showMessage(`🎉 GAME OVER! ${gameState.homeTeamName} wins ${gameState.homeScore}-${gameState.awayScore}! 🎊`);
                    }, 1500);
                    announcementTimeouts.push(timeoutId);
                    return; // Game over, home team doesn't need to bat
                } else {
                    // Not game over - announce end of top inning with score (score announcement will play the endTopInning sound)
                    announceScore(false); // false = not game over, just end of inning
                    showMessage(`${gameState.lastPlay}! End of Top ${inningOrdinal}. ${battingTeam} scored ${gameState.currentInningRuns} run${gameState.currentInningRuns !== 1 ? 's' : ''}.`);
                }
                
                gameState.inningHalf = 'bottom';
                // Set home's current inning to 0 to start
                gameState.homeInnings[gameState.inning - 1] = 0;
            } else {
                gameState.homeInnings[gameState.inning - 1] = gameState.currentInningRuns;
                
                // Check if away team won after bottom of final inning or later
                const gameOverNow = gameState.inning >= gameState.totalInnings && gameState.awayScore > gameState.homeScore;
                
                if (gameOverNow) {
                    // Game over - announce game over with score
                    gameState.gameOver = true;
                    playSound('gameOver'); // Play game over music
                    const timeoutId = setTimeout(() => {
                        announceScore(true); // true = game over
                        showMessage(`🎉 GAME OVER! ${gameState.awayTeamName} wins ${gameState.awayScore}-${gameState.homeScore}! 🎊`);
                    }, 1500);
                    announcementTimeouts.push(timeoutId);
                    return; // Game over!
                } else {
                    // Not game over - announce end of inning with score (score announcement will play the endInning sound)
                    announceScore(false); // false = not game over, just end of inning
                    showMessage(`${gameState.lastPlay}! End of ${inningOrdinal}. ${battingTeam} scored ${gameState.currentInningRuns} run${gameState.currentInningRuns !== 1 ? 's' : ''}.`);
                }
                
                // Check for walk-off (will be handled by checkWalkOff modifications below)
                if (checkWalkOff()) {
                    return; // Game over!
                }
                
                gameState.inning += 1;
                gameState.inningHalf = 'top';
                // Set away's next inning to 0 to start (for all innings, not just 1-9)
                gameState.awayInnings[gameState.inning - 1] = 0;
                
                // Start computer simulation if in 1-player mode
                if (gameState.gameMode === '1player') {
                    setTimeout(() => {
                        simulateComputerAtBat();
                    }, 2000);
                }
            }
            
            gameState.outs = 0;
            gameState.currentInningRuns = 0;
            resetCount();
            
            // Clear bases at end of half inning
            gameState.runners = {
                first: false,
                second: false,
                third: false
            };
            
            updateDisplay();
        }, 500);
    } else {
        // Only update display immediately if it's not the 3rd out
        updateDisplay();
    }
}

// Manual controls
function manualBall() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    incrementPitchCount();
    gameState.balls++;
    flashBall(gameState.balls);
    if (gameState.balls >= 4) {
        gameState.lastPlay = 'Walk';
        playSound('walk'); // Walk sound
        walk();
        recordAtBat('walk');
        resetCount();
    } else {
        playSound('ball'); // Ball sound
        showMessage(`Ball ${gameState.balls}`);
        updateDisplay();
    }
}

function manualStrike() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    incrementPitchCount();
    gameState.strikes++;
    incrementStrikeCount();
    flashStrike(gameState.strikes);
    if (gameState.strikes >= 3) {
        playSound('strikeout'); // Strikeout sound only, not regular strike
        gameState.lastPlay = 'Strikeout';
        showMessage(`Strike three!<br>Strikeout by pitcher! (${gameState.strikeouts + 1} K) ⚡`);
        showOutX('home');
        recordAtBat('strikeout');
        recordOut();
        resetCount();
    } else {
        playSound('strike'); // Strike sound
        showMessage(`Strike ${gameState.strikes}`);
        updateDisplay();
    }
}

function manualWalk() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    gameState.lastPlay = 'Walk';
    playSound('walk'); // Play walk sound
    showMessage('Ball 4! Walk! Take your base! 🚶');
    walk();
    recordAtBat('walk');
    resetCount();
}

// Advance all runners by one base
function advanceAllRunners() {
    // Check if any runners are on base
    if (!gameState.runners.first && !gameState.runners.second && !gameState.runners.third) {
        showMessage('No runners on base to advance! 🤷');
        return;
    }
    
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    
    let runsScored = 0;
    
    // Move runners forward one base
    const newRunners = {
        first: false,
        second: false,
        third: false
    };
    
    // Runner on third scores
    if (gameState.runners.third) {
        runsScored++;
    }
    
    // Runner on second goes to third
    if (gameState.runners.second) {
        newRunners.third = true;
    }
    
    // Runner on first goes to second
    if (gameState.runners.first) {
        newRunners.second = true;
    }
    
    gameState.runners = newRunners;
    
    // Flash home plate if runs scored
    if (runsScored > 0) {
        flashHomePlate();
        
        // Add runs to correct team
        if (gameState.inningHalf === 'top') {
            gameState.awayScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
        } else {
            gameState.homeScore += runsScored;
            gameState.currentInningRuns += runsScored;
            flashScoreboardRuns(runsScored);
        }
    }
    
    showMessage(`Runners advanced!<br>${runsScored > 0 ? runsScored + ' run(s) score! 🎉' : 'No runs score.'}`);
    updateDisplay();
}

// Process bunt
function processBunt() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    playSound('bunt'); // Play general bunt sound
    
    const roll = Math.random();
    const hasRunners = gameState.runners.first || gameState.runners.second || gameState.runners.third;
    
    // 20% chance of foul bunt
    if (roll < 0.20) {
        const foulMessages = [
            'Bunted foul!<br>Off to the side! ⚠️',
            'Foul bunt!<br>Rolled into foul territory! ⚠️',
            'Bunted foul down the line!<br>Foul ball! ⚠️',
            'Popped it up foul!<br>Out of play! ⚠️',
            'Foul bunt!<br>Went wide! ⚠️'
        ];
        
        if (gameState.strikes >= 2) {
            // Strikeout on foul bunt with 2 strikes
            gameState.lastPlay = 'Strikeout - foul bunt';
            playSound('foul'); // Foul bunt sound
            showMessage('Bunted foul with 2 strikes!<br>That\'s a strikeout! ⚡');
            recordAtBat('strikeout');
            recordOut(true); // Skip generic out sound
            resetCount();
        } else {
            // Add a strike
            playSound('foul'); // Foul bunt sound (instead of strike)
            gameState.strikes++;
            incrementStrikeCount();
            flashStrike(gameState.strikes);
            showMessage(`${foulMessages[Math.floor(Math.random() * foulMessages.length)]}<br>Strike ${gameState.strikes}!`);
            updateDisplay();
        }
        return;
    }
    
    // Adjust remaining probabilities (now out of 0.80)
    const adjustedRoll = (roll - 0.20) / 0.80;
    
    if (hasRunners) {
        // Sacrifice bunt situation - Real stats: ~75% success, ~12% lead runner out, ~8% failed, ~5% DP
        
        if (adjustedRoll < 0.75) {
            // Successful sacrifice - batter out, runners advance
            gameState.lastPlay = 'Sacrifice bunt';
            playSound('buntSacrifice'); // Sacrifice bunt sound
            const sacBuntMessages = [
                'Perfect sacrifice bunt!<br>Batter out, runner advances! 🥎',
                'Good bunt down the line!<br>Throws to first. OUT! Runner advances! 🥎',
                'Bunt to third!<br>Takes the out at first. Runner safe at second! 🥎',
                'Textbook sacrifice!<br>Batter out, runner moves up! 🥎',
                'Squeeze bunt executed!<br>Batter out at first, runner advances! 🥎'
            ];
            showMessage(sacBuntMessages[Math.floor(Math.random() * sacBuntMessages.length)]);
            showOutX(1); // Show X at first base
            recordAtBat('sacrificebunt');
            
            // Advance runners before recording the out
            // BUT: Check if this will be the 3rd out - if so, NO runs score (force play)
            let runsScored = 0;
            const newRunners = {
                first: false,
                second: false,
                third: false
            };
            
            // CHECK: Will this be the 3rd out? If so, don't score runs (it's a force out)
            const willBeThirdOut = (gameState.outs >= 2);
            
            // Runner on third scores ONLY if not the 3rd out
            if (gameState.runners.third && !willBeThirdOut) {
                runsScored++;
            }
            
            // Runner on second goes to third
            if (gameState.runners.second) {
                newRunners.third = true;
            }
            
            // Runner on first goes to second
            if (gameState.runners.first) {
                newRunners.second = true;
            }
            
            gameState.runners = newRunners;
            
            // Flash home plate and add runs ONLY if not 3rd out
            if (runsScored > 0 && !willBeThirdOut) {
                flashHomePlate();
                
                // Add runs to correct team
                if (gameState.inningHalf === 'top') {
                    gameState.awayScore += runsScored;
                    gameState.currentInningRuns += runsScored;
                    flashScoreboardRuns(runsScored);
                } else {
                    gameState.homeScore += runsScored;
                    gameState.currentInningRuns += runsScored;
                    flashScoreboardRuns(runsScored);
                }
            }
            
            recordOut();
            
        } else if (adjustedRoll < 0.87) {
            // Lead runner thrown out - fielder's choice
            gameState.lastPlay = 'Bunt - lead runner out';
            playSound('buntOut'); // Bunt out sound
            
            let outLocation = '';
            const newRunners = {
                first: true, // Batter reaches
                second: false,
                third: false
            };
            
            if (gameState.runners.third) {
                // Runner thrown out at home
                outLocation = 'home';
                const messages = [
                    'Bunt to third!<br>Throw home! OUT at the plate! 🏠',
                    'Squeeze play!<br>Catcher has the plate! Runner OUT! 🏠',
                    'Bunt fielded quickly!<br>Throw home beats the runner! OUT! 🏠'
                ];
                showMessage(messages[Math.floor(Math.random() * messages.length)]);
                // Other runners advance
                if (gameState.runners.second) newRunners.third = true;
                if (gameState.runners.first) newRunners.second = true;
            } else if (gameState.runners.second) {
                // Runner thrown out at third
                outLocation = 3;
                const messages = [
                    'Bunt to pitcher!<br>Throw to third! Runner OUT! 🧤',
                    'Bunt fielded!<br>Quick throw to third gets the lead runner! OUT! 🧤',
                    'Charging third baseman!<br>Tags the bag! Runner OUT! 🧤'
                ];
                showMessage(messages[Math.floor(Math.random() * messages.length)]);
                // Runner from first advances to second
                if (gameState.runners.first) newRunners.second = true;
            } else {
                // Runner thrown out at second
                outLocation = 2;
                const messages = [
                    'Bunt to second!<br>Flips to the shortstop! OUT at second! 🧤',
                    'Bunt up the middle!<br>Throw to second! Lead runner OUT! 🧤',
                    'Pitcher fields it!<br>Throw to second base! OUT! 🧤'
                ];
                showMessage(messages[Math.floor(Math.random() * messages.length)]);
            }
            
            showOutX(outLocation);
            gameState.runners = newRunners;
            recordAtBat('out');
            recordOut();
            
        } else if (adjustedRoll < 0.95) {
            // Failed bunt - batter out, runners don't advance
            gameState.lastPlay = 'Failed bunt';
            playSound('buntOut'); // Bunt out sound
            const failedMessages = [
                'Popped up the bunt!<br>Easy catch! OUT! Runners hold! 🧤',
                'Bunted too hard!<br>Quick throw to first! OUT! No advance! 🧤',
                'Bunt right to the pitcher!<br>OUT at first! Runners stay! 🧤',
                'Fouled off for strike three!<br>Strikeout on the bunt! Runners hold! ⚡'
            ];
            showMessage(failedMessages[Math.floor(Math.random() * failedMessages.length)]);
            showOutX(1); // Show X at first base
            recordAtBat('out');
            recordOut();
            
        } else {
            // Double play (only possible with < 2 outs)
            if (gameState.outs < 2 && hasRunners) {
                gameState.lastPlay = 'Bunt double play';
                playSound('buntOut'); // Bunt out sound
                const dpMessages = [
                    'Popped up bunt!<br>Caught! Doubles off the runner! DOUBLE PLAY! 🔥',
                    'Line drive bunt!<br>Caught and doubled off first! DOUBLE PLAY! 🔥',
                    'Bunt to pitcher!<br>Throws to second, relay to first! DOUBLE PLAY! 🔥'
                ];
                showMessage(dpMessages[Math.floor(Math.random() * dpMessages.length)]);
                recordAtBat('out');
                doublePlay();
            } else {
                // Can't have DP with 2 outs, so treat as failed bunt instead
                gameState.lastPlay = 'Failed bunt';
                playSound('buntOut'); // Bunt out sound
                const failedMessages = [
                    'Popped up the bunt!<br>Easy catch! OUT! Runners hold! 🧤',
                    'Bunted too hard!<br>Quick throw to first! OUT! No advance! 🧤'
                ];
                showMessage(failedMessages[Math.floor(Math.random() * failedMessages.length)]);
                showOutX(1);
                recordAtBat('out');
                recordOut();
            }
        }
        
    } else {
        // No runners - bunting for a hit
        // Real stats: ~25% successful, ~75% out
        
        if (adjustedRoll < 0.25) {
            // Successful bunt for hit
            gameState.lastPlay = 'Bunt single';
            playSound('buntHit'); // Bunt hit sound
            const buntHitMessages = [
                'Perfect drag bunt!<br>Safe at first! 🥎',
                'Bunt down the third base line!<br>Beats the throw! Safe! 🥎',
                'Push bunt to the right side!<br>Nobody there! Safe! 🥎',
                'Bunt for a hit!<br>Great speed! Safe at first! 🥎',
                'Surprise bunt!<br>Defense caught off guard! Safe! 🥎'
            ];
            showMessage(buntHitMessages[Math.floor(Math.random() * buntHitMessages.length)]);
            hit(1);
            recordAtBat('hit');
        } else {
            // Bunt out at first
            gameState.lastPlay = 'Bunt out';
            playSound('buntOut'); // Bunt out sound
            const buntOutMessages = [
                'Bunt to pitcher!<br>Throws to first. OUT! 🧤',
                'Bunted too hard!<br>Third baseman charges, OUT at first! 🧤',
                'Popped up the bunt!<br>Easy catch! OUT! 🧤',
                'Bunt to catcher!<br>Quick throw to first. OUT! 🧤',
                'Bunt fielded cleanly!<br>Throw to first. OUT! 🧤'
            ];
            showMessage(buntOutMessages[Math.floor(Math.random() * buntOutMessages.length)]);
            showOutX(1); // Show X at first base
            recordAtBat('out');
            recordOut();
        }
    }
    
    resetCount();
}

function manualSingle() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    gameState.lastPlay = 'Single';
    hit(1);
    recordAtBat('hit');
    resetCount();
}

function manualDouble() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    gameState.lastPlay = 'Double';
    hit(2);
    recordAtBat('hit');
    resetCount();
}

function manualTriple() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    gameState.lastPlay = 'Triple';
    hit(3);
    recordAtBat('hit');
    resetCount();
}

function manualHomeRun() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    gameState.lastPlay = 'Home Run';
    homeRun();
    resetCount();
}

function manualOut() {
    // Prevent processing if already at 3 outs (for rapid clicking)
    if (gameState.outs >= 3 || gameState.gameOver) {
        return;
    }
    
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    gameState.lastPlay = 'Out at first';
    showMessage('Out at first base! 🧤');
    showOutX(1); // Show X at first base
    
    // Record the at-bat for current batter
    const batter = getCurrentBatter();
    batter.ab++;
    
    // Always advance to next batter (lineup continues even after 3rd out)
    nextBatter();
    
    // Record the out
    recordOut();
    resetCount();
}

// Start a new game
function newGame() {
    if (confirm('Start a new game? Current scores will be reset.')) {
        cancelAllSounds(); // Cancel any playing sounds
        // Preserve team settings
        const homeTeamName = gameState.homeTeamName;
        const awayTeamName = gameState.awayTeamName;
        const gameMode = gameState.gameMode;
        const totalInnings = gameState.totalInnings;
        // Generate both lineups with required names distributed
        const lineups = generateBothLineups(homeTeamName, awayTeamName);
        
        // Reset game state
        gameState = {
            homeScore: 0,
            awayScore: 0,
            homeHits: 0,
            awayHits: 0,
            homeErrors: 0,
            awayErrors: 0,
            inning: 1,
            inningHalf: 'top',
            outs: 0,
            strikes: 0,
            balls: 0,
            runners: {
                first: false,
                second: false,
                third: false
            },
            currentContact: null,
            homeInnings: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
            awayInnings: ['-', '-', '-', '-', '-', '-', '-', '-', '-'],
            currentInningRuns: 0,
            lastPlay: '',
            strikeouts: 0,
            homeStrikeouts: 0,
            awayStrikeouts: 0,
            homePitchCount: 0,
            awayPitchCount: 0,
            homeStrikes: 0,
            awayStrikes: 0,
            homeHitsAllowed: 0,
            awayHitsAllowed: 0,
            homeLineup: lineups.homeLineup,
            awayLineup: lineups.awayLineup,
            currentHomeBatter: 0,
            currentAwayBatter: 0,
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            gameMode: gameMode,
            totalInnings: totalInnings,
            gameOver: false // Reset game over flag
        };
        
        // Clear history
        gameStateHistory = [];
        
        // Set first inning for away to 0
        gameState.awayInnings[0] = 0;
        showMessage('New game started! Play Ball! ⚾️');
        updateDisplay();
        updateTeamNames();
        
        // Start computer if in 1-player mode
        if (gameState.gameMode === '1player') {
            setTimeout(() => {
                simulateComputerAtBat();
            }, 2000);
        }
    }
}

// Visual celebration for home run
function celebrateHomeRun() {
    const scoreCard = document.querySelector('.score-card.home');
    scoreCard.style.animation = 'none';
    setTimeout(() => {
        scoreCard.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Manual score adjustment
function adjustScore(team, amount) {
    if (team === 'home') {
        gameState.homeScore = Math.max(0, gameState.homeScore + amount);
    } else {
        gameState.awayScore = Math.max(0, gameState.awayScore + amount);
    }
    updateDisplay();
}

// Toggle manual control buttons
function toggleManualButtons() {
    const manualControls = document.getElementById('manualControls');
    const toggleLabel = document.getElementById('toggleLabel');
    
    if (manualControls.style.display === 'none') {
        manualControls.style.display = 'block';
        toggleLabel.textContent = 'Hide Manual Controls';
    } else {
        manualControls.style.display = 'none';
        toggleLabel.textContent = 'Show Manual Controls';
    }
}



// Random outcome generator
function randomOutcome() {
    if (gameState.gameOver) return; // Prevent actions after game over
    cancelAllSounds(); // Cancel any playing sounds
    saveState(); // Save state before action
    const groundOutMsgs = [
        'Ground ball to short!<br>Out at first! ⚾',
        'Grounder to second!<br>Out! ⚾',
        'Ground ball!<br>Routine play at first! ⚾'
    ];
    const flyOutMsgs = [
        'Fly ball to center!<br>Caught! 🦅',
        'Pop fly!<br>Easy catch! 🦅',
        'Fly ball to left!<br>Out! 🦅'
    ];
    const popupMsgs = [
        'Pop up!<br>Infielder calls it! 🧤',
        'High pop-up!<br>Caught! 🧤',
        'Pop fly!<br>Easy out! 🧤'
    ];
    
    const outcomes = [
        { type: 'single', weight: 25, action: () => { hit(1); recordAtBat('hit'); } },
        { type: 'double', weight: 15, action: () => { hit(2); recordAtBat('hit'); } },
        { type: 'triple', weight: 3, action: () => { hit(3); recordAtBat('hit'); } },
        { type: 'homerun', weight: 8, action: () => { homeRun(); } },
        { type: 'groundout', weight: 20, action: () => { showMessage(groundOutMsgs[Math.floor(Math.random() * groundOutMsgs.length)]); recordAtBat('out'); recordOut(); } },
        { type: 'flyout', weight: 15, action: () => { showMessage(flyOutMsgs[Math.floor(Math.random() * flyOutMsgs.length)]); recordAtBat('out'); recordOut(); } },
        { type: 'popup', weight: 8, action: () => { showMessage(popupMsgs[Math.floor(Math.random() * popupMsgs.length)]); recordAtBat('out'); recordOut(); } },
        { type: 'strikeout', weight: 18, action: () => { showMessage(`Strike three!<br>Strikeout! (${gameState.strikeouts + 1} K) ⚡`); recordAtBat('strikeout'); recordOut(); } },
        { type: 'walk', weight: 10, action: () => { showMessage('Walk! Take your base! 🚶'); walk(); recordAtBat('walk'); } },
        { type: 'error', weight: 5, action: () => { showMessage('Error! Safe at first! 😬'); hit(1, true); recordAtBat('error'); } },
        { type: 'foul', weight: 3, action: () => showMessage('Foul ball! ⚠️') }
    ];
    
    // Weighted random selection
    const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const outcome of outcomes) {
        random -= outcome.weight;
        if (random <= 0) {
            outcome.action();
            return;
        }
    }
}

// Initialize display
updateDisplay();
