import { Field, ObjectType } from '@nestjs/graphql';
import { Link } from './link.model';
import { Entity } from '../../entities/model';

@ObjectType()
export class LinksByUrl {
  @Field(() => String, {
    description:
      'Specifies the country/location we use when searching streaming catalogs',
    nullable: false,
  })
  readonly userCountry: string;

  @Field(() => String, {
    description:
      'A URL that will render the Streaming Hell page for this entity',
    nullable: false,
  })
  readonly pageUrl: string;

  @Field(() => Entity, {
    description: '',
    nullable: false,
  })
  readonly entity: Entity;

  @Field(() => [Link], {
    description: '',
    nullable: false,
  })
  readonly links: Link[];
}
