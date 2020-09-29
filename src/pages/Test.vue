<template>
  <q-page>
    <p>Hello, Test.</p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { writeDownload, read } from 'components/zipTools'

import JSZip from 'jszip'
import saveAs from 'file-saver'
import fs from 'fs'
import path from 'path'

export default Vue.extend({
  name: 'Map',
  mounted: function() {
    fs.readFile(path.join(__statics, '/someFile.txt'), function(err, data) {
    if (err) throw err
    JSZip.loadAsync(data).then(function(zip) {
      // ...
      //   console.log(zip.files)
    })
  }
})
</script>
