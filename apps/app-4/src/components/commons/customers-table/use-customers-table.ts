import type { Selection } from '@nextui-org/react'
import type { CustomerWithAddressDto } from '@world-beauty/core/dtos'
import type { CustomerWithAddress } from '@world-beauty/core/entities'

type CustomersTableProps = {
  customers: CustomerWithAddress[]
  onPageChange?: (page: number) => void
  onUpdateCustomer?: (customerDto: CustomerWithAddressDto, customerId: string) => void
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
      selectedCustomersIds = Array.from(customersSelection).map(String).filter(Boolean)
    }

    if (onCustomersSelectionChange) onCustomersSelectionChange(selectedCustomersIds)
  }

  function handlePageChange(page: number) {
    if (onPageChange) onPageChange(page)
  }

  async function handleUpdateCustomer(
    customerDto: CustomerWithAddressDto,
    customerId: string,
  ) {
    if (onUpdateCustomer) onUpdateCustomer(customerDto, customerId)
  }

  return {
    handleCustomersSelectionChange,
    handlePageChange,
    handleUpdateCustomer,
  }
}
