// do not delete this
// https://github.com/styleguidist/react-docgen-typescript/issues/144
module.exports = {
  propsParser: require("react-docgen-typescript").withCustomConfig("./tsconfig.json")
    .parse,
}
