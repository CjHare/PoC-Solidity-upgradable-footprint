# Proof of Concept - Footprint of the OpenZeppelin upgradable gap variables

How much of a byte code overhead does using the upgradable contracts, with their additional init function and gap variables actually bring?

---

## Development Process

Development follows these processes outlined in [development process](docs/development_process.md)

---

## Install, build and run

Start by cloning the git repo locally.

#### Install

To retrieve the project dependencies and before any further tasks will run correctly.

```shell
npm ci
```

#### Husky Git Commit Hooks

To enable Husky commit hooks to trigger the lint-staged behaviour of formatting and linting the staged files prior
before committing, prepare your repo with `prepare`.

```shell
npm run prepare
```

#### Build and Test

```shell
npm run build
npm test
```

If you make changes that don't get picked up then add a clean into the process

```shell
npm run clean
npm run build
npm test
```

## Tools

Setup and run instructions:

- [Hardhat](./docs/tools/hardhat.md)
- [PlantUML](./docs/tools/plantuml.md); UML diagram generation from code.
- [Slither](./docs/tools/slither.md); Trail of Bits Solidity static analyzer.

## Result

```shell
npx hardhat run ./scripts/footprints.ts --network local
```

```shell
eth_sendTransaction
  Contract deployment: StandardFootprint
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x8a994101624d28f2e70c4ddfc8d73dee6338bb370b40b1011269063e9ac625dd
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            98596 of 98596
  Block #1:            0xd27df96e5355776fd2a50e95e3e8e7c4b2f07e520897d885703c80e81d5641ae

eth_chainId
eth_getTransactionByHash
eth_chainId
eth_getTransactionReceipt
eth_accounts
eth_chainId
eth_estimateGas
eth_feeHistory
eth_sendTransaction
  Contract deployment: UpgradableFootprint
  Contract address:    0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
  Transaction:         0x947ab1b009215d44d4d04125465e53be0ae198e41485cde61f6845c23393fabc
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            272721 of 272721
  Block #2:            0x2a972fc27c6462afcfdc869573e6822dde0c341ba890826a9e3cbef3c0be3c2b
```

98,596 vs 272,721, an increase of 174,125 gas.

Importing the Upgradable dependencies into a flat file, removing the unused function and gap variables trim about 10% off the footprint.

```shell
eth_sendTransaction
  Contract deployment: SlimUpgradableFootprint
  Contract address:    0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9
  Transaction:         0xb58887ea9db606918e1eb1cc0b1c39840075a0421bec5155332a5298e5760f27
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            253448 of 253448
  Block #4:            0x74b85219b3be8765b870b6f751771875cbbdf7aec1c5d060ca8d350cb951fae6
```

The gap variables were only 500 gas, the majority of saving came from trimming unused functions.
