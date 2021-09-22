let tasks_list = window.localStorage.getItem('tasks_list');
import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks_list: tasks_list ? JSON.parse(tasks_list) : [],
  },
  mutations: {
    initialiseStore(state) {
			if(localStorage.getItem('tasks')) {
        state.tasks_list = JSON.parse(localStorage.getItem('tasks'));
			}
		},
    addNewTask(state, task){
      state.tasks_list.push(task);
      this.commit('saveTasks');
    },
    removeTask(state,index){
      state.tasks_list.splice(index,1);
      this.commit('saveTasks');
    },
    removePoint(state,index){
      state.tasks_list.points.splice(index,1);
    },
    saveTasks(state){
      const parsed = JSON.stringify(state.tasks_list);
      localStorage.setItem('tasks', parsed);
    }
  },
  getters: {
    getTasksList(state){
      return state.tasks_list;
    }
  }
})
