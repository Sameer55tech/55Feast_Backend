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
        font-family: Arial, sans-serif !important;
        line-height: 1.5 !important;
        color: #333333 !important;
      }
      .header {
        background-color: #f5f5f5 !important;
        padding: 20px !important;
        text-align: center !important;
      }
      .header h1 {
        margin: 0 !important;
      }
      .body {
        padding: 20px !important;
        text-align: center !important;
      }
      .button {
        display: inline-block !important;
        text-decoration: none !important;
        background-color: #ef5d36 !important;
        color: #fff !important;
        padding: 10px 20px !important;
        border-radius: 4px !important;
        border: 2px solid #ef5d36 !important;
      }
      .button:hover {
        background-color: #fff !important;
        border: 2px solid #ef5d36 !important;
        color: #ef5d36 !important;
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
      <p><a class="button" href="https://five5feast-3nyz.onrender.com/">Join 55Feast</a></p>
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
