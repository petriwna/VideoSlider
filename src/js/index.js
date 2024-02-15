import { Slider } from './Slider';
// import { VideoPlayer } from './VideoPlayer';
import { VideoService } from './VideoService';

export async function init() {
  await new Slider().renderSlider(new VideoService());
}

document.addEventListener('DOMContentLoaded', init);
