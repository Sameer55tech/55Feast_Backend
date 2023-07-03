const mailHTML = (htmlResponse) => {
  switch (htmlResponse) {
    case "signUpSuccess":
      return `
      <!DOCTYPE html>
<html>
  <head>
    <title>Invitation to Website</title>
    <style>
      /* Inline CSS */
      body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
        color: #333333;
      }
      .header {
        background-color: #f5f5f5;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
      }
      .body {
        padding: 20px;
        text-align: center;
      }
      .button {
        display: inline-block;
        text-decoration: none;
        background-color: #ef5d36;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 4px;
      }
      .button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>You are invited to join 55 Feast</h1>
    </div>
    <div class="body">
      <p>Dear User,</p>
      <p>
        You are cordially invited to visit our website and explore the exciting
        features and services we offer.
      </p>
      <p>Click the button below to visit our website:</p>
      <p><a class="button" href="https://www.example.com">Visit Website</a></p>
      <p>We look forward to having you as our valued user.</p>
      <p>Best regards,</p>
      <p>Your Company</p>
    </div>
  </body>
</html>
`;

      break;

    default:
      break;
  }
};
export default mailHTML;
