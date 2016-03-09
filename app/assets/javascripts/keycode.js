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

function letterMatchesEvent(keyCode) {
  if (keyCode == currentLetter.charCodeAt()) {
    return true
  } else if (keyCode == 39 && currentLetter.charCodeAt() == 8217) {
    return true
  } else {
    return false
  }
}

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
    colorLetter(count, "red");
    score -= 3;
    updateScore(score);
  }
}

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
