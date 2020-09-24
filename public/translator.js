import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';
// $(function){}
$(document).ready(()=>{
$('#translate-btn').on("click",()=>{
  translate();
});
$('#clear-btn').on('click',()=>{
  clear();
})
});

function translate(){
  document.getElementById("error-msg").innerHTML='';
  document.getElementById('translated-sentence').innerHTML='';
  if(document.getElementById('text-input').value==''){
    document.getElementById('error-msg').innerHTML='Error: No text to translate.';
  }else{
    if(document.getElementById('locale-select').value=='american-to-british'){
      americanToBritish();
    }else{
      britishToAmerican();
    }
  }
}

function clear(){
document.getElementById('text-input').value='';
document.getElementById('translated-sentence').innerHTML="";
document.getElementById('error-msg').innerHTML='';
}

function spaceMatcher(translated,key,translation){//this is for americanonly and british only since some words have space in them 
//which will make the case matcher malfunction
  var result='';
  if(/[^A-Za-z0-9]/.test(translated[0])){
    result+=translated[0];
  }
  var i=0;
  result+=translation;
  if(/[^A-Za-z0-9]/.test(translated[translated.length-1])){
    result+=translated[translated.length-1];
  }
  return result;
}
function spaceAndCaseMatcher(translated,key,translation){//this should workfor both spelling and title
  var result='';
  var arr=[];
  if(/[^A-Za-z0-9]/.test(translated[0])){
    result+=translated[0];
    
  }
  var i=0;
  for(i;i<key.length && i<translation.length;i++){
    if(key.charCodeAt(i)>=65 && key.charCodeAt(i)<=90){
      result+=translation[i].toUpperCase();
      
    }else if(key.charCodeAt(i)>=97 && key.charCodeAt(i)<=122){
      result+=translation[i].toLowerCase();
    }else{
      result+=translation[i];
    }
 
  }
  for(i;i<translation.length;i++){
    result+=translation[i];
  
  }
  if(/[^A-Za-z0-9]/.test(translated[translated.length-1])){
    result+=translated[translated.length-1];
  
  }
  return result;
}

function americanToBritish(){
  var input = document.getElementById('text-input').value;
  //american only
  var americanOnlyKey;
  for(americanOnlyKey in americanOnly){
    var reg= new RegExp('(^|\\s|[^A-Za-z0-9])'+americanOnlyKey+'(\\s|$|[^A-Za-z0-9])','ig');
    var regKey= new RegExp(americanOnlyKey,'ig');
    var regResult=reg.exec(input);
    var regKeyResult=regKey.exec(input);
    if(regResult!=null){
      input=input.replace(reg,'<span class="highlight">'+spaceMatcher(regResult[0],regKeyResult[0],americanOnly[americanOnlyKey])+'</span>');
    }
  }

//american to british spelling american -> british
var americanToBritishSpellingKey;
for (americanToBritishSpellingKey in americanToBritishSpelling){
  var reg= new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishSpellingKey+'(\\s|$|[^A-Za-z0-9])','ig');
  var regKey= new RegExp(americanToBritishSpellingKey,'ig');
  var regResult=reg.exec(input);
  var regKeyResult=regKey.exec(input);
  if(regResult!=null){
    input=input.replace(reg,'<span class="highlight">'+spaceAndCaseMatcher(regResult[0],regKeyResult[0],americanToBritishSpelling[americanToBritishSpellingKey])+'</span>');
  }
}

//american to british title american -> british
var americanToBritishTitlesKey;
for(americanToBritishTitlesKey in americanToBritishTitles){
  var reg= new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishTitlesKey+'(\\s|$|[^A-Za-z0-9])','ig');
  var regKey= new RegExp(americanToBritishTitlesKey,'ig');
  var regResult=reg.exec(input);
  var regKeyResult=regKey.exec(input);
  if(regResult!=null){
    input=input.replace(reg,'<span class="highlight">'+spaceAndCaseMatcher(regResult[0],regKeyResult[0],americanToBritishTitles[americanToBritishTitlesKey])+'</span>');
  }
}

//translate time american to british ex: 10:30 -> 10.30
//{x,y} in regex doesn't seem to work properly it seems 
var reg=/\d{1,2}\:\d{1,2}/;
if(reg.exec(input)!=null){
  var temp = reg.exec(input).toString();
  temp=temp.replace(':','.');
  input=input.replace(reg.exec(input).toString(),'<span class="highlight">'+temp+'</span>');
}
 
  if(input.includes('<span class="highlight">')==false){
    document.getElementById('translated-sentence').innerHTML='Everything looks good to me!';
  }else{
  document.getElementById('translated-sentence').innerHTML=input;
  }
}

function britishToAmerican(){
  var input=document.getElementById('text-input').value;

  //britishOnly
  var britishOnlyKey;
  for(britishOnlyKey in britishOnly){
    var reg= new RegExp('(^|\\s|[^A-Za-z0-9\-])'+britishOnlyKey+'(\\s|$|[^A-Za-z0-9])','ig');
    var regKey= new RegExp(britishOnlyKey,'ig');
    var regResult=reg.exec(input);
    var regKeyResult=regKey.exec(input);
    if(regResult!=null){
      input=input.replace(reg,'<span class="highlight">'+spaceMatcher(regResult[0],regKeyResult[0],britishOnly[britishOnlyKey])+'</span>');
    }
  }

  //americanToBritishSpelling british->american
  var britishToAmericanSpellingKey;
  for (britishToAmericanSpellingKey in americanToBritishSpelling){
    var reg= new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishSpelling[britishToAmericanSpellingKey]+'(\\s|$|[^A-Za-z0-9])','ig');
    var regKey= new RegExp(americanToBritishSpelling[britishToAmericanSpellingKey],'ig');
    var regResult=reg.exec(input);
    var regKeyResult=regKey.exec(input);
    if(regResult!=null){
      input=input.replace(reg,'<span class="highlight">'+spaceAndCaseMatcher(regResult[0],regKeyResult[0],britishToAmericanSpellingKey)+'</span>');
    }
   }
  // american to british title british ->american
  var britishToAmericanTitleKey;
  for(britishToAmericanTitleKey in americanToBritishTitles){
    var reg= new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishTitles[britishToAmericanTitleKey]+'(\\s|$|[^A-Za-z0-9])','ig');
    var regKey= new RegExp(americanToBritishTitles[britishToAmericanTitleKey],'ig');
    var regResult=reg.exec(input);
    var regKeyResult=regKey.exec(input);
    if(regResult!=null && regKeyResult!=null){
      input=input.replace(reg,'<span class="highlight">'+spaceAndCaseMatcher(regResult[0],regKeyResult[0],britishToAmericanTitleKey)+'</span>');
    }
   }

  //translate time british -> american ex: 10.30-> 10:30
  var reg=/\d{1,2}\.\d{1,2}/;
  if(reg.exec(input)!=null){
    var temp = reg.exec(input).toString();
    temp=temp.replace('.',':');
    input=input.replace(reg.exec(input).toString(),'<span class="highlight">'+temp+'</span>');
    }
 
  if(input.includes('<span class="highlight">')==false){
    document.getElementById('translated-sentence').innerHTML='Everything looks good to me!';
  }else{
  document.getElementById('translated-sentence').innerHTML=input;
  }
  
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    translate,clear,britishToAmerican,americanToBritish
  }
} catch (e) {}
