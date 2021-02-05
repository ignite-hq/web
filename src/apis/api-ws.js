import ReconnectingWebSocket from 'reconnecting-websocket'
import EventEmitter from 'events'

export default class ApiWS extends EventEmitter {
	connected = false
	constructor(url) {
		super()
		this._connectedPromise = new Promise((res, rej) => {
			this._connectRes = res
			this._connectRej = rej
		})
		try {
			this._socket = new ReconnectingWebSocket(url)
		} catch (e) {
			this._connectRej()
			console.log('WS node unavailable')
		}
		this._socket.onopen = this.onOpen.bind(this)
		this._socket.onmessage = this.onMessage.bind(this)
		this._socket.onerror = this.onError.bind(this)
		this._socket.onclose = this.onClose.bind(this)
		this.subscriptions = new Map()
		this.connected = false
	}
	connect() {
		return this._connectedPromise
	}
	onError() {
		this._connectRej()
	}
	onClose() {
		this.connected = false
	}
	onOpen() {
		this._connectRes()
		this.connected = true
		this._socket.send(
			JSON.stringify({
				jsonrpc: '2.0',
				method: 'subscribe',
				id: '1',
				params: ["tm.event = 'NewBlock'"]
			})
		)
	}
	async onMessage(msg) {
		this.emit('newblock', JSON.parse(msg.data).result)
	}
}
