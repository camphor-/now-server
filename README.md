# now-server

[![Build Status](https://travis-ci.org/camphor-/now-server.svg?branch=master)](https://travis-ci.org/camphor-/now-server)

## Environment
Latest stable version of Node.js

## Endpoints
- `/camera/take/` - 写真を撮影して, JSON 形式でレスポンスを返す (要認証)
- `/camera/uploads/` - 撮影した写真を提供する
- `/socket.io/` - Socket.IO 用 (要認証)
