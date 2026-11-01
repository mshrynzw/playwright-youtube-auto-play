# 要件定義

## 目的

Windows PC 上で、指定した YouTube の動画を Playwright の自動操作で再生開始する。

## 対象環境

- OS は Windows。
- 実行環境は、この PC に入っている Node.js と npm。
- 言語は TypeScript。
- テストランナーは `@playwright/test`。
- 操作対象のブラウザは、Playwright が配布する Chromium、Firefox、WebKit。設定ファイルが無いあいだの既定の実行ブラウザは Chromium。

## 決まっていること

- プロジェクトのフォルダ名は `playwright-youtube-auto-play`。
- テストファイルは `tests` に置き、ファイル名は `*.spec.ts`。
- 型検査は `tsc --noEmit`。`package.json` の `typecheck` から実行する。
- テスト実行は `playwright test`。`package.json` の `test` から実行する。
- TypeScript の `module` と `moduleResolution` は `NodeNext`。
- `tsc` は JavaScript を出力しない（`noEmit`）。テストの実行時変換は Playwright が行う。

## YouTube 自動再生

次の項目は未決定。決まるまで実装しない。

- 再生する対象（動画の URL、再生リスト、検索キーワードのどれか）
- Google アカウントへのログインを行うか
- 自動再生の完了条件（再生が始まったこと、指定秒数の再生、最後まで再生、次の動画へ進むこと）
- 実行時にブラウザウィンドウを表示するか
- 使うブラウザ（Chromium、Firefox、WebKit のどれか）
- 広告、同意ダイアログ、年齢確認、再生できない動画が出たときの扱い

## 対象外

- 再生回数や評価を水増しするための操作。
- ログイン情報をリポジトリへ保存すること。