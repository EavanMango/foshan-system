export class FileUtil {
  static fileBlob(blobData, fileName, type = 'application/octet-stream') {
    const blob = new Blob([blobData], {type})
    let link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = fileName;
    link.dispatchEvent(new MouseEvent("click"));
    URL.revokeObjectURL(URL.createObjectURL(blob))
    link = null
  }
}

