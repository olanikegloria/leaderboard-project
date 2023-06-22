import './style.css';

const saveId = (gameId) => {
  localStorage.setItem('gameId', gameId);
};

const getSavedId = () => {
  const currentGame = localStorage.getItem('gameId');
  return currentGame;
};

const msg = document.querySelector('.msg');
const listContainer = document.querySelector('.list-container');
const refresh = document.querySelector('.refresh');
const createGame = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: 'fifa-2026',
        }),
      });
    const data = await response.json();
    const gameId = data.result.split(' ')[3];
    saveId(gameId);
  } catch (error) {
    console.log('an error occured');
  }
};

const addScore = async (e) => {
  e.preventDefault();
  const user = document.querySelector('.name').value;
  const score = document.querySelector('.score').value;
  const addBtn = document.querySelector('.add-btn');
  addBtn.disabled = true;
  try {
    if (user === '' && score === '') {
      msg.classList.remove('hide');
      msg.textContent = 'enter a valid value';
      setTimeout(() => {
        msg.textContent = '';
        msg.classList.add('bg-black');
      }, 2000);
    } else {
      const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${getSavedId()}/scores/`,
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
      document.querySelector('.name').value = '';
      document.querySelector('.score').value = '';
    }
  } catch (error) {
    console.log('an error occured');
  }
  addBtn.disabled = false;
};

const loadNewGame = async () => {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${getSavedId()}/scores/`);
    const data = await response.json();
    console.log(data);
    let items = '';
    data.result.forEach((item, index) => {
      items += `<p class= "list-pg"> <span class="index">${index + 1}</span> ${item.user}: <span class="score-item">${item.score}</span> </p>`;
    });
    listContainer.innerHTML = items;
  } catch (error) {
    console.log('an error occured');
  }
};
if (!getSavedId()) {
  createGame();
}
const form = document.querySelector('#form');
form.addEventListener('submit', addScore);
refresh.addEventListener('click', loadNewGame);
