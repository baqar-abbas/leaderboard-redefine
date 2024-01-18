import './index.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9stjAcDNjnK9zbU8NkG2/scores';

// Post request to the API
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

// GET request to get the data from the API
const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
};

// Displays data in the lists
const displayOnUi = async (data) => {
  const ul = document.querySelector('.displayScore');
  ul.innerHTML = '';
  data.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.user} : ${item.score}`;
    ul.appendChild(li);
  });
};

// Refresh method that gets data and sends data to the displayOnUi method
const refresh = async () => {
  const data = await getData();
  displayOnUi(data);
};

// Form event listener that post request on submit
const form = document.querySelector('.form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { user, score } = form.elements;
  if (user.value === '' || score.value === '') {
    const popup = document.querySelector('.popup');
    popup.style.display = 'block';
    popup.innerHTML = 'Please fill all the fields';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
    return;
  }
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
  }, 3000);
});

// Refresh button that refreshes the page and calls the refresh method
const refreshBtn = document.querySelector('.refreshbtn');
refreshBtn.addEventListener('click', () => {
  window.location.reload();
  refresh();
});

refresh();
