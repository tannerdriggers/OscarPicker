
using OscarPicks_Angular.ViewModels.Validations;
using FluentValidation.Attributes;

namespace OscarPicks_Angular.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
