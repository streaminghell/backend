import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { ApiProvider, EntityType, Platform } from '../../core/enums';

@ObjectType()
export class Entity {
  @Field(() => ID, {
    description:
      'This is the unique identifier on the streaming platform/API provider',
    nullable: false,
  })
  readonly id: string;

  @Field(() => EntityType, {
    description: '',
    nullable: false,
  })
  readonly type: EntityType;

  @Field(() => String, {
    description: '',
    nullable: true,
  })
  readonly title?: string;

  @Field({
    description: '',
    nullable: true,
  })
  readonly artistName?: string;

  @Field({
    description: '',
    nullable: true,
  })
  readonly thumbnailUrl?: string;

  @Field(() => Int, {
    description: '',
    nullable: true,
  })
  readonly thumbnailWidth?: number;

  @Field(() => Int, {
    description: '',
    nullable: true,
  })
  readonly thumbnailHeight?: number;

  @Field(() => ApiProvider, {
    description:
      "The API provider that powered this match. Useful if you'd like to use this entity's data to query the API directly",
    nullable: false,
  })
  readonly apiProvider: ApiProvider;

  @Field(() => [Platform], {
    description:
      'An array of platforms that are "powered" by this entity. E.g. an entity from Apple Music will generally have a `platforms` array of `["appleMusic", "itunes"]` since both those platforms/links are derived from this single entity',
    nullable: false,
  })
  readonly platforms: Platform[];
}
