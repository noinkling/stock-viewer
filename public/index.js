/*global io*/

var socket = io();

var form = document.getElementById('add-stock');
var input = document.getElementById('add-stock--input');
var list = document.getElementById('stock-list');

form.onsubmit = function(e) {
  e.preventDefault();
  socket.emit('add stock', input.value);
  // input.value = '';
  form.reset();
};

list.onclick = function(e) {
  if (e.target instanceof HTMLLIElement) {
    socket.emit('remove stock', e.target.textContent);
  }
}

socket.on('add stock', function(stock) {
  var el = document.createElement('li');
  el.textContent = stock;
  list.appendChild(el);
  socket.on('remove stock', function(stockName) {
    if (stock === stockName)
      el.parentNode.removeChild(el);
  });
});

