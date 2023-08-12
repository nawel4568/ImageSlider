const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const images = document.querySelectorAll(".slider img");

let currentIndex = 0;
const slideWidth = slider.clientWidth;

function showImage(index) {
  const offset = -index * slideWidth;
  slider.style.transform = `translateX(${offset}px)`;

  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });

  // activate the dot that the image is correspondent to the image
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Set the first image as active and visible
images[0].classList.add("active");

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}
  
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
  
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

let interval;
const autoPlayBtn = document.getElementById("auto-play");

var autoplay = 0;

function autoPlay() {
    if(autoplay == 0){
        autoplay = 1;  
        startAutoPlay();
    }
    else if(autoplay == 1){
        autoplay = 0; 
        stopAutoPlay();
        
    }
  
}

function startAutoPlay(){
    autoPlayBtn.textContent = "Stop Auto-Play";
    interval = setInterval(nextImage, 2000); // Change slide every 2 seconds
}

function stopAutoPlay() {
    autoPlayBtn.textContent = "Start Auto-Play";
  clearInterval(interval);
  interval = null;
}


const dotsContainer = document.querySelector(".dots-container");

function createDots() {
    for (let i = 0; i < images.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => {
        showImage(i);
        currentIndex = i;
        if (autoplay === 1) {
          stopAutoPlay();
          startAutoPlay();
        }
  
        // Update the active dot class when a dot is clicked
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === i);
        });
      });
      dotsContainer.appendChild(dot);
    }
  
    // Set the first dot as active initially
    dotsContainer.children[0].classList.add("active");
  }

  document.getElementById("auto-play").addEventListener("click", autoPlay);

  // Call createDots function to generate dots
  createDots();

