using AutoMapper;
using CVapp.Domain.Models.Authentificated;
using CVapp.Infrastructure.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Mappings.Profiles
{
    public class UserProfileMap : Profile
    {
        public UserProfileMap()
        {
            CreateMap<UserProfile, UserProfileDto>().ReverseMap()
                .ForMember(u => u.Id, opt => opt.Ignore())
                .ForMember(u => u.FirstName, opt => opt.MapFrom(u => u.FirstName))
                .ForMember(u => u.LastName, opt => opt.MapFrom(u => u.LastName))
                .ForMember(u => u.BirthDate, opt => opt.MapFrom(u => u.BirthDate))
                .ForMember(u => u.Address, opt => opt.MapFrom(u => u.Address))
                .ForMember(u => u.City, opt => opt.MapFrom(u => u.City))
                .ForMember(u => u.Country, opt => opt.MapFrom(u => u.Country))
                .ForMember(u => u.PhoneNumber, opt => opt.MapFrom(u => u.PhoneNumber))
                .ForMember(u => u.AboutMe, opt => opt.MapFrom(u => u.AboutMe))
                .ForMember(u => u.ModifiedDate, opt => opt.MapFrom(u => DateTime.Now))
                .ForMember(u => u.UserId, opt => opt.Ignore());
        }
    }
}
