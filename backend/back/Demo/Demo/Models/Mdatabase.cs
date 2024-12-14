using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Demo.Models
{
    public class Mdatabase : IdentityDbContext<ApplicationUser>
    {
        public Mdatabase()
        {
        }
        public Mdatabase(DbContextOptions options):base(options)
        {
        }
      
    }
}
