import {
  ControllerWithDocs,
  DeleteWithDocs,
  GetWithDocs,
  PostWithDocs,
} from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import {
  IntegrationCollectionDto,
  IntegrationCollectionQueryDto,
  IntegrationResponseDto,
  NewIntegrationDto,
} from '@business-loyalty-program/types';
import { Body, Param, Query } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@ControllerWithDocs('/integration', 'Integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @PostWithDocs('/', IntegrationResponseDto)
  @JwtSecurity()
  public create(@Body() body: NewIntegrationDto) {
    return this.integrationService.create(body);
  }

  @GetWithDocs('/', IntegrationCollectionDto)
  @JwtSecurity()
  public getCollection(@Query() query: IntegrationCollectionQueryDto) {
    return this.integrationService.getList(query);
  }

  @DeleteWithDocs('/:id')
  @JwtSecurity()
  public delete(@Param('id') id: string) {
    return this.integrationService.delete(id);
  }
}
