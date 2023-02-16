// window.onload = () => {
window.addEventListener('DOMContentLoaded', () => {
  getBoards();
});
// };

const getBoards = () => {
  axios({
    url: 'http://localhost:8080/boards',
    method: 'get',
    // data: {},
  })
    .then((response) => {
      const statusCode = response.status;
      console.log('status code: ' + statusCode);
      if (statusCode === 200) {
        const boards = response.data;
        document.querySelector('#boards').innerHTML = '';
        boards.forEach((board) => {
          const temp = `
            <tr>
              <th scope="row">${board.id}</th>
              <td>${board.title}</td>
              <td>${board.writerId}</td>
              <td>${board.joins.length} / ${board.joinLimit} <button class="btn btn-primary" onclick="join(${board.id})">참여</button></td>
            </tr>
          `;
          document.querySelector('#boards').insertAdjacentHTML('beforeend', temp);
        });
      }

    })
    .catch((e) => {
      console.log("axios 통신실패");
      console.log(e);
    });
};

const join = (boardId) => {
  const userId = document.querySelector('#userId').value;
  alert(`준비중. boardId: ${boardId}, userId: ${userId}`);
}