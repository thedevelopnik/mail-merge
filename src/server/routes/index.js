var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});



router.post('/', function(req, res, next) {
  // take post data and save in variables
  // this is all of the people to mail merge
  var merge = req.body.merge;
  // subject of the email
  var subject = req.body.subject;
  // content of the email
  var content = req.body.content;

  // split merge to an array with an element of each person to mail merge
  var mergeArray = merge.split(/\r?\n/);

  // establish a prototype object to create objects to populate appended previews
  function makeEmailPreview (fN, lN, em, sub, emCont) {
    this.first = fN;
    this.last = lN;
    this.email = em;
    this.subject = sub;
    this.emailContent = emCont;
  }

  var emailPreviews = [];

  for (i = 0; i < mergeArray.length; i++) {
    // define a variable that is just this person's data to merge
    var personData = mergeArray[i];
    // split their data into an array
    var personArray = personData.split(',');

    // save their details into variables
    var first = personArray[0];
    var last = personArray[1];
    var email = personArray[2];

    var emailContent = content.replace('{first}', first);
    emailContent = emailContent.replace('{last}', last);
    emailContent = emailContent.replace('{email}', email);

    // create an object with this person's information
    var newEmail = new makeEmailPreview(first, last, email, subject, emailContent);

    // push that to an array of all emails to preview
    emailPreviews.push(newEmail);
  }

  console.log(emailPreviews);
  res.render('index', {merge: merge,
    subject: subject,
    content: content,
    emails: emailPreviews});
});

module.exports = router;
