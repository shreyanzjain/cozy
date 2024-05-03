# Import necessary libraries
from web3 import Web3
import time
import json

# Connect to the local Ganache network (adjust the URL if needed)
ganache_url = "http://127.0.0.1:7545"
w3 = Web3(Web3.HTTPProvider(ganache_url))

# Load the compiled contract ABI and bytecode
contract_abi = [{
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "wallet",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]  # Your contract's ABI
contract_bytecode = "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610175806100606000396000f3fe6080604052600436106100225760003560e01c8063521eb273146100945761008f565b3661008f5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f1935050505015801561008d573d6000803e3d6000fd5b005b600080fd5b3480156100a057600080fd5b506100a96100bf565b6040516100b69190610124565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061010e826100e3565b9050919050565b61011e81610103565b82525050565b60006020820190506101396000830184610115565b9291505056fea26469706673582212200cb311373d0f8adc125609e64abec9f8b4e24cbb4a1df61aa5b188d3bb306aff64736f6c63430008180033"  # Your contract's bytecode

# Replace with your actual wallet address
wallet_address = "0x821C098D100e5D4783115A00889aF36A2C4A44DB"

def deploy_contract():
    # Create a contract instance
    contract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

    # Deploy the contract
    tx_hash = contract.constructor().transact({"from": wallet_address})

    # Wait for the transaction to be mined (you can adjust the timeout as needed)
    timeout = 120  # seconds
    start_time = time.time()
    while True:
        if time.time() - start_time > timeout:
            raise TimeoutError("Transaction not mined within timeout period")
        tx_receipt = w3.eth.get_transaction_receipt(tx_hash)
        if tx_receipt:
            break
        time.sleep(1)
    contract_address = tx_receipt["contractAddress"]

    return contract_address

if __name__ == "__main__":
    deployed_contract_address = deploy_contract()
    print(f"Contract deployed at address: {deployed_contract_address}")
