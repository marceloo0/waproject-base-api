import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { OrderProducts } from 'modules/database/models/order';

import { OrderProductsRepository } from '../repositories/orderproducts';
import { ListValidator } from '../validators/order/list';
import { SaveValidator } from '../validators/order/save';
import { OrderProductsService } from './../services/orderProducts';

@ApiTags('Admin: OrderProducts')
@Controller('/orderproducts')
@AuthRequired([enRoles.admin])
export class OrderProductsController {
  constructor(
    private orderProductsRepository: OrderProductsRepository,
    private orderProductsService: OrderProductsService
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: [OrderProducts] })
  public async list(@Query() model: ListValidator) {
    return this.orderProductsRepository.list(model);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: OrderProducts })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderProductsRepository.findById(orderId);
  }

  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderProductsRepository.remove(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: OrderProducts })
  public async create(@Body() model: SaveValidator) {
    return this.orderProductsRepository.insert(model);
  }

  @Put()
  @ApiResponse({ status: 200, type: OrderProducts })
  public async update(@Body() model: SaveValidator) {
    return this.orderProductsService.save(model);
  }
}
