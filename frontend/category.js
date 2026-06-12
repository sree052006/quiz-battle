const cards = document.querySelectorAll(".card");
const startBtn = document.getElementById("startBtn");
let selectedCategory = "";

cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedCategory = card.dataset.category;
    });
});

startBtn.addEventListener("click", () => {
    if (selectedCategory === "") {
        alert("Please select a category first!");
        return;
    }
    localStorage.setItem("quizCategory", selectedCategory);
    window.location.href = `countdown.html?category=${encodeURIComponent(selectedCategory)}`;
});