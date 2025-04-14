const API_KEY = '02zOkUPPYIAZMlDkLfgJNcajB5fb96nCyBxWyatFmkwgSwxZwzmuFvvYT0TMOIHV';
const form = document.getElementById('search-form');
const input = document.getElementById('search-query');
const resultsDiv = document.getElementById('icon-results');
const clearBtn = document.getElementById('clear-btn');
const randomBtn = document.getElementById('random-btn');
const messageDiv = document.getElementById('message');

// 1. Handle search form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  fetchIcons(query);
});

// 2. Handle clear button
clearBtn.addEventListener('click', () => {
  resultsDiv.innerHTML = '';
  messageDiv.textContent = '';
});

// 3. Handle random button (predefined random word)
randomBtn.addEventListener('dblclick', () => {
  const randomWords = ['heart', 'car', 'wifi', 'code', 'fire', 'home'];
  const word = randomWords[Math.floor(Math.random() * randomWords.length)];
  input.value = word;
  fetchIcons(word);
});

// 4. Fetch icons from Iconfinder API
async function fetchIcons(query) {
    const url = `https://api.iconfinder.com/v4/icons/search?query=${encodeURIComponent(query)}&count=5&premium=0`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.icons.length === 0) {
        messageDiv.textContent = 'No icons found.';
        resultsDiv.innerHTML = '';
        return;
      }
  
      displayIcons(data.icons);
    } catch (err) {
      messageDiv.textContent = 'Error fetching icons. Please try again.';
      console.error('Fetch Error:', err);
    }
  }
  

// 5. Display icons
function displayIcons(icons) {
    resultsDiv.innerHTML = '';
    messageDiv.textContent = '';
  
    icons.forEach((icon) => {
      const img = document.createElement('img');
      img.src = icon.raster_sizes.at(-1).formats[0].preview_url;
      img.alt = icon.tags.join(', ');
      resultsDiv.appendChild(img);
    });
  }
  
