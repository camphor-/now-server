# now-server

[![Build Status](https://travis-ci.org/camphor-/now-server.svg?branch=master)](https://travis-ci.org/camphor-/now-server)
[![Dependency Status](https://david-dm.org/camphor-/now-server.svg)](https://david-dm.org/camphor-/now-server)
[![devDependency Status](https://david-dm.org/camphor-/now-server/dev-status.svg)](https://david-dm.org/camphor-/now-server#info=devDependencies)

## Environment
Latest stable version of Node.js

## Run
### Debug
`DEBUG=now-server* npm start`

### Production
`NODE_ENV=production npm start`

## Endpoints
- `/camera/take/` - 写真を撮影して, JSON 形式でレスポンスを返す (要認証)
- `/camera/uploads/` - 撮影した写真を提供する
- `/socket.io/` - Socket.IO 用 (要認証)
