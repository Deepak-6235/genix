import { S3Client, PutObjectCommand, DeleteObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_S3_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Validate AWS credentials (only when not in Next.js API routes)
if (!accessKeyId || !secretAccessKey || !bucketName || !region) {
  console.error('❌ Missing AWS credentials:');
  console.error('   AWS_ACCESS_KEY_ID:', accessKeyId ? '✓' : '✗');
  console.error('   AWS_SECRET_ACCESS_KEY:', secretAccessKey ? '✓' : '✗');
  console.error('   AWS_S3_BUCKET_NAME:', bucketName ? '✓' : '✗');
  console.error('   AWS_REGION:', region ? '✓' : '✗');
}

const s3Client = new S3Client({
  region: region || 'us-east-1',
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
  // Removed custom endpoint - AWS SDK will automatically use the correct regional endpoint
});

export async function uploadToS3(
  file: Buffer,
  fileName: string,
  mimeType: string,
  folder: string = 'blogs',
  maxRetries: number = 3
): Promise<string> {
  const timestamp = Date.now();
  const uniqueFileName = `${folder}/${timestamp}-${fileName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
    Key: uniqueFileName,
    Body: file,
    ContentType: mimeType,
    ACL: ObjectCannedACL.public_read, // Make file publicly accessible
  };

  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`   📤 Upload attempt ${attempt}/${maxRetries} for ${fileName} (${(file.length / 1024 / 1024).toFixed(2)} MB)`);

      await s3Client.send(new PutObjectCommand(params));

      const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${uniqueFileName}`;
      console.log(`   ✅ Successfully uploaded: ${imageUrl}`);

      return imageUrl;
    } catch (error: any) {
      lastError = error;
      console.error(`   ❌ Upload attempt ${attempt} failed:`, error.message);

      if (attempt < maxRetries) {
        const waitTime = attempt * 2000; // Exponential backoff: 2s, 4s, 6s
        console.log(`   ⏳ Waiting ${waitTime / 1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  // All retries failed
  console.error('   ❌ All upload attempts failed. Last error:', lastError);
  throw new Error(`Failed to upload ${fileName} to S3 after ${maxRetries} attempts: ${lastError.message}`);
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
