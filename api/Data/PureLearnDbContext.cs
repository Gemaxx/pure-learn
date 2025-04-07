using System;
using System.Collections.Generic;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

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

    public virtual DbSet<Models.Task> Tasks { get; set; }

    public virtual DbSet<TaskType> TaskTypes { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Arabic_CI_AS");

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Category__3213E83F6B2F1F4A");

            entity.ToTable("Category", tb =>
                {
                    tb.HasTrigger("trg_soft_delete_category");
                    tb.HasTrigger("trg_update_category_updated_at");
                });

            entity.HasIndex(e => e.LearnerId, "idx_category_learner_id");

            entity.HasIndex(e => e.ParentCategoryId, "idx_category_parent_category_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Color)
                .HasMaxLength(50)
                .HasColumnName("color");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.ParentCategoryId).HasColumnName("parent_category_id");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Learner).WithMany(p => p.Categories)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__Category__learne__6383C8BA");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("FK__Category__parent__6477ECF3");
        });

        modelBuilder.Entity<Goal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Goal__3213E83F4B8AC773");

            entity.ToTable("Goal", tb =>
                {
                    tb.HasTrigger("trg_soft_delete_goal");
                    tb.HasTrigger("trg_update_goal_updated_at");
                });

            entity.HasIndex(e => e.CategoryId, "idx_goal_category_id");

            entity.HasIndex(e => e.LearnerId, "idx_goal_learner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CompletionDate).HasColumnName("completion_date");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.Motivation).HasColumnName("motivation");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.Term)
                .HasMaxLength(50)
                .HasColumnName("term");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");

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
            entity.HasKey(e => e.Id).HasName("PK__KanbanSt__3213E83F57FA3597");

            entity.ToTable("KanbanStatus");

            entity.HasIndex(e => e.Name, "UQ__KanbanSt__72E12F1B5B560D7E").IsUnique();

            entity.HasIndex(e => e.LearnerId, "idx_kanbanstatus_learner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.MaxTasks).HasColumnName("max_tasks");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasOne(d => d.Learner).WithMany(p => p.KanbanStatuses)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__KanbanSta__learn__04E4BC85");
        });

        modelBuilder.Entity<Learner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Learner__3213E83F78F21700");

            entity.ToTable("Learner", tb => tb.HasTrigger("trg_update_learner_updated_at"));

            entity.HasIndex(e => e.Email, "UQ__Learner__AB6E6164FBEEBA46").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Bio).HasColumnName("bio");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LastLogin).HasColumnName("last_login");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.ProfilePicture).HasColumnName("profile_picture");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");
        });


        modelBuilder.Entity<LearningResource>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Learning__3213E83F012A92B3");

            entity.ToTable("LearningResource", tb => tb.HasTrigger("trg_update_learningresource_updated_at"));

            entity.HasIndex(e => e.CategoryId, "idx_learningresource_category_id");

            entity.HasIndex(e => e.GoalId, "idx_learningresource_goal_id");

            entity.HasIndex(e => e.LearnerId, "idx_learningresource_learner_id");

            entity.HasIndex(e => e.SubgoalId, "idx_learningresource_subgoal_id");

            entity.HasIndex(e => e.TypeId, "idx_learningresource_type_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.GoalId).HasColumnName("goal_id");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.Link).HasColumnName("link");
            entity.Property(e => e.Progress).HasColumnName("progress");
            entity.Property(e => e.SubgoalId).HasColumnName("subgoal_id");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.TotalUnits).HasColumnName("total_units");
            entity.Property(e => e.TypeId).HasColumnName("type_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Category).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__LearningR__categ__7D439ABD");

            entity.HasOne(d => d.Goal).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__LearningR__goal___7E37BEF6");

            entity.HasOne(d => d.Learner).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__LearningR__learn__7C4F7684");

            entity.HasOne(d => d.Subgoal).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.SubgoalId)
                .HasConstraintName("FK__LearningR__subgo__7F2BE32F");

            entity.HasOne(d => d.Type).WithMany(p => p.LearningResources)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK__LearningR__type___787EE5A0");
        });

        modelBuilder.Entity<LearningResourceType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Learning__3213E83FD14E54DB");

            entity.ToTable("LearningResourceType");

            entity.HasIndex(e => e.Name, "UQ__Learning__72E12F1BA472CB30").IsUnique();

            entity.HasIndex(e => e.UnitType, "UQ__Learning__978BEDD53942A437").IsUnique();

            entity.HasIndex(e => e.LearnerId, "idx_learningresourcetype_learner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.UnitType)
                .HasMaxLength(255)
                .HasColumnName("unit_type");

            entity.HasOne(d => d.Learner).WithMany(p => p.LearningResourceTypes)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LearningR__learn__75A278F5");
        });


        modelBuilder.Entity<Note>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Note__3213E83F92F5C8DD");

            entity.ToTable("Note", tb => tb.HasTrigger("trg_update_note_updated_at"));

            entity.HasIndex(e => e.CategoryId, "idx_note_category_id");

            entity.HasIndex(e => e.GoalId, "idx_note_goal_id");

            entity.HasIndex(e => e.LearnerId, "idx_note_learner_id");

            entity.HasIndex(e => e.SubgoalId, "idx_note_subgoal_id");

            entity.HasIndex(e => e.TaskId, "idx_note_task_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Body).HasColumnName("body");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.GoalId).HasColumnName("goal_id");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.SubgoalId).HasColumnName("subgoal_id");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Category).WithMany(p => p.Notes)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Note__category_i__29221CFB");

            entity.HasOne(d => d.Goal).WithMany(p => p.Notes)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__Note__goal_id__2A164134");

            entity.HasOne(d => d.Learner).WithMany(p => p.Notes)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__Note__learner_id__2CF2ADDF");

            entity.HasOne(d => d.Subgoal).WithMany(p => p.Notes)
                .HasForeignKey(d => d.SubgoalId)
                .HasConstraintName("FK__Note__subgoal_id__2B0A656D");

            entity.HasOne(d => d.Task).WithMany(p => p.Notes)
                .HasForeignKey(d => d.TaskId)
                .HasConstraintName("FK__Note__task_id__2BFE89A6");
        });

        modelBuilder.Entity<Subgoal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Subgoal__3213E83F5F751E7D");

            entity.ToTable("Subgoal", tb => tb.HasTrigger("trg_update_subgoal_updated_at"));

            entity.HasIndex(e => e.GoalId, "idx_subgoal_goal_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.GoalId).HasColumnName("goal_id");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Goal).WithMany(p => p.Subgoals)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__Subgoal__goal_id__70DDC3D8");
        });

        modelBuilder.Entity<Subtask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Subtask__3213E83F63A2F46B");

            entity.ToTable("Subtask", tb => tb.HasTrigger("trg_update_subtask_updated_at"));

            entity.HasIndex(e => e.TaskId, "idx_subtask_task_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Task).WithMany(p => p.Subtasks)
                .HasForeignKey(d => d.TaskId)
                .HasConstraintName("FK__Subtask__task_id__245D67DE");
        });

        modelBuilder.Entity<Models.Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Task__3213E83F69BC2DC8");

            entity.ToTable("Task", tb =>
                {
                    tb.HasTrigger("trg_soft_delete_task");
                    tb.HasTrigger("trg_update_task_updated_at");
                    tb.HasTrigger("trg_validate_task_repeat_end_date");
                    tb.HasTrigger("trg_validate_task_time_spent");
                });

            entity.HasIndex(e => e.CategoryId, "idx_task_category_id");

            entity.HasIndex(e => e.GoalId, "idx_task_goal_id");

            entity.HasIndex(e => e.KanbanStatusId, "idx_task_kanban_status_id");

            entity.HasIndex(e => e.LearnerId, "idx_task_learner_id");

            entity.HasIndex(e => e.LearningResourceId, "idx_task_learning_resource_id");

            entity.HasIndex(e => e.SubgoalId, "idx_task_subgoal_id");

            entity.HasIndex(e => e.TypeId, "idx_task_type_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("CREATEd_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.DueDate).HasColumnName("due_date");
            entity.Property(e => e.EisenhowerStatus)
                .HasMaxLength(50)
                .HasColumnName("eisenhower_status");
            entity.Property(e => e.EstimatedTime).HasColumnName("estimated_time");
            entity.Property(e => e.GoalId).HasColumnName("goal_id");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.KanbanStatusId).HasColumnName("kanban_status_id");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.LearningResourceId).HasColumnName("learning_resource_id");
            entity.Property(e => e.RepeatEndDate).HasColumnName("repeat_end_date");
            entity.Property(e => e.RepeatEndOccurrences).HasColumnName("repeat_end_occurrences");
            entity.Property(e => e.RepeatEnds)
                .HasMaxLength(50)
                .HasColumnName("repeat_ends");
            entity.Property(e => e.RepeatFrequency)
                .HasMaxLength(50)
                .HasDefaultValue("None")
                .HasColumnName("repeat_frequency");
            entity.Property(e => e.RepeatInterval).HasColumnName("repeat_interval");
            entity.Property(e => e.RepeatOnFriday)
                .HasDefaultValue(false)
                .HasColumnName("repeat_on_friday");
            entity.Property(e => e.RepeatOnMonday)
                .HasDefaultValue(false)
                .HasColumnName("repeat_on_monday");
            entity.Property(e => e.RepeatOnSaturday)
                .HasDefaultValue(false)
                .HasColumnName("repeat_on_saturday");
            entity.Property(e => e.RepeatOnSunday)
                .HasDefaultValue(false)
                .HasColumnName("repeat_on_sunday");
            entity.Property(e => e.RepeatOnThursday)
                .HasDefaultValue(false)
                .HasColumnName("repeat_on_thursday");
            entity.Property(e => e.RepeatOnTuesday)
                .HasDefaultValue(false)
                .HasColumnName("repeat_on_tuesday");
            entity.Property(e => e.RepeatOnWednesday)
                .HasDefaultValue(false)
                .HasColumnName("repeat_on_wednesday");
            entity.Property(e => e.SubgoalId).HasColumnName("subgoal_id");
            entity.Property(e => e.TimeSpent).HasColumnName("time_spent");
            entity.Property(e => e.TimeTaskRelated)
                .HasMaxLength(50)
                .HasColumnName("time_task_related");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
            entity.Property(e => e.TypeId).HasColumnName("type_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetime())")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Category).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Task__category_i__1BC821DD");

            entity.HasOne(d => d.Goal).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.GoalId)
                .HasConstraintName("FK__Task__goal_id__1CBC4616");

            entity.HasOne(d => d.KanbanStatus).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.KanbanStatusId)
                .HasConstraintName("FK__Task__kanban_sta__0C85DE4D");

            entity.HasOne(d => d.Learner).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.LearnerId)
                .HasConstraintName("FK__Task__learner_id__1AD3FDA4");

            entity.HasOne(d => d.LearningResource).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.LearningResourceId)
                .HasConstraintName("FK__Task__learning_r__1EA48E88");

            entity.HasOne(d => d.Subgoal).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.SubgoalId)
                .HasConstraintName("FK__Task__subgoal_id__1DB06A4F");

            entity.HasOne(d => d.Type).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK__Task__type_id__0B91BA14");
        });

        modelBuilder.Entity<TaskType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TaskType__3213E83FBD5F41F1");

            entity.ToTable("TaskType");

            entity.HasIndex(e => e.Name, "UQ__TaskType__72E12F1BF080C4B8").IsUnique();

            entity.HasIndex(e => e.LearnerId, "idx_tasktype_learner_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.Icon).HasColumnName("icon");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("is_deleted");
            entity.Property(e => e.LearnerId).HasColumnName("learner_id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasOne(d => d.Learner).WithMany(p => p.TaskTypes)
                .HasForeignKey(d => d.LearnerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskType__learne__08B54D69");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
