const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "music" and "covers" directories
app.use('/music', express.static(path.join(__dirname, 'music')));
app.use('/covers', express.static(path.join(__dirname, 'covers')));

// API endpoint to get the list of songs with names and cover images
app.get('/api/songs', (req, res) => {
    const musicDir = path.join(__dirname, 'music');
    fs.readdir(musicDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading music directory');
        }
        const songs = files
            .filter(file => file.endsWith('.mp3'))
            .map(file => {
                const songName = file.replace('.mp3', ''); // Get song name without extension
                return {
                    name: songName,
                    audio: `/music/${file}`,
                    cover: `/covers/${songName}.jpg` // Assuming cover images are named the same as songs
                };
            });
        res.json(songs);
    });
});

// Serve the HTML, CSS, and JS files
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
