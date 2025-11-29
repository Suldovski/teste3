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

function DevolverLocacao() {
  const [locacoes, setLocacoes] = useState<Locacao[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [diasReais, setDiasReais] = useState('')
  const [temAvaria, setTemAvaria] = useState(false)

  useEffect(() => {
    fetchLocacoes()
  }, [])

  const fetchLocacoes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/locacao/listar')
      if (response.ok) {
        const data = await response.json()
        setLocacoes(data.filter((loc: Locacao) => loc.status === 'Em Aberto'))
      }
    } catch (error) {
      alert('Erro ao buscar locações')
    }
  }

  const handleDevolver = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedId) {
      alert('Selecione uma locação')
      return
    }

    const devolucao = {
      diasReais: parseInt(diasReais),
      temAvaria
    }

    try {
      const response = await fetch(`http://localhost:5000/api/locacao/devolver/${selectedId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(devolucao)
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Devolução realizada! Total Final: R$ ${data.totalFinal.toFixed(2)}`)
        setSelectedId('')
        setDiasReais('')
        setTemAvaria(false)
        fetchLocacoes()
      } else {
        alert('Erro ao devolver veículo')
      }
    } catch (error) {
      alert('Erro ao conectar com a API')
    }
  }

  return (
    <div>
      <h2>Devolver Locação</h2>
      <form onSubmit={handleDevolver}>
        <div>
          <label>Selecionar Locação:</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
            <option value="">Selecione...</option>
            {locacoes.map((locacao) => (
              <option key={locacao.id} value={locacao.id}>
                ID {locacao.id} - {locacao.cliente} - {locacao.veiculo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Dias Utilizados:</label>
          <input type="number" value={diasReais} onChange={(e) => setDiasReais(e.target.value)} required />
        </div>
        <div>
          <label>Houve Avaria?</label>
          <input type="checkbox" checked={temAvaria} onChange={(e) => setTemAvaria(e.target.checked)} />
        </div>
        <button type="submit">Devolver</button>
      </form>
    </div>
  )
}

export default DevolverLocacao
