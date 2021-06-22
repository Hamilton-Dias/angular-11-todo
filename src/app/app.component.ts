import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  _id: string;
  title: string;
  description: string;
  limitDate: string;
  tags: string[];
  tagsForm?: string;
  isCompleted: boolean;
}

interface Filter {
  title: string;
  status: string;
  limitDate: string;
  tag: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'todo';
  isModalNewTaskVisible = false;
  isModalFilterVisible = false;
  newTask = {} as Task;
  filter = {} as Filter;
  filteredTasks: Task[] = [];

  ngOnInit() {
    this.filteredTasks = this.tasks;
  }

  tasks: Task[] = [
    {
      _id: uuidv4(),
      title: 'Tomar banho',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      limitDate: '20/12/2021',
      tags: ["Limpeza", "Corpo", "Bem estar"],
      isCompleted: false
    },
    {
      _id: uuidv4(),
      title: 'Comer',
      description: 'Comer para aguentar o dia inteiro',
      limitDate: '10/02/2021',
      tags: ["Corpo", "Bem estar", "Comida"],
      isCompleted: false
    },
    {
      _id: uuidv4(),
      title: 'Trabalhar',
      description: 'Ir ao trabalho todo dia',
      limitDate: '05/01/2021',
      tags: ["Trabalho", "Obrigação"],
      isCompleted: false
    }
  ];

  removeTask(id: string) {
    this.tasks = this.tasks.filter(task => {
      return task._id != id;
    });
  }

  removeTagFromTask(id: string, tagToRemove: string) {
    this.tasks.forEach(task => {
      if (task._id === id) {
        task.tags = task.tags.filter(tag => {
          return tag != tagToRemove;
        });
      }
    });
    
    this.filterTasks();
  }

  /*
    https://lists.w3.org/Archives/Public/w3c-wai-gl/2017AprJun/0951.html
    -> width médio de um char é uns 8px, para fonte com 16px
    preciso pegar o "estilo computado" para pegar o CSS fora do style="...."
  */
  isTextBiggerThan2Lines(element: HTMLElement, text: string) {
    const width = element.offsetWidth;
    const fontSize = 8;

    const lines = text.length / (width / fontSize);

    return lines > 2;
  }

  toggleText(button: HTMLElement) {
    const className = 'hide-text';
    const paragraph = button.parentElement?.querySelector('p');

    if (paragraph?.classList.contains(className)) {
      button.innerHTML = 'Esconder';
      paragraph?.classList.remove(className);
    } else {
      button.innerHTML = 'Mostrar mais';
      paragraph?.classList.add(className);
    }
  }

  toggleCompletion(id: string) {
    this.tasks.forEach(task => {
      if (task._id === id) {
        task.isCompleted = !task.isCompleted;
      }
    });
    
    this.filterTasks();
  }

  isLate(date: string) {
    return new Date() > new Date(date.split('/').reverse().join('/'));
  }

  toggleNewTaskModal() {
    this.isModalNewTaskVisible = !this.isModalNewTaskVisible;
  }

  toggleFilterModal() {
    this.isModalFilterVisible = !this.isModalFilterVisible;
  }

  formSubmit() {
    this.newTask._id = uuidv4();
    this.newTask.tags = this.newTask.tagsForm ? this.newTask.tagsForm.split(',') : [];
    this.newTask.limitDate = this.newTask.limitDate.split('-').reverse().join('/')

    this.tasks.unshift(this.newTask);
    
    this.newTask = {} as Task;
    this.filterTasks();

    this.toggleNewTaskModal();
  }

  filterTasksByTitle() {
    this.filteredTasks = this.tasks.filter(element => {
      return this.isSubstringInsideString(element.title, this.filter?.title)
    });
  }

  allFilterTasks() {
    this.filterTasks();
    this.toggleFilterModal();
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(element => {
      return this.isTaskInsideFilter(element);
    });
  }

  isTaskInsideFilter(task: Task) {
    return (
      this.isSubstringInsideString(task.title, this.filter.title)
      && this.isTaskStatusSelected(task.isCompleted, this.filter.status)
      && this.taskBeforeDate(task.limitDate, this.filter.limitDate)
      && this.hasTag(task.tags, this.filter.tag)
    )
  }

  isSubstringInsideString(string: string, substring = "") {
    return (string.toLocaleLowerCase().indexOf(substring.toLocaleLowerCase()) !== -1)
  }

  isTaskStatusSelected(isTaskCompleted: boolean, filterStatus: string) {

    let show = false;

    switch (filterStatus) {
      case "completed":
        if (isTaskCompleted === true)
          show = true;
          break;
      case "notCompleted":
        if (isTaskCompleted === false)
          show = true;
          break;
      default:
        show = true;
    }

    return show;
  }

  taskBeforeDate(limit: string, date = "") {
    if (date === "")
      return true;

    return new Date(date.split('-').join('/')) > new Date(limit.split('/').reverse().join('/'));
  }

  hasTag(tags: string[], tag = "") {
    if (tag === "")
      return true;

    let taskHasTag = false;

    tags.forEach(taskTag => {
      if (taskTag.toLowerCase() === tag.toLowerCase()) {
        taskHasTag = true;
      }
    })
    
    return taskHasTag;
  }

  clearFilters() {
    this.filter = {} as Filter;
    this.toggleFilterModal();
  }
}
