const watchPrefix = 'https://www.youtube.com/watch?v=';
const shortPrefix = 'https://youtu.be/';

export class WatchUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WatchUrlError';
  }
}

export function isWatchUrl(value: string): boolean {
  return value.startsWith(watchPrefix) || value.startsWith(shortPrefix);
}

export function readWatchUrl(env: NodeJS.ProcessEnv = process.env): string {
  const value = env.YOUTUBE_URL;
  if (value === undefined || value.trim() === '') {
    throw new WatchUrlError('YOUTUBE_URL がありません');
  }
  const url = value.trim();
  if (!isWatchUrl(url)) {
    throw new WatchUrlError('YOUTUBE_URL は受け付ける動画 URL ではありません');
  }
  return url;
}
