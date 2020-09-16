import JSZip from 'jszip'
import saveAs from 'file-saver'
import fs from 'fs'

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
  fs.readFile('Pay.zip', function(err, data) {
    if (err) throw err
    JSZip.loadAsync(data).then(function(zip) {
      // ...
      //   console.log(zip.files)
    })
  })
}
