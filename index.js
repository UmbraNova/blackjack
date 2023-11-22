let player = {
    name: "unknown",
    chips: 0
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips



function depositChips() {
        let playerDeposit = parseInt(prompt("How much to deposit? "))

        if (Number.isInteger(playerDeposit)) {
            player.chips += playerDeposit
            playerEl.textContent = player.name + ": $" + player.chips
            hasBlackJack === false
            renderGame()
        }
}


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1

    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function initPlayer() {
    player.name = prompt("Who is playing? ")
}

function startGame() {
    if (player.chips >= 20 && player.name === "unknown") {
        initPlayer()
    } else if (player.chips < 20) {
        alert("Insufficient funds!")
    }

    $(".decoration-el").removeClass("animate-dec");
    $(".win-el").removeClass("animate-win");
    
    
    if (player.chips < 20) {
        playerEl.textContent = "Out of money!"
        cardsEl.textContent = "Cards: "
        sumEl.textContent = "Sum: "
        messageEl.textContent = "Insufficient funds!"
    } else {
        hasBlackJack = false
        player.chips -= 20
        playerEl.textContent = player.name + ": $" + player.chips
        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }

}

function renderGame() {

    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21 && !hasBlackJack) {
        message = "You've got Blackjack!"
        player.chips += 60
        playerEl.textContent = player.name + ": $" + player.chips
        document.getElementById("name-el").textContent = "WINNER: " + player.name

        $(".decoration-el").addClass("animate-dec");
        $(".win-el").addClass("animate-win");
        
        hasBlackJack = true
    } else{
        message = "You're out of the game!"
        isAlive = false
    }

    messageEl.textContent = message

}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }

}
