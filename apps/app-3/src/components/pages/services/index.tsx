import { Button } from '@nextui-org/react'

import { PageTitle } from '@/components/commons/page-title'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ServicesTable } from '@/components/commons/services-table'
import { ServiceForm } from '@/components/commons/services-table/service-form'
import { useServicesPage } from './use-services-page'

export const ServicesPage = () => {
  const {
    page,
    Services,
    isFetching,
    pagesCount,
    selectedServicesIds,
    handleDeleteButtonClick,
    handleFormSubmit,
    handlePageChange,
    handleServicesSelectionChange,
    handleUpdateService,
  } = useServicesPage()

  return (
    <div className='flex flex-col gap-3'>
      <PageTitle>Produtos</PageTitle>

      <div className='flex items-center gap-2'>
        <Dialog
          title='Adicionar produto'
          trigger={
            <Button
              endContent={<Icon name='add' size={20} />}
              radius='sm'
              className='bg-zinc-800 text-zinc-50 w-max'
            >
              Cadastrar produto
            </Button>
          }
        >
          {(closeDialog) => (
            <ServiceForm
              onCancel={closeDialog}
              onSubmit={(serviceDto) =>
                handleFormSubmit(serviceDto, closeDialog, 'register')
              }
            />
          )}
        </Dialog>
        {selectedServicesIds.length > 0 && (
          <Button radius='sm' color='danger' onClick={() => handleDeleteButtonClick()}>
            Deletar produto(s)
          </Button>
        )}
      </div>

      <div className='w-full'>
        <ServicesTable
          hasActions={true}
          hasSelection={true}
          services={Services}
          page={page}
          isLoading={isFetching}
          pagesCount={pagesCount}
          selectedServicesIds={selectedServicesIds}
          onUpdateService={(ServiceDto) => handleUpdateService(ServiceDto)}
          onPageChange={(page) => handlePageChange(page)}
          onServicesSelectionChange={(ServicesIds) =>
            handleServicesSelectionChange(ServicesIds)
          }
        />
      </div>
    </div>
  )
}
