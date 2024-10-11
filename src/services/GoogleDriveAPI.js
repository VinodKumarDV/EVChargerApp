import RNFetchBlob from 'rn-fetch-blob';

export const uploadToGoogleDrive = async (fileUri, folderId, accessToken) => {
  try {
    // Prepare metadata for the file
    const metadata = {
      name: 'screenshot.webp',
      mimeType: 'image/webp',
      parents: [folderId],
    };

    // Upload the screenshot to Google Drive
    const uploadResponse = await RNFetchBlob.fetch('POST', 
      `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`, 
      {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/related',
      }, 
      [
        // Metadata
        { name: 'metadata', data: JSON.stringify(metadata) },
        // File data
        { name: 'file', filename: 'screenshot.webp', data: RNFetchBlob.wrap(fileUri) },
      ]
    );

    console.log('Google Drive Upload Response:', uploadResponse.data);
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
  }
};
