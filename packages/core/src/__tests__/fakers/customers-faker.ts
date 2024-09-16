import { fakerPT_BR as faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import { PhonesFaker } from './phones-faker'
import { RgsFaker } from './rgs-faker'
import { ProductsFaker } from './products-faker'
import { ServicesFaker } from './services-faker'
import { Customer } from '../../domain/entities'
import type { CustomerDto } from '../../dtos'

export class CustomersFaker {
  static fake(dto?: Partial<CustomerDto>) {
    return Customer.create(CustomersFaker.fakeDto(dto))
  }

  static fakeDto(dto?: Partial<CustomerDto>): CustomerDto {
    return {
      name: faker.person.firstName(),
      socialName: faker.person.lastName(),
      cpf: {
        value: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
        issueDate: dayjs(faker.date.past()).toDate(),
      },
      gender: faker.helpers.arrayElement(['masculino', 'feminino']),
      phones: PhonesFaker.fakeMany(faker.number.int({ min: 1, max: 2 })),
      rgs: RgsFaker.fakeManyDto(1),
      consumedProducts: ProductsFaker.fakeManyDto(faker.number.int({ min: 0, max: 10 })),
      consumedServices: ServicesFaker.fakeManyDto(faker.number.int({ min: 0, max: 5 })),
      ...dto,
    }
  }

  static fakeManyDto(count: number, dto?: Partial<CustomerDto>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomersFaker.fake(dto))
  }
}
