export class Slide {
  constructor() {}

  createSlide(fragment) {
    const slide = document.createElement('li');
    const wrap = document.createElement('div');
    const back = document.createElement('div');
    const inner = document.createElement('div');

    slide.classList.add('slider__slide');

    wrap.classList.add('slider__wrap');
    wrap.appendChild(back);
    back.classList.add('slider__back');

    inner.classList.add('slider__inner');
    inner.innerHTML = fragment;

    slide.appendChild(wrap);
    slide.appendChild(inner);

    setTimeout(function () {
      document.querySelectorAll('.slider__wrap').forEach((wrap) => {
        wrap.classList.add('slider__wrap--hacked');
      });
    }, 1000);

    return slide;
  }

  setActiveSlide(slide) {
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
