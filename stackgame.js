
var controls_frame = document.getElementById("controls_frame");
var lives_count = document.getElementById("lives_count");
var build = document.getElementById("build");
var undo = document.getElementById("undo");

var game_frame = document.getElementById("game_frame");

var you_lost = document.getElementById("You_lost")
var you_won = document.getElementById("You_won")
var old_number = [], block_number = 0, p, undo_attempts = 5, lost = false, won = false;
var max = 120, min = 20;
lives_count.innerText = `${undo_attempts} ♥`;
build.addEventListener("click", function () {

    if (lost == true || won == true) {
        return;
    }
    p = document.createElement("p");
    var random_number = Math.floor(Math.random() * (max - min + 1) + min);
    p.innerText = random_number;
    p.setAttribute("style", "width:" + random_number + "px;");
    p.setAttribute("id", "p" + block_number)
    game_frame.appendChild(p);
    old_number.push(random_number);
    check_status();
});


function check_status() {
    if (old_number[block_number - 1] >= old_number[block_number++]) {
        you_lost.style.display = "block";
        lost = true;
        return;
    }
    if (block_number == 4 && lost == false) {
        you_won.style.display = "block";
        won=true;
        return;
    }
}
undo.addEventListener("click", function () {
    if (undo_attempts == 0) {
        alert("You have no more undos");
        play_again();
        return;
    }
    if (block_number - 1 >= 0) {
        you_lost.style.display = "none";
        you_won.style.display = "none";
        old_number.pop();
        game_frame.removeChild(document.getElementById("p" + --block_number));
        undo_attempts--;
        lives_count.innerText = `${undo_attempts} ♥`
        lost = false;
        won = false;
    }

});

function play_again() {

    if (confirm("Play Again?") == true) {
        undo_attempts = 5; game_frame.innerHTML = ""; lost = false; old_number = []; block_number = 0;
        you_lost.style.display = "none";
        you_won.style.display = "none";
        lives_count.innerText = `${undo_attempts} ♥`
        return;
    }
    else {
        alert("Game Over!!")
        return;
    }
}
