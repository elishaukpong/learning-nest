import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ){}

    findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOneById(id);

        if(! coffee){
            throw new HttpException(`Coffee #${id} not found`,HttpStatus.NOT_FOUND);
        }

        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: any) {
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });

        if(! coffee){
            throw new HttpException(`Coffee #${id} not found`,HttpStatus.NOT_FOUND);
        }

        return this.coffeeRepository.save(coffee); 
    }

    async remove(id: string) {
        const coffee = await this.coffeeRepository.findOneById(id);

        return this.coffeeRepository.remove(coffee);

    }
}
