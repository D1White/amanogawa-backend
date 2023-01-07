import * as ffmpeg from 'fluent-ffmpeg';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe');

export const transcodeSubtitle = (file: Express.Multer.File, streamId: number) => {
  const stream = Readable.from(file.buffer);

  ffmpeg()
    .input(stream)
    .outputOptions([`-map 0:${streamId}`, '-c:s webvtt'])
    .output('./inscriptions.vtt')
    .on('start', (commandLine) => {
      console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('error', (err, stdout, stderr) => {
      console.log('An error occurred: ' + err.message, err, stderr);
    })
    .on('progress', (progress) => {
      console.log('Processing: ' + progress.percent + '% done', progress);
    })
    .on('end', () => {
      console.log('Finished processing!');
    })
    .run();
};

export const transcodeVideo = (file: Express.Multer.File, width: number, height: number) => {
  const stream = Readable.from(file.buffer);

  const newStream = createWriteStream('output.m3u8');

  ffmpeg()
    .input(stream)
    .outputOptions([
      '-c copy',
      '-map 0:0',
      '-map 0:1',

      '-vcodec libx264',
      '-pix_fmt yuv420p',
      '-vsync 1',
      '-async 1',
      '-color_primaries 1',
      '-color_trc 1',
      '-colorspace 1',

      `-vf scale=${width}:${height}`,

      '-crf 20',
      '-preset medium',
      '-profile:v high',
      '-level 3.1',
      '-maxrate 800k',
      '-bufsize 1200k',

      '-acodec aac',
      '-ac 2',
      '-ab 128k',

      '-hls_time 10',
      '-hls_playlist_type vod',
      '-f hls',
    ])
    .output(newStream)
    .on('start', (commandLine) => {
      console.log('Spawned Ffmpeg with command: ' + commandLine);
    })
    .on('error', (err, stdout, stderr) => {
      console.log('An error occurred: ' + err.message, err, stderr);
    })
    .on('progress', (progress) => {
      console.log(progress);

      console.log('Processing: frames ' + progress.frames + '; timemark: ' + progress.timemark);
    })
    .on('end', () => {
      console.log('Finished processing!');
    })
    .run();
};
