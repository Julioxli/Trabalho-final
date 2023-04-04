import { Modal, Button, Form } from 'react-bootstrap'
function CreateTarefaModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.createTarefa(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Criar Conteúdo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="titulo">
            <Form.Label>
              Titulo
            </Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group controlId="descricao">
            <Form.Label>
              Descrição
            </Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group controlId="dia">
            <Form.Label>
              dia
            </Form.Label>
            <Form.Control type="number" />
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

export default CreateTarefaModal
