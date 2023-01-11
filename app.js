const wrapper = document.querySelector('.wrapper'),
  searchInput = wrapper.querySelector('input');
synonyms = wrapper.querySelector('.synonyms .list'),
  infoText = wrapper.querySelector('.info-text'),
  volumeIcon = wrapper.querySelector('.word i')
let audio;

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
  } else {
    console.log(result);
    wrapper.classList.add('active');
    let definitions = result[0].meanings[0].definitions[0];
    example = result[0].meanings[1].definitions[0];
    phonetics = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;

    document.querySelector('.word p').innerText = result[0].word;
    document.querySelector('.word span').innerText = phonetics;
    document.querySelector('.meaning span').innerText = definitions.definition;
    document.querySelector('.example span').innerText = example.example;
    audio = new Audio('https:' + result[0].phonetics[0].audio);


    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = 'none';
    } else {
      synonyms.parentElement.style.display = 'block';
      synonyms.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let tag = `<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
        sysnoyms.insertAdjacentHTML('beforeend', tag);
      }
    }
  }
}

function search(word) {
  searchInput.value = word;
  fetchApi(word);
}

function fetchApi(word) {
  infoText.style.color = '#000';
  infoText.innerHTML = `Searching the meaning of < span > "${word}"</ > `;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener('keyup', e => {
  if (e.key === 'Enter' && e.target.value) {
    fetchApi(e.target.value);
  }
});

volumeIcon.addEventListener('click', () => {
  audio.play();
})