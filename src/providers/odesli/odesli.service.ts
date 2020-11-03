import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Validator, Validate } from 'typescript-param-validator';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LinksParams } from './params/links.params';
import { Links } from './interfaces/links.interface';

@Injectable()
export class OdesliService {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Validate odesli.co API request parameters
   * @see https://github.com/songlink/docs/blob/master/api-v1-alpha.1.md#query-params
   */
  private validateRequestParams(params: LinksParams) {
    const { url, platform, type, id } = params;
    if (!url && !platform && !type && !id) {
      this.logger.error(
        'URL or Platform + Type + ID parameters required!',
        JSON.stringify(params),
        'ODESLI',
      );
      throw new HttpException(
        'URL or Platform + Type + ID parameters required!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Make request to odesli.co API
   * @see https://github.com/songlink/docs/blob/master/api-v1-alpha.1.md#get-links-endpoint
   */
  @Validate()
  public links(@Validator() linksParams: LinksParams): Observable<Links> {
    const params = {
      ...linksParams,
      key: this.configService.get('odesli.apiKey'),
    };
    this.validateRequestParams(params);
    this.logger.log('New request');
    this.logger.log(linksParams);
    return this.httpService
      .get('links', { params })
      .pipe(map(response => response.data))
      .pipe(
        catchError(e => {
          throw new HttpException(
            'Error while /links request',
            e.response.status,
          );
        }),
      );
  }
}
