const config = {};

const attemptDefaultClassName = "btn btn-white btn-circle btn-xl border border-dark";

const attemptColors = new Map([]);
attemptColors.set("BLUE", "btn btn-primary btn-circle btn-xl")
.set("GREEN", "btn btn-success btn-circle btn-xl")
.set("OPEN_BLUE", "btn btn-info btn-circle btn-xl")
.set("ORANGE", "btn btn-warning btn-circle btn-xl")
.set("RED", "btn btn-danger btn-circle btn-xl")
.set("GREY", "btn btn-secondary btn-circle btn-xl");


const feedbackDefaultClassName = "btn btn-dark btn-circle btn-l border border-dark";

const feedbackColors = new Map([]);
feedbackColors.set("BLACK", "btn btn-dark btn-circle btn-l border border-dark")
    .set("WHITE", "btn btn-white border border-dark btn-circle btn-l")
    .set("RED", "btn btn-danger btn-circle btn-l");



const secretKeyDefaultClassName = "btn btn-dark btn-circle btn-xl";



config.attemptDefaultClassName = attemptDefaultClassName;
config.attemptColors = attemptColors;
config.feedbackDefaultClassName = feedbackDefaultClassName;
config.feedbackColors = feedbackColors;
config.secretKeyDefaultClassName = secretKeyDefaultClassName;

export default config;