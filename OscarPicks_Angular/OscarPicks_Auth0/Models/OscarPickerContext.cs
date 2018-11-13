using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace OscarPicks_Auth0.Models
{
    public partial class OscarPickerContext : DbContext
    {
        public OscarPickerContext()
        {
        }

        public OscarPickerContext(DbContextOptions<OscarPickerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<OscarCategory> OscarCategory { get; set; }
        public virtual DbSet<OscarRecipient> OscarRecipient { get; set; }
        public virtual DbSet<OscarRecipientCategory> OscarRecipientCategory { get; set; }
        public virtual DbSet<UserChoice> UserChoice { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string projectPath = AppDomain.CurrentDomain.BaseDirectory.Split(new String[] { @"bin\" }, StringSplitOptions.None)[0];
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(projectPath)
                    .AddJsonFile("appsettings.json")
                    .Build();
                string connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OscarCategory>(entity =>
            {
                entity.HasIndex(e => e.Name)
                    .HasName("Name")
                    .IsUnique();

                entity.Property(e => e.Description).HasMaxLength(450);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<OscarRecipient>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(450);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.HasOne(d => d.OscarCategory)
                    .WithMany(p => p.OscarRecipient)
                    .HasForeignKey(d => d.OscarCategoryId);
            });

            modelBuilder.Entity<OscarRecipientCategory>(entity =>
            {
                entity.HasIndex(e => new { e.RecipientId, e.CategoryId })
                    .HasName("UQ__OscarRec__513691ECB4BA7CBC")
                    .IsUnique();

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.OscarRecipientCategory)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OscarReci__Categ__09A971A2");

                entity.HasOne(d => d.Recipient)
                    .WithMany(p => p.OscarRecipientCategory)
                    .HasForeignKey(d => d.RecipientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OscarReci__Recip__08B54D69");
            });

            modelBuilder.Entity<UserChoice>(entity =>
            {
                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.OscarRecipientCategory)
                    .WithMany(p => p.UserChoice)
                    .HasForeignKey(d => d.OscarRecipientCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserChoic__Oscar__0D7A0286");
            });
        }
    }
}
