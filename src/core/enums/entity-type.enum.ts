import { registerEnumType } from '@nestjs/graphql';

export enum EntityType {
  SONG = 'song',
  ALBUM = 'album',
}

registerEnumType(EntityType, {
  name: 'EntityType',
});
