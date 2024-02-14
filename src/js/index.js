import { Slider } from './Slider';
import { VideoPlayer } from './VideoPlayer';
import { VideoService } from './VideoService';

export async function init() {
  const videoService = new VideoService();
  const videos = await videoService.getVideos(); // Don't forget to await here
  await new Slider().renderSlider(videos);
  new VideoPlayer().setVideoPlayer();
}

document.addEventListener('DOMContentLoaded', init);
