using AutoMapper;
using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Repository.EducationSectionRepository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Services
{
    public class ContentService : IContentService
    {
        private readonly IEducationRepository _educationSectionRepository;
        private readonly IMapper _mapper;
        
        public ContentService(IEducationRepository educationSectionRepository,IMapper mapper)
        {
            _educationSectionRepository = educationSectionRepository;
            _mapper = mapper;
        }
        
        public IEnumerable<EducationDto>  GetEducationContent()
        {
            try
            {    
            var educations = _educationSectionRepository.GetAllEducations();
                var educationResult = _mapper.Map<IEnumerable<EducationDto>>(educations);
                var educationResultArray = educationResult.ToArray();
                
                return educationResultArray;
            } catch
            {
                throw new Exception("Error in getting education data");
            }
            
        }
    }
}
