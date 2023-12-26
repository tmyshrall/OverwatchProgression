function toggleCheckbox(checkbox) {
  checkbox.classList.toggle("selected");
  saveState();
}

function toggleImage(img) {
  img.classList.toggle("checked");
  saveState();
}

function saveState() {
  const checkboxes = document.querySelectorAll('.adchieveCheckBox');
  const images = document.querySelectorAll('.POTGimages img');
  const ranges = document.querySelectorAll('.levelRange');
  const progressionContainers = document.querySelectorAll('.progressionContainer');

  const checkboxState = {};
  const imageState = {};
  const rangeState = {};

  checkboxes.forEach((checkbox, index) => {
      const key = `checkbox_${index}`;
      checkboxState[key] = checkbox.classList.contains('selected');
  });

  images.forEach((image, index) => {
      const key = `image_${index}`;
      imageState[key] = image.classList.contains('checked');
  });

  ranges.forEach((range, index) => {
      const key = `range_${index}`;
      rangeState[key] = parseInt(range.value, 10);
  });

  localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
  localStorage.setItem('imageState', JSON.stringify(imageState));
  localStorage.setItem('rangeState', JSON.stringify(rangeState));

  const state = Array.from(progressionContainers).map((container, index) => {
      const rangeInput = container.querySelector('.levelRange');
      return {
          key: `range_${index}`,
          value: parseInt(rangeInput.value, 10),
      };
  });

  localStorage.setItem('progressionState', JSON.stringify(state));
}

function restoreState() {
  const checkboxes = document.querySelectorAll('.adchieveCheckBox');
  const images = document.querySelectorAll('.POTGimages img');
  const ranges = document.querySelectorAll('.levelRange');
  const progressionContainers = document.querySelectorAll('.progressionContainer');

  const checkboxState = JSON.parse(localStorage.getItem('checkboxState')) || {};
  const imageState = JSON.parse(localStorage.getItem('imageState')) || {};
  const rangeState = JSON.parse(localStorage.getItem('rangeState')) || {};
  const progressionState = JSON.parse(localStorage.getItem('progressionState')) || [];

  checkboxes.forEach((checkbox, index) => {
      const key = `checkbox_${index}`;
      if (checkboxState[key]) {
          checkbox.classList.add('selected');
      }
  });

  images.forEach((image, index) => {
      const key = `image_${index}`;
      if (imageState[key]) {
          image.classList.add('checked');
      }
  });

  ranges.forEach((range, index) => {
      const key = `range_${index}`;
      if (rangeState[key]) {
          range.value = rangeState[key];
          updateNumber(range.id, 'number1');
      }
  });

  progressionState.forEach((item, index) => {
      const container = progressionContainers[index];
      const rangeInput = container.querySelector('.levelRange');
      const numberLabel = container.querySelector('.value');
      
      rangeInput.value = item.value;
      numberLabel.textContent = item.value;
  });
}

function updateNumber(inputId, numberId) {
    const rangeInput = document.getElementById(inputId);
    const numberLabel = document.getElementById(numberId);
    const inputValue = rangeInput.value;
    numberLabel.textContent = inputValue;
    saveState();
}

document.addEventListener('DOMContentLoaded', () => {
    restoreState();
    updateNumber('input1', 'number1');
});