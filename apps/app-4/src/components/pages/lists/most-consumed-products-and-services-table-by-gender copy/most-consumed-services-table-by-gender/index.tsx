import { ServicesTable } from '@/components/commons/services-table'
import { useMostConsumedServicesTableByGender } from './use-most-consumed-services-table-by-gender'


export const MostConsumedServicesTableByGender = () =>  {
  const {
    maleCustomersServices,
    maleCustomersServicesPage,
    maleCustomersServicesPagesCount,
    femaleCustomersServicesPage,
    femaleCustomersServicesPagesCount,
    femaleCustomersServices,
    handleMaleCustomersServicesPageChange,
    handleFemaleCustomersServicesPageChange,
  } = useMostConsumedServicesTableByGender()
    
    return (
      <div className='flex flex-col gap-3'>
        <div>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Serviços mais consumidos por clientes do sexo masculino
          </h2>
          <ServicesTable
            hasSelection={false}
            hasActions={false}
            services={maleCustomersServices}
            page={maleCustomersServicesPage}
            pagesCount={maleCustomersServicesPagesCount}
            onPageChange={(page) => handleMaleCustomersServicesPageChange(page)}
          />
        </div>
        <div className='mt-6'>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Serviços mais consumidos por clientes do sexo feminino
          </h2>
          <ServicesTable
            hasSelection={false}
            hasActions={false}
            services={femaleCustomersServices}
            page={femaleCustomersServicesPage}
            pagesCount={femaleCustomersServicesPagesCount}
            onPageChange={(page) => handleFemaleCustomersServicesPageChange(page)}
          />
        </div>
      </div>
    )
}
