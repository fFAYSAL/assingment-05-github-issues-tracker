
const allFillterBtn = document.getElementById("all-btn");
const openFillterBtn = document.getElementById("open-btn");
const closedFillterBtn = document.getElementById("closed-btn");

const cards = document.querySelectorAll(".issue-card");

const buttons = [allFillterBtn, openFillterBtn, closedFillterBtn];

function setActiveButton(activeBtn){
    buttons.forEach(btn => {
        btn.classList.remove("bg-blue-600","text-white");
        btn.classList.add("bg-white","text-black");
    });

    activeBtn.classList.remove("bg-white","text-black");
    activeBtn.classList.add("bg-blue-600","text-white");
}


// ALL
allFillterBtn.addEventListener("click", () => {

    setActiveButton(allFillterBtn);

    cards.forEach(card => {
        card.style.display = "block";
    });

});

// OPEN
openFillterBtn.addEventListener("click", () => {

    setActiveButton(openFillterBtn);

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

    setActiveButton(closedFillterBtn);

    cards.forEach(card => {

        if(card.classList.contains("border-purple-500")){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
});