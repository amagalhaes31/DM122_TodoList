export default class HtmlService {
    
    constructor(todoService) {
        this.todoService = todoService;    
        this.bindFormEvent();
        this.listTasks();
    }
  
    bindFormEvent() {

      const form = document.querySelector("form");
      
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("submitted! Value: " + form.item.value);
        this.addTask(form.item.value);
        form.reset();
        form.item.focus();
      });
    }

    async addTask(description){
        const task = { description , done: false};
        const taskId = await this.todoService.save(task);
        task.id = taskId;
        this.addToHtmlList(task);
    }


    async listTasks() {
        const tasks = await this.todoService.getAll();
        tasks.forEach(task => this.addToHtmlList(task));
        console.log(tasks);
    }

    addToHtmlList(task) {

        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        li.setAttribute('data-item-id', task.id);
        span.textContent = task.description;
        button.textContent = 'x';

        if(task.done) {
            li.classList.add('done');
        }

        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);

    }

  }