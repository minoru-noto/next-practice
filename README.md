環境の初期設定

```bash
# clone repository
$ git clone git@github.com:minoru-noto/next-product.git

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## ライブラリ概要

- [Firebase v9.6.3](https://firebase.google.com/docs/web/setup?hl=ja)

- [Firebase Admin v10.0.1](https://firebase.google.cn/docs/admin/setup?hl=ja)

- [Recoil(状態管理) v0.5.2](https://recoiljs.org/)

- [Tailwind CSS v3.0.15](https://tailwindcss.com/docs/installation)

- [nookies v2.5.2](https://www.npmjs.com/package/nookies)

## パッケージ

- Package manager
  - Yarn

## .env.local ファイル

```
# Firebase
NEXT_PUBLIC_FB_API_KEY=
NEXT_PUBLIC_FB_AUTH_DOMAIN=
NEXT_PUBLIC_FB_PROJECT_ID=
NEXT_PUBLIC_FB_STORAGE_BUCKET=
NEXT_PUBLIC_FB_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FB_APP_ID=
NEXT_PUBLIC_FB_MEASUREMENT_ID=
# Firebase Admin
FB_ADMIN_PRIVATE_KEY=
FB_ADMIN_CLIENT_EMAIL=
```
