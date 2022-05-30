import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeDto) {}
