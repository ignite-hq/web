import { App as Application } from 'vue'
// @ts-ignore
import C from './SpAcc.vue'

import { registerComponent } from './../../utils/plugins/index'

export const Plugin = {
  install(vue: Application): void {
    registerComponent(vue, C)
  },
}

export default C
