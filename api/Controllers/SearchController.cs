
using api.Dtos.Search;
using api.Helpers;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
 [ApiController]
    [Route("api/learners/{learnerId}/search")]
    public class SearchController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        private readonly IGoalRepository _goalRepo;
        private readonly ITaskRepository _taskRepo;
        private readonly INoteRepository _noteRepo;

        public SearchController(
            ICategoryRepository categoryRepo,
            IGoalRepository goalRepo,
            ITaskRepository taskRepo,
            INoteRepository noteRepo)
        {
            _categoryRepo = categoryRepo;
            _goalRepo = goalRepo;
            _taskRepo = taskRepo;
            _noteRepo = noteRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<SearchResultDto>>> GlobalSearch(long learnerId, [FromQuery] SearchQueryObject query)
        {
            if (string.IsNullOrWhiteSpace(query.Term))
            {
                return BadRequest(new { Message = "Search term cannot be empty." });
            }

            var categoryResults = await _categoryRepo.SearchCategoriesAsync(query.Term, learnerId);
            var goalResults = await _goalRepo.SearchGoalsAsync(query.Term, learnerId);
            // var taskResults = await _taskRepo.SearchTasksAsync(query.Term, learnerId);
            var noteResults = await _noteRepo.SearchNotesAsync(query.Term, learnerId);

            var combinedResults = categoryResults.Concat(goalResults)
                                                 .Concat(noteResults)
                                                 .ToList();
                                                 //.Concat(taskResults)

            return Ok(combinedResults);
        }
    }
}