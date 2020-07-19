const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'jimmywu987@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendFarewareEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'jimmywu987@gmail.com',
        subject: 'Can you tell me a reason why you want to cancel the membership? without a good reason, canceling is utterly forbidden.',
        text: `now, tell me, ${name}.`
    })
}



module.exports = {
    sendWelcomeEmail,
    sendFarewareEmail
}