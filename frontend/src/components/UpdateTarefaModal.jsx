import { Modal, Button, Form } from 'react-bootstrap'
function UpdateTarefaModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateTarefa(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar Conteúdo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="titulo">
            <Form.Label>
              Titulo
            </Form.Label>
            <Form.Control defaultValue={props.tarefa.titulo} type="text" />
          </Form.Group>

          <Form.Group controlId="descricao">
            <Form.Label>
              Descrição
            </Form.Label>
            <Form.Control defaultValue={props.tarefa.descricao} type="text" />
          </Form.Group>

          <Form.Group controlId="dia">
            <Form.Label>
              Porcentagem
            </Form.Label>
            <Form.Control defaultValue={props.tarefa.porcentagem} type="number" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateTarefaModal
