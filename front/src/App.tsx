import { useState } from 'react'
import CadastrarLocacao from './pages/locacao/cadastrar'
import ListarLocacao from './pages/locacao/listar'
import DevolverLocacao from './pages/locacao/devolver'
import AtrasadosLocacao from './pages/locacao/atrasados'

function App() {
  const [page, setPage] = useState('cadastrar')

  return (
    <>
      <h1>Prova de Luan Suldovski</h1>
      <nav>
        <button onClick={() => setPage('cadastrar')}>Cadastrar</button>
        <button onClick={() => setPage('listar')}>Listar</button>
        <button onClick={() => setPage('devolver')}>Devolver</button>
        <button onClick={() => setPage('atrasados')}>Atrasados</button>
      </nav>
      <hr />
      {page === 'cadastrar' && <CadastrarLocacao />}
      {page === 'listar' && <ListarLocacao />}
      {page === 'devolver' && <DevolverLocacao />}
      {page === 'atrasados' && <AtrasadosLocacao />}
    </>
  )
}

export default App
