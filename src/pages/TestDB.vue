<template>
  <q-page>
    <p>Hello, Test.</p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

import PouchDB from 'pouchdb'

export default Vue.extend({
  name: 'DB',
  mounted: function() {
    const db = new PouchDB('kittens')
    db.info().then(function(info) {
      console.log(info)
    })
  }
})
</script>
