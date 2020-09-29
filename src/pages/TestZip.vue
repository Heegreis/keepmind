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
  name: 'zip',
  mounted: function() {
    const zip = new JSZip()
    zip.file('Hello.txt', 'Hello World\n')
    zip.generateAsync({ type: 'blob' }).then(function(content) {
      // see FileSaver.js
      saveAs(content, 'example.zip')
    })
  }
})
</script>
