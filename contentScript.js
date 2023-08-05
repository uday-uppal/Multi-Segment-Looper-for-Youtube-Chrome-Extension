// contentScript.js
var count = 0;
let timeupdateListner = null;
// Function to receive messages from the background script
function loop(message, sender, sendResponse) {
    if (message.action === 'loopVideo') {
        // Extract loop start time and end time from the message
        var loopStartTime = message.data[0][0];
        // var loopEndTime = message.loopEndTime;
        count = 0;


        // Find the YouTube video player element
        var videoPlayer = document.querySelector('.html5-main-video');
        function handleTimeUpdate() {
            // if (videoPlayer.currentTime >= loopEndTime) {
            //     videoPlayer.currentTime = loopStartTime;
            // }
            if (videoPlayer.currentTime >= message.data[count][1]) {
                if (count < message.data.length - 1) {
                    count++;
                    videoPlayer.currentTime = message.data[count][0];
                }
                else {
                    count = 0;
                    videoPlayer.currentTime = message.data[count][0];
                }
            }
        }


        // Check if the video player element exists
        if (videoPlayer) {
            // Add event listener to loop the video when it reaches the loop end time
            if (timeupdateListner) {
                videoPlayer.removeEventListener('timeupdate', timeupdateListner);
                timeupdateListner = null;
            }
            if (!timeupdateListner) {
                timeupdateListner = handleTimeUpdate;
                videoPlayer.addEventListener('timeupdate', timeupdateListner);
            }
            videoPlayer.currentTime = loopStartTime;


            // Start the video loop

        }
    }
}
chrome.runtime.onMessage.addListener(loop);
