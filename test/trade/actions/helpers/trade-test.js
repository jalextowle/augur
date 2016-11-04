import { assert } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import * as mocks from '../../../mockStore';
import { augur, abi, constants } from '../../../../src/services/augurjs';
import { tradeTestState } from '../../constants';
import { ZERO } from '../../../../src/modules/trade/constants/numbers';

describe('modules/trade/actions/helpers/trade.js', () => {
	proxyquire.noPreserveCache();
	const { state, mockStore } = mocks.default;
	const testState = Object.assign({}, state, tradeTestState);
	testState.orderBooks = {
		'testBinaryMarketID': {
			buy: {
				'orderID1': {
					id: 'orderID1',
					price: '0.45',
					numShares: '10',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID2': {
					id: 'orderID2',
					price: '0.45',
					numShares: '5',
					outcome: '1',
					owner: 'owner2'
				},
				'orderID3': {
					id: 'orderID3',
					price: '0.45',
					numShares: '3',
					outcome: '1',
					owner: 'owner3'
				},
				'orderID4': {
					id: 'orderID4',
					price: '0.44',
					numShares: '10',
					outcome: '1',
					owner: 'owner4'
				},
				'orderID5': {
					id: 'orderID5',
					price: '0.46',
					numShares: '15',
					outcome: '1',
					owner: 'owner5'
				},
				'orderID6': {
					id: 'orderID6',
					price: '0.43',
					numShares: '5',
					outcome: '1',
					owner: 'owner6'
				}
			},
			sell: {
				'orderID1': {
					id: 'orderID1',
					price: '0.4',
					numShares: '10',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID2': {
					id: 'orderID2',
					price: '0.4',
					numShares: '5',
					outcome: '1',
					owner: 'owner2'
				},
				'orderID3': {
					id: 'orderID3',
					price: '0.4',
					numShares: '10',
					outcome: '1',
					owner: 'owner3'
				},
				'orderID4': {
					id: 'orderID4',
					price: '0.39',
					numShares: '3',
					outcome: '1',
					owner: 'owner4'
				},
				'orderID5': {
					id: 'orderID5',
					price: '0.41',
					numShares: '15',
					outcome: '1',
					owner: 'owner5'
				},
				'orderID6': {
					id: 'orderID6',
					price: '0.415',
					numShares: '20',
					outcome: '1',
					owner: 'owner6'
				}
			}
		},
		'testCategoricalMarketID': {
			buy: {
				'orderID1': {
					id: 'orderID1',
					price: '0.45',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID2': {
					id: 'orderID2',
					price: '0.45',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID3': {
					id: 'orderID3',
					price: '0.45',
					numShares: '3',
					outcome: '1',
					owner: 'owner3'
				},
				'orderID4': {
					id: 'orderID4',
					price: '0.44',
					numShares: '10',
					outcome: '1',
					owner: 'owner4'
				},
				'orderID5': {
					id: 'orderID5',
					price: '0.46',
					numShares: '15',
					outcome: '1',
					owner: 'owner5'
				},
				'orderID6': {
					id: 'orderID6',
					price: '0.43',
					numShares: '5',
					outcome: '1',
					owner: 'owner6'
				}
			},
			sell: {
				'orderID1': {
					id: 'orderID1',
					price: '0.4',
					numShares: '10',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID2': {
					id: 'orderID2',
					price: '0.4',
					numShares: '5',
					outcome: '1',
					owner: 'owner2'
				},
				'orderID3': {
					id: 'orderID3',
					price: '0.4',
					numShares: '10',
					outcome: '1',
					owner: 'owner3'
				},
				'orderID4': {
					id: 'orderID4',
					price: '0.39',
					numShares: '3',
					outcome: '1',
					owner: 'owner4'
				},
				'orderID5': {
					id: 'orderID5',
					price: '0.41',
					numShares: '15',
					outcome: '1',
					owner: 'owner5'
				},
				'orderID6': {
					id: 'orderID6',
					price: '0.415',
					numShares: '20',
					outcome: '1',
					owner: 'owner6'
				}
			}
		},
		'testScalarMarketID': {
			buy: {
				'orderID1': {
					id: 'orderID1',
					price: '45',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID2': {
					id: 'orderID2',
					price: '45',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID3': {
					id: 'orderID3',
					price: '45',
					numShares: '3',
					outcome: '1',
					owner: 'owner3'
				},
				'orderID4': {
					id: 'orderID4',
					price: '44',
					numShares: '10',
					outcome: '1',
					owner: 'owner4'
				},
				'orderID5': {
					id: 'orderID5',
					price: '46',
					numShares: '15',
					outcome: '1',
					owner: 'owner5'
				},
				'orderID6': {
					id: 'orderID6',
					price: '43',
					numShares: '5',
					outcome: '1',
					owner: 'owner6'
				}
			},
			sell: {
				'orderID1': {
					id: 'orderID1',
					price: '40',
					numShares: '10',
					outcome: '1',
					owner: 'owner1'
				},
				'orderID2': {
					id: 'orderID2',
					price: '40',
					numShares: '5',
					outcome: '1',
					owner: 'owner2'
				},
				'orderID3': {
					id: 'orderID3',
					price: '40',
					numShares: '10',
					outcome: '1',
					owner: 'owner3'
				},
				'orderID4': {
					id: 'orderID4',
					price: '39',
					numShares: '3',
					outcome: '1',
					owner: 'owner4'
				},
				'orderID5': {
					id: 'orderID5',
					price: '41',
					numShares: '15',
					outcome: '1',
					owner: 'owner5'
				},
				'orderID6': {
					id: 'orderID6',
					price: '415',
					numShares: '20',
					outcome: '1',
					owner: 'owner6'
				}
			}
		}
	};
	const store = mockStore(testState);
	const mockAugur = { augur: { ...augur }, abi: { ...abi }, constants: { ...constants } };
	const mockLoadBidAsks = { loadBidsAsks: () => {} };
	sinon.stub(mockLoadBidAsks, 'loadBidsAsks', (marketID, cb) => {
		assert.isString(marketID, `didn't pass a marketID as a string to loadBidsAsks`);
		cb();
		return { type: 'LOAD_BIDS_ASKS' };
	});

	const mockCBStatus = sinon.stub();
	const mockCB = sinon.stub();

	describe('Buy Trade Tests', () => {
		sinon.stub(mockAugur.augur, 'getParticipantSharesPurchased', (marketID, userID, outcomeID, cb) => {
			console.log('getParticipantSharesPurchasedcc:', mockAugur.augur.getParticipantSharesPurchased.callCount);
			switch (mockAugur.augur.getParticipantSharesPurchased.callCount) {
			case 0:
				cb('5');
				break;
			case 1:
				cb('5');
				break;
			default:
				cb('10');
				break;
			}
			return;
		});

		sinon.stub(mockAugur.augur, 'getCashBalance', (takerAddress, cb) => {
			console.log('getCashBalance cc:', mockAugur.augur.getCashBalance.callCount);
			switch (mockAugur.augur.getCashBalance.callCount) {
			default:
				cb('10000.0');
				break;
			}
			return;
		});

		sinon.stub(mockAugur.augur, 'trade', (args) => {
			// if buying numShares must be 0, if selling totalEthWithFee must be 0
			const { max_value, max_amount, trade_ids, sender, onTradeHash, onCommitSent, onCommitSuccess, onCommitFailed, onNextBlock, onTradeSent, onTradeSuccess, onTradeFailed } = args;
			onTradeHash('tradeHash1');
			onCommitSent({ txHash: 'tradeHash1', callReturn: '1' });
			console.log('trade cc:', mockAugur.augur.trade.callCount);
			switch (mockAugur.augur.trade.callCount) {
			case 4:
				onCommitFailed({ error: 'commit failed error', message: 'commit failed error message' });
				break;
			case 5:
				onCommitSuccess({ gasFees: '0.01450404', hash: 'testhash', timestamp: 1500000000 });
				onTradeSent({ txHash: 'tradeHash1', callReturn: '1' });
				onTradeFailed({ error: 'trade failed error', message: 'trade failed error message' });
				break;
			default:
				onCommitSuccess({ gasFees: '0.01450404', hash: 'testhash', timestamp: 1500000000 });
				onTradeSent({ txHash: 'tradeHash1', callReturn: '1' });
				onTradeSuccess({ sharesBought: '10', cashFromTrade: '0', unmatchedShares: '0', unmatchedCash: '0', tradingFees: '0.01', gasFees: '0.01450404', hash: 'testhash', timestamp:1500000000 });
				break;
			}
			return;
			// onCommitFailed({ error: 'error', message: 'error message' });
			// onNextBlock({ txHash: 'tradeHash1', callReturn: '1' });

			// onTradeFailed({ error: 'error', message: 'error message' });
		});

		const helper = proxyquire('../../../../src/modules/trade/actions/helpers/trade.js', {
			'../../../bids-asks/actions/load-bids-asks': mockLoadBidAsks,
			'../../../../services/augurjs': mockAugur
		});

		beforeEach(() => {
			store.clearActions();
			mockCB.reset();
			mockCBStatus.reset();
		});

		it('should help with a buy trade', () => {
			// marketID, outcomeID, numShares, totalEthWithFee, takerAddress, getTradeIDs, dispatch, cbStatus, cb
			helper.trade('testBinaryMarketID', '2', '0', '20.01', '0xtaker1', () => ['orderID1', 'orderID2', 'orderID3'], store.dispatch, mockCBStatus, mockCB);

			assert(mockCBStatus.calledWithExactly({ status: 'submitting' }), `Didn't call cbStatus with a submitting status`);
			assert(mockCBStatus.calledWithExactly({ status: 'committing' }), `Didn't call cbStatus with a committing status`);
			assert(mockCBStatus.calledWith({
				status: 'sending',
				hash: 'testhash',
				timestamp: 1500000000,
				gasFees: abi.bignum('0.01450404')
			}), `Didn't send the right details`);
			assert(mockCBStatus.calledWithExactly({ status: 'filling' }), `Didn't called cbStatus with a filling status`);
			assert(mockCBStatus.calledWith({
				status: 'filled',
				hash: 'testhash',
				timestamp: 1500000000,
				tradingFees: abi.bignum('0.01'),
				gasFees: abi.bignum('0.02900808'),
				filledShares: abi.bignum('10'),
				filledEth: abi.bignum('0'),
				remainingShares: abi.bignum('0'),
				remainingEth: abi.bignum('0')
			}), `Didn't call cbStatus with a filled status`);

			assert.deepEqual(mockCBStatus.callCount, 5, `Didn't call status callback 5 times as expected`);
			assert.deepEqual(mockCB.callCount, 1, `Didn't call the callback 3 times as expected`);
			assert.deepEqual(store.getActions(), [ { type: 'LOAD_BIDS_ASKS' } ], `Didn't dispatch a load_bids_asks action as expected`);
		});

		it('should handle a buy trade with js numbers sent in to trade helper', () => {
			helper.trade('testBinaryMarketID', 2, 0, 10.01, 'taker1', () => ['orderID1', 'orderID2', 'orderID3'], store.dispatch, mockCBStatus, mockCB);
			assert(mockCBStatus.calledWithExactly({ status: 'submitting' }), `Didn't call cbStatus with a submitting status`);
			assert(mockCBStatus.calledWithExactly({ status: 'committing' }), `Didn't call cbStatus with a committing status`);
			assert(mockCBStatus.calledWith({
				status: 'sending',
				hash: 'testhash',
				timestamp: 1500000000,
				gasFees: abi.bignum('0.01450404')
			}), `Didn't send the right details`);
			assert(mockCBStatus.calledWithExactly({ status: 'filling' }), `Didn't called cbStatus with a filling status`);
			assert(mockCBStatus.calledWith({
				status: 'filled',
				hash: 'testhash',
				timestamp: 1500000000,
				tradingFees: abi.bignum('0.01'),
				gasFees: abi.bignum('0.02900808'),
				filledShares: abi.bignum('10'),
				filledEth: abi.bignum('0'),
				remainingShares: abi.bignum('0'),
				remainingEth: abi.bignum('0')
			}), `Didn't call cbStatus with a filled status`);

			assert.deepEqual(mockCBStatus.callCount, 5, `Didn't call status callback 5 times as expected`);
			assert.deepEqual(mockCB.callCount, 1, `Didn't call the callback 3 times as expected`);
			assert.deepEqual(store.getActions(), [ { type: 'LOAD_BIDS_ASKS' }], `Didn't dispatch a load_bids_asks action as expected`);
		});

		it('should handle a buy trade with bignums sent in to trade helper', () => {
			helper.trade('testBinaryMarketID', '2', abi.bignum('0'), abi.bignum('10.01'), 'taker1', () => ['orderID1', 'orderID2', 'orderID3'], store.dispatch, mockCBStatus, mockCB);
			assert(mockCBStatus.calledWithExactly({ status: 'submitting' }), `Didn't call cbStatus with a submitting status`);
			assert(mockCBStatus.calledWithExactly({ status: 'committing' }), `Didn't call cbStatus with a committing status`);
			assert(mockCBStatus.calledWith({
				status: 'sending',
				hash: 'testhash',
				timestamp: 1500000000,
				gasFees: abi.bignum('0.01450404')
			}), `Didn't send the right details`);
			assert(mockCBStatus.calledWithExactly({ status: 'filling' }), `Didn't called cbStatus with a filling status`);
			assert(mockCBStatus.calledWith({
				status: 'filled',
				hash: 'testhash',
				timestamp: 1500000000,
				tradingFees: abi.bignum('0.01'),
				gasFees: abi.bignum('0.02900808'),
				filledShares: abi.bignum('10'),
				filledEth: abi.bignum('0'),
				remainingShares: abi.bignum('0'),
				remainingEth: abi.bignum('0')
			}), `Didn't call cbStatus with a filled status`);

			assert.deepEqual(mockCBStatus.callCount, 5, `Didn't call status callback 5 times as expected`);
			assert.deepEqual(mockCB.callCount, 1, `Didn't call the callback 3 times as expected`);
			assert.deepEqual(store.getActions(), [ { type: 'LOAD_BIDS_ASKS' }], `Didn't dispatch a load_bids_asks action as expected`);
		});

		it('shouldn\'t call augur.trade on a buy trade when no tradeIDs are returned', () => {
			helper.trade('testBinaryMarketID', '2', '0', '10.01', 'taker1', () => [], store.dispatch, mockCBStatus, mockCB);
			assert(mockCB.calledWithExactly(null, {
			  remainingEth: abi.bignum("10.01"),
			  remainingShares: abi.bignum("0"),
			  filledShares: abi.bignum("0"),
			  filledEth: abi.bignum("0"),
			  tradingFees: abi.bignum("0"),
			  gasFees: abi.bignum("0")
			}), `Didn't cancel the trade and return the trade object.`);

			assert(mockCB.calledOnce, `the callback wasn't called 1 time only as expected`);

			assert.deepEqual(store.getActions(), [], `Dispatched actions that shouldn't have dispatched.`);
		});

		it('should not call trade when given a negative raminingEth input', () => {
			helper.trade('testBinaryMarketID', '2', '0', '-10.01', 'taker1', () => ['orderID1', 'orderID2', 'orderID3', 'orderID4', 'orderID5', 'orderID6'], store.dispatch, mockCBStatus, mockCB);

			assert(mockCB.calledWithExactly(null, {
			  remainingEth: abi.bignum("-10.01"),
			  remainingShares: abi.bignum("0"),
			  filledShares: abi.bignum("0"),
			  filledEth: abi.bignum("0"),
			  tradingFees: abi.bignum("0"),
			  gasFees: abi.bignum("0")
			}), `Didn't cancel the trade and return the expected trade object.`);

			assert(mockCB.calledOnce, `the callback wasn't called 1 time only as expected`);

			assert.deepEqual(store.getActions(), [], `Dispatched actions that shouldn't have dispatched.`);
		});

		it('should not call trade when given a negative numShares input', () => {
			helper.trade('testBinaryMarketID', '2', '-10', '0', 'taker1', () => ['orderID1', 'orderID2', 'orderID3', 'orderID4', 'orderID5', 'orderID6'], store.dispatch, mockCBStatus, mockCB);

			assert(mockCB.calledWithExactly(null, {
			  remainingEth: abi.bignum("0"),
			  remainingShares: abi.bignum("-10"),
			  filledShares: abi.bignum("0"),
			  filledEth: abi.bignum("0"),
			  tradingFees: abi.bignum("0"),
			  gasFees: abi.bignum("0")
			}), `Didn't cancel the trade and return the expected trade object.`);

			assert(mockCB.calledOnce, `the callback wasn't called 1 time only as expected`);

			assert.deepEqual(store.getActions(), [], `Dispatched actions that shouldn't have dispatched.`);
		});

		it('should not call trade when given 0 as an input for both shares and remainingEth', () => {
			helper.trade('testBinaryMarketID', '2', '0', '0', 'taker1', () => ['orderID1', 'orderID2', 'orderID3', 'orderID4', 'orderID5', 'orderID6'], store.dispatch, mockCBStatus, mockCB);

			assert(mockCB.calledWithExactly(null, {
			  remainingEth: abi.bignum("0"),
			  remainingShares: abi.bignum("0"),
			  filledShares: abi.bignum("0"),
			  filledEth: abi.bignum("0"),
			  tradingFees: abi.bignum("0"),
			  gasFees: abi.bignum("0")
			}), `Didn't cancel the trade and return the expected trade object.`);

			assert(mockCB.calledOnce, `the callback wasn't called 1 time only as expected`);

			assert.deepEqual(store.getActions(), [], `Dispatched actions that shouldn't have dispatched.`);
		});

		it('Should handle a failed commit', () => {
			helper.trade('testBinaryMarketID', '2', '0', '20.01', '0xtaker1', () => ['orderID1', 'orderID2', 'orderID3'], store.dispatch, mockCBStatus, mockCB);

			assert(mockCB.calledWithExactly({ error: 'commit failed error', message: 'commit failed error message' }), `Didn't return the expected error object for a failed commit`);
			assert(mockCBStatus.calledWithExactly({ status: 'submitting' }), `Didn't call cbStatus with a submitting status`);
			assert(mockCBStatus.calledWithExactly({ status: 'committing' }), `Didn't call cbStatus with a committing status`);
			assert(mockCB.calledOnce, `the callback wasn't called 1 time only as expected`);
			assert(mockCBStatus.calledTwice, `the Status callback wasn't called 2 times as expected`);

			assert.deepEqual(store.getActions(), [], `Dispatched actions that shouldn't have dispatched.`);
		});

		it('Should handle a failed trade', () => {
			helper.trade('testBinaryMarketID', '2', '0', '20.01', '0xtaker1', () => ['orderID1', 'orderID2', 'orderID3'], store.dispatch, mockCBStatus, mockCB);

			assert(mockCBStatus.calledWithExactly({ status: 'submitting' }), `Didn't call cbStatus with a submitting status`);
			assert(mockCBStatus.calledWithExactly({ status: 'committing' }), `Didn't call cbStatus with a committing status`);
			assert(mockCBStatus.calledWith({
				status: 'sending',
				hash: 'testhash',
				timestamp: 1500000000,
				gasFees: abi.bignum('0.01450404')
			}), `Didn't send the right details`);
			assert(mockCBStatus.callCount === 4, `Didn't call the status callback 4 times as expected`);

			assert(mockCB.calledWithExactly({ error: 'trade failed error', message: 'trade failed error message' }), `Didn't return the expected error object for a failed trade`);
			assert(mockCB.calledOnce, `the callback wasn't called 1 time only as expected`);

			assert.deepEqual(store.getActions(), [], `Dispatched actions that shouldn't have dispatched.`);
		});


	});

	describe.skip('Sell Trade Tests', () => {
		it('should help with a sell trade', () => {
			// marketID, outcomeID, numShares, totalEthWithFee, takerAddress, getTradeIDs, dispatch, cbStatus, cb
			helper.trade('testBinaryMarketID', '2', '10', '0', '0xtaker1', () => ['orderID1', 'orderID2', 'orderID3'], store.dispatch, mockCBStatus, mockCB);

			assert(mockCBStatus.calledWithExactly({ status: 'submitting' }), `Didn't call cbStatus with a submitting status`);
			assert(mockCBStatus.calledWithExactly({ status: 'committing' }), `Didn't call cbStatus with a committing status`);
			assert(mockCBStatus.calledWith({
				status: 'sending',
				hash: 'testhash',
				timestamp: 1500000000,
				gasFees: abi.bignum('0.01450404')
			}), `Didn't send the right details`);
			assert(mockCBStatus.calledWithExactly({ status: 'filling' }), `Didn't called cbStatus with a filling status`);
			assert(mockCBStatus.calledWith({
				status: 'filled',
				hash: 'testhash',
				timestamp: 1500000000,
				tradingFees: abi.bignum('0.01'),
				gasFees: abi.bignum('0.02900808'),
				filledShares: abi.bignum('10'),
				filledEth: abi.bignum('0'),
				remainingShares: abi.bignum('0'),
				remainingEth: abi.bignum('0')
			}), `Didn't call cbStatus with a filled status`);

			assert.deepEqual(mockCBStatus.callCount, 5, `Didn't call status callback 5 times as expected`);
			assert.deepEqual(mockCB.callCount, 3, `Didn't call the callback 3 times as expected`);
			assert.deepEqual(store.getActions(), [ { type: 'LOAD_BIDS_ASKS' }], `Didn't dispatch a load_bids_asks action as expected`);
		});
	});
});
