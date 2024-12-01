using backend.Model;
using Microsoft.AspNetCore.SignalR;
namespace backend;

public class UserTaskHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task AddedUserTask(UserTask task)
    {
        await Clients.All.SendAsync("AddedUserTask", task);
    }

    public async Task UpdatedUserTask(UserTask task)
    {
        await Clients.All.SendAsync("UpdatedUserTask", task);
    }

    public async Task DeletedUserTask(string id)
    {
        await Clients.All.SendAsync("DeletedUserTask", id);
    }
}