
var controls_frame = document.getElementById("controls_frame");
var lives_count = document.getElementById("lives_count");
var build = document.getElementById("build");
var undo = document.getElementById("undo");
var game_frame = document.getElementById("game_frame");
var try_again = document.getElementById("Try_again");
var you_lost = document.getElementById("You_lost")
var you_won = document.getElementById("You_won")
var old_number = [], block_number = 0, p, undo_attempts = 5, lost = false, won = false;
var max = 120, min = 20;
lives_count.innerText = `${undo_attempts} ♥`;
build.addEventListener("click", function () {
    if (lost == true || won == true) {
        return;
    }
    var pop = new Audio("./assets/audio/pop.mp3");
    pop.play();
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
        if (undo_attempts == 0) {
            you_lost.style.display = "block";
            lost = true;
            var game_over = new Audio("./assets/audio/game_over.mp3");
            game_over.play();
        }
        else {
            try_again.style.display = "block";
            lost = true;
            var try_again_tone = new Audio("./assets/audio/try_again.mp3");
            try_again_tone.play();
        }
        return;
    }

    if (block_number == 4 && lost == false) {
        you_won.style.display = "block";
        won = true;
        var yay = new Audio("./assets/audio/yay.mp3");
        yay.play();
        return;
    }
}
undo.addEventListener("click", function () {
    if (undo_attempts == 0) {
        alert("You have no more undos");
        if (confirm("Play Again?") == true) {
            play_again();
        }
        return;
    }
    if (block_number - 1 >= 0) {
        you_lost.style.display = "none";
        you_won.style.display = "none";
        try_again.style.display = "none";
        old_number.pop();
        game_frame.removeChild(document.getElementById("p" + --block_number));
        undo_attempts--;
        lives_count.innerText = `${undo_attempts} ♥`
        lost = false;
        won = false;
    }

});

function play_again() {
    undo_attempts = 5, game_frame.innerHTML = "", lost = false, won = false, old_number = [], block_number = 0;
    you_lost.style.display = "none";
    you_won.style.display = "none";
    lives_count.innerText = `${undo_attempts} ♥`
    return;
}
