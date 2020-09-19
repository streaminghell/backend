import { Module } from '@nestjs/common';
import { OdesliModule } from '../providers/odesli/odesli.module';
import { ShazamModule } from '../providers/shazam/shazam.module';
import { VkModule } from '../providers/vk/vk.module';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { LinksResolver } from './links.resolver';

@Module({
  imports: [OdesliModule, ShazamModule, VkModule],
  controllers: [LinksController],
  providers: [LinksService, LinksResolver],
})
export class LinksModule {}
