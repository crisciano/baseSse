# BASE SSE

Basis for SSE development.
OCC(Oracle Commerce Cloud)

## SETUP

Setup install and start project

```bash
# install dependencies
yarn
npm install

# start project in a development mode
yarn dev
npm run dev

# start project in a production mode
yarn start
npm start
```

## ENV

File env in `src/config` example, file name `env.js`

```javascript
module.exports = {
  ENVIRONMENT_OCC: "dev",
  occ: {
    dev: {
      adminUrl: "",
      storeUrl: "",
      appKey: "",
    },
  },
};
```
