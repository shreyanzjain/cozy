// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundDeposit {
    address payable public wallet; // The wallet address to receive funds

    constructor() {
        wallet = payable(msg.sender); // Set the contract creator as the wallet owner
    }

    // This function is called when someone sends ETH to the contract
    receive() external payable {
        // Deposit the received ETH into the wallet
        wallet.transfer(msg.value);
    }
}
