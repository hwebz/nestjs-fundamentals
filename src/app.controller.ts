import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCoffeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('docs')
  @Redirect('/demo1', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: '/demo2' };
    }
  }

  @Get('demo1')
  getDemo1() {
    return 'demo1';
  }

  @Get('demo2')
  getDemo2() {
    return 'demo2';
  }

  @Get()
  findAll(): Promise<Coffee[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  getExamples(@Param('id') id: string): Promise<Coffee> {
    return this.appService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.GATEWAY_TIMEOUT)
  create(@Body() body: CreateCoffeDto): object {
    this.appService.create(body);
    return {
      success: true,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto): object {
    this.appService.update(id, body);
    return {
      success: true,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string): object {
    this.appService.remove(id);
    return {
      success: true,
    };
  }
}
