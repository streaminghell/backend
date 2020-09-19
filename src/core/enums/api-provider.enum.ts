import { registerEnumType } from '@nestjs/graphql';

export enum ApiProvider {
  SPOTIFY = 'spotify',
  ITUNES = 'itunes',
  YOUTUBE = 'youtube',
  GOOGLE = 'google',
  PANDORA = 'pandora',
  DEEZER = 'deezer',
  TIDAL = 'tidal',
  AMAZON = 'amazon',
  SOUNDCLOUD = 'soundcloud',
  NAPSTER = 'napster',
  YANDEX = 'yandex',
  SPINRILLA = 'spinrilla',
  VK = 'vk',
}

registerEnumType(ApiProvider, {
  name: 'ApiProvider',
});
