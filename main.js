 let model = {};
 let view = {};
 
 let width = document.querySelector('#width');
 let height = document.querySelector('#height');
 let calcbtn = document.querySelector('#calculate');
 let delbtn = document.querySelector('#delete');
 let historyEl = document.querySelector('#parent');
 
 model.getStorage = function(key){
  let storage = localStorage.getItem(key);
  storage = JSON.parse(storage);
  return storage;
 };
 
 model.setStorage = function(key, data){
  let storage = model.getStorage(key);
  let storeArray;
  
  if( null === storage ){
   let storeArray = [];
   storeArray = [...storeArray, data];
   storeArray = JSON.stringify(storeArray);
   localStorage.setItem(key, storeArray);
   
  } else{
   storage = [...storage, data];
   storage = JSON.stringify(storage);
   localStorage.setItem(key, storage);
  }
 }
  
 
 
 view.displayHistory = function(itemObject){
  
  let liEl = document.createElement('li');
   liEl.innerHTML = `${itemObject.width}cm X ${itemObject.height}cm = ${itemObject.answer}cm<sup>2</sup>`;
   historyEl.appendChild(liEl);

 }
 
 
 
 let history = model.getStorage('history');
 
 if(null === history){
  console.log('history is empty')
  
 } else {
  
  console.log('history is not empty')
  history.forEach(function(storageItem){
   view.displayHistory(storageItem);
     });
  
 }
 
 function calcArea(){
  let widthVal = parseInt(width.value);
  let heightVal = parseInt(height.value);
  let answer = widthVal * heightVal / 2;
  answer = Math.floor(answer);
  
  let area = {
   width : widthVal,
   height : heightVal,
   answer : answer
  }
  console.log(area);
  
  view.displayHistory(area);
  
  model.setStorage('history', area);
  
 }
 
 model.deleteStorage = function(){
  localStorage.removeItem('history');
  
  console.log('history cleared');
  
 }
 
 calcbtn.addEventListener('click', calcArea);
 
 delbtn.addEventListener('click', model.deleteStorage);
 
 


