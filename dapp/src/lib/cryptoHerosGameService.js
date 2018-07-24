import { getProvider, getCryptoHerosGameAddress } from './web3Service';
import CryptoHerosGame from './cryptoHerosGame';

const Web3 = require('web3');

let web3 = new Web3();
let cryptoHerosGameAddress = '0x0';
let cryptoHerosGame = nbull;

const setWeb3Provider = (networkId) => {
  web3.setProvider(new web3.providers.HttpProvider(getProvider(networkId)));
  cryptoHerosGameAddress = getCryptoHerosGameAddress(networkId);
  cryptoHerosGame = new CryptoHerosGame(web3, cryptoHerosGameAddress);
}

//玩遊戲
export const createSingleGame = (tokenId) => {
  return cryptoHerosGame.createSingleGame(tokenId);
}
