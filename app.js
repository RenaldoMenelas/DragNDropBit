const startGameText = document.getElementById('whole-number');
const instructions = document.getElementsByClassName('hide')[0];
const instructionsBtn = document.querySelector('.instructionsBtn');
const binaryChartNum = document.getElementsByClassName('digit');
const blurredElements = document.querySelectorAll('.blurr');
const diagramPopupBtn = document.querySelector('.openDiagram');
const diagramDemo = document.getElementsByClassName('demo-diagram-container')[0];
const continue_btn = document.getElementById('continue_btn');
const closeBtn = document.getElementsByClassName('closeInstructions')[0];
const aside = document.querySelector('aside');

instructionsBtn.addEventListener('click', () => {
  for (let i = 0; i < 4; i++) {
    binaryChartNum[i].classList.add('fade-unused-num');
  }
  instructions.classList.remove('hide');
});

diagramPopupBtn.addEventListener('click', () => {
  blurredElements.forEach(el => el.classList.add('blur'));
  diagramDemo.classList.remove('hide');
  instructions.classList.add('hide');
});

continue_btn.addEventListener('click', () => {
  blurredElements.forEach(el => el.classList.remove('blur'));
  diagramDemo.classList.add('hide');
});


closeBtn.addEventListener('click', () => {
  console.log(45)
  aside.classList.add('hide')
});


// Drag & drop setup
const dragElem = document.querySelectorAll('.dragElem');
let draggableElems = [...dragElem];

// initialize drag behaviors
draggableElems.forEach(element => {
  element.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', element.id);
  });

  element.addEventListener('dragover', e => {
    e.preventDefault();
    element.classList.add('draggingOver');
  });

  element.addEventListener('dragleave', e => {
    e.preventDefault();
    element.classList.remove('draggingOver');
  });
});

const extraNums = document.querySelectorAll('.extra-dragElem');
const extraDigits = Array.from(extraNums);

extraDigits.forEach(element => {
  element.addEventListener('dragstart', e => {
    // allow dragging extra digits too
    e.dataTransfer.setData('text/plain', element.id);
  });

  element.addEventListener('dragover', e => {
    e.preventDefault();
    element.classList.add('draggingOver');
  });

  element.addEventListener('dragleave', e => {
    e.preventDefault();
    element.classList.remove('draggingOver');
  });
});

// drop behavior (swap text content)
draggableElems.forEach(element => {
  element.addEventListener('drop', e => {
    e.preventDefault();
    element.classList.remove('draggingOver');

    const droppedElemId = e.dataTransfer.getData('text/plain');
    const droppedElem = document.getElementById(droppedElemId);
    //if (!droppedElem) return;

    const prevElemText = element.textContent;
    element.textContent = droppedElem.textContent;
    droppedElem.textContent = prevElemText;

    // rebuild current string
    let result = '';
    for (const elem of draggableElems) {
      result += elem.textContent;
    }

    // remove last two (extra) digits
    const resultSlice = result.slice(0, -2);

    if ((startGameText.textContent >>> 0).toString(2) === resultSlice) {
      const limitedDraggableElems = draggableElems.slice(0, -2);
      setTimeout(nextNumber, 2000);
      startGameText.textContent = 'correct';
      startGameText.style.color = 'burlywood';
      document.getElementsByTagName('p')[0].textContent =
        "- Note sometimes you'll need to grab more digits to solve problem.";

      limitedDraggableElems.forEach(elem => {
        elem.style.backgroundColor = 'bisque';
        for (let i = 0; i < 4; i++) {
          binaryChartNum[i].classList.remove('fade-unused-num');
        }
      });
      console.log('Correct!');
    }
  });
});

let arr = [9, 8, 14, 11, 12, "that's all for now...."];

function nextNumber() {
  draggableElems.forEach(elem => {
    elem.style.backgroundColor = 'white';
  });
  startGameText.style.color = 'grey';

  // advance queue
  const next = arr.shift();
  if (next !== undefined) {
    startGameText.textContent = next;
  }
}
