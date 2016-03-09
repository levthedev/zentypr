$(document).ready(function() {
  poemCount = 0;

  function waitForPoem() {
    if ($("#poems")) {
      init();
      poemCount += 1;
    } else {
      waitForPoem();
    }
  }

  function init() {
    text = $("#poems").data("poems")[poemCount];
    if (text) {
      letters = text.split("");
      count = 0;
      score = 0;
      timerCount = 0
      currentLetter = letters[count];
      $("#editor").toggle();
      letters.forEach(appendLetterToDOM);
      $("#editor").fadeIn(1000);
    } else {
      $("#cursor").remove();
      $("#editor").append("<p id='done1'>that's it</p>");
      $("#editor").append("<p id='done2'>there's no more</p>");
      $("#done1").fadeIn(1500, function() {
        $("#done2").fadeIn(1500, function(){});
      });
    };
  };

  waitForPoem();

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

  $(document).on("click", "#fadeButton", function() {
    fadeOutWithReset("#editor");
    fadeOutWithReset("#score");
    fadeOutWithReset("#wpm");
    $("#fadeButton").fadeOut(1500, function() {
      this.remove();
      $("#editor").append("<span id='cursor'>|</span>");
      init();
    });
  });
});
