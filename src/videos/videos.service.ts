import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prismaService: PrismaService) {}

  async create(createVideoDto: CreateVideoDto) {
    const categoryExists =
      (await this.prismaService.category.count({
        where: {
          id: createVideoDto.category_id,
        },
      })) != 0;

    if (!categoryExists) {
      throw new Error('Category Not Found');
    }

    return this.prismaService.video.create({
      data: {
        title: createVideoDto.title,
        description: createVideoDto.description,
        category_id: createVideoDto.category_id,
        file_path: 'fake/video.mp4',
      },
    });
  }

  findAll() {
    return `This action returns all videos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
