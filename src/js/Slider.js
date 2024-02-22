import { Slide } from './Slide';
import { VideoPlayer } from './VideoPlayer';

export class Slider {
  constructor() {
    this.videoPlayer = new VideoPlayer();
    this.slides = [];
    this.activeIndex = 0;
  }

  async renderSlider(videos) {
    const sliderContainer = document.querySelector('.slider');
    const videoData = await videos.getVideos();
    const videoIds = videos.videoIds;

    videoData.forEach((video, index) => {
      const slide = new Slide(video.title, video.thumbnail_url);
      sliderContainer.appendChild(slide.element);
      this.videoPlayer.setVideoPlayer(slide.element.lastChild.firstChild, videoIds[index]);
      this.slides.push(slide);
    });

    this.setActiveSlide(this.activeIndex);
    this.setupEventListeners();
  }

  setActiveSlide(index) {
    if (this.slides.length > 0 && index >= 0 && index < this.slides.length) {
      this.slides.forEach((slide, i) => {
        if (i === index) {
          slide.setActiveSlide();
          this.videoPlayer.setActiveVideoPlayer(index);
        } else {
          slide.removeActiveSlide();
        }
      });
      this.activeIndex = index;
    }
  }

  setupEventListeners() {
    const sliderContainer = document.querySelector('.slider');
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    if (nextButton && prevButton && window.innerWidth > 767) {
      nextButton.addEventListener('click', () => this.handleNext());
      prevButton.addEventListener('click', () => this.handlePrev());
    }

    if (sliderContainer && window.innerWidth <= 767) {
      let touchStartX;

      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      });

      sliderContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        if (deltaX > 20) {
          this.handlePrev();
        } else if (deltaX < -20) {
          this.handleNext();
        }
      });
    }
  }

  handleNext() {
    this.setActiveSlide((this.activeIndex + 1) % this.slides.length);
  }

  handlePrev() {
    this.setActiveSlide((this.activeIndex - 1 + this.slides.length) % this.slides.length);
  }
}
