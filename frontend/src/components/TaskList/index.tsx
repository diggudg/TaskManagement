import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import useTaskProvider from "../../hooks/useTaskProvider";

const TaskList: React.FC = () => {
  const { handleComplete, taskList, removeTask } = useTaskProvider();

  return (
    <Container className="mt-4">
      <Row>
        {taskList.map((task) => (
          <Col key={task.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {task.isCompleted ? "Completed" : "Pending"}
                </Card.Subtitle>
                <Card.Text>{task.description}</Card.Text>
                <Button
                  disabled={task.isCompleted}
                  variant={task.isCompleted ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => handleComplete(task.id)}
                >
                  Mark as Completed
                </Button>
                <div style={{ width: "10px", display: "inline-block" }}></div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeTask(task.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TaskList;
