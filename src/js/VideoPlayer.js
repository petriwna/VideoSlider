import { Vimeo } from '@vimeo/player';

import { VideoService } from './VideoService';

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
