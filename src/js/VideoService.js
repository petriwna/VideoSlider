export class VideoService {
  constructor() {
    this.videoIds = ['912222161', '912237164', '912221113'];
    this.videoUrl = 'https://player.vimeo.com/video/';
  }

  async fetchVideoData(id) {
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`${this.videoUrl}${id}`)}`,
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
