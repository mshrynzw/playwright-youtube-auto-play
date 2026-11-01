# 要件定義

## 目的

Windows PC 上で、指定した YouTube の動画を Playwright の自動操作で再生開始する。

## 対象環境

- OS は Windows。
- 実行環境は、この PC に入っている Node.js と npm。
- 言語は TypeScript。
- 結合テストのランナーは `@playwright/test`。単体テストのランナーは Node.js のテストランナー。
- 再生に使うブラウザは Chromium。Playwright が配布する Firefox と WebKit は、初版では使わない。

## 決まっていること

- プロジェクトのフォルダ名は `playwright-youtube-auto-play`。
- ソースは `src` に置く。
- 単体テストは `tests/unit` に置き、ファイル名は `*.test.ts`。ブラウザは使わない。
- 結合テストは `tests/integration` に置き、ファイル名は `*.spec.ts`。
- ソースを追加または変更するときは、同じ変更で単体テストと結合テストを追加または更新する。
- 型検査は `tsc --noEmit`。`package.json` の `typecheck` から実行する。
- `npm test` は、`src` が無いときはテスト 0 件で成功する。`src` があるときは単体テストと結合テストのファイルを要求し、単体テストのあと結合テストを実行する。`push` と pull request では GitHub Actions も `npm test` を実行する。
- TypeScript の `module` と `moduleResolution` は `NodeNext`。
- `tsc` は JavaScript を出力しない（`noEmit`）。単体テストは Node.js が TypeScript を直接実行し、結合テストの変換は Playwright が行う。
- 再生対象は、1本の動画 URL。プロジェクト直下の `.env` に `YOUTUBE_URL` として書く。このファイルはリポジトリに置かない。
- Google アカウントにはログインしない。クッキーや `storageState` は作らない。
- 完了は、指定した動画の再生が始まったこと。テスト終了時にブラウザは閉じる。再生を続けたままにはしない。
- ウィンドウは既定では出さない。見るときは `npx playwright test --headed`。
- 同意ダイアログ、年齢確認、広告で本編が始まらない場合、再生できない動画は失敗とする。同意ボタンや広告のスキップは自動で押さない。
- 初版の動作は [design.md](design.md) に書く。

## 対象外

- 再生回数や評価を水増しするための操作。
- ログイン情報をリポジトリへ保存すること。