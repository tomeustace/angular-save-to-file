let fileHandle;
let writer;

export async function getNewFileHandle() {
  const options = {
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt']
        }
      }
    ]
  };
  fileHandle = await (window as any).showSaveFilePicker(options);
  return fileHandle;
}

/**
 * Writes the contents to disk.
 *
 * @param {FileSystemFileHandle} fileHandle File handle to write to.
 * @param {string} contents Contents to write.
 */
export async function writeFile(contents) {
  if (!fileHandle) {
    await getNewFileHandle();
  }
  // Create a FileSystemWritableFileStream to write to.
  if (!writer && fileHandle) {
    writer = await fileHandle.createWritable();
  }
  // Write the contents of the file to the stream.
  if (writer) {
    await writer.write(contents);
  }
}

export async function closeWriter() {
  if (writer) {
    await writer.close();
  }
}
