using AutoMapper;
using api.Models;
using api.Dtos.Insights;

namespace api.Mapper;

public class PomodoroInsightMapper : Profile
{
    public PomodoroInsightMapper()
    {
        CreateMap<PomodoroInsight, PomodoroInsightDto>()
            .ForMember(dest => dest.TotalFocusHours, opt => opt.MapFrom(src => src.TotalFocusTime.TotalHours))
            .ForMember(dest => dest.WeeklyFocusHours, opt => opt.MapFrom(src => src.WeeklyFocusTime.TotalHours));
    }
} 