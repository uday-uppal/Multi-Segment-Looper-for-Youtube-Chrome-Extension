// background.js

// Function to send a message to the content script
function sendMessageToContentScript(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

// Handle messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'loopVideo') {
        // Send a message to the content script to initiate video looping
        sendMessageToContentScript({ action: 'loopVideo', data: request.data });
    }
});

