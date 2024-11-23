import { ServicesTable } from '@/components/commons/services-table'
import { useMostConsumedServicesTable } from './use-most-consumed-services-table'

export const MostConsumedServicesTable = () => {
  const { isFetching, page, pagesCount, services, handlePageChange } =
    useMostConsumedServicesTable()

  return (
    <ServicesTable
      hasActions={false}
      hasSelection={false}
      services={services}
      page={page}
      pagesCount={pagesCount}
      isLoading={isFetching}
      onPageChange={(page) => handlePageChange(page)}
    />
  )
}
