import { Vimeo } from '@vimeo/player';

import { VideoService } from './VideoService';

export class VideoPlayer {
  constructor() {
    this.containers = this.getIdContainerVideoPlayer();
    this.videoService = new VideoService();
  }

  getIdContainerVideoPlayer() {
    return document.querySelectorAll('.slider__content');
  }

  setVideoPlayer() {
    this.containers.forEach((container, index) => {
      const playerId = container.getAttribute('id');
      const videoId = this.videoService.videoIds[index];
      const videoUrl = `${this.videoService.videoUrl}${videoId}`;

      this.createVimeoPlayer(playerId, videoId, videoUrl);
      // this.players.push(player);
    });
  }

  createVimeoPlayer(playerId, videoId, videoUrl) {
    return new Vimeo.Player(playerId, {
      id: videoId,
      url: videoUrl,
      width: '1000',
    });
  }
}
