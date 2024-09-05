import { Company } from '@/core/entities'
import { fakerPT_BR as faker } from '@faker-js/faker'

import { ProductsFaker } from './products-faker'
import { ServicesFaker } from './services-faker'
import { CustomersFaker } from './customers-faker'

export class CompanyFaker {
  static fake() {
    const company = new Company({
      products: ProductsFaker.fakeMany(20),
      services: ServicesFaker.fakeMany(10),
      customers: [],
    })

    const fakeCustomers = []

    for (let index = 0; index < 30; index++) {
      const fakeProducts = []
      for (let index = 0; index < faker.number.int({ min: 0, max: 10 }); index++) {
        fakeProducts.push(
          company.getProductByIndex(
            faker.number.int({ min: 0, max: company.products.length - 1 }),
          ),
        )
      }

      const fakeServices = []
      for (let index = 0; index < faker.number.int({ min: 0, max: 5 }); index++) {
        fakeServices.push(
          company.getServiceByIndex(
            faker.number.int({ min: 0, max: company.services.length - 1 }),
          ),
        )
      }

      fakeCustomers.push(
        CustomersFaker.fake({
          consumedProducts: fakeProducts,
          consumedServices: fakeServices,
        }),
      )
    }

    company.customers = fakeCustomers
    return company
  }
}
