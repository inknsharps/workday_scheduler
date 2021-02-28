// Declare jQuery Selector variables
let plannerEl = $(".container");
let currentDateEl = $("#currentDay");
let timeBlockBodyEl = $(".time-block")

// Moment.js Scripts
// Declare variable for the current date and time
let currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
currentDateEl.text(currentDate);
setInterval(() => {
    currentDateEl.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

// Function for building the timeblocks
function buildTimeBlocks(hour){
    // Create and append row for time block
    let timeRowEl = $("<tr></tr>").attr("class", `d-flex time-row ${hour}`);
    timeBlockBodyEl.append(timeRowEl);
    // Create and append hour column
    let hourColumnEl = $("<td></td>").attr("scope", "col").attr("class", `d-flex col-1 justify-content-center align-items-center ${hour}`).text(moment(`${hour}`, "h").format("hA"));
    timeRowEl.append(hourColumnEl);
    // Create and append event column
    let eventColumnEl = $("<td></td>").attr("scope", "col").attr("class", "col-10");
    let eventText = $("<textarea></textarea>").attr("type", "text").attr("class", "d-flex form-control col-12 event-input");
    eventColumnEl.append(eventText);
    timeRowEl.append(eventColumnEl);
    // Create and append save column
    let saveColumnEl = $("<td></td>").attr("scope", "col").attr("class", "d-flex col-1 justify-content-center align-items-center");
    let saveButtonEl = $("<button></button>").attr("type", "button").attr("class", "btn btn-primary far fa-save saveBtn").on("click", saveEvent);
    saveColumnEl.append(saveButtonEl); 
    timeRowEl.append(saveColumnEl);
}

// Function to build out the timeblocks and associated text
function initPage(){
    let i = 9;
    while (i < 19){
        if (i < 12) {
            while (i < 12){
                buildTimeBlocks(i);
                i++;
            } 
        } else if (i === 12){
            buildTimeBlocks(i);
            i++;
        } else if (i < 19) {
            while (i < 19) {
                buildTimeBlocks(i);
                i++;
            }
        }
    }
    retrieveEvent();
}

initPage();
