
export async function init() {
  await new Slider().renderSlider(new VideoService());
}

document.addEventListener('DOMContentLoaded', init);

export class Slide {
  constructor(title, thumbnailUrl) {
    this.element = this.createSlide(title);
    this.setBackgroundSlide(this.element.querySelector('.slider__back'), thumbnailUrl);
  }

  createSlide(title) {
    const slide = document.createElement('li');
    const wrap = this.createWrap();
    const back = this.createBack();
    const inner = this.createInner();
    const content = this.createContent(title);

    slide.classList.add('slider__slide');

    inner.appendChild(content);

    wrap.appendChild(back);

    slide.appendChild(wrap);
    slide.appendChild(inner);

    setTimeout(() => {
      this.addHackedClass();
    }, 1000);

    return slide;
  }

  createWrap() {
    const wrap = document.createElement('div');
    wrap.classList.add('slider__wrap');

    return wrap;
  }

  createBack() {
    const back = document.createElement('div');
    back.classList.add('slider__back');

    return back;
  }

  createInner() {
    const inner = document.createElement('div');
    inner.classList.add('slider__inner');

    return inner;
  }

  createContent(title) {
    const content = document.createElement('div');
    content.setAttribute('id', title);
    content.classList.add('slider__content');

    return content;
  }

  addHackedClass() {
    document.querySelectorAll('.slider__wrap').forEach((wrap) => {
      wrap.classList.add('slider__wrap--hacked');
    });
  }

  setActiveSlide() {
    this.element.classList.add('slider__slide--active');
  }

  setBackgroundSlide(back, imgUrl) {
    back.style.backgroundImage = `url(${imgUrl})`;
  }

  isActive() {
    return this.element.classList.contains('slider__slide--active');
  }

  removeActiveSlide() {
    this.element.classList.remove('slider__slide--active');
  }
}


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
    // this.videoPlayer.setVideoPlayer();
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



export class VideoPlayer {
  constructor() {
    this.videoService = new VideoService();
    this.players = [];
  }

  setVideoPlayer(container, videoId) {
    const playerId = container.getAttribute('id');
    const videoUrl = `${this.videoService.videoUrl}${videoId}`;

    const player = new Vimeo.Player(playerId, {
      id: videoId,
      url: videoUrl,
      muted: true,
    });
    this.players.push(player);
  }

  setActiveVideoPlayer(slideIndex) {
    this.players.forEach((player, index) => {
      if (index === slideIndex) {
        this.playVideo(player);
      } else {
        this.pauseVideo(player);
      }
    });
  }

  playVideo(player) {
    player
      .play()
      .then(() => {})
      .catch((error) => {
        throw error;
      });
  }

  pauseVideo(player) {
    player
      .pause()
      .then(() => {})
      .catch((error) => {
        throw error;
      });
  }
}

export class VideoService {
  constructor() {
    this.videoIds = ['912222161', '912237164', '912221113'];
    this.videoUrl = 'https://player.vimeo.com/video/';
  }

  async fetchVideoData(id) {
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`${this.videoUrl}${id}`)}/`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch video information. Status: ${response.status}`);
    }

    return await response.json();
  }

  async getVideos() {
    return await Promise.all(this.videoIds.map((id) => this.fetchVideoData(id)));
  }
}
