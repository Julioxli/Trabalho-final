import { Table, Container, Button } from 'react-bootstrap'
import TarefasApi from './api/TarefasApi'
import { useEffect, useState } from 'react'
import CreateTarefaModal from './components/CreateTarefaModal'
import UpdateTarefaModal from './components/UpdateTarefaModal'

// content

function App() {
  const [tarefas, setTarefas] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedTarefa, setSelectedTarefa] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await TarefasApi().getTarefas().then(data => {
        return data.json()
      })
      .then(data => {
        setTarefas(data)
      })
    }

    getData()
  }, [])

  async function deleteTarefa(tarefaId) {
    try {
      await TarefasApi().deleteTarefa(tarefaId)

      const formattedTarefas = tarefas.filter(cont => {
        if(cont.id !== tarefaId){
          return cont
        }
      })

      setTarefas(formattedTarefas)
    } catch(err) {
      throw err
    }
  }

  async function createTarefa(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await TarefasApi().createTarefa(
        req.titulo.value, req.descricao.value, Number(req.dia.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        setTarefas([...tarefas, {
          id: res.tarefaId,
          titulo: req.titulo.value,
          descricao: req.descricao.value,
          dia: Number(req.dia.value)
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function updateTarefa(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await TarefasApi().updateTarefa(
        selectedTarefa.id, req.titulo.value, req.descricao.value, Number(req.dia.value)
      )

      const formattedTarefas = tarefas.map(cont => {
        if(cont.id === selectedTarefa.id) {
          return {
            id: selectedTarefa.id,
            titulo:  req.titulo.value,
            descricao: req.descricao.value,
            dia: Number(req.dia.value)
          }
        }

        return cont
      })

      setTarefas(formattedTarefas)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return(
    <>
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Criar Conteúdo
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>dia</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {tarefas && tarefas.map(cont => (
            <tr key={cont.id}>
              <td>{cont.titulo}</td>
              <td>{cont.descricao}</td>
              <td>{cont.dia}</td>
              <td>
                <Button onClick={() => deleteTarefa(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedTarefa(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateTarefaModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createTarefa={createTarefa} />
    {selectedTarefa && (
      <UpdateTarefaModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateTarefa={updateTarefa} tarefa={selectedTarefa} />
    )}
    </>
  )
}

export default App
