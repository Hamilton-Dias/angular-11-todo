import { Component } from '@angular/core';

interface Tasks {
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

  tasks = [
    {
      title: 'Tomar banho',
      description: 'É necessário tomar banho sempre para ficar limpo',
      limitDate: '20/12/2021',
      tags: ["Limpeza", "Corpo", "Bem estar"]
    },
    {
      title: 'Comer',
      description: 'Comer para aguentar o dia inteiro',
      limitDate: '10/02/2021',
      tags: ["Corpo", "Bem estar", "Comida"]
    },
    {
      title: 'Trabalhar',
      description: 'Ir ao trabalho todo dia',
      limitDate: '05/01/2021',
      tags: ["Trabalho", "Obrigação"]
    }
  ];
}
