using backend.Model;
using backend.Services;
namespace backend.Apis;

public static class UserTaskEndpoints
{
    public static void MapUserTaskEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/usertasks", async (IUserTaskService userTaskService) =>
        {
            var tasks = await userTaskService.GetAllTasksAsync();
            return Results.Ok(tasks);
        });

        endpoints.MapGet("/usertasks/{id}", async (string id, IUserTaskService userTaskService) =>
        {
            var task = await userTaskService.GetTaskByIdAsync(id);
            return task != null ? Results.Ok(task) : Results.NotFound();
        });

        endpoints.MapPost("/usertasks", async (UserTask task, IUserTaskService userTaskService) =>
        {
            await userTaskService.AddTaskAsync(task);
            return Results.Created($"/usertasks/{task.Id}", task);
        });

        endpoints.MapPut("/usertasks", async (UserTask task, IUserTaskService userTaskService) =>
        {
            var existingTask = await userTaskService.GetTaskByIdAsync(task.Id);
            if (existingTask == null)
            {
                return Results.NotFound();
            }
            existingTask.Name = task.Name;
            existingTask.Description = task.Description;
            existingTask.DueDate = task.DueDate;
            existingTask.IsCompleted = task.IsCompleted;
            await userTaskService.UpdateTaskAsync(task);
            return Results.NoContent();
        });


        endpoints.MapDelete("/usertasks/{id}", async (string id, IUserTaskService userTaskService) =>
        {
            var existingTask = await userTaskService.GetTaskByIdAsync(id);
            if (existingTask == null)
            {
                return Results.NotFound();
            }

            await userTaskService.DeleteTaskAsync(id);
            return Results.NoContent();
        });
    }
}