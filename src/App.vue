<template>
  <!-- Popup -->
  <vue-popup-form class="popup" v-if="popupFormVisible" @closePopupForm="closePopupForm"/>

  <!-- General html -->
  <section class="view">
    <div class="button_wrap">
      <button class="button" @click="showPopupForm">Add new Task</button>
    </div>
    <h1>The Tasks list</h1>
    <span v-if="!getTasksList.length">There are no tasks. Please, add some.</span>
    <div class="task_list" v-if="getTasksList.length">
      <div class="task" v-for="(task,index) in getTasksList" :key="index">
        <div class="icons">
          <i class="icon fa fa-trash" @click="removeOneTask(index)"></i>
          <i class="icon fa fa-pencil" @click="showPopupEdit"></i>
          <vue-popup-edit class="popup popup_edit" v-if="popupEditVisible" @closePopupEdit="closePopupEdit" :task_data="task"/>
        </div>
        <h2>{{task.name}}</h2>
          <div v-for="(point,index) in task.points" :key="index">
            <input type="checkbox" id="checkbox" v-model="point.checkbox" disabled>
            <label for="checkbox">{{point.goal}}</label>
          </div>
      </div>
    </div>
  </section>
  <router-view/>
</template>

<script>
// Import data from storage:
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

// Import icons styles:
import './assets/icons/css/font-awesome.min.css';
import VuePopupEdit from './components/VuePopupEdit.vue';

// Import Popup:
import VuePopupForm from './components/VuePopupForm.vue';

export default {
  name: 'TasksList',
  data(){
    return{
      popupFormVisible: false,
      popupEditVisible: false,
    }
  },

  // LocalStorage:
  mounted() {
    // ancommit to clear LocalStorage:
    // localStorage.clear();
    
		this.$store.commit('initialiseStore');
	},

  components:{
    VuePopupForm,
    VuePopupEdit,
  },

  computed: {
    // Getting data from storage:
    ...mapGetters(['getTasksList']),
  },
  methods:{
    // Getting function from storage:
    ...mapMutations(['removeTask']),

    // Popup functions:
    showPopupForm(){
      this.popupFormVisible = true;
    },
    closePopupForm(){
      this.popupFormVisible = false;
    },
    showPopupEdit(){
      this.popupEditVisible = true;
    },
    closePopupEdit(){
      this.popupEditVisible = false;
    },

    // Function to remove current task:
    removeOneTask(index){
      if(confirm("Do you really want delete the task?")){
        this.removeTask(index);
      }
    }
  }
}
</script>

<style scoped>
  .view{
    max-width: 800px;
    margin: auto;
    margin-top: 32px;
    position: relative;
    z-index: 1;
  }
  .button_wrap{
    text-align: right;
  }
  .button{
    border: 1px solid #8a8a8a;
    border-radius: 3px;
    background-color: #e6e6e6;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 10px;
  }
  .button:hover{
    background-color: #ffb433;
  }
  h1, span{
    text-align: center;
  }
  .task_list{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .task{
    width: 100%;
    margin: 8px 0;
    padding: 16px;
    background-color: #f7f7f7;
  }
  .icons{
    text-align: right;
    position: relative;
  }
  .icon{
    font-size: 1rem;
    cursor: pointer;
    padding: 10px;
  }
  .icon:hover{
    color: #f39f18;
  }
  h2{
    margin: 0 0 16px 0;
  }
  .popup{
    background: white;
    z-index: 100;
    width: 600px;
    height: 550px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0 0 10px 0 #e7e7e7e8;
  }
  .popup_edit{
    position: fixed;
    width: 500px;
    height: 400px;
  }
</style>
