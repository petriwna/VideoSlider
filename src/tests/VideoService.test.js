import { VideoService } from '../js/VideoService';

describe('VideoService', () => {
  let videoService;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ title: 'Video Title', description: 'Video Description' }),
      ok: true,
    }),
  );

  beforeEach(() => {
    fetch.mockClear();
    videoService = new VideoService();
  });

  test('fetchVideoData should return video data for a valid ID', async () => {
    const id = '912222161';
    const videoData = await videoService.fetchVideoData(id);

    expect(videoData).toBeDefined();
    expect(videoData).toHaveProperty('title');
    expect(videoData).toHaveProperty('description');
  });

  test('fetchVideoData should throw an error for an invalid ID', async () => {
    const invalidId = 'invalid';

    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(videoService.fetchVideoData(invalidId)).rejects.toThrow(
      'Failed to fetch video information. Status: 404',
    );
  });

  test('getVideos should return an array of video data for all video IDs', async () => {
    const mockResponses = [
      { title: 'Video 1', description: 'Description 1' },
      { title: 'Video 2', description: 'Description 2' },
      { title: 'Video 3', description: 'Description 3' },
    ];

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponses[0]),
      ok: true,
    });

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponses[1]),
      ok: true,
    });

    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponses[2]),
      ok: true,
    });

    const videos = await videoService.getVideos();

    expect(videos).toBeDefined();
    expect(videos).toHaveLength(videoService.videoIds.length);

    videos.forEach((videoData, index) => {
      expect(videoData).toEqual(mockResponses[index]);
    });
  });
});
