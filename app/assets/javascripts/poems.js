$(document).ready(function() {
  function waitForPoem() {
    if ($("#temp_poem")) {
      var poem = $("#temp_poem");
      console.log(poem)
      text = poem.data("poem")
    } else {
      waitForPoem();
    }
  }

  waitForPoem();
  var letters = text.split("")
  var count = 0;
  var score = 0;
  var timerCount = 0
  var currentLetter = letters[count];
  letters.forEach(appendLetterToDOM);

  document.onkeypress = function (e) {
    if (count == 0) startTimer();
    var keyCode = e.which || e.keyCode;
      if (currentLetter && (keyCode == 13) && (currentLetter.charCodeAt() == 10)) {
        count += 1;
        currentLetter = letters[count];
      } else {
        currentLetter ? checkLetter(e) : victory()
      }
  };

  function convertNodeToText(node) {
    return node.innerHTML;
  };

  function checkLetter(e) {
    e = e || window.event;
    var keyCode = e.which || e.keyCode;
    if (letterMatchesEvent(keyCode)) {
      colorLetter(count, "black");
      count += 1;
      score += 5;
      currentLetter = letters[count];
      updateScore(score);
      if (letters[count] == undefined) victory();
    } else {
      colorLetter(count, "red")
      score -= 3;
      updateScore(score);
    }
  }

  function letterMatchesEvent(keyCode) {
    if (keyCode == currentLetter.charCodeAt()) {
      return true
    } else if (keyCode == 39 && currentLetter.charCodeAt() == 8217) {
      return true
    } else {
      return false
    }
  }

  function appendLetterToDOM(letter, count) {
    var div = document.getElementById("editor");
    var span = document.createElement("span");
    span.id = count;
    span.style.color = "grey";
    div.appendChild(span);
    span.innerHTML = letter;
    if (letter && letter.charCodeAt() == 10) {
      span.innerHTML = "<br>";
    }
  };

  function updateScore(currentScore) {
    var score = document.getElementById("score");
    score.innerHTML = "Score: "+ currentScore;
  };

  function colorLetter(index, color) {
    var newSpan = document.getElementById(index);
    newSpan.style.color = color;
    if (color == "black") {
      var currentLetter = document.getElementById(index);
      var lastLetter = document.getElementById(index - 1);

      currentLetter.style.letterSpacing = "-8px";
      if (lastLetter) {
        lastLetter.style.letterSpacing = "0px";
      };

      var oldCursor = document.getElementById("cursor");
      oldCursor.parentElement.removeChild(oldCursor);
      var newCursor = document.createElement("span");
      newCursor.innerHTML = "|";
      newCursor.id = "cursor";
      newSpan.appendChild(newCursor);
    }
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
    timerCount += 1
  };

  function victory() {
    letters.forEach(turnGreen);
    stopTimer();
  };

  function turnGreen(element, index, arr) {
    document.getElementById(index).style.color = "green";
  }

  setInterval (function cursorAnimation() {
    $("#cursor").animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
  }, 650);
});