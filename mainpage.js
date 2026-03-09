const allFillterBtn = document.getElementById("all-btn");
const openFillterBtn = document.getElementById("open-btn");
const closedFillterBtn = document.getElementById("closed-btn")

const issueCount = document.getElementById("issue-count")
const searchInput = document.getElementById("search-input")
const container = document.getElementById("card-container")

const focusedCard = document.getElementById("focused-card");

const focusedContent = document.getElementById("focused-content")
const focusedClose = document.getElementById("focused-close");

const buttons = [allFillterBtn, openFillterBtn, closedFillterBtn];

let allIssues = []


function setActiveButton(activeBtn) {
  buttons.forEach(btn => {

    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("bg-white", "text-black");




  });

  activeBtn.classList.remove("bg-white", "text-black");

  activeBtn.classList.add("bg-blue-600", "text-white");
}

function updateIssueCount(count) {
  issueCount.textContent = count + " Issues";


}

function createLabels(labels) {
  let labelsHTML = "";
  labels.forEach(label => {

    const lowerLabel = label.toLowerCase();



    
    if (lowerLabel === "good first issue" || 
        lowerLabel === "documentation") return;

    switch(lowerLabel) 
    {
      case "bug":
        labelsHTML += `<button class="bg-[#FEECEC] text-[#EF4444] px-3 py-1 rounded-full border-2 border-red-200 text-sm">BUG</button>`;
        break;

      case "help wanted":
        labelsHTML += `<button class="bg-[#FEF9C3] text-[#CA8A04] px-3 py-1 rounded-full border-2 border-yellow-200 text-sm">HELP WANTED</button>`;
        break;




      case "enhancement":
        labelsHTML += `<button class="bg-[#DCFCE7] text-[#16A34A] px-3 py-1 rounded-full border-2 border-green-200 text-sm">ENHANCEMENT</button>`;
        break;
      default:
        labelsHTML += `<button class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full border-2 border-gray-300 text-sm">${label.toUpperCase()}</button>`;
        break;
    }
  });
  return labelsHTML;
}
// card
function renderIssues(issues) {

  container.innerHTML = "";
  issues.forEach(issue => {
    let borderColor = issue.status === 
    "open" ? "border-green-500" : "border-purple-500";
    let statusIcon = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";

    const card = document.createElement("div");
    card.className = `issue-card border-t-5 rounded-md ${borderColor} p-6 shadow-md cursor-pointer`;
    card.innerHTML = `
      <div class="flex justify-between items-center mb-3">
          <img src="${statusIcon}" alt="${issue.status} icon" class="w-5 h-5">
          <button class="bg-[#FEECEC] px-6 text-[#EF4444] py-1 rounded-full text-sm">${issue.priority}</button>
      </div>
      <div class="space-y-3">
          <h2 class="text-[#1F2937] font-semibold text-sm">${issue.title}</h2>
          <p class="text-[#64748B] text-[12px]">${issue.description}</p>
          <div class="flex flex-wrap gap-2">${createLabels(issue.labels)}</div>
          <div class="mt-8 text-gray-300"><hr></div>
      </div>

      <div class="space-y-5 mt-8">
          <h4 class="text-[#64748B]">#${issue.id} by ${issue.author}</h4>
          <p class="text-[#64748B]">${issue.createdAt}</p>
      </div>



    `;
    container.appendChild(card);




  });


  updateIssueCount(issues.length);
  attachCardClickEvents();
}


function showFocusedCard(issue) {
  focusedContent.innerHTML = `
    <h2 class="text-2xl font-bold text-[#1F2937]">${issue.title}</h2>
    <p class="text-gray-600 mt-2">${issue.description}</p>
    <div class="flex flex-wrap gap-2 mt-2">${createLabels(issue.labels)}</div>
    <div class="mt-4 space-y-1 text-gray-700">
      <p><strong>Author:</strong> ${issue.author}</p>
      <p><strong>Priority:</strong> ${issue.priority}</p>
      <p><strong>Status:</strong> ${issue.status.toUpperCase()}</p>
      <p><strong>Created At:</strong> ${issue.createdAt}</p>
    </div>
  `;
  focusedCard.classList.remove("hidden");
  container.classList.add("blur-sm", "brightness-75");


}

function hideFocusedCard() {
  focusedCard.classList.add("hidden");
  container.classList.remove("blur-sm", "brightness-75");
}

focusedClose.addEventListener("click", hideFocusedCard);

// clicking  card
focusedCard.addEventListener("click", e => {
  if (e.target === focusedCard) hideFocusedCard();
});


function attachCardClickEvents() {
  const cards = document.querySelectorAll(".issue-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const issueId = card.querySelector("h4").textContent.match(/#(\d+)/)[1];
      const issue = allIssues.find(i => i.id == issueId);


      showFocusedCard(issue);
    });
  });
}


// filter Buttons

allFillterBtn.addEventListener("click", () => { setActiveButton(allFillterBtn); renderIssues(allIssues); });
openFillterBtn.addEventListener("click", () => { setActiveButton(openFillterBtn); renderIssues(allIssues.filter(i=>i.status==="open")); });
closedFillterBtn.addEventListener("click", () => { setActiveButton(closedFillterBtn); renderIssues(allIssues.filter(i=>i.status==="closed")); });


// Search bar

searchInput.addEventListener("keyup", () => {
  const searchValue = searchInput.value.toLowerCase();
  renderIssues(allIssues.filter(i =>
    i.title.toLowerCase().includes(searchValue) ||
    i.description.toLowerCase().includes(searchValue)
  ));
});




// api data
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res=>res.json())
  .then(data=>{
    allIssues = data.data;
    renderIssues(allIssues);
  });