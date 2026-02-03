import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function uploadToS3(
  file: Buffer,
  fileName: string,
  mimeType: string,
  folder: string = 'blogs'
): Promise<string> {
  const timestamp = Date.now();
  const uniqueFileName = `${folder}/${timestamp}-${fileName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
    Key: uniqueFileName,
    Body: file,
    ContentType: mimeType,
    ACL: 'public-read' as const,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    return `https://${bucketName}.s3.${region}.amazonaws.com/${uniqueFileName}`;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload image to S3');
  }
}

export async function deleteFromS3(imageUrl: string): Promise<void> {
  try {
    // Extract key from S3 URL
    const key = imageUrl.split('/').slice(-2).join('/');

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error('S3 Delete Error:', error);
    throw new Error('Failed to delete image from S3');
  }
}
