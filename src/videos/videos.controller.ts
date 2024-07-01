import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseFilePipe,UseInterceptors,Res,  } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoFileValidator } from './video-file-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';


@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createVideoDto: CreateVideoDto,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new VideoFileValidator({
          maxSize: 1024 * 1024 * 100,
          mimetype: 'video/mp4',
        }),
      ],
      errorHttpStatusCode: 422,
    }),
  )
  file: Express.Multer.File,
) {
    // console.log(file)
    return this.videosService.create({
      ...createVideoDto,
      file,
    });    
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }

  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Response) {
    const fileStream = createReadStream(join(process.cwd(), 'upload', file));
    fileStream.pipe(res);
  }
}
