const starttlacitko = document.getElementById("starttlacitko");
const hero = document.querySelector(".hero");
const poll = document.querySelector(".poll");

const welcome = document.querySelector(".welcome");

starttlacitko.addEventListener("click", () => {
  welcome.classList.add("hide");
  poll.classList.add("show");
});

