// Generated by Ignite ignite.com/cli
import { unref } from 'vue'
import Module from "cosmos-gaia-ts-client/cosmos.mint.v1beta1/module";
import useGaia from '../use'
		

type QueryParamsType = typeof Module.prototype.queryParams
type QueryInflationType = typeof Module.prototype.queryInflation
type QueryAnnualProvisionsType = typeof Module.prototype.queryAnnualProvisions


type Response = {
  
  queryParams: QueryParamsType
  queryInflation: QueryInflationType
  queryAnnualProvisions: QueryAnnualProvisionsType
  
}

function useModule(): Response {
  let { gaia } = useGaia()

  let {
	
  
  queryParams,
  
  queryInflation,
  
  queryAnnualProvisions,
  
  } = unref(gaia.cosmosMintV1Beta1)

  
  
  
  
  queryParams = queryParams.bind(gaia.cosmosMintV1Beta1)
  
  queryInflation = queryInflation.bind(gaia.cosmosMintV1Beta1)
  
  queryAnnualProvisions = queryAnnualProvisions.bind(gaia.cosmosMintV1Beta1)
  

  return {
  
  
  queryParams,
  
  queryInflation,
  
  queryAnnualProvisions,
  
  }
}

export { useModule }
