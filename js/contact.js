const form = document.getElementById("contact-form");
const confirmation = document.getElementById("confirmation");

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let valid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    if (name.value.trim() === "") {
        nameError.textContent = "Name is required";
        valid = false;
    }

    if (email.value.trim() === "") {
        emailError.textContent = "Email is required"
        valid = false;
    } else if (!email.value.includes("@")) {
        emailError.textContent = "Please enter a valid email";
        valid = false;
    }

    if (message.value.trim() === "") {
        messageError.textContent = "Message is required";
        valid = false
    }

    if (valid) {
        form.classList.add("hidden");
        confirmation.classList.remove("hidden");
    }
});