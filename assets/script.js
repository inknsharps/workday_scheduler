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