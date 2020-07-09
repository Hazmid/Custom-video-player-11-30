/*                 get our elements               */


const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player__slider');




/*                build our functions                */


// function togglePlay() { //1
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// } //0R


function togglePlay() { //1 to play or pause vid if clicked
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}



// function updateButton() { //2 by me ☺
//   if (this.paused) {
//     toggle.textContent = '►';
//   } else {
//     toggle.textContent = '| |';
//   }
// }


function updateButton() { //2 change icon if video(this) is played or paused
  const icon = this.paused ? '►' : '| |';
  toggle.textContent = icon;
}



function skip() { //3 to activate skip+or-
  //console.log(this.dataset.skip); 
  //this (button) has dataset(data-skip) as skip(-10 or 25)
  //parsefloat changes string to number// we add/minus the number from video current time.
  video.currentTime += parseFloat(this.dataset.skip);
}


function handleRangeUpdate() { //4 toactivate volume and speed range
  // console.log(this.value);
  //console.log(this.name);
  // video['playbackRate'] = this.value;//to set property as value //propertyname is 'playbackRate'
  video[this.name] = this.value; //bcos propertyname is same as range name, we can use [this.name]
}



function handleProgress() { //5 to show progress on progress bar
  const percent = (video.currentTime / video.duration) * 100; //converted current time to a percentage
  progressBar.style.flexBasis = `${percent}%` ;
  
}

function scrub(e) { //6 to scrub video
const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; 
video.currentTime = scrubTime;
}

function fs() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  }
}

function cfs() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

/*          hook up the event listeners                 */ 


video.addEventListener('click', togglePlay);//1
toggle.addEventListener('click', togglePlay);//1

video.addEventListener('play', updateButton);//2
video.addEventListener('pause', updateButton);//2

skipButtons.forEach(button => button.addEventListener('click', skip)); //3

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); //4
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); //4 //mousemove is to update in real time, not just when u let go of the button

video.addEventListener('timeupdate', handleProgress);//5

progress.addEventListener('click', scrub); //6

let mouseDown = false; // 7
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e)); //7 if mouseDown is true (only mousedown is true), mousemove will activate scrub
progress.addEventListener('mousedown', () => mouseDown = true); // 7 true
progress.addEventListener('mouseup', () => mouseDown = false); //7

