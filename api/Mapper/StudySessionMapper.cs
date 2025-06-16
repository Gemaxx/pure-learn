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
            .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(_ => false))
            .ForMember(dest => dest.CycleCount, opt => opt.MapFrom(_ => 0));
            
        CreateMap<PatchStudySessionRequestDto, StudySession>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
    }
} 