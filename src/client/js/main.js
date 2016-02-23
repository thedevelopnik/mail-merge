// add scripts


$(document).ready(function () {
  console.log('sanity check');
  var emailCount = document.getElementById('email-count');
  var numEmails = document.getElementsByClassName('remove-button').length;
  $(emailCount).html('Emails (' + numEmails + ')');
  if ($(emailCount).html().includes('0')) {
    $(emailCount).hide();
  }
});

$(document).on('click', $('.remove-button'), function() {
  var emailCount = document.getElementById('email-count');
  $(this).parent().remove();
  var numEmails = document.getElementsByClassName('remove-button').length;
  $(emailCount).html('Emails (' + numEmails + ')');
});

$(document).on('click', $('.edit'), function(e) {
  var thisButton = event.target;
  var thisBody = $(thisButton).prev();
  var currentBody = $(thisBody[0]).html();
  var newBody = prompt('Enter the new body:', currentBody);
  console.log(thisButton);
  console.log(thisBody);
  if (newBody) {
    $(thisBody).html(newBody);
  } else {
    alert('error!');
  }
});
