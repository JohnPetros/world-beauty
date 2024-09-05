import { Cpf, Customer } from '@/core/entities'
import { fakerPT_BR as faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import type { CustomerProps } from '@/core/entities/customer'
import { PhonesFaker } from './phones-faker'
import { RgsFaker } from './rgs-faker'
import { ProductsFaker } from './products-faker'
import { ServicesFaker } from './services-faker'

export class CustomersFaker {
  static fake(props?: Partial<CustomerProps>) {
    return new Customer({
      name: faker.person.firstName(),
      socialName: faker.person.lastName(),
      cpf: new Cpf(
        faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
        dayjs(faker.date.past()).format('DD/MM/YYYY'),
      ),
      gender: faker.helpers.arrayElement(['masculino', 'feminino']),
      phones: PhonesFaker.fakeMany(faker.number.int({ min: 1, max: 2 })),
      rgs: RgsFaker.fakeMany(1),
      consumedProducts: ProductsFaker.fakeMany(faker.number.int({ min: 0, max: 10 })),
      consumedServices: ServicesFaker.fakeMany(faker.number.int({ min: 0, max: 5 })),
      ...props,
    })
  }

  static fakeMany(count: number, props?: Partial<CustomerProps>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomersFaker.fake(props))
  }
}
