import { useState, useEffect } from 'react'

interface Locacao {
  id: number
  cliente: string
  cpf: string
  veiculo: string
  categoria: string
  diasPrevistos: number
  valorDiaria: number
  valorTotalPrevisto: number
  status: string
  dataRetirada: string
  dataDevolucaoReal: string | null
  totalFinal: number | null
}

function AtrasadosLocacao() {
  const [locacoes, setLocacoes] = useState<Locacao[]>([])

  useEffect(() => {
    fetchAtrasados()
  }, [])

  const fetchAtrasados = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/locacao/atrasados')
      if (response.ok) {
        const data = await response.json()
        setLocacoes(data)
      }
    } catch (error) {
      alert('Erro ao buscar locações atrasadas')
    }
  }

  return (
    <div>
      <h2>Locações Atrasadas</h2>
      <button onClick={fetchAtrasados}>Atualizar</button>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>CPF</th>
            <th>Veículo</th>
            <th>Categoria</th>
            <th>Dias Previstos</th>
            <th>Data Retirada</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {locacoes.map((locacao) => (
            <tr key={locacao.id}>
              <td>{locacao.id}</td>
              <td>{locacao.cliente}</td>
              <td>{locacao.cpf}</td>
              <td>{locacao.veiculo}</td>
              <td>{locacao.categoria}</td>
              <td>{locacao.diasPrevistos}</td>
              <td>{locacao.dataRetirada}</td>
              <td>{locacao.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AtrasadosLocacao
