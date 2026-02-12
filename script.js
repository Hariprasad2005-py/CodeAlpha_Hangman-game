function startGameScreen() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
    startGame();
}
const words = [
"apple","banana","cherry","dragon","elephant","forest","guitar","helmet","island","jungle",
"kitchen","lemon","mountain","notebook","orange","pencil","queen","rocket","sunset","tiger",
"umbrella","violin","window","xylophone","yogurt","zebra","computer","javascript","python",
"internet","developer","software","hardware","keyboard","monitor","speaker","camera",
"mobile","laptop","science","history","physics","chemistry","biology","mathematics",
"football","cricket","tennis","hockey","volleyball","basketball","formula","racing",
"galaxy","planet","universe","gravity","energy","machine","engineer","project",
"college","school","teacher","student","lecture","assignment","database","network"
];

let word;
let guessedLetters;
let wrongAttempts;
let maxAttempts = 6;
let score = 0;

const chatBox = document.getElementById("chat-box");

function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongAttempts = 0;

    addMessage("🎮 New Hangman Game Started!", "bot");
    addMessage("📜 Rules: Guess one letter at a time. 6 wrong attempts allowed.", "bot");
    addMessage("Word: " + displayWord(), "bot");
    addMessage("Attempts Left: " + (maxAttempts - wrongAttempts), "bot");
    addMessage("Score: " + score, "bot");
}

function addMessage(message, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayWord() {
    return word.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
}

function sendMessage() {
    const input = document.getElementById("user-input");
    let guess = input.value.toLowerCase().trim();
    input.value = "";

    if (!guess) return;

    addMessage("You: " + guess, "user");

    // Validation
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        addMessage("⚠ Enter only ONE valid letter (a-z).", "bot");
        return;
    }

    if (guessedLetters.includes(guess)) {
        addMessage("⚠ You already guessed that letter.", "bot");
        return;
    }

    guessedLetters.push(guess);

    // Correct Guess
    if (word.includes(guess)) {
        score += 10;
        addMessage("✅ Correct guess!", "bot");
    } 
    // Wrong Guess
    else {
        wrongAttempts++;
        score -= 5;
        addMessage("❌ Wrong guess!", "bot");
    }

    addMessage("Word: " + displayWord(), "bot");
    addMessage("Guessed Letters: " + guessedLetters.join(", "), "bot");
    addMessage("Attempts Left: " + (maxAttempts - wrongAttempts), "bot");
    addMessage("Score: " + score, "bot");

    checkGameStatus();
}

function checkGameStatus() {

    // WIN CONDITION
    if (!displayWord().includes("_")) {
        score += 20;
        addMessage("🎉 Congratulations! You guessed the word!", "bot");
        addMessage("🏆 Final Score: " + score, "bot");
        endGame();
    }

    // LOSE CONDITION
    if (wrongAttempts >= maxAttempts) {
        score -= 10;
        addMessage("💀 Game Over! You’ve been hanged.", "bot");
        addMessage("The correct word was: " + word, "bot");
        addMessage("🏆 Final Score: " + score, "bot");
        endGame();
    }
}

function endGame() {
    document.getElementById("user-input").disabled = true;

    const btn = document.createElement("button");
    btn.innerText = "🔄 Play Again";
    btn.classList.add("restart-btn");
    btn.onclick = function() {
        location.reload();
    };
    chatBox.appendChild(btn);
}


