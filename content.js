alert('js injetado')

const NORMAL_SPEED = 1;

const state = {
    active: null,
    speed: null,
    videos: null,
}

async function activate() {
    state.active = await getActive()
    if (!state.active) return

    state.speed = await getSpeed()
    getVideosAndSetSpeed()

    window.addEventListener('yt-navigate-finish', getVideosAndSetSpeed)
}

function getVideosAndSetSpeed() {
    state.videos = getVideos()
    setAllVideosSpeed()
}

function getVideos() {
    return document.getElementsByTagName('video')
}

function setAllVideosSpeed({ resetToNormalSpeed = false } = {}) {
    const speed = resetToNormalSpeed ? NORMAL_SPEED : state.speed
    for (video of state.videos) {
        setVideoSpeed(video, speed)
    }
}

function setVideoSpeed(video, speed) {
    video.playbackRate = speed
}

activate()