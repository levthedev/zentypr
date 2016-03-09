setInterval (function cursorAnimation() {
  $("#cursor").animate({
      opacity: 0
  }, 'fast', 'swing').animate({
      opacity: 1
  }, 'fast', 'swing');
}, 650);

function fadeOutWithReset(element) {
  $(element).fadeOut(1500, function() {
    this.innerHTML = "";
    this.style.display = "";
  });
};

function appendNextButtonToDOM() {
  $("#next").append("<button id='fadeButton'>more?</button>");
};

function turnGreen(element, index, arr) {
  document.getElementById(index).style.color = "green";
};

function startTimer() {
  startTime = performance.now();
};

function stopTimer() {
  if (timerCount == 0) {
    var stopTime = performance.now();
    var minutes = (stopTime - startTime) / 60000;
    var wpm = text.split(" ").length / minutes;
    updateScore(Math.round(score + (wpm * 5)));
    var timeSpan = document.createElement("span");
    timeSpan.innerHTML = "WPM: " + Math.round(wpm);
    document.getElementById("wpm").appendChild(timeSpan);
  }
  timerCount += 1;
};

function updateScore(currentScore) {
  var score = document.getElementById("score");
  score.innerHTML = "Score: "+ currentScore;
};

function victory() {
  if ($("#fadeButton").length == 0) {
    letters.forEach(turnGreen);
    stopTimer();
    appendNextButtonToDOM();
  }
};
