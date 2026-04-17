async function loadCards() {
    const response = await fetch("cards.json");
    const cards = await response.json();
    return cards;
}

function getRandomCards(cards, count = 3) {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function generateReading(selectedCards) {
    return selectedCards
        .map(card => `${card.name}: ${card.meaning}`)
        .join("\n\n");
}

document.getElementById("drawBtn").addEventListener("click", async () => {
    const cards = await loadCards();
    const selectedCards = getRandomCards(cards);

    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    selectedCards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.textContent = card.name;
        container.appendChild(div);
    });

    document.getElementById("readingText").textContent =
        generateReading(selectedCards);
});

document.getElementById("copyBtn").addEventListener("click", () => {
    const text = document.getElementById("readingText").textContent;
    navigator.clipboard.writeText(text);
});
