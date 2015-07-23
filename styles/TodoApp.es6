//Importing ES6 Modules from Angular2
import(Compotnent, Template, bootstrap, Foreach) from 'angular2/angular2';
import(TodoStore) from 'services/TodoStore';


//Compoenents are where Controllers and Views reside.
//selector tells us what should be the HTML selector for this component.
//componentServices are the dependencies which the compenent needs

@Component({
	selector: 'todo-app',
	componentServices:[ TodoStore]
})


//@Template is the view.. we point the url property to the correct view template html file
//directives lets us specific the directive dependencies for this template
@Template({
	url: 'templates/todo.html',
	directives : [Foreach]
})

class TodoApp{

	todoStore: TodoStore;

	constructor(todoStore: TodoStore){
		this.todoStore = todoStore;
	}

	add($event, newtodo){
		if($event, newtodo){
			this.todoStore.add(newtodo.value);
			newtodo.value = '';
		}
	}

	toggleTodoState(todo){
	todo.done = !todo.done;
	}
}

bootstrap(TodoApp);