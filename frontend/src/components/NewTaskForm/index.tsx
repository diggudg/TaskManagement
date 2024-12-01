import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CreateTask from "../../models/CreateTask";

interface INewTaskModalProps {
  show: boolean;
  onHide: () => void;
  saveTask: (task: CreateTask) => void;
}

const NewTaskModal: React.FC<INewTaskModalProps> = ({
  show,
  onHide,
  saveTask,
}) => {
  const [newTask, setNewTask] = useState<CreateTask>({
    name: "",
    description: "",
    dueDate: "",
    status: "Pending",
    isCompleted: false,
  });
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    dueDate?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      description?: string;
      dueDate?: string;
    } = {};
    if (!newTask.name) newErrors.name = "Name is required";
    if (!newTask.description) newErrors.description = "Description is required";
    if (!newTask.dueDate) newErrors.dueDate = "Due date is required";
    return newErrors;
  };

  const handleAddTask = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setNewTask({
        name: "",
        description: "",
        dueDate: "",
        status: "Pending",
        isCompleted: false,
      });
      saveTask(newTask);
      onHide();
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskTitle">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formTaskDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              isInvalid={!!errors.dueDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dueDate}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTaskModal;
