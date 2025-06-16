using AutoMapper;
using api.Dtos.PomodoroCycle;
using api.Models;

namespace api.Mapper
{
    public class PomodoroCycleMapper : Profile
    {
        public PomodoroCycleMapper()
        {
            CreateMap<PomodoroCycle, PomodoroCycleDto>();
            CreateMap<CreatePomodoroCycleRequestDto, PomodoroCycle>();
            CreateMap<PatchPomodoroCycleRequestDto, PomodoroCycle>();
        }
    }
} 