using CV.Common.DTOs;

namespace CV.Bll.Abstractions
{
    public interface IUserService
    {
        public UserDto Register(RegisterDto userDto, UserProfileDto userProfileDto);
        public UserDto Login(LoginDto loginDto);
        public void DeleteUser(int id);
        public UserDto GetUser(int id);
    }
}
