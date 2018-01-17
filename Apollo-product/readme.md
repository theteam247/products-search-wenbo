# Product Manage(Apollo + React)

## 说明

本例子，按照 https://www.howtographql.com/react-apollo 一步步实现。

Product Manage 部分，只写了 CRUD 的 schema, resolvers，前端还未移植。

## Install
```bash
# ./
yarn install

# ./server
yarn install

# ./server init database
yarn prisma deploy
```

## Run
```bash
# ./
yarn start

# ./server
yarn start
```

- 如果遇到 graphql 依赖包版本冲突：
```bash
find node_modules -name graphql
# 删除多余版本
rm -rf node_modules/apollo-server-core/node_modules/graphql
```
