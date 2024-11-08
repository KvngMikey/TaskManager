# TaskManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Project Structure

src/
├── app/
│   ├── @core/
│   │   ├── interfaces/
│   │   │   ├── task.interface.ts      # Interface defining the Task structure
│   │   ├── services/
│   │   │   ├── task.service.ts        # Service to handle task CRUD operations
│   ├── @components/
│   │   ├── task-form/
│   │   │   ├── task-form.component.ts   # Component for adding and editing tasks
│   │   │   ├── task-form.component.html # Template for task form
│   │   │   ├── task-form.component.scss # Styling for task form
│   │   ├── task-list/
│   │   │   ├── task-list.component.ts   # Component for displaying task list
│   │   │   ├── task-list.component.html # Template for task list
│   │   │   ├── task-list.component.scss # Styling for task list
│   ├── app-routing.module.ts          # Angular routing configuration
│   ├── app.component.ts               # Root component of the application
│   ├── app.component.html             # Root component template
│   ├── app.component.scss             # Root component styles
│   ├── app.module.ts                  # Angular module for the application
│
├── assets/                           # Static assets (images, fonts, etc.)
│   ├── images/                       # Task manager-related images
│
├── environments/                     # Configuration files for different environments
│   ├── environment.ts                 # Default environment configuration
│   ├── environment.prod.ts            # Production environment configuration
├── index.html                        # Main HTML template file
├── main.ts                            # Application entry point
├── polyfills.ts                       # File to support legacy browsers
├── styles.scss                        # Global styles for the application
├── tsconfig.json                      # TypeScript configuration
├── angular.json                       # Angular CLI project configuration
└── package.json                       # Project dependencies and scripts

## Setup Instructions and Development server

After cloning the project, run `npm install --legacy-peer-deps` to bypass the dependency issues and get your package-lock.json and node_modules in sync with the project.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Technologies Used
Angular - Front-end framework
Angular CLI - Tool to create and manage Angular projects
TypeScript - Language used for development
SCSS - CSS preprocessor
RxJS: For managing the state of the tasks using reactive programming.
Bootstrap: For styling and layout of the application.
SessionStorage: Used to store task data during the session.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
