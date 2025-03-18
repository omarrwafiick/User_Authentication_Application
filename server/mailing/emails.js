const { client, sender } = require('../mailing/mailing.config');
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require('../mailing/email.Template');
 
const SendVerificationEmail = async (email, verificationToken)=>{  
    try
    {
        const response = await client.send(
            {
                from: sender, 
                to: [{email}], 
                subject: "Verify your email", 
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
                category : "Email Verification"
            });
        console.log("Email was sent successfully", response);
    } 
    catch (error) 
    {
        console.error(`Email was not sent there is a problem with email ${email} - ${error.message}`);
    }
};

const SendWelcomeEmail =  async (email, name)=>{ 
    try
    {
        const response = await client.send(
            {
                from: sender, 
                to: [{email}],  
                template_uuid:  "3751bc0c-b1eb-4c33-9f02-f39de6b80419",
                template_variables: {
                    "company_info_name": "Company A",
                    "name": name
                  }
            });
        console.log("Welcome Email was sent successfully", response);
    } 
    catch (error) 
    {
        console.error(`Email was not sent there is a problem with email ${email} - ${error.message}`);
    }
};

const SendForgetPassword = async (email, resetUrl)=>{  
    try
    {
        const response = await client.send(
            {
                from: sender, 
                to: [{email}], 
                subject: "Reset your password", 
                html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
                category : "Password Reset"
            });
        console.log("Email was sent successfully", response);
    } 
    catch (error) 
    {
        console.error(`Email was not sent there is a problem with email ${email} - ${error.message}`);
    }
};

const SendResetPasswordSuccess = async (email)=>{  
    try
    {
        const response = await client.send(
            {
                from: sender, 
                to: [{email}], 
                subject: "Password reset success", 
                html: PASSWORD_RESET_SUCCESS_TEMPLATE,
                category : "Password reset"
            });
        console.log("Email was sent successfully", response);
    } 
    catch (error) 
    {
        console.error(`Email was not sent there is a problem with email ${email} - ${error.message}`);
    }
};

module.exports = { SendVerificationEmail, SendWelcomeEmail, SendForgetPassword, SendResetPasswordSuccess };