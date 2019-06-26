const express = require('express')
const route = express.Router();
const request = require('request')
const spli = RegExp('/\n/')
var tabs = RegExp('[\t]')

const regex = RegExp('([a-z]+[\s])')
const email = RegExp('[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+')
const links = RegExp('https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')
const links2 = RegExp('(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)')
const links3 = RegExp('[a-z]+\.com\/+[a-z]+')
const slashes = RegExp('[a-z]+\/[a-z]+')
const atrate = RegExp('\@[a-z]+')
const das = RegExp('[a-z]+\-[a-z]+')
const apos = RegExp('[a-z]+\’[a-z]+')
const apos2 = RegExp('[a-z]+\'[a-z]+')
var list = []
var words = {}
route.get('/', async (req, res) => {
  res.json("RNNING")
})

//A FUNCTION TO SORT OBJECT
function sortProperties(obj) {
  var sortable = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      sortable.push([key, obj[key]]);
    }
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortable;
}
let content = ''


//A FUNCTION TO CHECK APHOSTROPHE WORDS '
function checkword(x) {
  if (x == 're') {
    if (words['are']) {
      words['are']++;
    }
    else {
      words['are'] = 1;
    }
  }

  else if (x == 'll') {
    if (words['will']) {
      words['will']++;
    }
    else {
      words['will'] = 1;
    }
  }
  else if (x == 've') {
    if (words['have']) {
      words['have']++;
    }
    else {
      words['have'] = 1;
    }
  }
}


//A FUNCTION TO EXTACT WORDS FROM EMAIL AND PROCESS THEM
function extractwords(x) {
  var start = 0;
  var temp = '';
  var q;
  x = x.toLowerCase();
  for (q = 0; q < x.length; q++) {
    if (!(x[q] >= 'a' && x[q] <= 'z') && q == 0) {
      q++;
    }
    if ((x[q] >= 'a' && x[q] <= 'z')) {
      temp = temp + x[q];
    }
    else {
    
      if (temp == 'terriblytinytales') {
        if (words['terribly']) {
          words['terribly']++;
        }
        else {
          words['terribly'] = 1;
        }
        if (words['tiny']) {
          words['tiny']++;
        }
        else {
          words['tiny'] = 1;
        }
        if (words['tales']) {
          words['tales']++;
        }
        else {
          words['tales'] = 1;
        }
      }
      else if (temp == 'terriblytinytalkies') {
        if (words['terribly']) {
          words['terribly']++;
        }
        else {
          words['terribly'] = 1;
        }
        if (words['tiny']) {
          words['tiny']++;
        }
        else {
          words['tiny'] = 1;
        }
        if (words['talkies']) {
          words['talkies']++;
        }
        else {
          words['talkies'] = 1;
        }
      }
      else if (temp == 'terriblytiny') {
        if (words['terribly']) {
          words['terribly']++;
        }
        else {
          words['terribly'] = 1;
        }
        if (words['tiny']) {
          words['tiny']++;
        }
        else {
          words['tiny'] = 1;
        }
      }
      else if (words[temp]) {
        words[temp]++;
      }
      else {
        words[temp] = 1;
      }
      temp = '';
    }
    
  }
  list.push(temp)
}
//A FUNCTION TO EXTRACT ' WORDS PROCESS TABS WORDS 
function testwords(x) {
  x = x.toLowerCase();
  if (x == `haven't` || x == 'haven’t') {
    if (words['have']) {
      words['have']++;
    }
    else {
      words['have'] = 1;
    }
    if (words['not']) {
      words['not']++;
    }
    else {
      words['not'] = 1;
    }
  }
  else if (apos.test(x) || apos2.test(x)) {
    if (apos.test(x)) {
      let ind = x.indexOf('’')
      let wor = x.slice(0, ind)
      if (words[wor]) {
        words[wor]++;
      }
      else {
        words[wor] = 1;
      }
      let q = x.slice(ind + 1, x.length)
      checkword(q);
    }
    else {
      let ind = x.indexOf(`'`)
      let wor = x.slice(0, ind)
      if (words[wor]) {
        words[wor]++;
      }
      else {
        words[wor] = 1;
      }
      let q = x.slice(ind + 1, x.length)
      checkword(q);
    }
  }
  else {
    if (tabs.test(x)) {

      let newwords = x.replace(/\t/g, " ").split(' ')
      for (var w = 0; w < newwords.length; w++) {
        if (words[newwords[w]]) {
          words[newwords[w]]++;
        }
        else {
          words[newwords[w]] = 1;
        }
      }
    }
    else {
      let q = x.replace(/[^a-zA-Z ]/g, "")
      if (words[q]) {
        words[q]++;
      }
      else {
        words[q] = 1;
      }
    }

  }
}

request.get('https://terriblytinytales.com/test.txt').on('data', function (data) {
  content = data.toString().replace(/\n/g, " ").split(' ')
  let linkstest = [];
  for (var i = 0; i < content.length; i++) {
    if ((email.test(content[i]) || links.test(content[i]) || links2.test(content[i]) || links3.test(content[i]) || slashes.test(content[i]) || atrate.test(content[i]) || das.test(content[i]))) {
      extractwords(content[i])
    }
  }
  console.log("<<<<<<<<<<<<<<<<")
  for (var i = 0; i < content.length; i++) {
    if (!(email.test(content[i]) || links.test(content[i]) || links2.test(content[i]) || links3.test(content[i]) || slashes.test(content[i]) || atrate.test(content[i]) || das.test(content[i]))) {
      testwords(content[i]);
    }
  }
  delete (words['']);
  words = sortProperties(words)
  console.log(words)
})





request.get('https://terriblytinytales.com/test.txt').on('error', function (data) {
  console.log(data)
})
route.get('/getwords/:id', (req, res) => {

  let q = Number(req.params.id)
  if (req.params.id == 'undefined') {
    res.status(200).send(words)
  }
  else if (q > words.length) {
    res.status(200).send(words)
  }

  else {
    res.status(200).send(words.slice(0, req.params.id))
  }
})


module.exports = route;