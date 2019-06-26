# TTT-TEST-APP
Assignment for TTT


This is an MERN-application for task of TTT.<br>
  Backend(Nodejs)
The backend part consist of 3 functions and 2 dependencies <br>
1.Dependencies :-<br>
2.Request:-To requet the hosted file to extract it contents<br>
Express<br>
User-defined Functions<br>
1.extractwords<br>
2.testwords<br>
When the server of backend is started a get request is send to URL:-https://terriblytinytales.com/test.txt.This get request on recieving data checks for 7 Regex.
For preprocessing i have used replace and split function of js.When i encountered a \n i replaced it with space and then split it by space.The idea of  word count  is to seperate the words having structure similar to email,links,containng slashes in between them or having @ only<br>
Here is list of Regex being used to different<br><br>
1.'[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+':- A regex to check for email for eg:-xyz@gmail.com<br>
2.'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\\b([-a-zA-Z0-9@:%_\+.#?&//=]*)' :-A regex to filter out links starting with https<br>
3.(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\\b([-a-zA-Z0-9@:%_\+.~#?&//=]*):-A regex to filter out links starting with www<br>
4.[a-z]+\.com\/+[a-z]+':- A regex to filter links like xyz.com<br>
5.[a-z]+\/[a-z]+ :-Regex to filter words like city/country<br>
6.\@[a-z]+:-A regex to filer out words like @ttt<br>
7. [a-z]+\-[a-z]+:-A regex to filter out words like city-country<br>
8.[a-z]+\’[a-z]+ and [a-z]+\'[a-z]+:- A regex to filer out apostrophe words<br><br>
When we recieve data the first we test  if it is matching with Regext:-1,2,3,4,5,6,7.This check is done to filter words which matches with links ,email,of having -or/ as a special character between them<br>
After that to extract words which match with above conditions i callled extractwords(User-defined function)<br>
<br>
Working of extractwords<br>
This function check for the occurance of special characters within a word when a character between a-z i.e [a-z] is found then a counter is increased to find length of a word.If again
a special character is found then the counter is set to 0 and the found word count is increased.I stored count of word in map.Moreover to find count of words like terriblytinytales simly compare the word with terriblytinytalse and 
if found increment count of terribly,tiny and tales.The time complexity of this whole operation will O(n) where n is length of word.<br>
<br>
Working of testwords<br>
If a word doesn't pass regex-1,2,3,4,5,6,7, then i called testwords.This function first check if word contain apostophe' in it which is check by regex 8.If yes
then find index of apostrophe slice it.The words after slicing were:-<br>
re(are)<br>
ll(will)<br>
ve(have)<br>
So simply by checking if sliced word match with above then increment the count of words present in paranthesis.If apostrophe is not present then simply remove special characters and increment their count if exist else initialize them.
This step is also O(n) where n is length of word.
Some sample SS<br>
Result of Regex:1,2,3,4,5,6,7<br>
![Screenshot from 2019-06-26 14-22-41](https://user-images.githubusercontent.com/37747717/60165982-f3025280-981d-11e9-8b9b-accbfdfe5387.png)
<br>
Extracted Words by extractwords

![Screenshot from 2019-06-26 14-26-10](https://user-images.githubusercontent.com/37747717/60166302-89cf0f00-981e-11e9-82d9-ca69ad81b0be.png)<br>
Note:-this is sample SS,there are more words extracted by function<br>
Apostrophe function result:-<br>
![Screenshot from 2019-06-26 14-29-18](https://user-images.githubusercontent.com/37747717/60166975-bfc0c300-981f-11e9-9479-9668b4ef69f9.png)<br>
After the above is done a sortProperties(User-defined-function) is called this function sorts all the keys in object according to their occurance.usually the sort used is merge sort which have time complexity ofO(nlogn)<br>
When endpoint:-/getwords/:id is called then the :id denotes the top n words to be searched which is shown in react front-end.<br>
<br>

This is frontend of application<br>
<br>

![Screenshot from 2019-06-26 15-05-13](https://user-images.githubusercontent.com/37747717/60169158-d10bce80-9823-11e9-96de-c0e7c149da3b.png)

Search Button will show top n words types in input field.Show all words will show all words sorted in descending order.
