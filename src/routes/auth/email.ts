import { Resend } from "resend";
import { secrets } from "lib/secrets";
import { baseUrl } from "lib/env";

interface EmailTemplateProps {
  title: string;
  callToAction: string;
  button: {
    text: string;
    url: string;
    target?: string;
  };
  description: string;
}
export function EmailTemplate({
  title,
  callToAction,
  button,
  description,
}: EmailTemplateProps) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
      .btn-primary {
        background-color: #5e6ad2;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        display: inline-block;
        font-size: 16px;
        border-radius: 3px;
        text-decoration: none;
      }

      .btn-primary:hover {
        background-color: #4a57b8;
      }
    </style>
  </head>

  <body
    style="
      background-color: #f4f4f7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      padding: 20px;
    "
  >
    <center>
      <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        style="
          max-width: 37.5em;
          background-color: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        "
      >
        <tr>
          <td style="padding: 30px; text-align: center">
            <h1 style="color: #5e6ad2; font-size: 32px; font-weight: 700">
            {${title}}
            </h1>
            <h2 style="font-size: 20px; color: #484848; margin-top: 20px">
              {${callToAction}}
            </h2>
            <p
              style="
                font-size: 16px;
                line-height: 1.6;
                margin: 20px 0 30px;
                color: #3c4149;
              "
            >{${description}}
            </p>
            <a href={${button.url}} class="btn-primary"
              >{${button.text}}</a
            >
            <hr
              style="
                border: none;
                border-top: 1px solid #eaeaea;
                margin: 30px 0;
              "
            />
            <p style="color: #b4becc; font-size: 14px">Chonk Alpha v.0.0.0</p>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
}

export const resend = new Resend(secrets.resend);

export function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${baseUrl}/verify-email-page?token=${token}`; // redirect to FE
  return async () => {
    const data = await resend.emails.send({
      from: "Chonk <noreply@chonk.com>",
      to: email,
      subject: "Welcome to Chonk!",
      html: EmailTemplate({
        title: "Chonk",
        callToAction: "Please verify your email address to continue",
        button: {
          text: "Click Here to Verify",
          url: verificationLink,
        },
        description:
          "Thanks for signing up for Chonk! We’re excited to have you as an early user. Before you can start using MiracleMarket, please verify your email address by clicking the button above.",
      }),
    });

    return data;
  };
}
