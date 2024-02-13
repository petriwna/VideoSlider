export class VideoService {
  constructor() {
    this.videoIds = ['912222161', '912237164', '912221113'];
  }

  async fetchVideoData(id) {
    try {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://player.vimeo.com/video/${id}`)}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch video information. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching video information:', error);
      throw error;
    }
  }

  async getVideos() {
    try {
      return await Promise.all(this.videoIds.map((id) => this.fetchVideoData(id)));
    } catch (error) {
      console.error('Error getting videos:', error);
      throw error;
    }
  }
}
