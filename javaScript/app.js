const startBtn = document.querySelector(".btn");


startBtn.addEventListener('click', () => {
    document.querySelector('.search-block').style.cssText = "opacity: 1; visibility: visible;"
})



const API_URL = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const search = document.getElementById("search");
const searchBtn = document.getElementById('search-btn');
const result = document.getElementById("songs-list");
const song_lyrics = document.getElementById('song-lyrics');





const showSongs = (data)=> {
    let output = "";
    data.data.forEach((SONG) => {
        output += `
        <li class="song">
                        <span><img class="song-photo" src="${SONG.artist.picture_big}" alt=""></span>
                        <div class="song-info">
                        <span class="song-artist">${SONG.artist.name}</span>
                        <span class="song-title">${SONG.title}</span>
                        <span><audio controls class="song-preview" ><source src="${SONG.preview}"></audio></span>
                        <button type="button" class="get-lyrics-btn" get-artist-name="${SONG.artist.name}" get-title="${SONG.title}">get lyrics</button>
                    </div>
                    </li>
        `
    });
   
    result.innerHTML = `
    <ul>
    ${output}
    </ul>
    `
   
}

function loadfun(){
    document.querySelector('.pre-loader').style.display = "none";
};



const getlyrics = async (artist,title)=>{
    const res = await fetch(`${API_URL}/v1/${artist}/${title}`);
    const data = await res.json();
    console.log(data);

    if(data.error){
        song_lyrics.innerHTML=`
        <button class="back-btn">back</button>
        ${data.error}
        `
    } else{
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    
        song_lyrics.innerHTML = `
        <button class="back-btn">back</button>
        
        <span class="song-artist">${artist}</span>
        <span class="song-title">${title}</span>
        <span class="lyric">${lyrics}</span>
        `;
    }
    

    
}



const songs = async (song) => {
    const res = await fetch(`${API_URL}/suggest/${song}`);
    const data = await res.json();
    console.log(data);
    showSongs(data);
}

result.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked.tagName === "BUTTON") {
    const artist = clicked.getAttribute("get-artist-name");
    const songtitle = clicked.getAttribute("get-title");
    getlyrics(artist, songtitle);

    song_lyrics.style.display="flex";
  }
});

song_lyrics.addEventListener('click', (e)=> {
    const clicked = e.target;
    if(clicked.tagName === "BUTTON"){
        song_lyrics.style.display = "none"
    }
})



searchBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    const value = search.value.trim();
if(!value){
    alert('please enter something..')
} else{
    songs(value);
    
}

});