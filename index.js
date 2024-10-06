const aboutButton = document.querySelector(".About");
const openAboutDiv = document.querySelector(".Open-About");

aboutButton.addEventListener("click", () => {
  openAboutDiv.classList.add("show");
});

document.querySelector(".btn").addEventListener("click", () => {
  openAboutDiv.classList.remove("show");
});

const WorkButton = document.querySelector(".Work");
const OpenWorkDiv = document.querySelector(".Open-Work");

WorkButton.addEventListener("click", () => {
  OpenWorkDiv.classList.add("show2");
});

document.querySelector(".btn1").addEventListener("click", () => {
  OpenWorkDiv.classList.remove("show2");
});

const ContactButton = document.querySelector(".Contact");
const OpenContactDiv = document.querySelector(".Open-Contact");

ContactButton.addEventListener("click", () => {
  OpenContactDiv.classList.add("show3");
});

document.querySelector(".btn2").addEventListener("click", () => {
  OpenContactDiv.classList.remove("show3");
});
