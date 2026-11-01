# 要件定義

## 目的

Windows PC 上で、指定した YouTube の動画を Playwright の自動操作で再生開始する。

## 対象環境

- OS は Windows。
- 実行環境は、この PC に入っている Node.js と npm。
- 言語は TypeScript。
- テストランナーは `@playwright/test`。
- 再生に使うブラウザは Chromium。Playwright が配布する Firefox と WebKit は、初版では使わない。

## 決まっていること

- プロジェクトのフォルダ名は `playwright-youtube-auto-play`。
- テストファイルは `tests` に置き、ファイル名は `*.spec.ts`。
- 型検査は `tsc --noEmit`。`package.json` の `typecheck` から実行する。
- テスト実行は `playwright test`。`package.json` の `test` から実行する。
- TypeScript の `module` と `moduleResolution` は `NodeNext`。
- `tsc` は JavaScript を出力しない（`noEmit`）。テストの実行時変換は Playwright が行う。
- 再生対象は、1本の動画 URL。環境変数 `YOUTUBE_URL` から読む。リポジトリには書かない。
- Google アカウントにはログインしない。クッキーや `storageState` は作らない。
- 完了は、指定した動画の再生が始まったこと。テスト終了時にブラウザは閉じる。再生を続けたままにはしない。
- ウィンドウは既定では出さない。見るときは `npx playwright test --headed`。
- 同意ダイアログ、年齢確認、広告で本編が始まらない場合、再生できない動画は失敗とする。同意ボタンや広告のスキップは自動で押さない。
- 初版の動作は [design.md](design.md) に書く。

## 対象外

- 再生回数や評価を水増しするための操作。
- ログイン情報をリポジトリへ保存すること。