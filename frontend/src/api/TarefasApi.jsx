const TarefasApi = () => {
  const url = 'http://localhost:3000'

  return {
      getTarefas () {
          return fetch(`${url}/tarefa`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteTarefa (tarefaId) {
        return fetch(`${url}/tarefa/${tarefaId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createTarefa (titulo, descricao, dia) {
        return fetch(`${url}/tarefa`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              descricao: descricao,
              dia: dia
            }
          )
       })
      },
      updateTarefa(tarefaId, titulo, descricao, dia) {
        return fetch(`${url}/tarefa/${tarefaId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              descricao: descricao,
              dia: dia
            }
          )
       })
      },
  }
}

export default TarefasApi