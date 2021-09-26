const loader = document.querySelector(".loader");

window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
    // window.scrollTo(0, 0);
  });
};

// script parallax txt

document.addEventListener("mousemove", function (e) {
  this.querySelectorAll(".about-info").forEach((el) => {
    const score = el.getAttribute("data-score");
    const x = (window.innerWidth - e.clientX * score) / 100;
    const y = (window.innerWidth - e.clientY * score) / 100;

    el.style.transform = `
    translateX(${x}px)
    translateY(${y}px)
`;
  });
});

//Script parallax img

document.addEventListener("mousemove", function (e) {
  this.querySelectorAll(".about-img").forEach((el) => {
    const score = el.getAttribute("data-score");
    const x = (window.innerWidth - e.pageX * score) / 100;
    const y = (window.innerWidth - e.pageY * score) / 100;

    el.style.transform = `
translateX(${x}px)
translateY(${y}px)
`;
  });
});

const logoRotation = document.querySelector("#logo");
const citation = document.querySelector("#citation-scroll");
const translateCitation = document.querySelector(".citation-scroll");
let coordsCitation = translateCitation.getBoundingClientRect();

function getCoordsCitation() {
  if (sessionStorage.getItem("coordsCitationStorage")) {
  } else {
    sessionStorage.setItem("coordsCitationStorage", `${coordsCitation.top}`);
  }
}

getCoordsCitation();

window.onscroll = () => {
  let posRotation = window.scrollY / 10;
  logoRotation.style.transform = `rotate(${posRotation}deg)`;

  let observerCitation = new IntersectionObserver(
    (entries, observerCitation) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let posCitation =
            window.scrollY * 1.25 -
            sessionStorage.getItem("coordsCitationStorage");
          translateCitation.style.left = `${-posCitation}px`;
        }
      });
    },
    {
      threshold: 0,
    }
  );

  observerCitation.observe(citation);
};

//link nav selector

const navLink = document.querySelectorAll(".navbar-menu-link");

navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    // console.log(e.target);
    e.target.classList.add("active-nav");

    for (let i = 0; i < navLink.length; i++) {
      if (navLink[i] !== e.target) {
        navLink[i].classList.remove("active-nav");
      }
    }
  });
});

// elem.style.transform = `translatex(-50%) translatey(-50%) rotate(${value}deg)`;

//link nav on scroll

const pages = document.querySelectorAll(".page-nav");
const scrollToTop = document.querySelector(".scrollToTop");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // console.log(entry.target);
        const index = Array.from(pages).indexOf(entry.target);
        navLink.forEach((navLink) => {
          navLink.classList.remove("active-nav");
        });
        navLink[index].classList.add("active-nav");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

pages.forEach((page) => {
  observer.observe(page);
});

//Work

const workTitleContainer = document.querySelector(".work-title");

const workTitle = document.querySelector("#work-title");
const workDate = document.querySelector("#work-date");
const workProjects = document.querySelectorAll(".project");

workProjects.forEach((project) => {
  project.addEventListener("mouseenter", (hover) => {
    workTitleContainer.style.animation = "";

    let titleTarget = project.getAttribute("data-title");
    let dateTarget = project.getAttribute("data-date");

    setTimeout(() => {
      workTitleContainer.style.animation = "clip-path 3s ease-in-out";
    }, 1);

    if (titleTarget) {
      setTimeout(() => {
        workTitle.innerText = `${titleTarget}`;
        workDate.innerText = `${dateTarget}`;
      }, 1500);
    } else {
      setTimeout(() => {
        workTitle.innerText = `Projects`;
        workDate.innerText = `2021`;
      }, 1500);
    }
  });

/*   project.addEventListener("mouseout", (event) => {

      workTitle.innerText = `Work`;
      workDate.innerText = `2021`;

  }); */
});

// Clip path on scroll wheel contact

const contact = document.querySelector("#contact");
const circleContact = document.querySelector(".circle-contact");
const contactRotate = document.querySelector(".contact-rotate");

// contact.addEventListener("wheel", onWheel);

contact.addEventListener("wheel", onWheelContact, {passive: true});

document.body.addEventListener("wheel", onWheel, {passive: true});

let scrollValue = 0;

function onWheelContact(e) {
  if (e.deltaY >= 1 && scrollValue >= 0 && scrollValue <= 100) {
    contact.classList.add("fixed");
  } else if (e.deltaY <= 1 && scrollValue >= 1) {
  } else if (scrollValue === 0) {
    contact.classList.remove("fixed");
  }
}

function onWheel(e) {
  if (e.deltaY >= 1 && scrollValue >= 0 && scrollValue <= 100) {
    scrollValue++;
    contact.classList.remove("fixed")
  } else if (e.deltaY <= 1 && scrollValue >= 1) {
    scrollValue--;
    contact.classList.remove("fixed")
  } else if (scrollValue === 0) {
    contact.classList.remove("fixed");
  }

  const observerContact = new IntersectionObserver(callback);

  observerContact.observe(contact);

  /*   function callback() {
    if (contact.isIntersecting) {
      circleContact.style.clipPath = `circle(0px at 50% 50%)`;
      scrollValue = 0;
      let hello = "hello";
      console.log(hello);
    } else {
      console.log(scrollValue);
    }
  } */

  function callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting === true) {
        // document.body.classList.add("fixed");
      } else {
        // document.body.classList.remove("fixed");
        circleContact.style.clipPath = `circle(0px at 50% 50%)`;
        scrollValue = 0;
      }
    },{
      threshold: 0.9,
    });
  }

  circleContact.style.clipPath = `circle(${scrollValue * 50}px at 50% 50%)`;
  contactRotate.style.transform = `rotate(${scrollValue * 7.5}deg)`;
}
