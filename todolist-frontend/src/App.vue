<template>
	<div class="page">
		<div class="container">
			<h1>Tasks app</h1>
			<!-- {{  tasksModel  }} -->
 			<!-- Adding a task -->
			<Vueform size="lg" :endpoint="createTask">

				<TextElement
					name="nameTask"
					placeholder="Add a name"
					floating="add a name task"
					rules="required"
				/>

				<!-- Task input -->
				<TextElement
					name="task"
					placeholder="Add a task"
					floating="Task name"
					rules="required"
				/>


				<!-- Task type -->
				<!-- <RadiogroupElement
					name="type"
					:items="['Personal', 'Business']"
					view="tabs"
					default="Personal"
				/> -->

				<!-- Submit -->
				<ButtonElement
					name="button"
					align="right"
					submits
				>
					Submit
				</ButtonElement>
			</Vueform>

			<hr class="divider" />

			<!-- Task list -->
			<Vueform v-model="tasksModel" sync> <!-- `sync` to update the list when `tasksModel` changes -->

				<!-- List of tasks -->
				<ListElement
					name="tasks"
					:controls="{
						add: false, // to disable adding new elements to the list
					}"
					:add-class="{
						handle: 'task-sort-handle' // for fixing top position of the handle
					}"
					sort
					@sort="syncToStorage"
					@remove="syncToStorage"
				>
					<template #default="{ index }">

						<!-- Task wrapper -->
						<ObjectElement
							:name="index"
							:add-class="[
								'task-container',
								tasksModel.tasks[index].type === 'Personal' ? 'is-personal' : 'is-business'
							]">

						<!-- Edit button, using the task name with index as label - only visible when not editing -->
						<ButtonElement
							:label="`#${index + 1} - Name: ${tasksModel.tasks[index].nameTask} - Task: ${tasksModel.tasks[index].task}`"
							name="edit"
							align="right"
							:conditions="[
								['editing', '!=', index]
							]"
							:columns="{
								label: 8,
							}"
							@click="edit(index)"  
							>
							<!-- @click="sendToBackend()"   -->
							Edit
						</ButtonElement>

						<!-- <p style="margin-top: .4rem;">Nome</p> -->
						<TextElement 
							label="Name"
							name="nameTask"
							:conditions="[
								['editing', index]
							]"
							:columns="4"
						/>

						<!-- Task input when editing -->
						<!-- <p style="margin-top: .4rem;">Task</p> -->
						<TextElement 
							label="Task"
							name="task"
							:conditions="[
								['editing', index]
							]"
							:columns="4"
						/>


						<!-- Task type when editing -->
						<!-- <RadiogroupElement 
							name="type"
							view="tabs"
							:conditions="[
								['editing', index]
							]"
							:columns="2"
							:items="{
								'Personal': 'P',
								'Business': 'B',
							}"
						/> -->

						<!-- Cancel task editing -->
						<ButtonElement
							name="cancel"
							:conditions="[
								['editing', index]
							]"
							:columns="2"
							danger
							full
							@click="cancel"
						>
							Cancel
						</ButtonElement>

						<!-- Save task -->
						<ButtonElement
							name="save"
							:conditions="[
								['editing', index]
							]"
							:columns="2"
							full
							@click="save"
						>
							Save
						</ButtonElement>

						</ObjectElement>
					</template>
				</ListElement>

				<!-- Store which field we're editing so that conditions can rely on this -->
				<HiddenElement name="editing" />
			</Vueform>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
// import requests from "./requests.js";
import configurarAPI from "./requests.js"; // Importar a função configurarAPI

const api = configurarAPI(); // Chamar a função configurarAPI para obter o objeto com as funções

// The model for the task list form
const tasksModel = ref({
	tasks: [], // list of tasks
	editing: null, // current task we're editing
 
})

const taskDates = ref({
  nameTask: "",
  task: "",
});

// Creating a task and saving it to localStorage
const createTask = async (data, form$) => {
	taskDates.value.nameTask = form$.data.nameTask;
	taskDates.value.task = form$.data.task;

	await postRequest(taskDates.value);

	addToStorage(form$.data) // first add to localStorage

	syncFromStorage() // then sync the `tasksModel` from localStorage

	form$.reset() // then reset the form
	// form$.clear() // This is used to completely wipe the form instead of resetting

}

const postRequest = async (sendPostData) => {
	console.log("sendPostRequest 00001 ", sendPostData)
	try {
		const resposta = await api.sendPostRequest(sendPostData); 
		console.log("sendPostRequest 00002 ", resposta)

	} catch (error) {
		console.error("Erro ao chamar enviarDados:", error);
	}
}


// // Function to send data to the backend
// const sendToBackend = async () => {
// 	try {
// 		let get = await api.getDados(); // Acessar a função getDados através do objeto retornado por configurarAPI
// 		console.log("getDados => ", get);
// 	} catch (error) {
// 		console.error("Erro ao chamar getDados:", error);
// 	}
// };


// Adds a new task to the localStorage
const addToStorage = (data) => {
    console.log("addToStorage - data", data);

    let storageData = localStorage.getItem('tasks');
    console.log("addToStorage - storageData", storageData);

    storageData = storageData ? JSON.parse(storageData) : [];
    storageData.push(data);

    localStorage.setItem('tasks', JSON.stringify(storageData));
    console.log("addToStorage - show", localStorage.getItem('tasks'));
};

 

// Syncs the localStorage to `tasksModel`
const syncFromStorage = () => {
	let tasks = localStorage.getItem('tasks')
	console.log("syncFromStorage - tasks", tasks)

	let tasksModelArray = tasksModel.value = {
		tasks: tasks ? JSON.parse(tasks) : []
	}

	console.log("syncFromStorage - tasksModelArray", tasksModelArray)
}

// Syncs the `tasksModel.tasks` to localStorage
const syncToStorage = () => {

	localStorage.setItem('tasks', JSON.stringify(tasksModel.value.tasks))
}

// Sets the tasks to edit
const edit = (index) => {
	console.log("edit - tasksModel.value", tasksModel.value)
	tasksModel.value.editing = index
}

// Cancels the task to editing
const cancel = (index) => {
	tasksModel.value.editing = null
	syncFromStorage()
}

// Saves the task
const save = () => {
	syncToStorage()

	tasksModel.value.editing = null
}

// Sync the `tasksModel` from localStorage upon pageload
onMounted(() => {
	syncFromStorage()
})

</script>

<style lang="scss">

* {
	font-family: sans-serif;
	box-sizing: border-box;
	padding: 0;	
	border: 0;
	margin: 0;
}

.page {
	background: linear-gradient(to right, #11998e, #38ef7d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	width: 100%;
	min-height: 100vh;
	padding-top: 2rem;
}

.container {
	max-width: 600px;
	margin: 0 auto;
}



h1 {
	font-size: 48px;
	margin-bottom: 2rem;
	font-weight: 600;
	color: #fff;
}

.divider {
	margin: 2rem 0;
	border-color: #e2e8f0;
}

.arrumar {
	 
}

.task-container {
  
	background: linear-gradient(to left, #1fa2ff, #12d8fa, #a6ffcb); 
	
	padding: 1rem;

	&.is-personal {
		border-left: 3px solid #8cebdb;
	}

	&.is-business {
		border-left: 3px solid rgb(56, 136, 123);
	}
}

.task-wrapper {
	display: flex;
	align-items: center;
}

.vf-list-handle.task-sort-handle {
	top: 1rem;
}
</style>