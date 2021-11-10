async function load(url) {
  let obj = null;
  
  try {
      obj = await (await fetch(url)).json();
  } catch(e) {
      console.log('error');
  }
  
  // console.log(obj);
  return obj;
}

var sensetiveWords = ['name', 'id', 'address', 'phone', 'contact']
var url1 = 'https://api.wordnik.com/v4/word.json/';
var url2 = '/relatedWords?useCanonical=false&limitPerRelationshopType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
var completeSensetiveWords = [];
for(var i = 0; i < sensetiveWords.length; i++){
  var word = sensetiveWords[i];
  var simWords = load(url1 + word.toLowerCase() + url2);
  completeSensetiveWords.concat(simWords);
}



function isSensetive(keyWord){
  // console.log(keyWord)
  var keyWords = keyWord.split(/(?:,| |_)+/);
  for(var i = 0; i < keyWords.length; i++){
    var word = keyWords[i];
    for(var sWord in completeSensetiveWords){
      if(word == sWord){
        return true;
      }
    }
  }
  return false;
}

export {isSensetive}