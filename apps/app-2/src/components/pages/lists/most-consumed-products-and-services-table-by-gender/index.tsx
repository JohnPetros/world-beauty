import { Component } from 'react'

import { MostConsumedProductsTableByGender } from './most-consumed-products-table-by-gender'
import { MostConsumedServicesTableByGender } from './most-consumed-services-table-by-gender'

export class MostConsumedProductsAndServicesByGenderTable extends Component {
  render() {
    return (
      <div className='space-y-6'>
        <MostConsumedProductsTableByGender />
        <MostConsumedServicesTableByGender />
      </div>
    )
  }
}
