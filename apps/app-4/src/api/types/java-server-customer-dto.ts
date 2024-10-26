export type JavaServerCustomerDto = {
  id: string
  nome: string
  sobreNome: string
  email: string
  endereco: {
    estado: string
    cidade: string
    rua: string
    numero: string
    codigoPostal: string
    bairro: string
    informacoesAdicionais: string
  }
  telefones: Array<{
    ddd: string
    numero: string
  }>
}
