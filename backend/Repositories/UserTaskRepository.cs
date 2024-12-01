using backend.Model;
using Context;
namespace backend.Repositories;

public class UserTaskRepository : Repository<UserTask>, IUserTaskRepository
{
    public UserTaskRepository(ApplicationDbContext context) : base(context)
    {
    }
}