# playwright-youtube-auto-play

指定した YouTube の動画を、Playwright の自動操作で再生開始するプロジェクトです。再生の対象や完了条件は未決定なので、その実装はまだありません。

要件の正本は [docs/requirements.md](docs/requirements.md) です。

## 必要なもの

- Windows
- この PC に入っている Node.js と npm

## 準備

```powershell
npm install
npx playwright install
```

`npm install` は `@playwright/test` と TypeScript を入れます。`npx playwright install` は Chromium、Firefox、WebKit を `%USERPROFILE%\AppData\Local\ms-playwright` へ置きます。必要な版が既にあるときは、何も表示せず終了します。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm test` | Playwright のテストを実行する。既定ではウィンドウを出さない |
| `npm run typecheck` | `tsc --noEmit` で型だけ検査する。問題が無いときは何も表示しない |
| `npx playwright test --headed` | ブラウザウィンドウを表示してテストする |

設定ファイルが無いあいだ、テストが使うブラウザは Chromium です。

## ディレクトリ

```text
docs/requirements.md    要件定義
tests/*.spec.ts         YouTube 自動再生のテスト。要件が決まるまでファイルは置かない
tsconfig.json           TypeScript の設定。JavaScript は出力しない
package.json            test と typecheck
```

再生のテストはまだありません。`npm test` は、テストファイルが無いため失敗します。

## まだ実装しないこと

[docs/requirements.md](docs/requirements.md) の「YouTube 自動再生」が決まるまで、再生処理、ログイン、使用ブラウザの固定、広告や同意ダイアログの処理は追加しません。

再生回数や評価の水増し、ログイン情報のリポジトリへの保存は対象外です。
