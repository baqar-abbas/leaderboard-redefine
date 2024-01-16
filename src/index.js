import './index.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/2czXbR0HaMGgkDCOs2vR/scores';

const postData = async (user, score) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ user, score }),
  });

  const data = await response.json();
  return data.result;
};

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
};

const displayOnUi = async (data) => {
  const ul = document.querySelector('.displayScore');
  ul.innerHTML = '';
  data.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.user} : ${item.score}`;
    ul.appendChild(li);
  });
};

const refresh = async () => {
  const data = await getData();
  displayOnUi(data);
};

const form = document.querySelector('.form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { user, score } = form.elements;
  const data = await postData(user.value, score.value);
  refresh();
  form.reset();
  const popup = document.querySelector('.popup');
  setTimeout(() => {
    popup.style.display = 'block';
    popup.innerHTML = `${data}`;
  }, 1000);
  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000);
});

const refreshBtn = document.querySelector('.refreshbtn');
refreshBtn.addEventListener('click', () => {
  window.location.reload();
  refresh();
});

refresh();
