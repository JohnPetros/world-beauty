import { MostConsumedProductsTableByGender } from './most-consumed-products-table-by-gender'
import { MostConsumedServicesTableByGender } from './most-consumed-services-table-by-gender'

export const MostConsumedProductsAndServicesByGenderTable = () =>  {
    return (
      <div className='space-y-6'>
        <MostConsumedProductsTableByGender />
        <MostConsumedServicesTableByGender />
      </div>
    )
}
