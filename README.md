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
| `npm test` | Playwright のテストを実行する。既定ではウィンドウを出さない |
| `npm run typecheck` | `tsc --noEmit` で型だけ検査する。問題が無いときは何も表示しない |
| `npx playwright test --headed` | ブラウザウィンドウを表示してテストする |

設定ファイルがまだ無いあいだも、再生に使うブラウザは Chromium です。Firefox と WebKit は初版では使いません。

## ディレクトリ

```text
docs/requirements.md    要件定義
docs/design.md          初版の設計
.env                    再生する動画の URL。コミットしない
.env.example            YOUTUBE_URL の見本
tests/*.spec.ts         YouTube 自動再生のテスト。設計の実装時に追加する
tsconfig.json           TypeScript の設定。JavaScript は出力しない
package.json            test と typecheck
```

再生のテストはまだありません。`npm test` は、テストファイルが無いため失敗します。

## 対象外

再生回数や評価の水増し、ログイン情報のリポジトリへの保存は対象外です。初版の成功と失敗は [docs/design.md](docs/design.md) に従います。
