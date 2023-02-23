import { useDispatch, useSelector } from "react-redux";
import { setShow } from '../../store/modal.slice';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';


function LoginModal() {
  let state = useSelector((state)=> state );
  let dispatch = useDispatch();

  const handleClose = () => dispatch(setShow(false));

  return (
    <Modal size="sm" show={state.modal.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
              <InputGroup className="mb-2">
                <Form.Control id="email" name="email" type="email" placeholder='이메일' autoFocus />
                <Button variant="success" onClick={()=>{ sendEmail(); }}>인증번호 전송</Button>
              </InputGroup>
              <InputGroup className="mb-2">
                <Form.Control id="confirm_email" name="confirm_email" type="text" placeholder='인증번호' autoFocus />
                <Button variant="outline-success" onClick={()=>{ confirmEmail(); }}>인증번호 확인</Button>
              </InputGroup>
              <Form.Control id="password" className='mb-2' name="password" type="password" placeholder='비밀번호' autoFocus />
              <Form.Control id="confirm_password" className='mb-2' name="confirm_password" type="password" placeholder='비밀번호확인' autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <div className="d-grid gap-2 m-2">
        <Button variant="primary" onClick={()=>{ handleClose(); register(); }}>회원가입</Button>
      </div>
    </Modal>
  )

  function confirmEmail() {
    alert('인정번호 확인 준비중');
  }

  function sendEmail() {
    alert('인증번호 전송 준비중');
  }

  function register() {
    alert('준비중');
  }
}

export default LoginModal;