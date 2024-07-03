// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract stToken is ERC20("stToken", "rsT") {
    function burnStTokens(address account, uint256 amount) external { 
        _burn(account, amount); 
    } 
    
    function mint(address to, uint256 amount) external { 
        _mint(to, amount); 
    }
}

