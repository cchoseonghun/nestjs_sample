import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';
import multerS3 from 'multer-s3';
import { extname } from 'path';

export const multerOptionsFactory = (
  configService: ConfigService
): MulterOptions => {
  const s3 = new S3Client({
    region: configService.get('AWS_BUCKET_REGION'),
    credentials: {
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    }
  })

  return {
    storage: multerS3({
      s3,
      bucket: configService.get('AWS_BUCKET_NAME'),
      key(_req, file, done) {
        const imagePath = Date.now() + extname(file.originalname);
        done(null, imagePath);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  }

  // return {
  //   storage: memoryStorage(),
  //   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 크기를 제한
  // };
};

