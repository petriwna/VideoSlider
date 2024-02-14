import { Slide } from './Slide';
import { VideoPlayer } from './VideoPlayer';

export class Slider {
  constructor() {
    this.slides = [];
    this.activeIndex = 0;
  }

  async renderSlider(videos) {
    const sliderContainer = document.querySelector('.slider__slides');
    const videoData = await videos;

    for (const video of videoData) {
      const slide = new Slide(video.title, video.thumbnail_url);
      sliderContainer.appendChild(slide.element);

      this.slides.push(slide);
    }

    new VideoPlayer().getIdContainerVideoPlayer();
    this.setActiveSlide(this.activeIndex);
    this.setupEventListeners();
  }

  setActiveSlide(index) {
    if (this.slides.length > 0 && index >= 0 && index < this.slides.length) {
      this.slides.forEach((slide, i) => {
        if (i === index) {
          slide.setActiveSlide();
        } else {
          slide.removeActiveSlide();
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
