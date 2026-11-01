import type { Page } from '@playwright/test';

export class PlaybackBlockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PlaybackBlockedError';
  }
}

export class PlaybackNotStartedError extends Error {
  constructor() {
    super('再生位置が進みません');
    this.name = 'PlaybackNotStartedError';
  }
}

const blockers = [
  {
    pattern: /Before you continue to YouTube|YouTube にアクセスする前に/,
    message: '同意ダイアログが再生を妨げています',
  },
  {
    pattern: /Sign in to confirm your age|年齢を確認してください|年齢確認が必要/,
    message: '年齢確認が再生を妨げています',
  },
  {
    pattern: /Video unavailable|This video is unavailable|この動画は再生できません|この動画は非公開です|Private video/,
    message: '動画を再生できません',
  },
] as const;

export async function startPlayback(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await rejectBlockingPage(page);

  const video = page.locator('video').first();
  await video.waitFor({ state: 'attached', timeout: 20_000 });
  await rejectBlockingPage(page);
  await pressPlayIfPaused(page);
  await rejectAd(page);

  const startedAt = await video.evaluate((element: HTMLVideoElement) => element.currentTime);
  try {
    const status = await page.waitForFunction(
      (start: number) => {
        const player = document.querySelector('.html5-video-player');
        if (player?.classList.contains('ad-showing')) {
          return 'ad';
        }
        const current = document.querySelector('video');
        if (current instanceof HTMLVideoElement && current.currentTime > start) {
          return 'playing';
        }
        return null;
      },
      startedAt,
      { timeout: 20_000 },
    );
    if ((await status.jsonValue()) === 'ad') {
      throw new PlaybackBlockedError('広告が本編の再生を妨げています');
    }
  } catch (error) {
    if (error instanceof PlaybackBlockedError) {
      throw error;
    }
    await rejectBlockingPage(page);
    await rejectAd(page);
    throw new PlaybackNotStartedError();
  }
}

async function rejectBlockingPage(page: Page): Promise<void> {
  for (const blocker of blockers) {
    const target = page.getByText(blocker.pattern).first();
    if (await target.isVisible().catch(() => false)) {
      throw new PlaybackBlockedError(blocker.message);
    }
  }
}

async function rejectAd(page: Page): Promise<void> {
  const ad = page.locator('.html5-video-player.ad-showing');
  if (await ad.isVisible().catch(() => false)) {
    throw new PlaybackBlockedError('広告が本編の再生を妨げています');
  }
}

async function pressPlayIfPaused(page: Page): Promise<void> {
  const button = page.locator('button.ytp-play-button');
  if (!(await button.isVisible().catch(() => false))) {
    return;
  }
  const label = (await button.getAttribute('aria-label')) ?? '';
  const paused = /再生|Play/.test(label) && !/一時停止|Pause/.test(label);
  if (paused) {
    await button.click();
  }
}
