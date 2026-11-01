# playwright-youtube-auto-play

指定した YouTube の動画を、Playwright の自動操作で再生開始するプロジェクトです。初版の動作は設計済みで、再生処理の実装はまだありません。

要件は [docs/requirements.md](docs/requirements.md)、設計は [docs/design.md](docs/design.md) です。

## 必要なもの

- Windows
- この PC に入っている Node.js と npm

## 準備

```powershell
npm install
npx playwright install
Copy-Item .env.example .env
```

`npm install` は `@playwright/test` と TypeScript を入れます。`npx playwright install` は Chromium、Firefox、WebKit を `%USERPROFILE%\AppData\Local\ms-playwright` へ置きます。必要な版が既にあるときは、何も表示せず終了します。

再生する動画の URL は、`.env` の `YOUTUBE_URL` に書きます。`.env` はコミットしません。見本の変数名は `.env.example` にあります。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm test` | 単体テストのあと結合テストを実行する。既定ではウィンドウを出さない |
| `npm run test:unit` | `tests/unit` の単体テストだけを実行する |
| `npm run test:integration` | `tests/integration` の結合テストだけを実行する |
| `npm run typecheck` | `tsc --noEmit` で型だけ検査する。問題が無いときは何も表示しない |
| `npx playwright test --headed` | 結合テストを、ブラウザウィンドウを表示して実行する |

設定は [playwright.config.ts](playwright.config.ts) にあり、結合テストが使うブラウザは Chromium です。Firefox と WebKit は初版では使いません。

## ディレクトリ

```text
docs/requirements.md                 要件定義
docs/design.md                       初版の設計
.env                                 再生する動画の URL。コミットしない
.env.example                         YOUTUBE_URL の見本
src/                                 再生のソース。実装時に追加する
tests/unit/**/*.test.ts              単体テスト。ソースと同時に追加する
tests/integration/**/*.spec.ts       結合テスト。ソースと同時に追加する
scripts/check-test-files.cjs         src があるとき、両方のテストを要求する
playwright.config.ts                 Chromium と .env の設定
.github/workflows/test.yml           push と pull request で npm test を実行する
```

再生のソースとテストはまだありません。ソースが無いあいだ、`npm test` はテスト 0 件で成功します。`src` に TypeScript を追加したときは、単体テストと結合テストが同じ変更に無いと `npm test` は失敗します。

`push` と pull request では GitHub Actions が `npm test` を実行します。結合テストが読む `YOUTUBE_URL` は、リポジトリの Secrets に同名で登録します。

## 対象外

再生回数や評価の水増し、ログイン情報のリポジトリへの保存は対象外です。初版の成功と失敗は [docs/design.md](docs/design.md) に従います。
