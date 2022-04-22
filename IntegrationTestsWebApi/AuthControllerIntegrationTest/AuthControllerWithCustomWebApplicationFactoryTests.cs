using CVapp.Infrastructure.DTOs;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTestsWebApi.AuthControllerIntegrationTest
{
    public class AuthControllerWithCustomWebApplicationFactoryTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly CustomWebApplicationFactory<Program> _factory;
        public AuthControllerWithCustomWebApplicationFactoryTests(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task RegisterAnUserInTheTestDatabaseAndReturnIt()
        {
            //Arrange
            var user = new RegisterDto
            {
                UserName = "test",
                Password = "testtest",
                Email = "test@gmail.com"
            };
            var client = _factory.CreateClient();
            var url = "api/register";

            //Act            
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task TryToRegisterAnExistingAccount_ReturnBadRequest()
        {
            //Arrange
            var user = new RegisterDto
            {
                UserName = "test",
                Password = "testtest",
                Email = "test@gmail.com"
            };
            var client = _factory.CreateClient();
            var url = "api/register";

            //Act            
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task TryToRegisterAnAccountWithAnRegisteredEmail_ReturnBadRequest()
        {
            //Arrange
            var user = new RegisterDto
            {
                UserName = "test2",
                Password = "testtest2",
                Email = "test@gmail.com"
            };
            var client = _factory.CreateClient();
            var url = "api/register";

            //Act            
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        public async Task TryToRegisterAnAccountWithAnRegisteredUserName_ReturnBadRequest()
        {
            //Arrange
            var user = new RegisterDto
            {
                UserName = "test",
                Password = "testtest2",
                Email = "test2@gmail.com"
            };
            var client = _factory.CreateClient();
            var url = "api/register";

            //Act            
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        public async Task TryToRegisterAnAccountWithAPasswordLessThan8Characters_ReturnBadRequest()
        {
            //Arrange
            var user = new RegisterDto
            {
                UserName = "test2",
                Password = "test",
                Email = "test2@gmail.com"
            };
            var client = _factory.CreateClient();
            var url = "api/register";

            //Act            
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task LoginWithValidData_ReturnSuccesefulLogin()
        {
            //Arrange
            var client = _factory.CreateClient();
            var url = "/api/login";

            var user = new LoginDto
            {
                Email = "test@gmail.com",
                Password = "testtest"
            };
            //Act
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task LoginWithAnUnexistingEmail_ReturnBadRequest()
        {
            //Arrange
            var client = _factory.CreateClient();
            var url = "/api/login";

            var user = new LoginDto
            {
                Email = "tes@gmail.com",
                Password = "testtest"
            };
            //Act
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task LoginWithAWrongPassword_ReturnBadRequest()
        {
            //Arrange
            var client = _factory.CreateClient();
            var url = "/api/login";

            var user = new LoginDto
            {
                Email = "test@gmail.com",
                Password = "testtes"
            };
            //Act
            var response = await client.PostAsJsonAsync(url, user);

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task GetUserLoginInformation_ReturnUnauthorized()
        {
            //Arrange
            var client = _factory.CreateClient();
            var url = "/api/user";

            //Act
            var response = await client.GetAsync(url);

            //Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Logout_ShouldReturnOk()
        {
            //Arrange
            var client = _factory.CreateClient();
            var url = "/api/logout";
            var user = new LoginDto
            {
                Email = "test@gmail.com",
                Password = "testtes"
            };
            
            //Act
            var response = await client.PostAsJsonAsync(url, user);
            
            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

    }
    
}
