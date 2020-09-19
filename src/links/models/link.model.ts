import { Field, ObjectType } from '@nestjs/graphql';
import { Platform } from '../../core/enums';
import { Entity } from '../../entities/model';

@ObjectType()
export class Link {
  @Field(() => Platform, {
    description: 'Platform that are "powered" by this entity.',
    nullable: false,
  })
  readonly platform: Platform;

  @Field(() => String, {
    description: 'The URL for this match',
    nullable: false,
  })
  readonly url: string;

  @Field(() => String, {
    description:
      'The native app URI that can be used on mobile devices to open this entity directly in the native app',
    nullable: true,
  })
  readonly nativeAppUriMobile?: string;

  @Field(() => String, {
    description:
      'The native app URI that can be used on desktop devices to open this entity directly in the native app',
    nullable: true,
  })
  readonly nativeAppUriDesktop?: string;

  @Field(() => Entity, {
    description: '',
    nullable: false,
  })
  readonly entity: Entity;
}
