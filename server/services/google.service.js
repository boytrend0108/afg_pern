import { google } from 'googleapis';
import 'dotenv/config';

const authorize = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_DRIVE,
  });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  return drive;
};

const uploadFile = async (fileName, image, googleFolder) => {
  const drive = authorize();

  const fileMetaData = {
    name: fileName,
    parents: [googleFolder],
  };

  const response = await drive.files.create({
    resource: fileMetaData,
    media: {
      mimeType: 'image/webp',
      body: image,
    },
  });

  return response.data;
};

const deleteFile = async (fileId, googleFolder) => {
  const drive = authorize();

  const fileMetaData = {
    parents: [googleFolder],
  };

  const response = await drive.files.delete({
    resource: fileMetaData,
    fileId,
  });

  return response.data;
};

export const googleService = {
  uploadFile,
  deleteFile,
};
