# AGENTS.md

このリポジトリで作業するエージェント向けの指示です。要件の正本は `docs/requirements.md`、初版の動作の正本は `docs/design.md` です。実装や文書を変えるときは、この2つと矛盾させないでください。

## プロジェクト

このリポジトリの目的は、指定した YouTube の動画を自動操作で再生開始することです。Playwright の練習用コードや `playwright.dev` へのテストは置かず、練習は `D:\Code\playwright-tutorial` で行います。言語は TypeScript、実行は `@playwright/test` です。

再生処理を追加するときは `docs/design.md` に従います。ログイン、クッキー、`storageState`、再生を続けたままにする処理、同意ボタンや広告スキップの自動化は追加しません。

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
- 設定ファイルがまだ無いあいだも、再生に使うブラウザは Chromium です。Firefox と WebKit は初版では使いません。
- TypeScript 7 のパッケージに `tsserver.js` はありません。`.vscode` の `typescript.tsdk` を `node_modules/typescript/lib` に設定しないでください。エディタの言語サービスは Cursor 同梱のものを使い、型が正しいかの確認は `npm run typecheck` で行います。

## 現状

初版の設計は `docs/design.md` にあります。再生のテストと `playwright.config.ts` はまだありません。実装するときは、その設計のファイル構成に従います。
