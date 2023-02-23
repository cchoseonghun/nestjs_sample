import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { setShow } from '../../store/modalSlice';


function LoginModal() {
  let state = useSelector((state)=> state );
  let dispatch = useDispatch();

  const handleClose = () => dispatch(setShow(false));

  return (
    <Modal show={state.modal.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control id="email" name="email" type="email" autoFocus />
              <Form.Label>비밀번호</Form.Label>
              <Form.Control id="password" name="password" type="password" autoFocus />
              <Form.Label>비밀번호확인</Form.Label>
              <Form.Control id="confirm_password" name="confirm_password" type="password" autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={()=>{
          handleClose();
          register();
        }}>회원가입</Button>
      </Modal.Footer>
    </Modal>
  )

  function register() {
    alert('준비중');
  }
}

export default LoginModal;