import { App as Application } from 'vue'

import { registerComponent } from './../../utils/plugins/index'
// @ts-ignore
import C from './SpAccountList.vue'

export const Plugin = {
	install(vue: Application): void {
		registerComponent(vue, C)
	}
}

// use(Plugin);

export default C
