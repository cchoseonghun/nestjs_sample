import axios from 'axios';
import { useEffect, useState } from 'react';

const List = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">author</th>
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
                  <td>{board.author}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan={3}>데이터가 존재하지 않습니다.</td>
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
};

export default List;
