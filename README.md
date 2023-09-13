## Task Manager

The task was to create a simple full-stack web application for managing tasks. The application should allow users to create, read, update, and delete tasks. The required tech stack was Node.js and Express for the backend, React for the frontend, and MongoDB for the database.

<div align="center">
<img src="demo.gif?raw=true" width="400px">
</div>

## Contents

- [Requirements](#requirements)
- [How to Install dependencies and run](#how-to-install-dependencies-and-run)
- [Assumptions](#assumptions)
- [Bonus Features](#bonus-features)

## Requirements

The application should have the following features:

#### Backend

- Creating a new task.
- Retrieving a list of tasks.
- Updating an existing task.
- Deleting a task.

#### Frontend

- Creating a new task with all the necessary information
- A user-friendly way to display existing tasks
- The ability to edit or delete tasks.

#### Database

- A MongoDB database to store tasks.

## Prerequisites

- Node js (version 18 or higher)
- Setup the development environment first.
- [React Client environment setup](./client/README.md)

## How to install dependencies and run

- Clone the repository:

```
git clone https://github.com/im-oswald/task-manager.git
```

- Go to the project directory:

```
cd task-manager
```

- Install dependencies:

```
npm install
```

- Run project locally:

```
npm run dev
```

## Assumptions

- A user shows only accessible tasks, instead of showing all, as I added user authentication.
- Also, if on some views a user is able to access each other tasks, the actions wouldn't be visible and if by any mean they interact with actions by chance, the BE validation is there to secure the access
- Set the default pagination size as 5
- Added the priority to the tasks as it adds more meaning to the list i.e High, Medium, Low
- The order of the list is as follows:
  - The in-completed tasks would be shown at the top
    - Among the in-completed tasks, the tasks with high priority would be shown first
    - Following the medium priority
    - The low priority
  - The completed tasks would be shown at the last
    - Among the completed tasks, the tasks with high priority would be shown first
    - Following the medium priority
    - The low priority
  - The date sort is also applicable, like for any prioritization, the recently added tasks would be shown at the top following the older ones

## Bonus Features

- User Authentication System that allows Signup and Login with jwt based sessions
- State management using redux
- Custom Pagination (default records count is 5)
- Deep linking of the urls on the paginated records
  - Try accessing http://localhost:5000/api/tasks?page=2 directly from the address bar. It would show you the records of the 2nd page
