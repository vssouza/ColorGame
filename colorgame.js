/**
 * Created by vinicius.yamauchi on 9/6/2017.
 */

var squares = document.getElementsByClassName("square");

var board = {
    numberOfBlocks: 6,
    maxBlocks: 6,
    pickedColor: "",
    colors: [],
    setMode: function(mode) {
        if(mode === "EASY") {
            this.numberOfBlocks = this.maxBlocks / 2;
        }
        else {
            this.numberOfBlocks = this.maxBlocks;
        }
    },
    createGame: function() {
        var i = 0
        this.colors = [];
        document.querySelector("h1").style.backgroundColor = "steelblue";
        document.querySelector("#result").textContent="";
        while(i < this.numberOfBlocks) {
            this.colors.push("RGB("+ (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ")")
            squares[i].style.backgroundColor = this.colors[i];
            squares[i].addEventListener("click", function() {
                if(this.style.backgroundColor.toUpperCase() === board.pickedColor) {
                    board.setWinner();
                }
                else {
                    document.querySelector("#result").textContent="Try again...";
                    this.style.backgroundColor = "#232323";
                }
            });
            squares[i].classList.remove("hide-div");
            i++;
        }
        while(i < this.maxBlocks) {
            squares[i].classList.add("hide-div");
            i++;
        }
        this.pickedColor = board.colors[Math.floor(Math.random() * this.numberOfBlocks)];
        document.querySelector("#rgbColor").textContent = board.pickedColor;
    },
    setWinner: function() {
        document.getElementById("reset").textContent = "Play Again?"
        for(var i = 0; i < this.numberOfBlocks; i++) {
            squares[i].style.backgroundColor = board.pickedColor;
            squares[i].classList.remove("hide-div");
        }
        document.querySelector("h1").style.backgroundColor = board.pickedColor;
        document.querySelector("#result").textContent="Winner!";
    }
}

board.createGame();

document.getElementById("easy").addEventListener("click", function() {
    this.classList.add("selected");
    document.getElementById("hard").classList.remove("selected");
    board.setMode("EASY");
    board.createGame();
});

document.getElementById("hard").addEventListener("click", function() {
    this.classList.add("selected");
    document.getElementById("easy").classList.remove("selected");
    board.setMode("HARD");
    board.createGame();
});

document.getElementById("reset").addEventListener("click", function() {
    this.textContent = "New Colors"
    board.createGame();
});

document.querySelector("#rgbColor").textContent = board.pickedColor;