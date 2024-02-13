export class Slide {
  constructor() {}

  createSlide() {
    const slide = document.createElement('li');
    const wrap = document.createElement('div');
    const back = document.createElement('div');
    const inner = document.createElement('div');

    slide.classList.add('slider__slide');

    wrap.classList.add('slider__wrap');
    wrap.appendChild(back);

    back.classList.add('slider__back');

    inner.classList.add('slider__inner');

    slide.appendChild(wrap);
    slide.appendChild(inner);

    return slide;
  }

  setActiveSlide(slide) {
    console.log('active');
    return slide.classList.add('slider__slide--active');
  }

  setBackgroundSlide(back, imgUrl) {
    back.style.backgroundImage = `url(${imgUrl})`;
  }

  isActive(slide) {
    slide.classList.contains('slider__slide--active');
  }

  removeActiveSlide(slide) {
    slide.classList.remove('slider__slide--active');
  }
}
