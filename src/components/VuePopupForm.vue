<template>
    <div class="popup-box">
        <div class="close_btn">
            <i class="fa fa-times close_popup" @click="closePopupForm" style="text-align: right"></i>
        </div>
        <vee-form :validation-schema="rules" @submit="sendData">
            <h2>New Task</h2>
            <div class="box">
                <label class="text" for="name">Add the task name</label>
                <vee-field class="input input_name" in="name" name="name"></vee-field>
                <vee-error class="error" name="name"/>
            </div>
            <div class="box">
                <label class="text" for="text">Add the task description</label>
                <vee-field as="textarea" class="textarea" in="text" name="description"></vee-field>
                <vee-error class="error" name="description"/>
            </div>
            <div class="wrap_point">
                <div class="box add_point_box">
                    <div>
                        <button class="button" @click.prevent="addPoint">Add point</button>
                    </div>
                    <div v-for="(point,index) in points" :key="index">
                        <br>
                        <vee-field class="input input_point" type="text" :name="'goal'+index"></vee-field>
                        <vee-error class="error" name="'goal'+index"/>
                        <input type="button" value="x" @click="removePoint(index)">
                    </div>
            </div>
            </div>
            <div class="box box_btn">
                <div class="wrap_btn">
                    <input class="button buttun_add" type="submit" value="Add task">
                </div>
            </div>
        </vee-form>
    </div>
</template>

<script>
// For validation:
import {Form, Field, ErrorMessage, configure} from 'vee-validate';
import * as yup from 'yup';
configure({
  validateOnInput: true
});

// Import data from storage:
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

export default {
    name: 'VuePopupForm',

    components: {
        VeeForm: Form, 
        VeeField: Field, 
        VeeError: ErrorMessage 
    },

    data(){
        return{
            points: [],
            rules: yup.object({
                name: yup.string().trim().required().min(1, "Min 1 symbols"),
                description: yup.string().trim().required().min(5, "Min 5 symbols"),
                goal: yup.string().trim().min(1, "Min 1 symbols"),
            })
        }
    },

    computed: {
        // Getting data from storage:
        ...mapGetters(['getTasksList']),
    },

    methods:{
        // Getting function from storage:
        ...mapMutations(['addNewTask']),

        // Popup functions:
        closePopupForm(){
            this.$emit('closePopupForm');
        },

        // Function to add/remove point:
        addPoint(){
            this.points.push('new point');
        },
        removePoint(index){
            this.points.splice(index,1);
        },

        // Function to create new task:
        sendData(values){
            let arr = [];
            document.getElementsByClassName("input_point").forEach(item => {
                if(item.value){
                    let pointObj = {};
                    pointObj.goal = item.value;
                    pointObj.checkbox = false;
                    arr.push(pointObj);
                }
            });
            let data ={};
            data.name = values.name;
            data.description = values.description;
            if(arr.length)data.points = arr;
            this.addNewTask(data);
        },
    }
}
</script>

<style scoped>
    .popup-box{
        padding: 32px;
    }
    .close_btn{
        text-align: right;
    }
    h2{
        text-align: center;
        margin-bottom: 32px;
    }
    .close_popup{
       font-size: 1.3rem;
       font-weight: 500;
       cursor: pointer;
    }
    .wrap_point{
        height: 180px;
        overflow-y: auto;
        padding-bottom: 16px;
    }
    .box{
       display: flex;
       flex-direction: row;
       flex-wrap: nowrap;
       margin-bottom: 32px;
    }
    .add_point_box{
        flex-direction: column;
        flex-wrap: nowrap;
    }
   .text{
       width: 30%;
       font-size: 1rem;
       padding-right: 20px;
    }
    .textarea{
        width: 70%;
        border-style: none;
        outline-style: none;
        border: 1px solid #454e54;;
        border-radius: 5px;
        background-color: #fff;
        resize: none;
        height: 130px;
    }
    .button{
        display: block;
        border: 1px solid #8a8a8a;
        border-radius: 3px;
        background-color: #e6e6e6;
        font-size: 0.9rem;
        cursor: pointer;
        padding: 10px;
    }
    .buttun_add{
        width: 100%;
    }
    .button_add:hover{
        background-color: #ffb433;
    }
    .box_btn{
        margin-bottom: 0;
        justify-content: center;
    }
    .wrap_btn{
        width: 30%;
        text-align: center;
    }
    .input{
        width: 50%;
        border-style: none;
        outline-style: none;
        border: 1px solid #454e54;;
        border-radius: 5px;
        background-color: #fff;
    }
    .input_name{
        width: 70%;
    }
</style>