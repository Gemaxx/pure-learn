using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public partial class PureLearnDbContext : IdentityDbContext<Learner, IdentityRole<long>, long>
    {
        public PureLearnDbContext() : base() { }

        public PureLearnDbContext(DbContextOptions<PureLearnDbContext> options)
            : base(options) { }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Goal> Goals { get; set; } = null!;
        public virtual DbSet<KanbanStatus> KanbanStatuses { get; set; } = null!;
        public virtual DbSet<Learner> Learners { get; set; } = null!;
        public virtual DbSet<LearningResource> LearningResources { get; set; } = null!;
        public virtual DbSet<LearningResourceType> LearningResourceTypes { get; set; } = null!;
        public virtual DbSet<Note> Notes { get; set; } = null!;
        public virtual DbSet<Subgoal> Subgoals { get; set; } = null!;
        public virtual DbSet<Subtask> Subtasks { get; set; } = null!;
        public virtual DbSet<Models.Task> Tasks { get; set; } = null!;
        public virtual DbSet<TaskType> TaskTypes { get; set; } = null!;
        public virtual DbSet<StudySession> StudySession { get; set; } = null!;
        public virtual DbSet<PomodoroCycle> PomodoroCycles { get; set; } = null!;
        public virtual DbSet<PomodoroInsight> PomodoroInsight { get; set; } = null!;
        public virtual DbSet<TimerSettings> TimerSettings { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.UseCollation("Arabic_CI_AS");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Category", tb =>
                {
                    tb.HasTrigger("trg_soft_delete_category");
                    tb.HasTrigger("trg_update_category_updated_at");
                });
                entity.HasIndex(e => e.LearnerId);
                entity.HasIndex(e => e.ParentCategoryId);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Color).HasMaxLength(50).HasColumnName("color");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("CREATEd_at");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("is_deleted");
                entity.Property(e => e.LearnerId).HasColumnName("learner_id");
                entity.Property(e => e.ParentCategoryId).HasColumnName("parent_category_id");
                entity.Property(e => e.Title).HasMaxLength(255).HasColumnName("title");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("updated_at");

                entity.HasOne(d => d.Learner).WithMany(p => p.Categories)
                      .HasForeignKey(d => d.LearnerId)
                      .HasConstraintName("FK__Category__learne__6383C8BA");

                entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                      .HasForeignKey(d => d.ParentCategoryId)
                      .HasConstraintName("FK__Category__parent__6477ECF3");
            });

            modelBuilder.Entity<Goal>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Goal", tb =>
                {
                    tb.HasTrigger("trg_soft_delete_goal");
                    tb.HasTrigger("trg_update_goal_updated_at");
                });

                entity.HasIndex(e => e.CategoryId);
                entity.HasIndex(e => e.LearnerId);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.CategoryId).HasColumnName("category_id");
                entity.Property(e => e.CompletionDate).HasColumnName("completion_date");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("CREATEd_at");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("is_deleted");
                entity.Property(e => e.LearnerId).HasColumnName("learner_id");
                entity.Property(e => e.Motivation).HasColumnName("motivation");
                entity.Property(e => e.Status).HasMaxLength(50).HasColumnName("status");
                entity.Property(e => e.Term).HasMaxLength(50).HasColumnName("term");
                entity.Property(e => e.Title).HasMaxLength(255).HasColumnName("title");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("updated_at");

                entity.HasOne(d => d.Category).WithMany(p => p.Goals)
                      .HasForeignKey(d => d.CategoryId)
                      .OnDelete(DeleteBehavior.Cascade)
                      .HasConstraintName("FK__Goal__category_i__6B24EA82");

                entity.HasOne(d => d.Learner).WithMany(p => p.Goals)
                      .HasForeignKey(d => d.LearnerId)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK__Goal__learner_id__6C190EBB");
            });

            modelBuilder.Entity<KanbanStatus>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("KanbanStatus");
                entity.HasIndex(e => e.Name).IsUnique();
                entity.HasIndex(e => e.GoalId);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
                entity.Property(e => e.GoalId).HasColumnName("goal_id");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("is_deleted");
                entity.Property(e => e.MaxTasks).HasColumnName("max_tasks");
                entity.Property(e => e.Name).HasMaxLength(255).HasColumnName("name");

                entity.HasOne(d => d.Goal).WithMany(p => p.KanbanStatuses)
                      .HasForeignKey(d => d.GoalId)
                      .HasConstraintName("FK_KanbanStatus_Goal");
            });

            modelBuilder.Entity<Learner>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Learner", tb => tb.HasTrigger("trg_update_learner_updated_at"));

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Bio).HasColumnName("bio");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("CREATEd_at");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("is_deleted");
                entity.Property(e => e.LastLogin).HasColumnName("last_login");
                entity.Property(e => e.Name).HasMaxLength(255).HasColumnName("name");
                entity.Property(e => e.ProfilePicture).HasColumnName("profile_picture");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("updated_at");
            });

            modelBuilder.Entity<LearningResource>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("LearningResource");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Title).HasMaxLength(255).HasColumnName("title");
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.TypeId).HasColumnName("type_id");
                entity.Property(e => e.TotalUnits).HasColumnName("TotalUnits");
                entity.Property(e => e.Progress).HasColumnName("Progress");
                entity.Property(e => e.Link).HasColumnName("Link");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("updated_at");
                entity.Property(e => e.LearnerId).HasColumnName("LearnerId");
                entity.Property(e => e.CategoryId).HasColumnName("CategoryId");
                entity.Property(e => e.GoalId).HasColumnName("goal_id");
                entity.Property(e => e.SubgoalId).HasColumnName("SubgoalId");
                entity.Property(e => e.DeletedAt).HasColumnName("DeletedAt");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("is_deleted");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.LearningResources)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_LearningResources_LearningResourceTypes_TypeId");

                entity.HasOne(d => d.Learner)
                    .WithMany(p => p.LearningResources)
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_LearningResources_Learner_LearnerId");
            });

            modelBuilder.Entity<LearningResourceType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("LearningResourceTypes");

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Name).HasColumnName("Name");
                entity.Property(e => e.UnitType).HasColumnName("UnitType");
                entity.Property(e => e.LearnerId).HasColumnName("LearnerId");
                entity.Property(e => e.DeletedAt).HasColumnName("DeletedAt");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("IsDeleted");

                entity.HasOne(d => d.Learner)
                    .WithMany(p => p.LearningResourceTypes)
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_LearningResourceTypes_Learner_LearnerId");
            });

            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Notes");

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Title).HasColumnName("Title");
                entity.Property(e => e.Body).HasColumnName("Body");
                entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt");
                entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt");
                entity.Property(e => e.CategoryId).HasColumnName("CategoryId");
                entity.Property(e => e.GoalId).HasColumnName("GoalId");
                entity.Property(e => e.SubgoalId).HasColumnName("SubgoalId");
                entity.Property(e => e.TaskId).HasColumnName("TaskId");
                entity.Property(e => e.LearnerId).HasColumnName("LearnerId");
                entity.Property(e => e.DeletedAt).HasColumnName("DeletedAt");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("IsDeleted");

                entity.HasOne(d => d.Learner)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Notes_Learner_LearnerId");
            });

            modelBuilder.Entity<Subgoal>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Subgoals");

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Title).HasColumnName("Title");
                entity.Property(e => e.Description).HasColumnName("Description");
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt");
                entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt");
                entity.Property(e => e.GoalId).HasColumnName("GoalId");
                entity.Property(e => e.DeletedAt).HasColumnName("DeletedAt");
                entity.Property(e => e.IsDeleted).HasColumnName("IsDeleted");
            });

            modelBuilder.Entity<Models.Task>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Tasks");

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Title).HasColumnName("Title");
                entity.Property(e => e.IsCompleted).HasColumnName("IsCompleted");
                entity.Property(e => e.TypeId).HasColumnName("TypeId");
                entity.Property(e => e.KanbanStatusId).HasColumnName("KanbanStatusId");
                entity.Property(e => e.EisenhowerStatus).HasColumnName("EisenhowerStatus");
                entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt");
                entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt");
                entity.Property(e => e.LearnerId).HasColumnName("LearnerId");
                entity.Property(e => e.CategoryId).HasColumnName("CategoryId");
                entity.Property(e => e.GoalId).HasColumnName("GoalId");
                entity.Property(e => e.SubgoalId).HasColumnName("SubgoalId");
                entity.Property(e => e.LearningResourceId).HasColumnName("LearningResourceId");
                entity.Property(e => e.DeletedAt).HasColumnName("DeletedAt");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("IsDeleted");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.TypeId)
                    .HasConstraintName("FK_Tasks_TaskTypes_TypeId");

                entity.HasOne(d => d.Learner)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Tasks_Learner_LearnerId");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Tasks_Category_CategoryId");

                entity.HasOne(d => d.KanbanStatus)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.KanbanStatusId)
                    .HasConstraintName("FK_Tasks_KanbanStatus_KanbanStatusId");

                entity.HasMany(t => t.SubTasks)
                    .WithOne(st => st.Task)
                    .HasForeignKey(st => st.TaskId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Subtask>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Subtasks");

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Title).HasColumnName("Title");
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt");
                entity.Property(e => e.UpdatedAt).HasColumnName("UpdatedAt");
                entity.Property(e => e.TaskId).HasColumnName("TaskId");
                entity.Property(e => e.DeletedAt).HasColumnName("DeletedAt");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("IsDeleted");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.SubTasks)
                    .HasForeignKey(d => d.TaskId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Subtasks_Tasks_TaskId");
            });

            modelBuilder.Entity<TaskType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("TaskTypes");

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Name).HasColumnName("Name");
                entity.Property(e => e.Description).HasColumnName("Description");
                entity.Property(e => e.Icon).HasColumnName("Icon");
                entity.Property(e => e.LearnerId).HasColumnName("LearnerId");
                entity.Property(e => e.DeletedAt).HasColumnName("DeletedAt");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("IsDeleted");

                entity.HasOne(d => d.Learner)
                    .WithMany(p => p.TaskTypes)
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_TaskTypes_Learner_LearnerId");
            });

            modelBuilder.Entity<StudySession>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("StudySession");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.LearnerId).HasColumnName("learner_id");
                entity.Property(e => e.TaskId).HasColumnName("task_id");
                entity.Property(e => e.StartTime).HasColumnName("start_time");
                entity.Property(e => e.EndTime).HasColumnName("end_time");
                entity.Property(e => e.CycleCount).HasColumnName("cycle_count");
                entity.Property(e => e.IsCompleted).HasColumnName("is_completed");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
                entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("is_deleted");
                entity.Property(e => e.RowVersion).HasColumnName("RowVersion").IsRowVersion();

                entity.HasOne(d => d.Learner)
                    .WithMany()
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_StudySession_Learner_LearnerId");

                entity.HasOne(d => d.Task)
                    .WithMany()
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_StudySession_Tasks_TaskId");
            });

            modelBuilder.Entity<PomodoroCycle>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("PomodoroCycle");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.StudySessionId).HasColumnName("study_session_id");
                entity.Property(e => e.IsCompleted).HasColumnName("is_completed");
                entity.Property(e => e.StartTime).HasColumnName("start_time");
                entity.Property(e => e.EndTime).HasColumnName("end_time");
                entity.Property(e => e.BreakType).HasColumnName("break_type");
                entity.Property(e => e.BreakStart).HasColumnName("break_start");
                entity.Property(e => e.BreakEnd).HasColumnName("break_end");

                entity.HasOne(d => d.StudySession)
                    .WithMany(p => p.PomodoroCycles)
                    .HasForeignKey(d => d.StudySessionId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PomodoroCycle_StudySession_StudySessionId");
            });

            modelBuilder.Entity<PomodoroInsight>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("PomodoroInsight");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.LearnerId).HasColumnName("learner_id");
                entity.Property(e => e.TotalPomodoros).HasColumnName("total_pomodoros");
                entity.Property(e => e.TotalFocusTime).HasColumnName("total_focus_time");
                entity.Property(e => e.WeeklyPomodoros).HasColumnName("weekly_pomodoros");
                entity.Property(e => e.WeeklyFocusTime).HasColumnName("weekly_focus_time");
                entity.Property(e => e.WeekOf).HasColumnName("week_of");

                entity.HasOne(d => d.Learner)
                    .WithMany()
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PomodoroInsight_Learner_LearnerId");
            });

            modelBuilder.Entity<TimerSettings>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("TimerSettings");

                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.LearnerId).HasColumnName("LearnerId");
                entity.Property(e => e.FocusMinutes).HasColumnName("FocusMinutes");
                entity.Property(e => e.ShortBreakMin).HasColumnName("ShortBreakMin");
                entity.Property(e => e.LongBreakMin).HasColumnName("LongBreakMin");
                entity.Property(e => e.CyclesBeforeLongBreak).HasColumnName("CyclesBeforeLongBreak");

                entity.HasOne(d => d.Learner)
                    .WithMany()
                    .HasForeignKey(d => d.LearnerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_TimerSettings_Learner_LearnerId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}