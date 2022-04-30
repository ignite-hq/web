// Generated by Ignite ignite.com/cli
import { unref } from 'vue'
import Module from "cosmos-gaia-ts-client/cosmos.tx.v1beta1/module";
import useGaia from '../use'
		

type ServiceSimulateType = typeof Module.prototype.serviceSimulate
type ServiceGetTxType = typeof Module.prototype.serviceGetTx
type ServiceBroadcastTxType = typeof Module.prototype.serviceBroadcastTx
type ServiceGetTxsEventType = typeof Module.prototype.serviceGetTxsEvent
type ServiceGetBlockWithTxsType = typeof Module.prototype.serviceGetBlockWithTxs


type Response = {
  
  serviceSimulate: ServiceSimulateType
  serviceGetTx: ServiceGetTxType
  serviceBroadcastTx: ServiceBroadcastTxType
  serviceGetTxsEvent: ServiceGetTxsEventType
  serviceGetBlockWithTxs: ServiceGetBlockWithTxsType
  
}

function useModule(): Response {
  let { gaia } = useGaia()

  let {
	
  
  serviceSimulate,
  
  serviceGetTx,
  
  serviceBroadcastTx,
  
  serviceGetTxsEvent,
  
  serviceGetBlockWithTxs,
  
  } = unref(gaia.cosmosTxV1Beta1)

  
  
  
  
  serviceSimulate = serviceSimulate.bind(gaia.cosmosTxV1Beta1)
  
  serviceGetTx = serviceGetTx.bind(gaia.cosmosTxV1Beta1)
  
  serviceBroadcastTx = serviceBroadcastTx.bind(gaia.cosmosTxV1Beta1)
  
  serviceGetTxsEvent = serviceGetTxsEvent.bind(gaia.cosmosTxV1Beta1)
  
  serviceGetBlockWithTxs = serviceGetBlockWithTxs.bind(gaia.cosmosTxV1Beta1)
  

  return {
  
  
  serviceSimulate,
  
  serviceGetTx,
  
  serviceBroadcastTx,
  
  serviceGetTxsEvent,
  
  serviceGetBlockWithTxs,
  
  }
}

export { useModule }
