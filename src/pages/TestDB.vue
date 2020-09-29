<template>
  <q-page>
    <p>Hello, Test.</p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

import { getDB, read } from 'components/punchdbTools'

export default Vue.extend({
  name: 'DB',
  mounted: function() {
    const db = getDB()
    read(db)
  }
})
</script>
