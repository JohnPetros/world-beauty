import { fakerPT_BR as faker } from '@faker-js/faker'

import { PhonesFaker } from './phones-faker'
import type { CustomerWithAddressDto } from '../../dtos'
import { CustomerWithAddress } from '../../domain/entities/customer-with-address'
import { AddressesFaker } from './addresses-faker'

export class CustomerWithAddresssFaker {
  static fake(dto?: Partial<CustomerWithAddressDto>) {
    return CustomerWithAddress.create(CustomerWithAddresssFaker.fakeDto(dto))
  }

  static fakeDto(dto?: Partial<CustomerWithAddressDto>): CustomerWithAddressDto {
    return {
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      address: AddressesFaker.fake(),
      phones: PhonesFaker.fakeMany(faker.number.int({ min: 1, max: 2 })),
      ...dto,
    }
  }

  static fakeMany(count: number, dto?: Partial<CustomerWithAddressDto>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomerWithAddresssFaker.fake(dto))
  }

  static fakeManyDto(count: number, dto?: Partial<CustomerWithAddressDto>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomerWithAddresssFaker.fakeDto(dto))
  }
}
