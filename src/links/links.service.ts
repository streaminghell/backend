import { Injectable } from '@nestjs/common';
import { OdesliService } from '../providers/odesli/odesli.service';
import { ShazamService } from '../providers/shazam/shazam.service';
import { VkService } from '../providers/vk/vk.service';
import { Link, LinksByUrl } from './models';
import { PLATFORMS } from '../providers/odesli/odesli.constants';
import { ApiProvider, Platform } from '../core/enums';

@Injectable()
export class LinksService {
  constructor(
    private readonly odesliService: OdesliService,
    private readonly shazamService: ShazamService,
    private readonly vkService: VkService,
  ) {}

  private async prepareUrl(url: string): Promise<string> {
    if (this.shazamService.isShazamLink(url)) {
      const shazamLinks = await this.shazamService.findLinks(url);
      if (shazamLinks.appleMusicLink || shazamLinks.spotifyLink) {
        return shazamLinks.appleMusicLink || shazamLinks.spotifyLink;
      }
    }
    return url;
  }

  async getLinksByUrl(
    rawUrl: string,
    userCountry: string,
  ): Promise<LinksByUrl> {
    const url = await this.prepareUrl(rawUrl);

    const odesli = await this.odesliService
      .links({ url, userCountry })
      .toPromise();

    /** Links from Odesli */
    const odesliLinks: Link[] = [];
    PLATFORMS.forEach(platform => {
      const platformLinks = odesli.linksByPlatform[platform];
      const PlatformEnumKey = Object.keys(Platform).find(
        key => Platform[key] === platform,
      );
      if (platformLinks) {
        odesliLinks.push({
          platform: Platform[PlatformEnumKey],
          ...platformLinks,
          entity: odesli.entitiesByUniqueId[platformLinks.entityUniqueId],
        });
      }
    });

    /** Link from VK */
    const vkLink = (): Link => {
      return {
        platform: Platform.VK,
        url: this.vkService.getSearchLink(url),
        entity: {
          id: '',
          title: odesliLinks[0].entity.title,
          artistName: odesliLinks[0].entity.artistName,
          type: odesliLinks[0].entity.type,
          apiProvider: ApiProvider.VK,
          platforms: [Platform.VK, Platform.BOOM],
        },
      };
    };

    return {
      pageUrl: `https://streaming-hell.com/?url=${encodeURI(url)}`,
      userCountry,
      // @ts-ignore
      entity: odesli.entitiesByUniqueId[odesli.entityUniqueId],
      links: [...odesliLinks, vkLink()],
    };
  }
}
