export class Slide {
  constructor() {}

  // createSlideContent(fragment) {
  //   const content = document.createElement('div');
  //   content.classList.add('slider__content');
  //
  //   content.innerHTML = fragment;
  //
  //   return content;
  // }

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
