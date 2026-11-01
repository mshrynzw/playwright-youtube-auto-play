import { test } from '@playwright/test';
import { startPlayback } from '../../src/playback.ts';
import { readWatchUrl } from '../../src/watch-url.ts';

test('指定した動画の再生を開始する', async ({ page }) => {
  test.setTimeout(60_000);
  const url = readWatchUrl();
  await startPlayback(page, url);
});
