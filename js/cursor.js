document.addEventListener("DOMContentLoaded", function (event) {
  var cursor = document.querySelector(".custom-cursor");
  var links = document.querySelectorAll("a");
  var imgs = document.querySelectorAll("img");
  var initCursor = false;

  //double click for scale up

  document.addEventListener("dblclick", () => {
    cursor.classList.toggle("custom-cursor--scale");
  });

  //anim for links

  for (var i = 0; i < links.length; i++) {
    var selfLink = links[i];

    selfLink.addEventListener("mouseover", function () {
      cursor.classList.add("custom-cursor--link");
    });
    selfLink.addEventListener("mouseout", function () {
      cursor.classList.remove("custom-cursor--link");
    });
  }

  //anim for img

  for (var i = 0; i < imgs.length; i++) {
    var selfImg = imgs[i];

    selfImg.addEventListener("mouseover", function () {
      cursor.classList.add("custom-cursor--img");
    });
    selfImg.addEventListener("mouseout", function () {
      cursor.classList.remove("custom-cursor--img");
    });
  }

  window.onmousemove = function (e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if (!initCursor) {
      // cursor.style.opacity = 1;
      TweenLite.to(cursor, 0.3, {
        opacity: 1,
      });
      initCursor = true;
    }

    TweenLite.to(cursor, 0, {
      top: mouseY + "px",
      left: mouseX + "px",
    });
  };

  window.onmouseout = function (e) {
    TweenLite.to(cursor, 0.3, {
      opacity: 0,
    });
    initCursor = false;
  };
});

window.onmousemove = function (e) {
  let cursor = document.querySelector(".custom-cursor");
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
};
