using AutoMapper;
using api.Models;
using api.Dtos.StudySession;

namespace api.Mapper;

public class StudySessionMapper : Profile
{
    public StudySessionMapper()
    {
        CreateMap<StudySession, StudySessionDto>();
        CreateMap<StudySession, StudySessionDetailsDto>();
        CreateMap<Models.Learner, LearnerInfoDto>();
        CreateMap<Models.Task, TaskInfoDto>();
        
        CreateMap<CreateStudySessionRequestDto, StudySession>()
            .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.StartTime))
            .ForMember(dest => dest.CycleCount, opt => opt.MapFrom(_ => 0))
            .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(_ => false))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
            
        CreateMap<PatchStudySessionRequestDto, StudySession>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
    }
} 