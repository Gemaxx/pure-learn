using AutoMapper;
using api.Models;
using api.Dtos.TimerSettings;
using api.Dtos.StudySession;
using api.Dtos.PomodoroCycle;
using api.Dtos.Insights;

namespace api.Mapper;

public class PomodoroMapper : Profile
{
    public PomodoroMapper()
    {
        // TimerSettings
        CreateMap<TimerSettings, TimerSettingsDto>().ReverseMap();
        CreateMap<TimerSettings, UpdateTimerSettingsDto>().ReverseMap();

        // StudySession
        CreateMap<StudySession, StudySessionDto>().ReverseMap();
        CreateMap<StudySession, StudySessionDetailsDto>()
            .ForMember(dest => dest.Learner, opt => opt.MapFrom(src => src.Learner))
            .ForMember(dest => dest.Task, opt => opt.MapFrom(src => src.Task));
        CreateMap<CreateStudySessionRequestDto, StudySession>();
        CreateMap<Learner, LearnerInfoDto>();
        CreateMap<Models.Task, TaskInfoDto>();

        // PomodoroCycle
        CreateMap<PomodoroCycle, PomodoroCycleDto>().ReverseMap();
        CreateMap<CreatePomodoroCycleRequestDto, PomodoroCycle>();

        // PomodoroInsight
        CreateMap<PomodoroInsight, PomodoroInsightDto>()
            .ForMember(dest => dest.TotalFocusHours, opt => opt.MapFrom(src => src.TotalFocusTime.TotalHours))
            .ForMember(dest => dest.WeeklyFocusHours, opt => opt.MapFrom(src => src.WeeklyFocusTime.TotalHours));
    }
} 