const track = document.querySelector(`.carousel__track`)
const slides = Array.from(track.children)
const prevBtn = document.querySelector(`.cbtn--l`)
const nextBtn = document.querySelector(`.cbtn--r`)
const dotsNav = document.querySelector(`.carousel__nav`)
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + `px`;
}

slides.forEach(setSlidePosition)

const updateDots = (currSlideBtn, targetIndex) => {
  currSlideBtn.classList.remove(`currSlideBtn`)
  dots[targetIndex].classList.add(`currSlideBtn`)
}

const moveToSlide = (currSlide, targetSlide) => {
  track.style.transform  = `translateX(-${targetSlide.style.left})`
  currSlide.classList.remove(`currSlide`)
  targetSlide.classList.add(`currSlide`)
}

nextBtn.addEventListener(`click`, e => {
  const currSlideBtn = document.querySelector(`.currSlideBtn`)
  const targetIndex = dots.findIndex(dot => dot === currSlideBtn) + 1

  const currSlide = track.querySelector(`.currSlide`)
  const nextSlide = currSlide.nextElementSibling
  // move to next slide
  if (nextSlide)
  {
    moveToSlide(currSlide, nextSlide)
    updateDots(currSlideBtn, targetIndex)
  }
})

prevBtn.addEventListener(`click`, e => {
  const currSlideBtn = document.querySelector(`.currSlideBtn`)
  const targetIndex = dots.findIndex(dot => dot === currSlideBtn) - 1

  const currSlide = track.querySelector(`.currSlide`)
  const prevSlide = currSlide.previousElementSibling
  // move to prev slide
  if (prevSlide) {
    moveToSlide(currSlide, prevSlide)
    updateDots(currSlideBtn, targetIndex)
  }
})

// Dots Navigation
dotsNav.addEventListener(`click`, (e) => {
  const targetDot = e.target.closest(`button`)
  const currSlideBtn = document.querySelector(`.currSlideBtn`)

  if (!targetDot) return

  const currSlide = track.querySelector(`.currSlide`)
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]
  moveToSlide(currSlide, targetSlide)
  updateDots(currSlideBtn, targetIndex)
})