let next = document.getElementById("next");
let previous = document.getElementById("previous");
let slide = document.getElementById("slide");
let stop = document.getElementById("stop");
let imageContainer = document.getElementById("imageContainer");
let pagination = document.getElementById("pagination");

let myImages = [
  "images/shuffle-01.jpg",
  "images/shuffle-02.jpg",
  "images/shuffle-03.jpg",
  "images/shuffle-04.jpg",
  "images/shuffle-05.jpg",
  "images/shuffle-06.jpg",
  "images/shuffle-07.jpg",
  "images/shuffle-08.jpg",
];

let i = 0;
let slideInterval;
let isAnimating = false;

function showImage(index) {
  if (isAnimating) return;

  isAnimating = true;
  let imgElement = document.createElement("img");
  imgElement.src = myImages[index];
  imgElement.classList.add("show");

  let previousImg = imageContainer.querySelector("img");

  if (previousImg) {
    previousImg.classList.remove("show");
    previousImg.classList.add("fade-out");
    previousImg.addEventListener("transitionend", function () {
      imageContainer.innerHTML = "";
      imageContainer.appendChild(imgElement);
      previousImg.remove();
      isAnimating = false;
    });
  } else {
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imgElement);
    isAnimating = false;
  }

  let dots = pagination.querySelectorAll("span");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function createPagination() {
  for (let j = 0; j < myImages.length; j++) {
    let span = document.createElement("span");
    if (j === 0) {
      span.classList.add("active");
    }
    span.addEventListener("click", () => {
      i = j;
      showImage(i);
      clearInterval(slideInterval);
    });
    pagination.appendChild(span);
  }
}

next.addEventListener("click", function () {
  i++;
  if (i >= myImages.length) {
    i = 0;
  }
  showImage(i);
});

previous.addEventListener("click", function () {
  i--;
  if (i < 0) {
    i = myImages.length - 1;
  }
  showImage(i);
});

function startSlideShow() {
  slideInterval = setInterval(() => {
    i++;
    if (i >= myImages.length) {
      i = 0;
    }
    showImage(i);
  }, 3000);
}

slide.style.display = "none";
stop.style.display = "none";

slide.addEventListener("click", startSlideShow);
stop.addEventListener("click", function () {
  clearInterval(slideInterval);
});

imageContainer.addEventListener("mouseover", function () {
  clearInterval(slideInterval);
});

imageContainer.addEventListener("mouseout", startSlideShow);

let threshold = 50;
let startX;
let isDragging = false;

function handleSwipe(start, end) {
  if (start > end + threshold) {
    next.click();
  } else if (start < end - threshold) {
    previous.click();
  }
}

imageContainer.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
});

imageContainer.addEventListener("touchend", function (e) {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(startX, endX);
});

imageContainer.addEventListener("mousedown", function (e) {
  startX = e.clientX;
  isDragging = true;
});

imageContainer.addEventListener("mousemove", function (e) {
  if (isDragging) {
    let endX = e.clientX;
    handleSwipe(startX, endX);
    startX = endX;
  }
});

imageContainer.addEventListener("mouseup", function (e) {
  if (isDragging) {
    isDragging = false;
    let endX = e.clientX;
    handleSwipe(startX, endX);
  }
});

createPagination();
showImage(i);
startSlideShow();
