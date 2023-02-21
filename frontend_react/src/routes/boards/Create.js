import axios from 'axios';
import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writerId, setWriterId] = useState(0);
  const [joinLimit, setJoinLimit] = useState(0);

  return (
    <>
      {/* 등록폼 시작 */}
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="제목" onChange={(e) => { setTitle(e.target.value); }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="내용" onChange={(e) => { setContent(e.target.value); }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="작성자 id" onChange={(e) => { setWriterId(e.target.value); }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="허용인원" onChange={(e) => { setJoinLimit(e.target.value); }}/>
          </Form.Group>
          <Button variant="primary" onClick={() => { create(); }}>등록</Button>
        </Form>
      </Container>
      {/* 등록폼 끝 */}
    </>
  );

  function create() {
    axios
      .post('http://localhost:8080/boards', {
        title,
        content,
        writerId: parseInt(writerId),
        joinLimit: parseInt(joinLimit),
      })
      .then((response) => {
        const statusCode = response.status;
        console.log('status code: ' + statusCode);
        if (statusCode === 201) {
          // getBoards();
          alert('등록완료');
          window.location.href = '/';
        }
      })
      .catch((e) => {
        console.log('axios 통신실패');
        console.log(e);
      });
  }
};

export default Create;
