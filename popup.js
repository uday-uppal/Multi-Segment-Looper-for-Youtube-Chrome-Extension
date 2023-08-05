document.addEventListener('DOMContentLoaded', function () {
    // Get references to the input fields and loop button
    // var startTimeInput = document.getElementById('start-time');
    // var endTimeInput = document.getElementById('end-time');
    var loopButton = document.getElementById('loop-button');
    var plusButton = document.getElementById('plus');
    var formContainer = document.getElementById('form-container');
    var inputCount = 1;
    var data = [];

    // Add click event listener to the loop button
    loopButton.addEventListener('click', function () {
        // Get the loop start time and end time from the input fields
        // var loopStartTime = startTimeInput.value;
        // var loopEndTime = endTimeInput.value;
        function convertToSeconds(timeString) {
            var timeParts = timeString.split(':').map(part => parseInt(part));
            if (timeParts.length !== 2 || timeParts.some(isNaN)) {
                return null; // Invalid time format
            }
            return timeParts[0] * 60 + timeParts[1];
        }

        data = [];
        var formContainer = document.getElementById("form-container");
        var children = formContainer.children;
        for (let i = 0; i < children.length; i++) {
            var childElement = children[i];
            var start = childElement.querySelector("#start-time" + (i + 1));
            var end = childElement.querySelector("#end-time" + (i + 1));
            if (start.value && end.value) {
                data.push([convertToSeconds(start.value), convertToSeconds(end.value)]);
            }
        }
        chrome.runtime.sendMessage({
            action: 'loopVideo',
            data: data
        });



        // Check if both start time and end time are provided
        // if (loopStartTime && loopEndTime) {
        //     // Send message to the background script to initiate video looping
        // chrome.runtime.sendMessage({
        //     action: 'loopVideo',
        //     loopStartTime: loopStartTime,
        //     loopEndTime: loopEndTime
        // });
        // }
    });
    plusButton.addEventListener('click', function () {
        inputCount++;

        var inputStartGroup = document.createElement("div");
        var inputEndGroup = document.createElement("div");
        inputStartGroup.classList.add("form-group");
        inputEndGroup.classList.add("form-group");

        var labelStart = document.createElement("label");
        labelStart.setAttribute("for", `start-time${inputCount}`);
        labelStart.textContent = `Start Time ${inputCount}:`;

        var labelEnd = document.createElement("label");
        labelEnd.setAttribute("for", `end-time${inputCount}`);
        labelEnd.textContent = `End Time ${inputCount}:`;

        var inputStart = document.createElement("input");
        inputStart.type = "text";
        inputStart.id = `start-time${inputCount}`;
        inputStart.placeholder = "hh:mm:ss";

        var inputEnd = document.createElement("input");
        inputEnd.type = "text";
        inputEnd.id = `end-time${inputCount}`;
        inputEnd.placeholder = "hh:mm:ss";

        inputStartGroup.appendChild(labelStart);
        inputStartGroup.appendChild(inputStart);

        inputEndGroup.appendChild(labelEnd);
        inputEndGroup.appendChild(inputEnd);

        var formMainGroup = document.createElement("div");
        formMainGroup.classList.add("form-main-group");
        formMainGroup.appendChild(inputStartGroup);
        formMainGroup.appendChild(inputEndGroup);
        formContainer.appendChild(formMainGroup);
    })

});
