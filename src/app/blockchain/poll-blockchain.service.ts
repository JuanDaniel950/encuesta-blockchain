import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const contractAbi = require('./contract-abi.json');
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class PollBlockchainService {
  private web3: Web3 = new Web3();
  private contractAddress = '0x59d6f382B666c4867a58DD32706ef4364C75Cca5';
  private contract: Contract = new this.web3.eth.Contract(
    [],
    this.contractAddress
  );
  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.etherum);
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );

      window.ethereum
        .enable()
        .then()
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      console.warn(
        'Metamask is not installed. Please install it to use this app.'
      );
    }
  }

  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts: string[]) => {
      return accounts[0] || '';
    });
  }

  async executeTransaction(fnName: string, ...args: any): Promise<void> {
    const acc = await this.getAccount();

    this.contract.methods[fnName](...args).send({
      from: acc,
    });
  }
}
