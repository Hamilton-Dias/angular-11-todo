import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

interface Tasks {
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

  tasks: Tasks[] = [
    {
      _id: uuidv4(),
      title: 'Tomar banho',
      description: 'É necessário tomar banho sempre para ficar limpo',
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
      return task._id != id
    })
  }
}
