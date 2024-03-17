// 3D Scroll

let zSpacing = -1000,
  lastPos = zSpacing / 4,
  $frames = document.getElementsByClassName('frame'),
  frames = Array.from($frames),
  zVals = []

window.onscroll = function () {

  let top = document.documentElement.scrollTop,
    delta = lastPos - top

  lastPos = top

  frames.forEach(function (n, i) {
    zVals.push((i * zSpacing) + zSpacing)
    zVals[i] += delta * -5.5
    let frame = frames[i],
      transform = `translateZ(${zVals[i]}px)`,
      opacity = zVals[i] < Math.abs(zSpacing) / 1.9 ? 1 : 0
    frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
  })

}

window.scrollTo(0, 1)

// Audio

let soundButton = document.querySelector('.soundbutton'),
  audio = document.querySelector('.audio')

soundButton.addEventListener('click', e => {
  soundButton.classList.toggle('paused')
  audio.paused ? audio.play() : audio.pause()
})

window.onfocus = function () {
  soundButton.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function () {
  audio.pause()
}



// зміна теми====================================
window.addEventListener("load", windowLoad);
const checkButton = document.getElementById('toggle')
function windowLoad() {
  // HTML
  const htmlBlock = document.documentElement;

  // Отримуємо збережену тему
  const saveUserTheme = localStorage.getItem('user-theme');

  // Робота з системними налаштуваннями
  let userTheme;
  if (window.matchMedia) {
    userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    !saveUserTheme ? changeTheme() : null;
  });
  if (window.matchMedia('(prefers-color-scheme: dark)')) {
    checkButton.checked = true;

  };

  // Зміна теми по кліку
  const themeButton = document.querySelector('.page__theme');


  // const resetButton = document.querySelector('.page__reset');
  if (themeButton) {
    themeButton.addEventListener("click", function (e) {
      // resetButton.classList.add('active');
      changeTheme(true);
    });
  }

  // if (resetButton) {
  // 	resetButton.addEventListener("click", function (e) {
  // 		resetButton.classList.remove('active');
  // 		localStorage.setItem('user-theme', '');
  // 	});
  // }

  // Функція додавання класу теми
  function setThemeClass() {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme)
      // resetButton.classList.add('active');
    } else {
      htmlBlock.classList.add(userTheme);
    }
  }
  // Додаємо клас теми
  setThemeClass();

  // Функція зміни теми
  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
    let newTheme;

    if (currentTheme === 'light') {
      newTheme = 'dark';
      checkButton.checked = true;
    } else if (currentTheme === 'dark') {
      newTheme = 'light';
      checkButton.checked = false;
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
  }
}