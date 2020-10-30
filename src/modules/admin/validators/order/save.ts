import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { IOrderProducts } from 'modules/database/interfaces/orderProducts';

export class SaveValidator implements IOrderProducts {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'integer' })
  public quantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'integer' })
  public price: number;
}
