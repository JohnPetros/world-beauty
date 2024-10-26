export type JavaServerCustomerDto = {
  id: string
  nome: string
  sobreNome: string
  email: string
  endereco: {
    estado: string
    cidade: string
    rua: string
    numero: number
    codigoPostal: string
    informacoesAdicionais: string
  }
  telefones: Array<{
    id: string
    ddd: string
    numero: string
  }>
}
