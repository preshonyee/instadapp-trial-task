/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0xc80e5c0f47f21dff03fc28bf6ddd4ae90e0d659d600b9e4f137b03b533e1d234","balance":"1000000000000000000000"},{"privateKey":"0x392cea04bf1ff6b781aaabfe97d43b34319d67e980b7412d3e3b4b9515d3aa85","balance":"1000000000000000000000"},{"privateKey":"0xd53a1685cd8207a13049268298c85f4eba07a9afccf270993700514b1cc73a56","balance":"1000000000000000000000"},{"privateKey":"0x71418ff554ec61364f14c76530cadd1522e7620d9bb878c871451f53d6271ece","balance":"1000000000000000000000"},{"privateKey":"0x03e8691144e2961e1d4914ca0a342433cb719f766bc67672a2092023e49416b0","balance":"1000000000000000000000"},{"privateKey":"0xb737a2a7944079b1ac87be22725ca7a119084140ed504169fb6cc298350b96c3","balance":"1000000000000000000000"},{"privateKey":"0x7086d0cdc55ccb7b11aefb7a4c9d57fdf6c27a965a693aace255289901e60643","balance":"1000000000000000000000"},{"privateKey":"0x28e14da2f89feb1d7545b6d5069162eada635dba75b808cd1470c6eb023bbb18","balance":"1000000000000000000000"},{"privateKey":"0xd25503f170a16c874e0c52b6f5b8ea1a287c041fe40c07d425fffe5c5a52a691","balance":"1000000000000000000000"},{"privateKey":"0x62079496f7dc66aecfd9bf44f3e9646a01bf0607644927f91493a620a12b5821","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};