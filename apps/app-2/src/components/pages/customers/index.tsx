import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

import { ListCustomersUseCase } from '@world-beauty/core/use-cases'
import { customersRepository } from '../../../database'
import type { Customer } from '@world-beauty/core/entities'

type CustomersPageState = {
  customers: Customer[]
}

export class CustomersPage extends Component<void, CustomersPageState> {
  constructor() {
    super()
    this.state = {
      customers: [],
    }
  }

  async componentDidMount() {
    const useCase = new ListCustomersUseCase(customersRepository)
    const customers = await useCase.execute()

    console.log(customers)
    this.state = {
      customers,
    }
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <Table
          color='default'
          selectionMode='multiple'
          aria-label='Example static collection table'
        >
          <TableHeader>
            <TableColumn>Nome</TableColumn>
            <TableColumn>CPF</TableColumn>
            <TableColumn>Gênero</TableColumn>
            <TableColumn>Nome social</TableColumn>
            <TableColumn>Telefones</TableColumn>
            <TableColumn>RG's</TableColumn>
            <TableColumn>Total de produtos/serviços consumidos</TableColumn>
            <TableColumn>Total gasto (R$)</TableColumn>
          </TableHeader>
          <TableBody emptyContent={'Nenhum cliente cadastrado'}>
            {this.state.customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.cpf.value}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>{customer.socialName}</TableCell>
                <TableCell>{customer.phonesList}</TableCell>
                <TableCell>{customer.rgsList}</TableCell>
                <TableCell>{customer.consumedProductsOrServicesCount}</TableCell>
                <TableCell>{customer.spending}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}
