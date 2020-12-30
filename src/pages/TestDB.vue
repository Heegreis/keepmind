<template>
  <q-page>
    <p>Hello, Test.</p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

import {
  destroyDB,
  getDB,
  read,
  showAll,
  addTestNodeInfo,
  getRootsID
} from 'components/punchdbTools'

export default Vue.extend({
  name: 'DB',
  mounted: function() {
    // destroyDB()
    const db = getDB()
    // addTestNodeInfo(db)
    showAll(db)
  }
})
</script>
