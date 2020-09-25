# FreeCodeCamp American / British Translator
For the fifth and final project of FreeCodeCamp's Quality Assurance Curriculum, we have to make an American / British Translator.

## Live Demo on Repl
https://freecodecamp-american-british-translator.jordyf15.repl.co/

## Technologies Used:
1. HTML
2. CSS
3. Javascript
4. @babel/core version ^7.9.0
5. @babel/preset-env version ^7.9.5
6. @babel/register version ^7.9.0
7. body-parser version ^1.19.0
8. chai version ^4.2.0
9. cors version ^2.8.5
10. dotenv version ^8.2.0
11. express version ^4.17.1
12. jquery version ^3.5.1
13. jsdom version ^16.2.2
14. mocha version ^6.2.3
15. nodemon version ^2.0.3

## User stories:
1. I can enter a simple sentence into the text area and select whether to translate to British or American English from the dropdown menu.
2. When the "Translate" button is pressed, append the translated sentence to the `translated-sentence` `div`. See the JavaScript files in `/public` for the different spelling and terms your application should translate.
3. Your application should handle the way time is written in American and British English. For example, ten thirty is written as "10.30" in British English and "10:30" in American English.
4. Your application should also handle the way titles/honorifics are abbreviated in American and British English. For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See `/public/american-to-british-titles.js` for the different titles your application should handle.
5. Wrap any translated spelling or terms with `<span class="highlight">...</span>` tags so they appear in green.
6. If the sentence in the text area has no spelling or terms that should be translated, append the message "Everything looks good to me!" to the `translated-sentence` `div`.
7. If there is no text in the text area, append the message "Error: No text to translate." to the `error-msg` `div` so the text appears in red.
8. I can press the "Clear Input" button to remove all text from the text area and the `translated-sentence` `div`.
9. All 20 unit tests are complete and passing. See `/tests/1_unit-tests.js` for the sentences you should write tests for.
10. All 4 functional tests are complete and passing. See `/tests/2_functional-tests.js` for the functionality you should write tests for.

## Project Description
There are 3 files in total that we need to edit in the FreeCodeCamp's [boilerplate](https://repl.it/github/freeCodeCamp/boilerplate-project-american-british-english-translator) so that the Translator can work properly and pass the test.

### public/translator.js
This is where all of the logic of the Translator will go in such as functions, event listeners and handlers.  

There are 6 function in total that i created in order for the translator to work properly.
1. **translate**  
This function will run the americanToBritish or britishToAmerican function depending on the locale-select element value. This will also clear the error-msg text and previous translated-sentence text.
2. **clear**  
This function will clear the value of textarea `#text-input` and also the innerHTMLs div `#translated-sentence` and `#error-msg`.

3. **spaceMatcher**  
This function will be used to translate words from american only and british only. This will match the space or other special characters from the first index and the last index of the translated into the translation due to the regex that we used.  
For example: 
translated=' abseil' , translation='rappel' then result will be ' rappel'.  
This function accepts 2 parameter the translated word, and the translation.

4. **spaceAndCaseMatcher**  
This function will be used to translate words for american-to-british-spelling and titles. This will match not only the space of first and last index but also the case of the letters.  
Example:
translated=' AbSeIl' , translation='rappel' then the result will be ' RaPpEl'.  
This function accepts 3 parameter the translated word, the translated key word, and the translation. The translated key word is just the translated word without the space in the first and last index, this will be used to adjust the casing of the translation.

5. **americanToBritish**  
This function will translate the sentence from american to british.  
First it will search the word from american only that can be translated to british using a regex of `new RegExp('(^|\\s|[^A-Za-z0-9])'+americanOnlyKey+'(\\s|$|[^A-Za-z0-9])','ig');` to make sure its a whole word with space at each side. Then it will replace it with its translation adjusted using the spaceMatcher function.  
Second it will search the word from american to british spelling using a regex of  `new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishSpellingKey+'(\\s|$|[^A-Za-z0-9])','ig');` again to make sure it's a whole word. Then it will replace it with its translation adjusted using the spaceAndCaseMacther function.  
Third it will search the word from american to british titles using a regex of `new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishTitlesKey+'(\\s|$|[^A-Za-z0-9])','ig')` to make sure it's a whole word. Then it will replace it with it's translation adjusted using the spaceAndCaseMatcher function.  
The last one is to translate time writing from american to british by searching the time with a regex of `/\d{1,2}\:\d{1,2}/` then replace the ':' in it with '.'.

6. **britishToAmerican**  
This function will translate the sentence from british to american.  
First it will search the word from british only with a regex of `new RegExp('(^|\\s|[^A-Za-z0-9\-])'+britishOnlyKey+'(\\s|$|[^A-Za-z0-9])','ig');` to make sure it's a whole and also a special case where the translation will be translated again such as fish-and-chip (that is why with the extra - in the regex), then it will adjust the translation using spaceMatcher function.   
Second it will search the word from american to british spelling using a regex of `new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishSpelling[britishToAmericanSpellingKey]+'(\\s|$|[^A-Za-z0-9])','ig');` then it will replace the word with it's translation adjusted using the spaceAndCaseMatcher function.  
Third it will search the word from american to british title using a regex of `new RegExp('(^|\\s|[^A-Za-z0-9])'+americanToBritishTitles[britishToAmericanTitleKey]+'(\\s|$|[^A-Za-z0-9])','ig');` then it will replace the word with it's translation adjusted using the spaceAndCaseMatcher function.  
Last it will search for an american time writing using a regex of `/\d{1,2}\.\d{1,2}/` then replace the '.' with ':'.

### 1_unit-tests.js
There are 20 test in this file that we need to edit and have it pass. All of the tests in this file is to check whether the translation from british to american or american to british works properly or not.

### 2_functional-tests.js
There are 4 functional test in this file that we need to edit and have it pass.
1. Translation appended to the `translated-sentence` `div`  
This test will check whether the translated word will be wrapped with the `<span class="highlight">...</span>` tags and also appended to the div `#translated-sentence`.
2. 'Everything looks good to me!' message appended to the `translated-sentence` `div`  
This test will check whether if nothing needs to be translated then it will append the 'Everything looks good to me!' to the div `#translated-sentence`.
3. 'Error: No text to translate.' message appended to the `error-msg` `div`  
This test will check whether if the text area value is empty and it will be translated it should append the 'Error: No text to translate.' to the div `#error-msg`.
4. Text area, `translated-sentence`, and `error-msg` are cleared  
This test will check whether if the clear function is activated it should clear the text area and divs `#translated-sentence` and `#error-msg`.

## Notes from the previous FreeCodeCamp's Boilerplate README
* All logic can go into `public/translator.js`.
* Create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`.
* To run the tests on Repl.it, set NODE_ENV to test without quotes in the .env file.
* To run the tests in the console, use the command npm run test. To open the Repl.it console, press Ctrl+Shift+P (Cmd if on a Mac) and type "open shell".
