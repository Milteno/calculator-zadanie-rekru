import Calculator from './components/Calculator.js';

const app = {

  renderDisplay: function() {

  },

  initCalculator: function() {
    const thisApp = this;
    thisApp.Calculator = new Calculator(document.querySelector('.calculator'));
  },

  init: function() {
    const thisApp = this;
    thisApp.initCalculator();
  }
};

app.init();