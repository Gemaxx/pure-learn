namespace api.Dtos.Task
{
    public class TaskDto
    {
        public long Id { get; set; }
        public long? GoalId { get; set; }
        public string Title { get; set; } = null!;
        public long? TypeId { get; set; }
        public long? KanbanStatusId { get; set; }
        public string EisenhowerStatus { get; set; } = null!;
        public string TimeTaskRelated { get; set; } = null!;
    }
}