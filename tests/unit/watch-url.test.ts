import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isWatchUrl, readWatchUrl, WatchUrlError } from '../../src/watch-url.ts';

test('watch URL を受け付ける', () => {
  assert.equal(isWatchUrl('https://www.youtube.com/watch?v=abc123'), true);
  assert.equal(isWatchUrl('https://www.youtube.com/watch?v=abc123&t=10s'), true);
});

test('短縮 URL を受け付ける', () => {
  assert.equal(isWatchUrl('https://youtu.be/abc123'), true);
  assert.equal(isWatchUrl('https://youtu.be/abc123?si=xyz'), true);
});

test('動画 URL 以外を拒否する', () => {
  assert.equal(isWatchUrl('https://www.youtube.com/playlist?list=abc'), false);
  assert.equal(isWatchUrl('https://youtube.com/watch?v=abc123'), false);
  assert.equal(isWatchUrl('http://www.youtube.com/watch?v=abc123'), false);
  assert.equal(isWatchUrl(''), false);
});

test('YOUTUBE_URL が無いと失敗する', () => {
  assert.throws(() => readWatchUrl({}), WatchUrlError);
  assert.throws(() => readWatchUrl({ YOUTUBE_URL: '   ' }), WatchUrlError);
});

test('受け付けない YOUTUBE_URL は失敗する', () => {
  assert.throws(
    () => readWatchUrl({ YOUTUBE_URL: 'https://www.youtube.com/playlist?list=abc' }),
    WatchUrlError,
  );
});

test('前後の空白を除いた URL を返す', () => {
  assert.equal(
    readWatchUrl({ YOUTUBE_URL: '  https://www.youtube.com/watch?v=abc123  ' }),
    'https://www.youtube.com/watch?v=abc123',
  );
});
