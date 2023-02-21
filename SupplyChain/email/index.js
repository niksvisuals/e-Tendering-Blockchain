function sendEmail(email_id, _itemid) {
  Email.send({
    SecureToken: '831d1048-16d0-4f28-9640-929a8d4d9fc5',
    To: email_id,
    From: 'shrenik.ks@somaiya.edu',
    Subject: "Tender Bid Awarded to You",
    Body: "Congratulations, tender is alloted to you. Please make a note of Item id: "+_itemid
    // Host: "smtp.gmail.com",
    // Username : "abhivispute33@gmail.com",
    // Password : "",
    // To : 'abhivispute33@gmail.com',
    // From : "abhivispute33@gmail.com",
    // Subject : "<email subject>",
    // Body : "<email body>",
  })
    .then(function (message) {
      alert("mail sent successfully")
    });
}

