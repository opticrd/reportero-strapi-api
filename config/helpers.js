module.exports = 
{
    removeAuthorCredentials(author) 
    {
        delete author.password;
        delete author.resetPasswordToken;
        delete author.registrationToken;
        delete author.preferedLanguage;

        return author;
    },
};