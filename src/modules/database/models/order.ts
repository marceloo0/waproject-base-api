import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrderProducts } from '../interfaces/orderProducts';

export class OrderProducts extends Model implements IOrderProducts {
  @ApiProperty({ type: 'integer' })
  public id?: number;

  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'integer' })
  public quantity: number;

  @ApiProperty({ type: 'number', format: 'double' })
  public price: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'OrderProducts';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public static get relationMappings(): any {
    return {};
  }
}
