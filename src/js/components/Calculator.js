
class Calculator {
  constructor(element) {
    const thisCalculator = this;
    thisCalculator.element = element;
    thisCalculator.string = '';
    thisCalculator.mathSymbols = ['-', '+', '='];
    thisCalculator.firstVal = '';
    thisCalculator.secondVal = '';
    thisCalculator.calculations = 0;
    thisCalculator.displayString = '';

    thisCalculator.renderGrid();
  }

  renderGrid() {
    const thisCalculator = this;

    let html = '';
    let value = 0;
    for(let row = 1; row <= 3; row++) {
      for(let col = 1; col <= 3; col++) {
        value++;
        html += '<div class="field" data-value="' + value + '"><span> '+ value + '</span></div>';
        if (value == 3) {
          html += '<div class="field fieldx2h" data-value=" - "><span> '+ '-' + '</span></div>';
        }
        if (value == 9) {
          html += '<div class="field fieldx2h" data-value=" + "><span> '+ '+' + '</span></div>';
        }
      }
    }

    html += '<div class="field" data-value="' + 0 + '"><span> '+ 0 + '</span></div>';
    html += '<div class="field fieldx2w" data-value=" = "><span> '+ '=' + '</span></div>';
    document.querySelector('.grid-container').innerHTML = html;

    thisCalculator.initActions();
  }

  Count(stringElement) {
    const thisCalculator = this;
    let remSum = stringElement.slice(0, -1);
    let splitArray = remSum.split(' ');

    for (let i=0; i<remSum.length - 2; i+=2) {
      switch(splitArray[i+1]){
      case '-':
        thisCalculator.calculations = parseInt(splitArray[i]) - parseInt(splitArray[i+2]);
        break;
      case '+':
        thisCalculator.calculations = parseInt(splitArray[i]) + parseInt(splitArray[i+2]);
        break;
      }
      splitArray[i+2] = thisCalculator.calculations;
    }
    thisCalculator.displayString = '';
    thisCalculator.string = '';
    return thisCalculator.calculations;
  }

  validateInput(dataValue) {
    const thisCalculator = this;
    if (
      (thisCalculator.mathSymbols.includes(thisCalculator.string[thisCalculator.string.length - 2]) ||
        thisCalculator.string == '') &&
        thisCalculator.mathSymbols.includes(dataValue.trim())
    ) {
      return '';
    }

    return dataValue;
  }

  initActions() {
    const thisCalculator = this;
    thisCalculator.element.querySelector('.grid-container').addEventListener('click', function(e) {
      e.preventDefault();

      console.log(thisCalculator.element);
      if(e.target.classList.contains('field')) {
        thisCalculator.string += thisCalculator.validateInput(e.target.getAttribute('data-value'));

        document.querySelector('.display-content').innerHTML = thisCalculator.string;
        if(e.target.getAttribute('data-value') == ' = ') {
          document.querySelector('.display-content').innerHTML = thisCalculator.Count(document.querySelector('.display-content').innerText);
        }
      }
    });
  }
}

export default Calculator;