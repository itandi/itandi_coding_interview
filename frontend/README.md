# README (to 候補者様)

フロントエンドエンジニア採用のコーディングインタビューは[Next.js](https://nextjs.org/)を使用して行います。

## 当日までにご準備いただきたい事

### Dockerのインストール

下記リンクを参考に、`docker` / `docker compose`コマンドが利用できる状態にsetupをお願いいたします。

- [Get Docker](https://docs.docker.com/get-docker/)
- [install Docker Compose](http://docs.docker.jp/compose/install.html)

### アプリケーションの起動

- [AppRouter](https://nextjs.org/docs/app)をご使用の場合は[こちら](./nextjs-app-router)
- [PagesRouter](https://nextjs.org/docs/pages)をご使用の場合は[こちら](./nextjs-pages-router)

選択したディレクトリにおいて下記のコマンドを実行し、セットアップとアプリケーションの起動を行います。

```sh
$ docker compose up --build
```

`http://localhost:3000/`にアクセスしてNext.jsのTop画面が無事表示されれば準備は完了です。

また別途`yarn`等のコマンドを実行する際は以下のコマンドでコンテナを起動してください。

```sh
$ docker compose run --rm app /bin/bash
```

### その他

- 追加のパッケージのインストールがあれば事前に実行していただくことを推奨します。
  - 状態管理ライブラリなど
- コンテナ内の`node_modules`ディレクトリはホストマシン上にマウントしていません。エディタなどの支援のために必要に応じてホストマシン上にもパッケージをインストールしてください。
- dockerに割り当てるMemoryを大きくしておくこと(可能なら4GB~)を推奨します。
