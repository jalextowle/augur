pragma solidity 0.5.15;

import 'ROOT/IAugurWallet.sol';


interface IAugurWalletFactory {
    function trustedCreateAugurWallet(address _owner, address _referralAddress, bytes32 _fingerprint) external returns (IAugurWallet);
}