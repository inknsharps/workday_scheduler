// Declare jQuery Selector variables
let plannerEl = $(".container");
let currentDateEl = $("#currentDay");
let timeBlockBodyEl = $(".time-block");
let clearEventsButtonEl = $(".clear-events").on("click", clearAllEvents);
// Declare event field related variables
let eventFieldsEl;
let eventFieldsArray;
// Declare variable for the current hour as a number
let currentHour = moment().hours()
// Declare variable for the current date and time
let currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

// Date and time display functionality
currentDateEl.text(currentDate);
setInterval(() => {
    currentDateEl.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

// Function for building the timeblocks
function buildTimeBlocks(hour){
    // Create and append row for time block
    let timeRowEl = $("<tr></tr>")
        .attr("class", `d-flex time-row ${hour}`)
        .attr("data-value", hour);
    timeBlockBodyEl.append(timeRowEl);
    // console.log(timeRowEl[0].dataset.value);
    // Create and append hour column
    let hourColumnEl = $("<td></td>")
        .attr("scope", "col")
        .attr("class", "d-flex col-1 justify-content-center align-items-center")
        .text(moment(`${hour}`, "h").format("hA"));
    timeRowEl.append(hourColumnEl);
    // Create and append event column
    let eventColumnEl = $("<td></td>")
        .attr("scope", "col")
        .attr("class", "col-10");
    let eventText = $("<textarea></textarea>")
        .attr("type", "text")
        .attr("class", "d-flex form-control col-12 event-input");
    eventColumnEl.append(eventText);
    timeRowEl.append(eventColumnEl);
    // Create and append save column
    let saveColumnEl = $("<td></td>")
        .attr("scope", "col")
        .attr("class", "d-flex col-1 justify-content-center align-items-center");
    let saveButtonEl = $("<button></button>")
        .attr("type", "button")
        .attr("class", "btn btn-primary far fa-save saveBtn")
        .on("click", saveEvent);
    saveColumnEl.append(saveButtonEl); 
    timeRowEl.append(saveColumnEl);
}

// Function for highlighting the colors of the row
function highlightEvents(rowNum){
    let tableTimes = $(`.${rowNum}`);
    if (currentHour === rowNum){
        tableTimes.addClass("present");
    }
    if (currentHour > rowNum){
        tableTimes.addClass("past");
    }
    if (currentHour < rowNum){
        tableTimes.addClass("future");
    }
}

// Function to save events that are currently written to localStorage
function saveEvent(){
    eventFieldsArray = [];
    eventFieldsEl = document.querySelectorAll(".event-input");
    for (let i = 0; i < eventFieldsEl.length; i++){
        eventFieldsArray.push(eventFieldsEl[i].value);
    }
    localStorage.setItem("eventsArray", JSON.stringify(eventFieldsArray));
}

// Function to retrieve events from localStorage
function retrieveEvent(){
    eventFieldsEl = document.querySelectorAll(".event-input");
    // Failsafe for if nothing is in localStorage
    if (localStorage.length === 0){
        eventFieldsArray = [];
    } else {
        eventFieldsArray = JSON.parse(localStorage.getItem("eventsArray"));
        for (let i = 0; i < eventFieldsEl.length; i++){
            eventFieldsEl[i].value = eventFieldsArray[i]; 
        }
    }
}

// Function to remove all events from the page
function clearAllEvents(){
    eventFieldsEl = document.querySelectorAll(".event-input");
    let deleteChoice = confirm("This will clear and delete ALL events saved currently! Proceed?");
    if (deleteChoice === false){
        return;
    } else {
        // Failsafe for if nothing is in localStorage
        if (localStorage.length === 0){
            eventFieldsArray = [];
        } else {
            eventFieldsArray = JSON.parse(localStorage.getItem("eventsArray"));
            for (let i = 0; i < eventFieldsEl.length; i++){
                eventFieldsEl[i].value = "";
            }
        }
        localStorage.clear();
        saveEvent();
    }
}

// Function to build out the timeblocks, highlight them and associated event text
function initPage(){
    let i = 8;
    while (i < 19){
        buildTimeBlocks(i);
        highlightEvents(i);
        i++;
    }
    retrieveEvent();
}

initPage();