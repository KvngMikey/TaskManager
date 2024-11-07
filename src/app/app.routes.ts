import { Routes } from '@angular/router';
import { WelcomeComponent } from './@components/welcome/welcome.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },

  // children: [
  {
    path: 'tasks',
    loadChildren: () => {
      return import('./@components/task-list/task-list.module').then(
        (m) => m.TaskListModule
      );
    },
  },
  // ],
  // }, 
];
