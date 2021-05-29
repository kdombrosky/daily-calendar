var plannerContainerEl = document.querySelector(".container");
var tasks = [];


// display current day and date at top of page
// include this part in the auditTasks(); 30 minute interval checkup 
$("#currentDay").text(moment().format("dddd, MMMM Do"));

var auditTasks = function() {
    // set current date at top of page 
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    // loop through tasks array to set bg color
}

// to compare current time to timeID
// currentTime = moment().format("h A"); 
// if (currentTime === timeId) {
//     // set class name to .present
// } else if (currentTime.diff idk)


// load initial files 
var loadContent = function() {
    // use moment to create an element for each loop from 9 to 5 pm (9-17 in 24hr time)
    for (i=9; i<18; i++) {
        // create unique id for each textarea and button
        var timeId = moment().set("hour", i).format("h A");

        // container to hold each column 
        var taskContainer = document.createElement("div");
        taskContainer.className = "row";
        
        // time column
        var taskDiv = document.createElement("div");
        taskDiv.textContent = timeId;
        taskDiv.className = "time-block col";
        taskContainer.appendChild(taskDiv);

        // text area column
        var textArea = document.createElement("textarea");
        textArea.className = "col-10 past";
        textArea.setAttribute("id", timeId);
        taskContainer.appendChild(textArea);

        // save to local storage button
        var saveBtn = document.createElement("button");
        saveBtn.innerHTML= '<i class="fas fa-save"></i>';
        saveBtn.className = "col saveBtn";
        saveBtn.setAttribute("id", timeId);
        taskContainer.appendChild(saveBtn);
        //saveBtn.addEventListener("click", saveTask);

        // append whole taskContainer to plannerContainerEl
        plannerContainerEl.appendChild(taskContainer);
    }
}

// if save button is clicked: 
// get parent id attribute 
// select the text area inside the parent id Element
// get the text area value 

loadContent();




