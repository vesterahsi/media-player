const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
let songs = [];
let currentSongIndex = 0;

// Fetch the list of songs from the server
fetch('/api/songs')
    .then(response => response.json())
    .then(data => {
        songs = data;
        // Load the first song
        if (songs.length > 0) {
            audio.src = songs[currentSongIndex].audio;
            displayPlaylist();
            displayCoverImage();
            audio.play(); // Start playing the first song automatically
        }
    })
    .catch(error => console.error('Error fetching song list:', error));

// Display the playlist with song names and cover images
function displayPlaylist() {
    playlist.innerHTML = ''; // Clear previous playlist
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${song.cover}" alt="${song.name} Cover" class="cover-image">
            <span>${song.name.replace(/_/g, ' ')}</span> <!-- Replace underscores with spaces -->
        `;
        li.onclick = () => playSong(index);
        playlist.appendChild(li);
    });
}

// Display the cover image of the current song
function displayCoverImage() {
    const currentSong = songs[currentSongIndex];
    const coverImage = document.getElementById('cover-image');
    coverImage.src = currentSong.cover;
}

// Play a song
function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[currentSongIndex].audio;
    audio.play();
    displayCoverImage();
}

// Play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

// Play the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

// Autoplay next song when current song ends
audio.addEventListener('ended', () => {
    nextSong(); // Automatically play the next song when the current one ends
});
