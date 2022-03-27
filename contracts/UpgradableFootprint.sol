// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract UpgradableFootprint is PausableUpgradeable {
    function initialize() external initializer {
        __Pausable_init();
    }
}
