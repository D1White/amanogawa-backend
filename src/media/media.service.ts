import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { transcodeSubtitle, transcodeVideo } from 'utils/ffmpeg';

@Injectable()
export class MediaService {
  async upload(file: Express.Multer.File) {
    // transcodeSubtitle(file, 3);
    // transcodeVideo(file, 640, 360);
    return '';
  }
}
