using CV.Common.DTOs;

namespace CV.Bll.Abstractions
{
    public interface IUserProfileService
    {
        public UserProfileDto SaveAvatar(string path, UserProfileDto userProfileDto);
        public UserProfileDto GetUserProfileData(string environment);
        public UserProfileDto UpdateUserProfileData(int id, UserProfileDto userProfileDto);
        public UserProfileDto GetPersonalUserProfileData(string name);
    }
}
