# AGENTS.md

このリポジトリで作業するエージェント向けの指示です。要件の正本は `docs/requirements.md` です。実装や文書を変えるときは、そのファイルと矛盾させないでください。

## プロジェクト

このリポジトリの目的は、指定した YouTube の動画を自動操作で再生開始することです。Playwright の練習用コードや `playwright.dev` へのテストは置かず、練習は `D:\Code\playwright-tutorial` で行います。言語は TypeScript、実行は `@playwright/test` です。

`docs/requirements.md` の「YouTube 自動再生」に未決定の項目があるあいだ、次は追加しません。

- YouTube を開く処理、再生、一時停止、次の動画への移動
- Google アカウントへのログインと、そのセッションの保存
- YouTube 向けの `playwright.config.ts`（ブラウザの固定、headed の固定、タイムアウトの調整）
- 広告、同意ダイアログ、年齢確認、再生できない動画への対処

決まった項目だけを `docs/requirements.md` に書き、その範囲で実装します。

## 対象外

- 再生回数や評価を増やすための繰り返し再生、待機、複数アカウントの操作
- クッキー、`storageState`、パスワード、トークン、それらを含む `.env` をリポジトリへ置くこと

## コマンド

```powershell
npm install
npx playwright install
npm run typecheck
npm test
```

- 型検査の正は `npm run typecheck`（`tsc --noEmit`）です。成功時は出力がありません。
- テスト実行の正は `npm test`（`playwright test`）です。
- `tsc` は JavaScript を出力しません。テストの変換は Playwright が行います。`tsc` で事前コンパイルしてから実行する script を足さないでください。
- 画面確認が必要なときだけ `npx playwright test --headed` を使います。`package.json` の `test` に `--headed` や `--ui` を常設しないでください。

## コード

- テストは `tests/**/*.spec.ts` に置きます。
- `module` と `moduleResolution` は `NodeNext` のままにします。
- TypeScript のソースでは `import` を使います。
- 設定ファイルが無いあいだ、実行ブラウザは Chromium です。
- TypeScript 7 のパッケージに `tsserver.js` はありません。`.vscode` の `typescript.tsdk` を `node_modules/typescript/lib` に設定しないでください。エディタの言語サービスは Cursor 同梱のものを使い、型が正しいかの確認は `npm run typecheck` で行います。

## 現状

YouTube の再生テストはまだありません。`docs/requirements.md` の「YouTube 自動再生」が決まるまで、`tests` にテストファイルを追加しません。
