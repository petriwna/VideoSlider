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
