import { Injectable } from '@nestjs/common';
import {
  CustomImageRepository,
  NotificationRepository,
  PosRepository,
  PromoModel,
  PromoRepository,
} from '@business-loyalty-program/database';
import {
  PromoCollectionQueryDto,
  PromoUpdateDto,
  NewPromoDto,
} from '@business-loyalty-program/types';
import { EPromoStatus } from '@business-loyalty-program/enums';
import * as moment from 'moment';

@Injectable()
export class PromosService {
  constructor(
    private readonly promoRepository: PromoRepository,
    private readonly posRepository: PosRepository,
    private readonly customImageRepository: CustomImageRepository,
    private readonly notificationRepository: NotificationRepository
  ) {}

  public getCollection({ status, ...query }: PromoCollectionQueryDto) {
    const conditions: Record<string, any> = {};
    if (status) {
      conditions.status = status;
    }

    return this.promoRepository.getList(query, conditions);
  }

  public getOne(id: string) {
    return this.promoRepository.getById(id);
  }

  public async update(
    promo: PromoModel,
    { imageId, posIds, ...body }: PromoUpdateDto
  ) {
    return this.promoRepository.update(promo, {
      ...(await this.customImageRepository.getImageEntityPart(imageId)),
      ...(await this.posRepository.getEntityParts(posIds)),
      ...body,
    });
  }

  public async create({ imageId, posIds, ...body }: NewPromoDto) {
    const promo = await this.promoRepository.create({
      ...(await this.customImageRepository.getImageEntityPart(imageId)),
      ...(await this.posRepository.getEntityParts(posIds)),
      ...body,
    });

    await this.notificationRepository.create({
      text: `Новая акция!\n${promo.summary}`,
      image: promo.image,
      date: moment().format('YYYY-MM-DD'),
      pos: promo.pos,
      cities: [],
    });

    return promo;
  }

  public changeStatus(promo: PromoModel, status: EPromoStatus) {
    return this.promoRepository.update(promo, { status });
  }
}
