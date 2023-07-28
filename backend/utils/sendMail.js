const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (options) => {
    try{
            
            const transporter=nodemailer.createTransport({
                service:process.env.SMTP_SERVICE,
                port:process.env.SMTP_PORT,
                host:process.env.SMTP_HOST,
                auth:
                {
                    user:process.env.SMTP_MAIL,
                    pass:process.env.SMTP_PASSWORD,
                }
            })
            const mailOptions=
            {
                from:"nalawadevishwas14@gmail.com",
                to:options.email,
                subject:options.subject,
                text:options.message
            }
        
           await transporter.sendMail(mailOptions);

            await transporter.sendMail(mailOptions);

          
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports =sendMail;