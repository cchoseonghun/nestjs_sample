import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setShow } from '../../store/modal.slice';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useState } from "react";


function LoginModal() {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [verifyToken, setVerifyToken] = useState('');

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
                <Form.Control id="email" name="email" type="email" placeholder='이메일' autoFocus onChange={(e) => { setEmail(e.target.value); setIsVerified(false); }}/>
                <Button variant="success" onClick={()=>{ sendEmail(); }}>인증번호 전송</Button>
              </InputGroup>
              <InputGroup className="mb-2">
                <Form.Control id="confirm_email" name="confirm_email" type="text" placeholder='인증번호' autoFocus onChange={(e) => { setVerifyToken(e.target.value); }}/>
                <Button variant="outline-success" onClick={()=>{ confirmEmail(); }}>인증번호 확인</Button>
              </InputGroup>
              <Form.Control id="password" className='mb-2' name="password" type="password" placeholder='비밀번호' autoFocus />
              <Form.Control id="confirm_password" className='mb-2' name="confirm_password" type="password" placeholder='비밀번호확인' autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <div className="d-grid gap-2 m-2">
        <Button variant="primary" onClick={()=>{ register(); }}>회원가입</Button>
      </div>
    </Modal>
  )

  function confirmEmail() {
    axios
      .put(`http://localhost:8080/users/verifyEmail?verifyToken=${verifyToken}`, { email })
      .then((response) => {
        const statusCode = response.status;
        // console.log('status code: ' + statusCode);
        if (statusCode === 200) {
          alert('인증완료');
          setIsVerified(true);
        }
      })
      .catch((e) => {
        console.log('axios 통신실패');
        alert(e.response.data.message);
      });
  }

  function sendEmail() {
    if (email.length == 0) {
      alert('이메일을 입력해야 합니다.');
      return;
    }
    axios
      .post('http://localhost:8080/users/verifyEmail', { email })
      .then((response) => {
        const statusCode = response.status;
        console.log('status code: ' + statusCode);
        if (statusCode === 201) {
          alert('인증번호를 이메일로 보냈습니다.');
        }
      })
      .catch((e) => {
        console.log('axios 통신실패');
        console.log(e);
      });
  }

  function register() {
    if (!isVerified) {
      alert('이메일 인증이 필요합니다.');
      return;
    }
    alert('준비중');
  }
}

export default LoginModal;