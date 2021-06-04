var plannerContainerEl = document.querySelector(".container");

// to update tasks imminence bg-color
var auditTask = function(timeId) {
    // target the element by id
    var targetEl = document.querySelector("textarea[id='" + timeId + "']");
    // remove any old classes from element
    targetEl.className = 'col-10';

    // format time to just be a number string
    var formatedTime = moment(timeId, "h A").format("H");
    // set as new formatted moment object at specific time
    var taskTime = moment().set("hour", formatedTime);

    // loop through tasks array to set bg color
    if (moment().diff(taskTime, "hours") == 0) {
        targetEl.className = 'col-10 present';
    } else if (moment().diff(taskTime, "hours") >= 1) {
        targetEl.className = 'col-10 past';
    } else if (Math.abs(moment().diff(taskTime, "hours")) >= 1 ){
        targetEl.className = 'col-10 future';
    }
};

// to save task on button click
var saveTask = function() {
    // get current button's id and paired text content
    var timeId = $(this).attr('id');
    var textContent = document.querySelector("textarea[id='" + timeId + "']").value;

    // save to local storage
    localStorage.setItem(timeId, textContent);
    console.log("Saved: '" + timeId + " - " + textContent + "'");
};

// load initial files 
var loadContent = function() {
    // display current day and date at top of page
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    // use moment to create an element for each hour out of a 9 hour day
    for (i=0; i<9; i++) {
        // create unique id for each textarea and button using moment 24 hour time (9-17pm)
        var timeId = moment().set("hour", (i+9)).format("h A");
        
        // container to hold each column 
        var taskContainer = document.createElement("div");
        taskContainer.className = "row";
        
        // time column
        var taskDiv = document.createElement("div");
        taskDiv.className = "col d-flex align-items-center border-top";
        taskDiv.textContent = timeId;
        taskContainer.appendChild(taskDiv);

        // text area column
        var textArea = document.createElement("textarea");
        textArea.className = "col-10";
        textArea.setAttribute("id", timeId);
        // load text value from local storage if there is one
        textArea.value = localStorage.getItem(timeId);
        taskContainer.appendChild(textArea);

        // save to local storage button column
        var saveBtn = document.createElement("button");
        saveBtn.innerHTML= '<i class="fas fa-save"></i>';
        saveBtn.className = "col saveBtn btn";
        saveBtn.setAttribute("id", timeId);
        taskContainer.appendChild(saveBtn);
        saveBtn.addEventListener("click", saveTask);

        // append whole taskContainer to plannerContainerEl
        plannerContainerEl.appendChild(taskContainer);

        auditTask(timeId);
    }
};

// populate page on load
loadContent();

// audit tasks every minute
setInterval(function() {
    $("textarea").each(function(){
        var timeId = $(this).attr('id');
        auditTask(timeId);
    });
    console.log("Page Audited");
}, 1000);

// set date every day
setInterval(function() {
    // set current date at top of page 
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    console.log("Day Updated");
}, (((1000 * 60) * 60) * 12));