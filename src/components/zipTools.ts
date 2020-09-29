import JSZip from 'jszip'
import saveAs from 'file-saver'
import fs from 'fs'
import path from 'path'

export function writeDownload() {
  const zip = new JSZip()
  zip.file('Hello.txt', 'Hello World\n')
  zip.generateAsync({ type: 'blob' }).then(function(content) {
    // see FileSaver.js
    saveAs(content, 'example.zip')
  })
}

export function read() {
  /// read a zip file
  fs.readFile(path.join(__statics, '/someFile.txt'), function(err, data) {
    if (err) throw err
    JSZip.loadAsync(data).then(function(zip) {
      // ...
      //   console.log(zip.files)
    })
  })
}
