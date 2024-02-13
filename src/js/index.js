import { Slider } from './Slider';
import { VideoService } from './VideoService';

export async function init() {
  const videos = new VideoService().getVideos();
  new Slider().renderSlider(videos);
}

document.addEventListener('DOMContentLoaded', init);
