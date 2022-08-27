const upload = new Upload({
  // Get production API keys from Upload.io
  apiKey: "public_FW25au47S9ruZD1ciduXmCQcMLHc",
});

async function onFileSelected(event) {
  const [file] = event.target.files;
  const { fileUrl } = await upload.uploadFile({
    file,
    onBegin: ({ cancel }) => console.log("File upload started!"),
    onProgress: ({ progress }) => console.log(`File uploading... ${progress}%`),
  });
  console.log(`File uploaded! ${fileUrl}`);
  img_url = fileUrl;
}
