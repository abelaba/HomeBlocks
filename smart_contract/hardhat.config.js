require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ['0x05c368d4bfd4821a770cca8c143cff2605cb8e13023b1dfc9c876341840ec344'],
    }
  },
};