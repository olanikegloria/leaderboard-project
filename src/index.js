import './style.css';

let gameId = '';
const addNew = document.querySelector('.add-new');
const loadGame = document.querySelector('.refresh-btn');
const createGame = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'fifa-2023',
      }),
    });
  const data = await response.json();
  [, , , gameId] = data.result.split(' ');
  return gameId;
};

const addScore = async (e) => {
  e.preventDefault();
  const user = document.querySelector('.name').value;
  const score = document.querySelector('.score').value;
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user,
        score,
      }),
    });
  const data = await response.json();
  console.log(data);
};

const loadNewGame = async (e) => {
  e.preventDefault();
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`);
  const data = await response.json();
  const displayScores = document.querySelector('.score-container');
  console.log(data);
  const listItem = document.createElement('li');
  data.result.forEach((item) => {
    listItem.innerHTML = `<p>${item.user}: ${item.score}</p>`;
  });
  displayScores.appendChild(listItem);
};

createGame();
addNew.addEventListener('click', addScore);
loadGame.addEventListener('click', loadNewGame);
