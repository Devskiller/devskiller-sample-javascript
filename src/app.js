// TODO: implement logic of the calculator interface!
// you can use the code below

// logic

const state = {
  get display(){
    return document.getElementById('display').value
  },
  set display(value){
    document.getElementById('display').value = value
  }
}

// UI

function onClick(testId, callback) {
  document.getElementById(testId).addEventListener('click', callback);
}
