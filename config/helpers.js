module.exports = 
{
    async removeAuthorCredentials(author) 
    {
        delete author.password;
        delete author.resetPasswordToken;
        delete author.registrationToken;
        delete author.preferedLanguage;

        return author;
    },
};