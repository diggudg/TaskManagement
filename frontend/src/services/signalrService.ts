import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

class SignalRService {
  private connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5001/usertaskhub")
      .withAutomaticReconnect()
      .build();
  }

  public startConnection = async () => {
    try {
      await this.connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.log("Error while starting SignalR connection: ", err);
      setTimeout(this.startConnection, 5000);
    }
  };

  public onTaskUpdated = (callback: (task: any) => void) => {
    this.connection.on("UpdatedUserTask", callback);
  };

  public onTaskAdded = (callback: (task: any) => void) => {
    this.connection.on("AddedUserTask", callback);
  };

  public onTaskDeleted = (callback: (taskId: string) => void) => {
    this.connection.on("DeletedUserTask", callback);
  };
}

export default new SignalRService();
