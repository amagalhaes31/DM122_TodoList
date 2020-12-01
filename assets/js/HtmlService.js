const doneCssClass = "done";
const dataItemId = "data-item-id";

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

    getTaskId(listItem) {
        return +listItem.getAttribute(dataItemId);        // + convert from string to integer
    }

    async deleteTask(listItem, taskId) {
        await this.todoService.delete(taskId);
        listItem.remove();
    }

    async saveTask(taskId, isDone) {
        const task = await this.todoService.get(taskId);
        task.done = isDone;
        await this.todoService.save(task);
    }

    toggleTask(listItem, taskId) {
        listItem.classList.toggle(doneCssClass);
        const isDone = listItem.classList.contains(doneCssClass);
        this.saveTask(taskId, isDone);
    }

    addToHtmlList(task) {

        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        li.addEventListener('click', () => this.toggleTask(li, task.id))
        if(task.done) {
            li.classList.add(doneCssClass);
        }
        
        span.textContent = task.description;
        
        button.textContent = 'x';
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            this.deleteTask(li, task.id);
        });

        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
    }

  }
