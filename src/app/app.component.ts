import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  _id: string;
  title: string;
  description: string;
  limitDate: string;
  tags: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';

  tasks: Task[] = [
    {
      _id: uuidv4(),
      title: 'Tomar banho',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      limitDate: '20/12/2021',
      tags: ["Limpeza", "Corpo", "Bem estar"]
    },
    {
      _id: uuidv4(),
      title: 'Comer',
      description: 'Comer para aguentar o dia inteiro',
      limitDate: '10/02/2021',
      tags: ["Corpo", "Bem estar", "Comida"]
    },
    {
      _id: uuidv4(),
      title: 'Trabalhar',
      description: 'Ir ao trabalho todo dia',
      limitDate: '05/01/2021',
      tags: ["Trabalho", "Obrigação"]
    }
  ];

  removeTask(id: string) {
    this.tasks = this.tasks.filter(task => {
      return task._id != id;
    })
  }

  removeTagFromTask(tagIndex: number, tagToRemove: string) {
    this.tasks[tagIndex].tags = this.tasks[tagIndex].tags.filter(tag => {
      return tag != tagToRemove;
    })
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
    button.innerHTML = 'Esconder'
  }
}
