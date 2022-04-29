using CVapp.Infrastructure.DTOs;

namespace CVapp.Infrastructure.Abstractions
{
    public interface IUserService
    {
        public UserDto Register(RegisterDto userDto, UserProfileDto userProfileDto);
        public UserDto Login(LoginDto loginDto);
        
    }
}
