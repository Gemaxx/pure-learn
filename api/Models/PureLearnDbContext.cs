using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class PureLearnDbContext : DbContext
{
    public PureLearnDbContext()
    {
    }

    public PureLearnDbContext(DbContextOptions<PureLearnDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Goal> Goals { get; set; }

    public virtual DbSet<KanbanStatus> KanbanStatuses { get; set; }

    public virtual DbSet<Learner> Learners { get; set; }

    public virtual DbSet<LearningResource> LearningResources { get; set; }

    public virtual DbSet<LearningResourceType> LearningResourceTypes { get; set; }

    public virtual DbSet<Note> Notes { get; set; }

    public virtual DbSet<Subgoal> Subgoals { get; set; }

    public virtual DbSet<Subtask> Subtasks { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<TaskType> TaskTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Category__3213E83F95FBEC95");

            entity.ToTable("Category", tb => tb.HasTrigger("trg_UpdateCategoryUpdatedAt"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Color).HasMaxLength(50);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.LearnerId).HasColumnName("LearnerID");
            entity.Property(e => e.ParentCategoryId).HasColumnName("ParentCategoryID");
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Learner).WithMany(p => p.Categories)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__Category__Learne__3E52440B");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("FK__Category__Parent__3F466844");
        });

        modelBuilder.Entity<Goal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Goal__3213E83F6EC8DCAE");

            entity.ToTable("Goal", tb => tb.HasTrigger("trg_UpdateGoalUpdatedAt"));

            entity.HasIndex(e => e.LearnerId, "idx_goal_learner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.LearnerId).HasColumnName("LearnerID");
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.Goals)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Goal__CategoryID__440B1D61");

            entity.HasOne(d => d.Learner).WithMany(p => p.Goals)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Goal__LearnerID__44FF419A");
        });

        modelBuilder.Entity<KanbanStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__KanbanSt__3213E83FA1635CE9");

            entity.ToTable("KanbanStatus");

            entity.HasIndex(e => e.Name, "UQ__KanbanSt__737584F67CE01DBD").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<Learner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Learner__3213E83F59094395");

            entity.ToTable("Learner", tb => tb.HasTrigger("trg_UpdateLearnerUpdatedAt"));

            entity.HasIndex(e => e.Email, "UQ__Learner__A9D1053443D3BD97").IsUnique();

            entity.HasIndex(e => e.Email, "idx_email");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.LastLogin).HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<LearningResource>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Learning__3213E83F01C435D8");

            entity.ToTable("LearningResource", tb => tb.HasTrigger("trg_UpdateLearningResourceUpdatedAt"));

            entity.HasIndex(e => e.CategoryId, "idx_LearningResource_category_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.GoalId).HasColumnName("GoalID");
            entity.Property(e => e.LearnerId).HasColumnName("LearnerID");
            entity.Property(e => e.SubgoalId).HasColumnName("SubgoalID");
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.TypeId).HasColumnName("TypeID");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__LearningR__Categ__5535A963");

            entity.HasOne(d => d.Goal).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__LearningR__GoalI__5629CD9C");

            entity.HasOne(d => d.Learner).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__LearningR__Learn__5441852A");

            entity.HasOne(d => d.Subgoal).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.SubgoalId)
                .HasConstraintName("FK__LearningR__Subgo__571DF1D5");

            entity.HasOne(d => d.Type).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK__LearningR__TypeI__5070F446");
        });

        modelBuilder.Entity<LearningResourceType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Learning__3213E83F14A406E1");

            entity.ToTable("LearningResourceType");

            entity.HasIndex(e => e.Name, "UQ__Learning__737584F69F16A2D5").IsUnique();

            entity.HasIndex(e => e.UnitType, "UQ__Learning__E5A63393C94087A3").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.UnitType).HasMaxLength(255);
        });

        modelBuilder.Entity<Note>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Note__3213E83FBA8DA099");

            entity.ToTable("Note", tb => tb.HasTrigger("trg_UpdateNoteUpdatedAt"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.GoalId).HasColumnName("GoalID");
            entity.Property(e => e.LearnerId).HasColumnName("LearnerID");
            entity.Property(e => e.SubgoalId).HasColumnName("SubgoalID");
            entity.Property(e => e.TaskId).HasColumnName("TaskID");
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.Notes)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Note__CategoryID__7E37BEF6");

            entity.HasOne(d => d.Goal).WithMany(p => p.Notes)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__Note__GoalID__7F2BE32F");

            entity.HasOne(d => d.Learner).WithMany(p => p.Notes)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__Note__LearnerID__02084FDA");

            entity.HasOne(d => d.Subgoal).WithMany(p => p.Notes)
                .HasForeignKey(d => d.SubgoalId)
                .HasConstraintName("FK__Note__SubgoalID__00200768");

            entity.HasOne(d => d.Task).WithMany(p => p.Notes)
                .HasForeignKey(d => d.TaskId)
                .HasConstraintName("FK__Note__TaskID__01142BA1");
        });

        modelBuilder.Entity<Subgoal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Subgoal__3213E83F633217E0");

            entity.ToTable("Subgoal", tb => tb.HasTrigger("trg_UpdateSubgoalUpdatedAt"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.GoalId).HasColumnName("GoalID");
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Goal).WithMany(p => p.Subgoals)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__Subgoal__GoalID__49C3F6B7");
        });

        modelBuilder.Entity<Subtask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Subtask__3213E83F562DE803");

            entity.ToTable("Subtask", tb => tb.HasTrigger("trg_UpdateSubtaskUpdatedAt"));

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.TaskId).HasColumnName("TaskID");
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Task).WithMany(p => p.Subtasks)
                .HasForeignKey(d => d.TaskId)
                .HasConstraintName("FK__Subtask__TaskID__797309D9");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Task__3213E83F2BF5A86A");

            entity.ToTable("Task", tb => tb.HasTrigger("trg_UpdateTaskUpdatedAt"));

            entity.HasIndex(e => e.KanbanStatusId, "idx_task_kanbanstatus");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EisenhowerStatus).HasMaxLength(50);
            entity.Property(e => e.GoalId).HasColumnName("GoalID");
            entity.Property(e => e.KanbanStatusId).HasColumnName("KanbanStatusID");
            entity.Property(e => e.LearnerId).HasColumnName("LearnerID");
            entity.Property(e => e.LearningResourceId).HasColumnName("LearningResourceID");
            entity.Property(e => e.RepeatEnds).HasMaxLength(50);
            entity.Property(e => e.RepeatFrequency)
                .HasMaxLength(50)
                .HasDefaultValue("None");
            entity.Property(e => e.RepeatOnFriday)
                .HasDefaultValue(false)
                .HasColumnName("RepeatOnFRIDAY");
            entity.Property(e => e.RepeatOnMonday)
                .HasDefaultValue(false)
                .HasColumnName("RepeatOnMONDAY");
            entity.Property(e => e.RepeatOnSaturday)
                .HasDefaultValue(false)
                .HasColumnName("RepeatOnSATURDAY");
            entity.Property(e => e.RepeatOnSunday)
                .HasDefaultValue(false)
                .HasColumnName("RepeatOnSUNDAY");
            entity.Property(e => e.RepeatOnThursday)
                .HasDefaultValue(false)
                .HasColumnName("RepeatOnTHURSDAY");
            entity.Property(e => e.RepeatOnTuesday)
                .HasDefaultValue(false)
                .HasColumnName("RepeatOnTUESDAY");
            entity.Property(e => e.RepeatOnWednesday)
                .HasDefaultValue(false)
                .HasColumnName("RepeatOnWEDNESDAY");
            entity.Property(e => e.SubgoalId).HasColumnName("SubgoalID");
            entity.Property(e => e.TimeTaskRelated).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(100);
            entity.Property(e => e.TypeId).HasColumnName("TypeID");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Task__CategoryID__70DDC3D8");

            entity.HasOne(d => d.Goal).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__Task__GoalID__71D1E811");

            entity.HasOne(d => d.KanbanStatus).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.KanbanStatusId)
                .HasConstraintName("FK__Task__KanbanStat__628FA481");

            entity.HasOne(d => d.Learner).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__Task__LearnerID__6FE99F9F");

            entity.HasOne(d => d.LearningResource).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.LearningResourceId)
                .HasConstraintName("FK__Task__LearningRe__73BA3083");

            entity.HasOne(d => d.Subgoal).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.SubgoalId)
                .HasConstraintName("FK__Task__SubgoalID__72C60C4A");

            entity.HasOne(d => d.Type).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK__Task__TypeID__619B8048");
        });

        modelBuilder.Entity<TaskType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TaskType__3213E83FFFCC3424");

            entity.ToTable("TaskType");

            entity.HasIndex(e => e.Name, "UQ__TaskType__737584F687D717BC").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
