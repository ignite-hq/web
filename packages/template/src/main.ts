import { createIgnite } from '@ignt/client'
import { useIgnite } from '@ignt/vue'
import sp from '@starport/vue'
import { Buffer } from 'buffer'
import { createApp } from 'vue'

// @ts-ignore
import App from './App.vue'
import $r from './router'

// @ts-ignore
globalThis['Buffer'] = Buffer

// ignite
let { inject } = useIgnite()

let ignite = createIgnite({
  env: {
    apiURL: 'https://api.testnet.cosmos.network:443',
    rpcURL: 'https://rpc.testnet.cosmos.network:443',
    wsURL: 'wss://rpc.testnet.cosmos.network:443/websocket',
    prefix: 'cosmos'
  }
})

inject(ignite)

ignite.ws.ee().on('ws-chain-id', (chainId: string) => {
  ignite.env.chainID = chainId
})
ignite.ws.ee().on('ws-chain-name', (chainName: string) => {
  ignite.env.chainName = chainName
})
ignite.ws.ee().on('ws-api-status', (connected: boolean) => {
  ignite.env.status.apiConnected = connected
})
ignite.ws.ee().on('ws-rpc-status', (connected: boolean) => {
  ignite.env.status.rpcConnected = connected
})
ignite.ws.ee().on('ws-open', () => {
  ignite.env.status.wsConnected = true
})
ignite.ws.ee().on('ws-close', () => {
  ignite.env.status.wsConnected = false
})

ignite.ws.connect()

createApp(App).use($r).use(sp).mount('#app')
