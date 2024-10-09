import type { Selection } from '@nextui-org/react'
import type { Item } from '@world-beauty/core/abstracts'
import type { CustomerDto } from '@world-beauty/core/dtos'
import type { Customer } from '@world-beauty/core/entities'

type CustomersTableProps = {
  customers: Customer[]
  onPageChange?: (page: number) => void
  onUpdateCustomer?: (customerDto: CustomerDto) => void
  onCustomersSelectionChange?: (customersIds: string[]) => void
}

export function useCustomersTable({
  customers,
  onCustomersSelectionChange,
  onPageChange,
  onUpdateCustomer,
}: CustomersTableProps) {
  async function handleCustomersSelectionChange(customersSelection: Selection) {
    let selectedCustomersIds: string[] = []

    if (customersSelection === 'all') {
      selectedCustomersIds = customers.map((customer) => customer.id)
    } else {
      selectedCustomersIds = Array.from(customersSelection).map(String)
    }

    if (onCustomersSelectionChange) onCustomersSelectionChange(selectedCustomersIds)
  }

  function handlePageChange(page: number) {
    if (onPageChange) onPageChange(page)
  }

  async function handleUpdateCustomer(customerDto: CustomerDto) {
    if (onUpdateCustomer) onUpdateCustomer(customerDto)
  }

  return {
    handleCustomersSelectionChange,
    handlePageChange,
    handleUpdateCustomer,
  }
}
