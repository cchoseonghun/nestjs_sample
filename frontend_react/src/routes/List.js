import axios from 'axios';
import { useEffect, useState } from 'react';

const List = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
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

  function join(boardId) {
    const userId = document.querySelector('#userId').value;
    alert(`준비중. boardId: ${boardId}, userId: ${userId}`);
  }
};

export default List;
