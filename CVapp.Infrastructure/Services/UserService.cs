using CVapp.Domain.Models.Authentificated;
using CVapp.Domain.Models.Authentification;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Exceptions;
using CVapp.Infrastructure.Repository.UserProfileRepository;
using CVapp.Infrastructure.Repository.UserRepository;
using LoggerService;


namespace CVapp.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly ILoggerManager _logger;
        private readonly UserRepository _userRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public UserService(ILoggerManager logger,
            UserRepository userRepository,
            UserProfileRepository userProfileRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
            _userProfileRepository = userProfileRepository;
        }

        public UserDto Register(RegisterDto dto, UserProfileDto userProfileDto)
        {
            var user = new User
            {
                UserName = dto.UserName,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role
            };
            _logger.LogInfo($"User {user.UserName} is registering");

            if (dto.Email == "artiom.suruc@outlook.com")
            {
                user.Role = "Admin";
            }

            if (_userRepository.GetByEmail(dto.Email) != null)
            {
                _logger.LogError($"User {user.UserName} is already registered");
                throw new BadRequestException($"An account with {user.Email} email already exists");
            }
            if (_userRepository.GetByUserName(dto.UserName) != null)
            {
                _logger.LogError($"User {user.UserName} is already registered");
                throw new BadRequestException($"An account with {user.UserName} username already exists");
            }
            if (dto.Password.Length < 8)
            {
                _logger.LogError($"User {user.UserName} password is too short");
                throw new BadRequestException("Password must be at least 8 characters long");
            }
            _userRepository.Create(user);

            _logger.LogInfo($"User {user.UserName} is successeful registered");

            var userProfile = new UserProfile
            {
                FirstName = userProfileDto.FirstName,
                LastName = userProfileDto.LastName,
                BirthDate = userProfileDto.BirthDate,
                Address = userProfileDto.Address,
                City = userProfileDto.City,
                Country = userProfileDto.Country,
                PhoneNumber = userProfileDto.PhoneNumber,
                AboutMe = userProfileDto.AboutMe,
                UserId = user.Id
            };
            try
            {
                _userProfileRepository.Create(userProfile);
                _logger.LogInfo($"Profile for {user.UserName} is successeful created");
            }
            catch (Exception e)
            {
                _logger.LogError($"Profile for {user.UserName} is not created");
                throw new BadRequestException($"Profile for {user.UserName} is not created");
            }

            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role
            };
        }

        public UserDto Login(LoginDto dto)
        {
            _logger.LogInfo($"Login attempt for user: {dto.Email}");
            var user = _userRepository.GetByEmail(dto.Email);
            if (user == null)
            {
                _logger.LogError($"Login attempt failed for user: {dto.Email} because the email is not matching");
                throw new BadRequestException($"The email {dto.Email} is not matching");
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                _logger.LogError($"Login attempt failed for user: {dto.Email} because the password is not matching");
                throw new BadRequestException("The password is not matching");
            }
            if (dto.Email == "artiom.suruc@outlook.com")
            {
                dto.Role = "Admin";
            }

            _logger.LogInfo("Login succesful");
            return new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role
            };
        }

        public void DeleteUser(int id)
        {
            try
            {
                _userRepository.Delete(id);
            }
            catch (Exception ex)
            {
                throw new BadRequestException("User not found!");
            }
        }

    }
}
