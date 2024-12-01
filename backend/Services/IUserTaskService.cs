using backend.Model;
namespace backend.Services;

public interface IUserTaskService
{
    Task<IEnumerable<UserTask>> GetAllTasksAsync();
    Task<UserTask> GetTaskByIdAsync(string id);
    Task AddTaskAsync(UserTask task);
    Task UpdateTaskAsync(UserTask task);
    Task DeleteTaskAsync(string id);
}