const search = document.querySelector('.button')
const body = document.querySelector('body')
const theme = document.querySelector('.theme')
const containr = document.querySelector('.container')
let message = document.querySelector('.message')
let input = document.querySelector('.main')
let img = document.querySelector('img')

// API call
search.addEventListener('click', () => {
  fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${input.value}?key=90be4d10-9206-48e5-8f11-9d973d008066`)
    .then((res) => res.json())
    .then((data) => {
      message.innerHTML = ''

      // API implementation
      if (input.value === '') {
        message.innerHTML = 'Please enter an input'
      } else if (input) {
        const headword = document.createElement('p')
        const definition = document.createElement('p')
        let root = data[0].meta.id
        if (root.includes(':1')) {
          root = root.substring(0, root.length - 2)
        }
        definition.innerText = data[0].shortdef
        headword.innerText = root

        headword.classList.add('word')

        message.append(headword, definition)
      }
    })
    .catch((err) => console.log(err))

  // voice synthesis
  let voice = new SpeechSynthesisUtterance()
  voice.text = input.value
  speechSynthesis.speak(voice)
})

// dark mode
theme.addEventListener('click', () => {
  body.classList.toggle('dark')
  theme.classList.toggle('dark')
  search.classList.toggle('dark')
  containr.classList.toggle('dark')
  input.classList.toggle('dark')
  message.classList.toggle('dark')
  if (img.src.includes('theme.svg')) {
    img.src = 'images/theme-1.svg'
  } else {
    img.src = 'images/theme.svg'
  }
})
