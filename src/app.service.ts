import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class AppService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwrech Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item: Coffee) => item.id === +id);
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existinCofffeeIndex = this.coffees.findIndex(
      (item: Coffee) => item.id === +id,
    );

    if (existinCofffeeIndex >= 0) {
      this.coffees.splice(existinCofffeeIndex, 1, updateCoffeeDto);
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(
      (item: Coffee) => item.id === +id,
    );
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
