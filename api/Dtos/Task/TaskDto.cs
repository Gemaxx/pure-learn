namespace api.Dtos.Task
{
    public class TaskDto
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;
        public bool? IsCompleted { get; set; } = false;  
        public long? GoalId { get; set; }
        public long? TypeId { get; set; }
        public long? KanbanStatusId { get; set; }
        public string EisenhowerStatus { get; set; } = null!;
        // public DateOnly? DueDate { get; set; }
    }
}