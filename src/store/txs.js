export default {
	// namespaced: true,
	state: {
		stack: []
	},
	getters: {
		txsStack: state => state.stack,
		txByHash: state => hash => state.stack.filter(tx => tx.txhash === hash),
		txByEncodedHash: state => hash =>
			state.stack.filter(tx => tx.txEncoded && tx.txEncoded === hash)
	},
	mutations: {
		addTxEntry(state, { tx }) {
			/**
       *
       // 1. No txs in stack yet
       *
       */
			if (state.stack.length === 0) {
				state.stack.push(tx)
				return
			}

			/**
       *
       // 2. Txs already exist in the stack
       *
       */
			for (let txIndex = 0; txIndex < state.stack.length; txIndex++) {
				const currentTxVal = state.stack[txIndex]
				const nextTxVal = state.stack[txIndex + 1]

				// Push tx to the end of the stack
				if (!nextTxVal) {
					state.stack.push(tx)
					break
				}

				const txHeight = parseInt(tx.height)
				const currentTxValHeight = parseInt(currentTxVal.height)
				const nextTxValHeight = parseInt(nextTxVal.height)
				// Add tx to the start of the stack
				if (txHeight > currentTxValHeight && txIndex === 0) {
					state.stack.unshift(tx)
					break
				}
				// Insert tx to the stack
				if (currentTxValHeight > txHeight && txHeight > nextTxValHeight) {
					state.stack.splice(txIndex + 1, 0, tx)
					break
				}
			}
		}
	},
	actions: {
		/**
		 * Add tx into txsStack
		 *
		 * @param {object} store
		 * @param {object} payload
		 * @param {object} payload.txData
		 *
		 *
		 */
		addTxEntry: {
			root: true,
			handler({ commit, getters }, txData) {
				/*
         *
         // If tx is null, it's not decoded successfully,
         // and triggered from `addErrorTx` in `blocks` store mutations.
         *
         */
				const fmtTxData =
					txData.tx === null
						? {
								height: txData.height,
								txEncoded: txData.txEncoded
						  }
						: txData.tx.data

				const isTxInStack =
					txData.tx === null
						? getters.txByEncodedHash(txData.txEncoded).length > 0
						: getters.txByHash(txData.tx.data.txhash).length > 0

				if (!isTxInStack) commit('addTxEntry', { tx: fmtTxData })
			}
		}
	}
}
