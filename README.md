
# Simple Music Player Web App

This project is a simple music player web app that allows users to play audio files from a folder. Songs in the folder are automatically detected, and users can navigate through them using basic "Previous" and "Next" controls. 

## Table of Contents
1. [Project Setup](#project-setup)
2. [Folder Structure](#folder-structure)
3. [Installation](#installation)
4. [Code Explanation](#code-explanation)
5. [Styling the Player](#styling-the-player)
6. [JavaScript Functionality](#javascript-functionality)

---

## 1. Project Setup

To set up this project, you will need:
- A basic understanding of HTML, CSS, and JavaScript.
- [Node.js](https://nodejs.org/) installed on your computer (required for serving files with `http-server`).
- Some audio files to test the player.

## 2. Folder Structure

Organize the project folder as follows:

```
/music-player
│
├── audio/                # Folder where you place your songs (e.g., song1.mp3, song2.mp3, etc.)
├── index.html            # Main HTML file for the player interface
├── styles.css            # CSS file for styling the player
├── script.js             # JavaScript file for handling song playback
└── README.md             # Project instructions
```

## 3. Installation

### Step 1: Install `http-server`
To serve the files locally, install `http-server` globally:

```bash
npm install -g http-server
```

### Step 2: Start the Server
Navigate to the project directory in the terminal and run:

```bash
http-server
```

Open the browser and go to the local server URL provided, typically `http://127.0.0.1:8080`,or similar. 

!imp  if the previous didn't work just open the project folder in terminal and type
```bash
node server.js
```
then open your browser and type URL `http://localhost:3000`.

## 4. Code Explanation

### `index.html`

This HTML file defines the layout of the player, including:
- A `container` to hold the title and playlist.
- A `player` div with audio controls and navigation buttons.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Music Player</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Music Player</h1>
        <ul id="playlist"></ul>
    </div>
    <div id="player">
        <audio id="audio" controls></audio>
        <button id="prev" onclick="prevSong()">Prev</button>
        <button id="next" onclick="nextSong()">Next</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### `styles.css`

CSS styling for the player, container, and buttons:

```css
/* General Styles */
body {
    font-family: 'Arial', sans-serif;
    background-color: #1c1c1c;
    color: #ffffff;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 80px);
}

h1 {
    color: #ffcc00;
    margin-bottom: 20px;
    font-size: 24px;
}

#player {
    background-color: #282828;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
}

button {
    background-color: #ffcc00;
    color: #282828;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #e6b800;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
}

li {
    background-color: #383838;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

li:hover {
    background-color: #484848;
}
```

## 5. JavaScript Functionality

The `script.js` file manages the core functionality:
- Detects audio files in the `/audio` folder.
- Plays the selected audio file and navigates between tracks.

```javascript
let currentSongIndex = 0;
let audioFiles = ["audio/song1.mp3", "audio/song2.mp3"]; // Add paths to your audio files
const audioElement = document.getElementById("audio");
const playlistElement = document.getElementById("playlist");

function loadPlaylist() {
    audioFiles.forEach((file, index) => {
        const li = document.createElement("li");
        li.textContent = `Song ${index + 1}`;
        li.onclick = () => playSong(index);
        playlistElement.appendChild(li);
    });
}

function playSong(index) {
    currentSongIndex = index;
    audioElement.src = audioFiles[currentSongIndex];
    audioElement.play();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    playSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
    playSong(currentSongIndex);
}

loadPlaylist();
```

- **`loadPlaylist()`**: Dynamically loads the songs into the playlist.
- **`playSong(index)`**: Plays a selected song by updating the `audioElement` source.
- **`nextSong()` / `prevSong()`**: Allows users to navigate through the playlist.

## 6. Styling the Player

The CSS styling provided gives a simple, clean design for the player, with hover effects on playlist items and a fixed bottom player for navigation.

---

## Final Notes

To customize the player:
- Add more songs to the `audio` folder and update `audioFiles` in `script.js`.
- Customize colors in `styles.css` for a personalized look.
Enjoy your music player 
