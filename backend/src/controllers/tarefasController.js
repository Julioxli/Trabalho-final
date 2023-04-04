import TarefasDAO from "../DAO/TarefasDAO.js"

class tarefasController {
  static rotas(app){
    app.get('/tarefa', tarefasController.listar)
    app.post('/tarefa', tarefasController.inserir)
    app.delete('/tarefa/:id', tarefasController.deletar)
    app.put('/tarefa/:id', tarefasController.atualizar)
  }

  static async listar(req, res){
    const tarefas = await TarefasDAO.listar()

    res.send(tarefas)
  }

  static async inserir(req, res){
    const tarefa = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      dia: req.body.dia
    }

    const result = await TarefasDAO.inserir(tarefa)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const tarefa = await TarefasDAO.deletar(req.params.id)

    if(tarefa.erro){
        res.status(500).send('Erro ao deletar o conteúdo')
    }

    res.send({mensagem: 'Conteúdo removido com sucesso'})
  }

  static async atualizar(req, res){
    const tarefa = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      dia: req.body.dia
    }

    const result = await TarefasDAO.atualizar(req.params.id, tarefa)

    if(result.erro){
        res.status(500).send('Erro ao atualizar o conteúdo')
    }

    res.send({mensagem: 'Conteúdo alterado com sucesso'})
  }
}

export default tarefasController