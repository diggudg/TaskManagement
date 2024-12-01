using backend.Model;
using backend.Repositories;
using Microsoft.AspNetCore.SignalR;
namespace backend.Services;

public class UserTaskService : IUserTaskService
{
    private readonly IUserTaskRepository _userTaskRepository;
    private readonly IHubContext<UserTaskHub> _hubContext;

    public UserTaskService(IUserTaskRepository userTaskRepository, IHubContext<UserTaskHub> hubContext)
    {
        _userTaskRepository = userTaskRepository;
        _hubContext = hubContext;
    }

    public async Task<IEnumerable<UserTask>> GetAllTasksAsync()
    {
        return await _userTaskRepository.GetAllAsync();
    }

    public async Task<UserTask> GetTaskByIdAsync(string id)
    {
        return await _userTaskRepository.GetByIdAsync(id);
    }

    public async Task AddTaskAsync(UserTask task)
    {
        var id = Guid.NewGuid().ToString();
        task.Id = id;
        await _userTaskRepository.AddAsync(task);
        await _hubContext.Clients.All.SendAsync("UpdatedUserTask", task);
    }

    public async Task UpdateTaskAsync(UserTask task)
    {
        await _userTaskRepository.UpdateAsync(task);
        await _hubContext.Clients.All.SendAsync("UpdatedUserTask", task);
    }

    public async Task DeleteTaskAsync(string id)
    {
        await _userTaskRepository.DeleteAsync(id);
        await _hubContext.Clients.All.SendAsync("UpdatedUserTask", id);
    }
}