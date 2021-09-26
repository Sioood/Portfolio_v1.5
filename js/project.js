const wrapperGallery = document.querySelector(".wrapper-gallery");

const imgNumber = document.querySelector(".img-number");
const imgTitle = document.querySelector(".img-title");

const projectImg = document.querySelectorAll(".project-img");

let arrayImgTitle = [];

let arrayImgLeft = [];

function setArrayImg() {
  projectImg.forEach((e) => {
    arrayImgTitle.push(e.dataset.imgTitle);
  });
}

setArrayImg();

function getOffsetImg() {
  projectImg.forEach((e) => {
    arrayImgLeft.push(e.offsetLeft);
  });
}

getOffsetImg();

const observerGallery = document.querySelectorAll(".observer-gallery");

//boucle for pour ajouter chaque offset left en data attributes sur chaque paragraphe sans obtenir le même data attributes (probleme de forEach)

function test() {
  for (let i = 0; i < arrayImgLeft.length; i++) {
    observerGallery[i].setAttribute("data-img-left", arrayImgLeft[i]);
    observerGallery[i].setAttribute("data-img-number", i + 1);
    observerGallery[i].setAttribute("data-img-title", arrayImgTitle[i]);

    let offsetTarget = projectImg[0].getAttribute("data-img-left");
    let numberTarget = projectImg[0].getAttribute("data-img-number");
    let titleTarget = projectImg[0].getAttribute("data-img-title");

    wrapperGallery.style.transform = `translate(${-offsetTarget}px)`;
    imgNumber.innerHTML = `00${numberTarget} / 00${arrayImgLeft.length}`;
    imgTitle.innerHTML = `${titleTarget}`;
  }
}

test()


let observerOfGallery = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.getAttribute("data-img-left")) {
        let offsetTarget = entry.target.getAttribute("data-img-left");
        let numberTarget = entry.target.getAttribute("data-img-number");
        let titleTarget = entry.target.getAttribute("data-img-title");

        wrapperGallery.style.transform = `translate(${-offsetTarget}px)`;
        imgNumber.innerHTML = `00${numberTarget} / 00${arrayImgLeft.length}`;
        imgTitle.innerHTML = `${titleTarget}`;

        const indexObserverGallery = Array.from(observerGallery).indexOf(
          entry.target
        );
        observerGallery.forEach((observerGallery) => {
          observerGallery.classList.remove("active-observer-gallery");
        });
        observerGallery[indexObserverGallery].classList.add(
          "active-observer-gallery"
        );
      } else if (arrayImgLeft.length === arrayImgLeft.length) {
        observerGallery.forEach((observerGallery) => {
          observerGallery.classList.add("active-observer-gallery");
        });
      }
    });
  },
  { threshold: 0.9 }
);

// observerParagraph.observe(paragraph);

observerGallery.forEach((observerGallery) => {
  observerOfGallery.observe(observerGallery);
});
