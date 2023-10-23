$$ = document.querySelectorAll.bind(document)
$ = document.querySelector.bind(document)
const PLAYER_STOREAGE_KEY = 'Contain Key'
const _this = this
const cd = $('.cd')
const playList = $('.play-list')
const app = {
    isPlay: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Yêu đương khó quá ",
            author: "Karik",
            img: "./assets/img/img1.jpg",
            music: "./assets/music/song1.mp3"
        },
        {
            name: "Yêu lại càng đau",
            author: "Mạnh Quỳnh",
            img: "./assets/img/img2.jpg",
            music: "./assets/music/song2.mp3"
        },
        {
            name: "See tình",
            author: "Thùy Linh",
            img:"./assets/img/img3.jpg",
            music:"./assets/music/song3.mp3"
        },
        {
            name: "Ngắm pháo hoa cùng nhau",
            author: "MCK",
            img:"./assets/img/img4.jpg",
            music:"./assets/music/song4.mp3"
        },
        {
            name: "Bo xì bo",
            author: "Thùy Linh",
            img:"./assets/img/img5.jpg",
            music:"./assets/music/song5.mp3"
        },
        {
            name: "Waitting For You",
            author: "Mono",
            img:"./assets/img/img6.jpg",
            music:"./assets/music/song6.mp3"
        },
        {
            name: "Hãy trao cho anh",
            author: "Sơn Tùng Mtp",
            img:"./assets/img/img7.jpg",
            music:"./assets/music/song7.mp3"
        },
        {
            name: "Bên trên tầng lầu",
            author: "No Name",
            img:"./assets/img/img8.jpg",
            music:"./assets/music/song8.mp3"
        },
        {
            name: "Khuất lối",
            author: "Cao Thắng",
            img:"./assets/img/img9.jpg",
            music: "./assets/music/song9.mp3"
        },
        {
            name: "Lửng lơ",
            author: "Tlinh",
            img:"./assets/img/img10.jpg",
            music:"./assets/music/song10.mp3"
        }
    ],
    // config: JSON.parse(localStorage.getItem(PLAYER_STOREAGE_KEY)) || {}, 
    // setConfig: function(key,value) {
    //     this.config[key] = value;
    //     localStorage.setItem(PLAYER_STOREAGE_KEY,JSON.stringify(this.config));
    // },
    render: function() {
        const _this=this
        const htmls = this.songs.map(function(song,index) {
            return `<div class="song ${index === _this.currentIndex ? 'active' : ''}" data-index = ${index}>
                        <div class="song-img" 
                        style="background-image: url('${song.img}');">            
                        </div>
                        <div class="song-info">
                            <h4 class="title">${song.name}</h4>
                            <p class="author">${song.author}</p>
                        </div>
                        </div>`
        })
        $(".play-list").innerHTML = htmls.join('')
        
    },
    defineProperties: function() {
        Object.defineProperty(this,'currentSong',{
            get: function() {
                return this.songs[this.currentIndex]
            }
        })   
    },
    handleEvents: function() {
        const _this = this
        const cd = $('.cd')
        const playList = $('.play-list')
        const cdWidth = cd.offsetWidth
        const cdAnimate = cd.animate(
            [
                {transform : "rotate(0deg)"},
                {transform : "rotate(360deg)"}
            ],
            {
                duration: 10000,
                iterations: Infinity
            }
        );
        
        cdAnimate.pause()

        
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            if(newCdWidth > 0) {
                cd.style.width = newCdWidth + 'px'
            }
            else {
                cd.style.width = 0
            }
            cd.style.opacity = newCdWidth / cdWidth
            
        }
        const lineProcess = $('#process')
        
        audio.ontimeupdate = function() {
            const currentTime = audio.currentTime
            const cdTime = audio.duration
            if(audio.duration) {
                const value = currentTime / cdTime * 100
                lineProcess.value = Math.floor(value)

            }
            
        }

        lineProcess.oninput = function() {
            audio.currentTime = audio.duration / 100 * lineProcess.value
        }
        
        const playAudio = $('.btn-play')
        const pauseAudio = $('.btn-pause')
        
        playAudio.onclick = function() {
            if(_this.isPlay){
                audio.pause()
            }
            else {
                audio.play()
            }
        }
        
        audio.onplay = function() {
            playAudio.classList.add('playing')
            _this.isPlay = true
            cdAnimate.play()
        }
        audio.onpause = function() {
            playAudio.classList.remove('playing')
            _this.isPlay = false
            cdAnimate.pause()
        }
        
        const nextBtn = $('.btn-next')
        const preBtn = $('.btn-pre')
      
        
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
                _this.loadCurrentSong()
            }
            else{
                _this.nextSong()
            }
            $('.song.active').classList.remove('active')        
            songList[_this.currentIndex].classList.add('active')
            _this.scrollSongActive()
            audio.play()
        }

        preBtn.onclick = function() {
            if(_this.isRandom) {
                _this.randomSong()
                _this.loadCurrentSong()
            }
            else{
                _this.preSong()
            }
            $('.song.active').classList.remove('active')        
            songList[_this.currentIndex].classList.add('active')
            _this.scrollSongActive()
            audio.play()

        }

        const randomBtn = $('.btn-random')
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            // _this.setConfig("isRandom",_this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom)
            $('.song.active').classList.remove('active')        
            songList[_this.currentIndex].classList.add('active')
            _this.scrollSongActive()
        }

        const repeatBtn = $('.btn-repeat')
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            // _this.setConfig("isRepeat",_this.isRepeat)
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }

        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click()
            }
        }

        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode) 
            {
                _this.currentIndex = songNode.dataset.index
                $('.song.active').classList.remove('active')        
                songList[_this.currentIndex].classList.add('active')
                _this.loadCurrentSong()
                audio.play()
                _this.scrollSongActive()
            }
        }
        
    },
    loadCurrentSong: function() {
        const heading = $('.music-name p')
        const musicCd = $('.music-cd')
        const audio = $('#audio')
        heading.textContent = this.currentSong.name
        musicCd.style.backgroundImage = `url("${this.currentSong.img}")`
        audio.src = this.currentSong.music
    },
    scrollSongActive: function() {
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            })
        },300)
    },
    randomSong: function() {
        let random;
        do {
            random = Math.floor(Math.random() * 10)
        }
        while(random === this.currentIndex)
        this.currentIndex = random
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    preSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        
    },
    start: function() {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
        
    }
}
app.start()


const songList = $$('.song')
const songActive = $('.song.active')

// xử lý onlcik vào bài hát
songList.forEach(song => {
    song.onclick = () => {
        song.style.animation = "pressSong 0.2s ease-in"
        setTimeout(() => {
            song.style.animation = ""
        },200)
    } 
})



//change mode
const lightMode = $('.light-mode')
const darkMode = $('.dark-mode')
const container = $('.container')
lightMode.onclick = () => {
    lightMode.classList.add('using')
    darkMode.classList.add('using')
    container.style.backgroundImage = "linear-gradient(180deg, rgb(0 0 0), rgb(12 12 12 / 97%))"
}

darkMode.onclick = () => {
    lightMode.classList.remove('using')
    darkMode.classList.remove('using')
    container.style.backgroundImage = "linear-gradient(180deg, rgb(30 3 54), rgb(40 5 100 / 97%))"
}



