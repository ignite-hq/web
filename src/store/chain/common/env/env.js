import ApiWS from '../../../../apis/api-ws'
import Api from '../../../../apis/api'

export default {
	namespaced: true,
	state() {
		return {
			chainId: null,
			addrPrefix: '',
			sdkVersion: 'Stargate',
			apiCosmos: null,
			apiTendermint: null,
			apiWS: null,
			clients: {
				api: { apiConnected: false, rpcConnected: false },
				ws: { connected: false }
			},
			wallet: null,
			getTXApi: '',
			account: '',
			initialized: false,
			authorized: false
		}
	},
	getters: {
		apiClient: state => state.clients.api,
		wsClient: state => state.clients.ws,
		apiTendermint: state => state.apiTendermint
	},
	mutations: {
		SET_CONFIG(state, config) {
			state.apiCosmos = config.apiNode
			state.apiTendermint = config.rpcNode
			if (config.wsNode) {
				state.apiWS = config.wsNode
			}
		},
		CONNECT(state, clients) {
			state.clients.api = clients.apiClient
			state.clients.ws = clients.wsClient
		},
		INITIALIZE_WS_COMPLETE(state) {
			state.initialized = true
		}
	},
	actions: {
		async init(
			{ dispatch },
			config = {
				apiNode: 'http://localhost:1317',
				rpcNode: 'http://localhost:26657',
				wsNode: 'ws://localhost:26657/websocket',
				chainId: '',
				addrPrefix: '',
				sdkVersion: 'Stargate',
				getTXApi: 'http://localhost:26657/tx?hash=0x'
			}
		) {
			if (this._actions['chain/common/starport/init']) {
				await dispatch('chain/common/starport/init', null, { root: true })
			} else {
				await dispatch('config', config)
			}
		},
		async config(
			{ commit, rootGetters, state, dispatch },
			config = {
				apiNode: 'http://localhost:1317',
				rpcNode: 'http://localhost:26657',
				wsNode: 'ws://localhost:26657/websocket',
				chainId: '',
				addrPrefix: '',
				sdkVersion: 'Stargate',
				getTXApi: 'http://localhost:26657/tx?hash=0x'
			}
		) {
			let reconnectWS = false
			let reconnectSigningClient = false
			let reconnectClient = false

			if (config.wsNode != state.wsNode) {
				reconnectWS = true
			}
			if (config.rpcNode != state.rpcNode) {
				reconnectSigningClient = true
			}
			if (config.apiNode != state.apiNode) {
				reconnectClient = true
			}
			commit('SET_CONFIG', config)
			if (this._actions['chain/common/starport/init']) {
				if (rootGetters['chain/common/starport/wasAppRestarted']) {
					reconnectWS = true
					reconnectSigningClient = true
				}
			}
			const clients = {
				wsClient: state.clients.ws,
				apiClient: state.clients.api
			}
			if (reconnectWS && config.wsNode) {
				clients.wsClient = new ApiWS(config.wsNode)
				try {
					await clients.wsClient.connect()
				} catch (e) {
					console.log('WS Connection failed')
				}
			}
			if (reconnectSigningClient && config.rpcNode) {
				dispatch('chain/common/wallet/switchAPI', null, { root: true })
			}
			if (
				(reconnectClient && config.apiNode && config.rpcNode) ||
				(reconnectSigningClient && config.apiNode && config.rpcNode)
			) {
				clients.apiClient = new Api(config.apiNode, config.rpcNode)
			}
			commit('CONNECT', clients)
			if (reconnectWS) {
				commit('INITIALIZE_WS_COMPLETE')
			}
		}
	}
}
