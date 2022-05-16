using CVapp.API.Extensions;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.Data;
using CVapp.Infrastructure.Mappings.Profiles;
using CVapp.Infrastructure.Repository.CommentRepository;
using CVapp.Infrastructure.Repository.EducationRepository;
using CVapp.Infrastructure.Repository.GenericRepository;
using CVapp.Infrastructure.Repository.MoneyRepository;
using CVapp.Infrastructure.Repository.NewsletterRepository;
using CVapp.Infrastructure.Repository.SkillRepository;
using CVapp.Infrastructure.Repository.UserProfileRepository;
using CVapp.Infrastructure.Repository.UserRepository;
using CVapp.Infrastructure.Services;
using LoggerService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NLog;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddScoped<DbContext, Context>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(UserRepository));
builder.Services.AddScoped(typeof(UserProfileRepository));
builder.Services.AddScoped(typeof(EducationRepository));
builder.Services.AddScoped(typeof(SkillRepository));
builder.Services.AddScoped(typeof(NewsletterRepository));
builder.Services.AddScoped(typeof(CommentRepository));
builder.Services.AddScoped(typeof(MoneyRepository));
builder.Services.AddScoped<JwtService>();
builder.Services.AddSingleton<ILoggerManager, LoggerManager>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();
builder.Services.AddScoped<IContentService, ContentService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IMoneyService, MoneyService>();
builder.Services.AddScoped<IDataService, DataService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Token"]))
        };
    });
LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));

builder.Services.Configure<FormOptions>(options =>
{
    options.KeyLengthLimit = 209715200;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
/*if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}*/    // To use Swagger uncomment the lines above and also the lines from Properties -> launchSettings.json
app.ConfigureCustomExceptionMiddleware();

app.UseHttpsRedirection();
app.UseCors(options => options
.WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" })
.AllowCredentials()
    .AllowAnyMethod()
    .AllowAnyHeader());


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// Create Program class to be able to reffer to it in IntegrationTestsWebApi project
public partial class Program { }