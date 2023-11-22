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
    if (isAlive) {
        player.chips += parseInt(prompt("How much?"))
        playerEl.textContent = player.name + ": $" + player.chips
        renderGame()
    } else {
        alert("You need to start the game!")
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


function startGame() {

    $(".decoration-el").removeClass("animate-dec");
    $(".win-el").removeClass("animate-win");
    
    if (player.name === "unknown") {
        player.name = prompt("Who is playing? ")
        player.chips = parseInt(prompt("How much money? "))
    }
    
    if (player.chips <= 0) {
        playerEl.textContent = "Out of money!"
        cardsEl.textContent = "Cards: "
        sumEl.textContent = "Sum: "
    } else if (player.chips < 20) {
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
    } else if (sum === 21) {
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
