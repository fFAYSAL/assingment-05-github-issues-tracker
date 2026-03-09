const allFillterBtn = document.getElementById("all-btn");
const openFillterBtn = document.getElementById("open-btn");
const closedFillterBtn = document.getElementById("closed-btn");

const cards = document.querySelectorAll(".issue-card");

// ALL
allFillterBtn.addEventListener("click", () => {
    cards.forEach(card => {
        card.style.display = "block";
    });
});

// OPEN
openFillterBtn.addEventListener("click", () => {
    cards.forEach(card => {

        if(card.classList.contains("border-green-500")){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
});

// CLOSED
closedFillterBtn.addEventListener("click", () => {
    cards.forEach(card => {

        if(card.classList.contains("border-purple-500")){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
});
