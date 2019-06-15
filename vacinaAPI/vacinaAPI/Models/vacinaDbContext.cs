using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace vacinaAPI.Models
{
    public partial class vacinaDbContext : DbContext
    {
        public vacinaDbContext()
        {
        }

        public vacinaDbContext(DbContextOptions<vacinaDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Animal> Animal { get; set; }
        public virtual DbSet<Vacina> Vacina { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Server=localhost;Database=vacinaDb;Port=5432;User Id=postgres;Password=postgres;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Animal>(entity =>
            {
                entity.ToTable("animal");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Vacina>(entity =>
            {
                entity.ToTable("vacina");

                entity.HasIndex(e => e.IdAnimal)
                    .HasName("fki_animal_fk");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Aplicador)
                    .IsRequired()
                    .HasColumnName("aplicador")
                    .HasMaxLength(100);

                entity.Property(e => e.DescMedicamento)
                    .IsRequired()
                    .HasColumnName("desc_medicamento")
                    .HasMaxLength(100);

                entity.Property(e => e.Dosagem).HasColumnName("dosagem");

                entity.Property(e => e.DtVacina)
                    .HasColumnName("dt_vacina");
                    

                entity.Property(e => e.IdAnimal).HasColumnName("id_animal");

                entity.Property(e => e.Peso).HasColumnName("peso");

                entity.HasOne(d => d.IdAnimalNavigation)
                    .WithMany(p => p.Vacina)
                    .HasForeignKey(d => d.IdAnimal)
                    .HasConstraintName("animal_fk");
            });
        }
    }
}
