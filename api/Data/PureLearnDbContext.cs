using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace api.Data
{
    public partial class PureLearnDbContext : IdentityDbContext<ApplicationUser>
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
        public virtual DbSet<StudySession> StudySessions { get; set; } = null!;
        public virtual DbSet<PomodoroCycle> PomodoroCycles { get; set; } = null!;

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
                entity.Property(e => e.TypeId).HasColumnName("type_id");
                entity.Property(e => e.GoalId).HasColumnName("goal_id");
                entity.Property(e => e.Title).HasMaxLength(255).HasColumnName("title");
               
                entity.Property(e => e.IsDeleted).HasDefaultValue(false).HasColumnName("is_deleted");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(sysdatetime())").HasColumnName("updated_at");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.LearningResources)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_LearningResources_LearningResourceTypes_TypeId");

                entity.HasOne(d => d.Goal)
                    .WithMany(p => p.LearningResources)
                    .HasForeignKey(d => d.GoalId)
                    .OnDelete(DeleteBehavior.Restrict) // ⛔️ بدل Cascade لحل المشكلة
                    .HasConstraintName("FK_LearningResources_Goals_GoalId");
            });

            modelBuilder.Entity<StudySession>(entity =>
            {
                entity.ToTable("StudySession", tb =>
                {
                    tb.HasTrigger("trg_soft_delete_study_session");
                    tb.HasTrigger("trg_update_study_session_updated_at");
                });

                // Soft‐delete filter (ignores rows where IsDeleted == true)
                entity.HasQueryFilter(s => !s.IsDeleted);

                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.LearnerId);
                entity.HasIndex(e => e.TaskId);

                entity.Property(e => e.Id)
                      .HasColumnName("id");

                entity.Property(e => e.LearnerId)
                      .HasColumnName("learner_id");

                entity.Property(e => e.TaskId)
                      .HasColumnName("task_id");

                entity.Property(e => e.StartTime)
                      .HasColumnName("start_time");

                entity.Property(e => e.EndTime)
                      .HasColumnName("end_time");

                entity.Property(e => e.CycleCount)
                      .HasColumnName("cycle_count");

                entity.Property(e => e.IsCompleted)
                      .HasColumnName("is_completed");

                entity.Property(e => e.CreatedAt)
                      .HasColumnName("created_at")
                      .HasDefaultValueSql("sysdatetime()");

                entity.Property(e => e.UpdatedAt)
                      .HasColumnName("updated_at")
                      .HasDefaultValueSql("sysdatetime()");

                entity.Property(e => e.DeletedAt)
                      .HasColumnName("deleted_at");

                entity.Property(e => e.IsDeleted)
                      .HasColumnName("is_deleted")
                      .HasDefaultValue(false);

                entity.HasOne(d => d.Learner)
                      .WithMany(l => l.StudySessions)
                      .HasForeignKey(d => d.LearnerId)
                      .OnDelete(DeleteBehavior.Restrict)
                      .HasConstraintName("FK_StudySession_Learner");

                entity.HasOne(d => d.Task)
                      .WithMany(t => t.StudySessions)
                      .HasForeignKey(d => d.TaskId)
                      .OnDelete(DeleteBehavior.Restrict)
                      .HasConstraintName("FK_StudySession_Task");
            });

            modelBuilder.Entity<PomodoroCycle>(entity =>
            {
                entity.ToTable("PomodoroCycle");

                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.StudySessionId);

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.StudySessionId).HasColumnName("study_session_id");
                entity.Property(e => e.IsCompleted).HasColumnName("is_completed");
                entity.Property(e => e.StartTime).HasColumnName("start_time");
                entity.Property(e => e.EndTime).HasColumnName("end_time");
                entity.Property(e => e.BreakType).HasColumnName("break_type");
                entity.Property(e => e.BreakStart).HasColumnName("break_start");
                entity.Property(e => e.BreakEnd).HasColumnName("break_end");

                entity.HasOne(e => e.StudySession)
                      .WithMany(s => s.PomodoroCycles)
                      .HasForeignKey(e => e.StudySessionId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}