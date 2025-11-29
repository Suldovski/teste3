import { useState } from 'react'

function CadastrarLocacao() {
  const [cliente, setCliente] = useState('')
  const [cpf, setCpf] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [categoria, setCategoria] = useState('Hatch')
  const [diasPrevistos, setDiasPrevistos] = useState('')
  const [dataRetirada, setDataRetirada] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const locacao = {
      cliente,
      cpf,
      veiculo,
      categoria,
      diasPrevistos: parseInt(diasPrevistos),
      dataRetirada
    }

    try {
      const response = await fetch('http://localhost:5000/api/locacao/retirar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locacao)
      })

      if (response.ok) {
        alert('Locação cadastrada com sucesso!')
        setCliente('')
        setCpf('')
        setVeiculo('')
        setCategoria('Hatch')
        setDiasPrevistos('')
        setDataRetirada('')
      } else {
        alert('Erro ao cadastrar locação')
      }
    } catch (error) {
      alert('Erro ao conectar com a API')
    }
  }

  return (
    <div>
      <h2>Cadastrar Locação</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente:</label>
          <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </div>
        <div>
          <label>Veículo:</label>
          <input type="text" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} required />
        </div>
        <div>
          <label>Categoria:</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="Hatch">Hatch</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
          </select>
        </div>
        <div>
          <label>Dias Previstos:</label>
          <input type="number" value={diasPrevistos} onChange={(e) => setDiasPrevistos(e.target.value)} required />
        </div>
        <div>
          <label>Data Retirada:</label>
          <input type="date" value={dataRetirada} onChange={(e) => setDataRetirada(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default CadastrarLocacao
