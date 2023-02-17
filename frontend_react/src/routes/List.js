import axios from 'axios';
import { useEffect, useState } from 'react';

const List = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      {/* 등록폼 시작 */}
      <div className="mb-5">
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="title" className="col-form-label">제목</label>
          </div>
          <div className="col-auto">
            <input type="text" id="title" className="form-control" />
          </div>
          <div className="col-auto">
            <label htmlFor="content" className="col-form-label">내용</label>
          </div>
          <div className="col-auto">
            <input type="text" id="content" className="form-control" />
          </div>
          <div className="col-auto">
            <label htmlFor="writerId" className="col-form-label">작성자id</label>
          </div>
          <div className="col-auto">
            <input type="text" id="writerId" className="form-control" />
          </div>
          <div className="col-auto">
            <label htmlFor="joinLimit" className="col-form-label">허용인원</label>
          </div>
          <div className="col-auto">
            <input type="text" id="joinLimit" className="form-control" />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={(e)=>{create()}}>등록</button>
          </div>
        </div>
      </div>
      {/* 등록폼 끝 */}

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="userId" className="col-form-label">유저id</label>
        </div>
        <div className="col-auto">
          <input type="text" id="userId" className="form-control" />
        </div>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">writerId</th>
            <th scope="col">함께해요</th>
          </tr>
        </thead>
        <tbody id="boards">
          {
            boards.length > 0 ?
            boards.map((board, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{board.id}</th>
                  <td>{board.title}</td>
                  <td>{board.writerId}</td>
                  <td>{board.joins.length} / {board.joinLimit} <button className="btn btn-primary" onClick={(e)=>{join(board.id, e)}}>참여</button></td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan={4}>데이터가 존재하지 않습니다.</td>
            </tr>
          }
        </tbody>
      </table>

      <button onClick={(e)=>{test(e)}}>동시성 테스트</button>
    </>
  );

  // const getBoards = () => {
  function getBoards() {
    axios
      .get('http://localhost:8080/boards', {})
      .then((response) => {
        const statusCode = response.status;
        console.log('status code: ' + statusCode);
        if (statusCode === 200) {
          const boards = response.data;
          setBoards(boards);
        }
      })
      .catch((e) => {
        console.log('axios 통신실패');
        console.log(e);
      });
  }

  function test() {
    test_form(9, 0);
    test_form(9, 1);
    test_form(9, 2);
    test_form(9, 3);
    test_form(9, 4);
  }

  function test_form(boardId, userId) {
    axios
      .post(
        `http://localhost:8080/boards/${boardId}/join2`,
        {userId},
        { withCredentials: true },
      )
      .then((response) => {
        const statusCode = response.status;
        // console.log('status code: ' + statusCode);
        if (statusCode === 201) {
          console.log(`id: ${userId} 성공 - status code: ` + statusCode);
          // getBoards();
        } else {
          console.log('status code: ' + statusCode);
        }
      })
      .catch((e) => {
        // console.log('axios 통신실패');
        console.log(e.response.data.message);
      });
  }

  function join(boardId) {
    const userId = document.querySelector('#userId').value;
    // alert(`준비중. boardId: ${boardId}, userId: ${userId}`);
    document.cookie = `userId=${userId}`;
  
    axios
      .post(
        `http://localhost:8080/boards/${boardId}/join`,
        {},
        { withCredentials: true },
      )
      .then((response) => {
        const statusCode = response.status;
        console.log('status code: ' + statusCode);
        if (statusCode === 201) {
          getBoards();
        }
      })
      .catch((e) => {
        // console.log('axios 통신실패');
        console.log(e.response.data.message);
      });
  }

  function create() {
    axios
    .post('http://localhost:8080/boards', {
      title: document.querySelector('#title').value,
      content: document.querySelector('#content').value,
      writerId: parseInt(document.querySelector('#writerId').value),
      joinLimit: parseInt(document.querySelector('#joinLimit').value),
    })
    .then((response) => {
      const statusCode = response.status;
      console.log('status code: ' + statusCode);
      if (statusCode === 201) {
        getBoards();
      }
    })
    .catch((e) => {
      console.log('axios 통신실패');
      console.log(e);
    });
  }
};

export default List;
