export class VideoScreenConfigSender {
  static videoScreenConfigSender: VideoScreenConfigSender | null = null;

  private constructor() {}

  static getInstance(): VideoScreenConfigSender {
    if (this.videoScreenConfigSender === null) {
      this.videoScreenConfigSender = new VideoScreenConfigSender();
    }
    return this.videoScreenConfigSender;
  }

  sendVideoScreenConfig(config: any) {
    window.videoAPI.setConfig(config);
  }
}
