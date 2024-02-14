import { Slide } from './Slide';

export class Slider {
  constructor() {
    this.slide = new Slide();
    this.slides = [];
    this.activeIndex = 0;
  }

  async renderSlider(videos) {
    const slider = document.querySelector('.slider__slides');
    const videoData = await videos;

    for (const video of videoData) {
      const slide = this.slide.createSlide(video.html);
      this.slides.push(slide);

      slider.appendChild(slide);

      this.slide.setBackgroundSlide(slide.querySelector('.slider__back'), video.thumbnail_url);
    }

    this.setActiveSlide(this.activeIndex);
    this.setupEventListeners();
  }

  setActiveSlide(index) {
    if (this.slides.length > 0 && index >= 0 && index < this.slides.length) {
      this.slides.forEach((slide, i) => {
        if (i === index) {
          this.slide.setActiveSlide(slide);
        } else {
          this.slide.removeActiveSlide(slide);
        }
      });
      this.activeIndex = index;
    }
  }

  setupEventListeners() {
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    if (nextButton && prevButton) {
      nextButton.addEventListener('click', () => this.handleNextClick());
      prevButton.addEventListener('click', () => this.handlePrevClick());
    }
  }

  handleNextClick() {
    this.setActiveSlide((this.activeIndex + 1) % this.slides.length);
  }

  handlePrevClick() {
    this.setActiveSlide((this.activeIndex - 1 + this.slides.length) % this.slides.length);
  }
}
