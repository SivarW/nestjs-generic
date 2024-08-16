import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class IdParamDto {
  @ApiProperty()
  @Type(() => Number)
  id: number;
}
