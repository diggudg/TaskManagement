import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NewTaskModal from "../NewTaskForm";
import { useState } from "react";
import useTaskProvider from "../../hooks/useTaskProvider";
import CreateTask from "../../models/CreateTask";

const MainNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const { addTask } = useTaskProvider();

  const handleAddTask = () => {
    console.log("Add new task modal");
    const newValue = !showModal;
    setShowModal(newValue);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Task List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Button variant="primary" onClick={handleAddTask}>
            Add New Task
          </Button>
        </Navbar.Collapse>
      </Container>
      <NewTaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        saveTask={(task: CreateTask) => {
          addTask(task);
        }}
      />
    </Navbar>
  );
};

export default MainNavbar;
