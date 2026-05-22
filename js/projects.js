const tagButtons = document.querySelectorAll(".tag-button");
const projectCards = document.querySelectorAll(".project-card");
let selectedTags = [];

function updateButtonStates() {
    tagButtons.forEach(function(button) {
        const tagText = button.getAttribute("data-tag");
        if (selectedTags.includes(tagText)) {
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
        } else {
            button.classList.remove("active");
            button.setAttribute("aria-pressed", "false");
        }
    });
}

tagButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const tagText = button.getAttribute("data-tag");

        if (tagText === "all") {
            selectedTags = [];
        } else if (selectedTags.includes(tagText)) {
            selectedTags = selectedTags.filter(t => t !== tagText);
        } else {
            selectedTags.push(tagText);
        }

        if (selectedTags.length === 0) {
            history.pushState(null, "", window.location.pathname);
        } else {
            history.pushState(null, "", "?tags=" + selectedTags.join(","));
        }

        updateButtonStates();
        filterCards();
    });
});

function filterCards() {
    projectCards.forEach(function(card) {
        const cardTags = card.getAttribute("data-tags").split(" ");
        if (selectedTags.length === 0) {
            card.classList.remove("hidden");
        } else if (selectedTags.every(t => cardTags.includes(t))) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

const params = new URLSearchParams(window.location.search);
const savedTags = params.get("tags");

if (savedTags) {
    selectedTags = savedTags.split(",");
    updateButtonStates();
    filterCards();
}

// Handle browser back/forward
window.addEventListener("popstate", function() {
    const params = new URLSearchParams(window.location.search);
    const tagsParam = params.get("tags");
    selectedTags = tagsParam ? tagsParam.split(",") : [];
    updateButtonStates();
    filterCards();
});

// Toggle project descriptions
const descButtons = document.querySelectorAll(".desc-toggle");
descButtons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.parentElement;
        card.classList.toggle("open");
        
        if (card.classList.contains("open")) {
            button.textContent = "Details ▴";
            button.setAttribute("aria-expanded", "true");
        } else {
            button.textContent = "Details ▾";
            button.setAttribute("aria-expanded", "false");
        }
    });
});