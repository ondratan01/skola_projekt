const starttlacitko = document.getElementById("starttlacitko");
const hero = document.querySelector(".hero");
const poll = document.querySelector(".poll");
const bg = document.querySelector(".bg");
const welcome = document.querySelector(".welcome");
const otazka2 = document.querySelector(".otazka2");
const otazka3 = document.querySelector(".otazka3");
const blur = document.querySelectorAll(".blur");

starttlacitko.addEventListener("click", () => {

  welcome.classList.add("hide");
  starttlacitko.classList.add("hidden-tlacitko")
  poll.classList.add("show");
  
  bg.classList.add("bgblur");
  
});

vote1.addEventListener("click", () => {
  otazka2.classList.add("show");
})
vote2.addEventListener("click", () => {
  otazka3.classList.add("show");
})
vote3.addEventListener("click", () => {
  blur.forEach(oneblur => {
    oneblur.classList.add("zapni")
  });
})

/*
Kdyz das odeslat a nebude tam nic, tak to da error box, ze mas checknout ty radia.
*/


/*
Komunikace učitelů

Jak hodnotíte přístup učitelů ke studentům?


Velmi dobrý

Spíše dobrý

Spíše špatný

Velmi špatný

Doporučení

Doporučili byste tuto školu ostatním?


Ano

Spíše ano

Spíše ne

Ne
*/