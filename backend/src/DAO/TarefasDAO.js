import db from '../infra/db.js'

class TarefasDAO {
    static listar() {
        const query = 'SELECT * FROM tarefas';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(tarefa) {
        const query = 'INSERT INTO tarefas (titulo, descricao, dia) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [tarefa.titulo, tarefa.descricao, tarefa.dia], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir  tarefa',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'tarefa criado com sucesso',
                    tarefaId: this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM tarefas WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar  tarefa',
                      erro: err
                  })
              }

              resolve({ mensagem: 'tarefa deletado com sucesso' })
          });
      });
    }

    static atualizar(id, tarefa) {
      const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, dia = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [tarefa.titulo, tarefa.descricao, tarefa.dia, id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar  tarefa',
                      erro: err
                  })
              }

              resolve({ mensagem: 'tarefa atualizado com sucesso' })
          });
      });
    }
}

export default TarefasDAO;