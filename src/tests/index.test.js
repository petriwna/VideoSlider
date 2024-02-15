import { init } from '../js/index';
import { Slider } from '../js/Slider';
import { VideoService } from '../js/VideoService';

jest.mock('../js/Slider');

describe('Initialization', () => {
  beforeEach(() => {
    Slider.mockClear();
  });

  test('init function should render the slider with VideoService', async () => {
    const mockRenderSlider = jest.fn();
    Slider.mockImplementation(() => ({
      renderSlider: mockRenderSlider,
    }));

    await init();

    expect(Slider).toHaveBeenCalledTimes(1);
    expect(mockRenderSlider).toHaveBeenCalledWith(new VideoService());
  });
});
