const app = () => {
 const song = document.querySelector('.song');
 const play = document.querySelector('.play');
 const outline = document.querySelector('.moving-outline circle');
 const video = document.querySelector('.vid-container video');

 //soundss
 const sounds = document.querySelectorAll('.sound-picker button');
 //time display
 const timeDisplay = document.querySelector('.time-display');
 const timeSelect = document.querySelectorAll('.time-select button');

 //get the lengths of the outline
 const outlineLength = outline.getTotalLength();
 
 //duration
 let fakeDuration = 600;
  
   outline.style.strokeDasharray = outlineLength;
   outline.style.strokeDashoffset = outlineLength;
   
   sounds.forEach(sound => {
     sound.addEventListener('click', function() {
       song.src = this.getAttribute('data-sound');
       video.src = this.getAttribute('data-video');
       checkPlaying(song);
     });
   });

    
   //play sound
   play.addEventListener('click', () => {
    checkPlaying(song);
   });

   //select sound duration
   timeSelect.forEach(option => {
     option.addEventListener('click', function() {
       fakeDuration = this.getAttribute('data-time');
       timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
     });
   });

   //func to stop and play
   const checkPlaying = song => {
     if(song.paused) {
       song.play();
       video.play();
       play.src = './svg/pause.svg';
     }
     else{
       song.pause();
       video.pause();
       play.src = './svg/play.svg';
     }
   }

   //animate the circle
   song.ontimeupdate = () => {
     let currentTime = song.currentTime;
     let elapsed = fakeDuration - currentTime;
     let seconds = Math.floor(elapsed % 60); //nashti
     let minutes = Math.floor(elapsed / 60);
     
     let progress = outlineLength - (currentTime / fakeDuration) * outlineLength; 13455-(2/60)*132
     outline.style.strokeDashoffset = progress;
     //animate text
     timeDisplay.textContent = `${minutes}:${seconds}`; 

     //reset 
     if(currentTime >= fakeDuration) {
       song.pause();
       song.currentTime = 0;
       video.pause();
       play.src = './svg/play.svg';
     }
   }

}

app();
