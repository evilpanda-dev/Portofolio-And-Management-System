using CVapp.API.Controllers;
using CVapp.Domain.Models.Authentification;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Repository.GenericRepository;
using CVapp.Infrastructure.Repository.UserRepository;
using CVapp.Infrastructure.Services;
using LoggerService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Net;

namespace UnitTests
{
    [TestClass]
    public class AuthControllerTests
    {
        private readonly AuthController _controller;

        public AuthControllerTests()
        {
            AuthController controller;
            var userService = new Mock<IUserService>();
            var jwtService = new Mock<JwtService>();
            var logger = new Mock<ILoggerManager>();
            var repository = new Mock<IRepository<User>>();
            var userRepository = new Mock<UserRepository>();
            _controller = new AuthController(jwtService.Object, logger.Object,userService.Object,userRepository.Object);

            var user = new User()
            {
                UserName = "gigel",
                Email = "gigel@gmail.com",
                Password = "123456",
                Role = "Admin"
            };

            var user2 = new User()
            {
                UserName = "gigel2",
                Email = "gigel2@gmail.com",
                Password = "123456",
                Role = "Admin"
            };

            repository.Setup(x => x.Create(user)).Returns(user);

            userRepository.Setup(x => x.GetByEmail(user2.Email)).Returns(user2);
            userRepository.Setup(x => x.GetByUserName(user2.UserName)).Returns(user2);
        }

        [TestMethod]
        public void RegisterUserWithValidData()
        {
            //Arange
            var user = new RegisterDto()
            {
                UserName = "gigel",
                Email = "gigel@gmail.com",
                Password = "123456789",
                Role = "Admin"
            };

            //Act
            var result = _controller.Register(user) as ObjectResult;
            var value = result.Value as RegisterDto;

            //Assert
            Assert.AreEqual((int)HttpStatusCode.Created, result.StatusCode);
            Assert.AreEqual("gigel", user.UserName);
        }

        [TestMethod]
        public void RegisterUserWithTheSameEmailAsInDataBase_ShouldReturnBadRequest()
        {
            //Arrange
            var user = new RegisterDto()
            {
                UserName = "gigel",
                Email = "gigel2@gmail.com",
                Password = "123456789",
                Role = "Admin"
            };

            //Act
            var result = _controller.Register(user) as ObjectResult;
            var value = result.Value as RegisterDto;

            //Assert
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("An account with this email already exists", result.Value);
        }

        [TestMethod]
        public void RegisterWithTheSameUserNameAsInDataBase_ShouldReturnBadRequest()
        {
            //Arrange
            var user = new RegisterDto()
            {
                UserName = "gigel2",
                Email = "gigel@gmail.com",
                Password = "123456789",
                Role = "Admin"
            };

            //Act
            var result = _controller.Register(user) as ObjectResult;
            var value = result.Value as RegisterDto;

            //Assert
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("An account with this username already exists", result.Value);
        }

        [TestMethod]
        public void RegisterWithAPasswordWhichIsLessThan8Characters_ShouldReturnBadRequest()
        {
            //Arrange
            var user = new RegisterDto()
            {
                UserName = "gigel",
                Email = "gigel@gmail.com",
                Password = "123456",
                Role = "Admin"
            };

            //Act
            var result = _controller.Register(user) as ObjectResult;
            var value = result.Value as RegisterDto;

            //Assert
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.AreEqual("Password must be at least 8 characters long", result.Value);

        }
    }
}