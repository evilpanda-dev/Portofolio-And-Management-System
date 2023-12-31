using CV.API.Infrastructure.Extensions;
using CV.Bll.Abstractions;
using CV.Bll.Profiles;
using CV.Bll.Services;
using CV.Dal.Data;
using CV.Dal.Interfaces;
using CV.Dal.Repository;
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
builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
builder.Services.AddScoped(typeof(IUserProfileRepository), typeof(UserProfileRepository));
builder.Services.AddScoped(typeof(IEducationRepository), typeof(EducationRepository));
builder.Services.AddScoped(typeof(ISkillRepository), typeof(SkillRepository));
builder.Services.AddScoped(typeof(INewsletterRepository), typeof(NewsletterRepository));
builder.Services.AddScoped(typeof(ICommentRepository), typeof(CommentRepository));
builder.Services.AddScoped(typeof(IMoneyRepository), typeof(MoneyRepository));
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