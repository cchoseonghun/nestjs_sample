import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptionsFactory = (): MulterOptions => {
  return {
    storage: diskStorage({
      filename(req, file, cb) {
        const imageExt = extname(file.originalname);
        cb(null, `${Date.now()}${imageExt}`);
      },
    }),
  };
};
