# モンマチ GitHub Pages公開手順

## 初回公開

1. GitHubで新しい空のリポジトリを作成する。
2. リポジトリ名は例として `MonsterMaching` とする。
3. READMEや.gitignoreはGitHub側では追加しない。
4. このフォルダのファイルをリポジトリの `main` ブランチへアップロードする。
5. GitHubのリポジトリ画面で `Settings` を開く。
6. 左メニューの `Pages` を開く。
7. `Build and deployment` の `Source` を `GitHub Actions` にする。
8. 上部の `Actions` タブで `Deploy GitHub Pages` が完了するまで待つ。
9. `Settings > Pages` に表示される公開URLをスマホで開く。

公開URLは通常、次の形式になる。

`https://GitHubユーザー名.github.io/MonsterMaching/`

## 更新方法

変更した `index.html`、`styles.css`、`app.js`などを `main` ブランチへ反映する。
反映されるたびにGitHub Actionsが自動で再公開する。

公開には通常数十秒から数分かかる。古い表示が残る場合はスマホのページを再読み込みする。

## セーブデータ

セーブはブラウザのlocalStorageに保存される。

- PCのfile版
- PCのローカルサーバー版
- GitHub Pages版
- スマホのGitHub Pages版

これらはそれぞれ別のセーブデータになる。同じGitHub Pages URLを同じ端末・ブラウザで開く限り、更新後もセーブを引き継げる。
