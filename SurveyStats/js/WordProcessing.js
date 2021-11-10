var sensetiveDetails = ['name', 'id', 'address', 'phone', 'contact']

async function load(url) {
  let obj = null;
  
  try {
      obj = await (await fetch(url)).json();
  } catch(e) {
      console.log('error');
  }
  
  console.log(obj);
  return obj;
}

function isSensetive(keyWord){
  console.log(keyWord)
  var keyWords = keyWord.split(/(?:,| |_)+/);
  for(var i = 0; i < keyWords.length; i++){
    var word = keyWords[i];
    console.log(word)
    var url1 = 'https://api.wordnik.com/v4/word.json/';
    var url2 = '/relatedWords?useCanonical=false&limitPerRelationshopType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
    var simWords = load(url1 + word.toLowerCase() + url2);
    for(var j in simWords){
      for(var k in sensetiveDetails){
        if(k == j){
          return true;
        }
      }
    }
  }
  return false;
}

export {isSensetive}