using AutoMapper;
using api.Models;
using api.Dtos.Learner;

namespace api.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Learner, LearnerDto>().ReverseMap();
        CreateMap<LearnerRegistrationRequestDto, Learner>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ReverseMap();
    }
} 