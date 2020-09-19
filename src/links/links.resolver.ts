import { Resolver, Query, Args } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { LinksByUrl } from './models';

@Resolver()
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Query(() => LinksByUrl, {
    name: 'linksByUrl',
    description: 'Fetch the matching links for a given streaming entity.',
  })
  async getLinksByUrl(
    @Args({
      name: 'url',
      description: 'The URL of a valid song or album from any of our supported platforms.',
      nullable: false,
      type: () => String,
    })
    url: string,

    @Args({
      name: 'userCountry',
      description:
        'Specifies the country/location we use when searching streaming catalogs.',
      nullable: true,
      defaultValue: 'US',
      type: () => String,
    })
    userCountry: string,
  ): Promise<LinksByUrl> {
    return this.linksService.getLinksByUrl(url, userCountry);
  }
}
