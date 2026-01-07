const starttlacitko = document.getElementById("starttlacitko");
const hero = document.querySelector(".hero");
const poll = document.querySelector(".poll");
const bg = document.querySelector(".bg");
const welcome = document.querySelector(".welcome");

starttlacitko.addEventListener("click", () => {
  welcome.classList.add("hide");
  starttlacitko.classList.add("hidden-tlacitko")
  poll.classList.add("show");
  bg.classList.add("blur");
});

