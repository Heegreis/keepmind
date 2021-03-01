import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { MindMapStateInterface } from './state'

const actions: ActionTree<MindMapStateInterface, StoreInterface> = {
  someAction(/* context */) {
    // your code
  }
}

export default actions
