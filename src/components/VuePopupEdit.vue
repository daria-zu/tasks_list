<template>
    <div class="popup-box">
        <div class="close_btn">
            <i class="fa fa-times close_popup" @click="closePopupEdit" style="text-align: right"></i>
            <div class="task">
                <h2>{{task_data.name}}</h2>
                <p>{{task_data.description}}</p>
                <div v-for="(point,index) in task_data.points" :key="index" class="wrap_points">
                    <div class="point">
                        <input type="checkbox" id="checkbox" v-model="point.checkbox" @click="checkbox">
                        <label for="checkbox">{{point.goal}}</label>    
                    </div>
                    <div>
                        <input type="button" value="x" @click.prevent="removeOnePoint(index)">
                    </div>
                </div>
            </div>
        </div>
        <div class="box_btn">
            <button class="button unshow" @click.prevent="updateData">Save</button>
            <!-- <button class="button unshow">Cancel</button> -->
        </div>
    </div>
</template>

<script>
// Import data from storage:
import {mapMutations} from 'vuex';
import {mapGetters} from 'vuex';

export default {
    name: 'VuePopupEdit',
    
    // Data form parent component
    props:{
        task_data:{
            name: String,
            description: String,
            points: Array,
            default: () => {},
        }
    },
    
    methods:{
        // Popup functions:
        closePopupEdit(){
            this.$emit('closePopupEdit');
        },

        // Getting function from storage:
        ...mapMutations(['removePoint']),
        ...mapMutations(['saveTasks']),

         // Function to remove one point:
        removeOnePoint(id){
            if(confirm("Do you really want delete the point?")){
                document.getElementsByClassName("button").forEach(elem => {
                    if(elem.classList.contains('unshow'))elem.classList.remove('unshow');
                });
                this.removePoint(id);
            }
        },
        
        // Visible buttons
        checkbox(){
           document.getElementsByClassName("button").forEach(elem => {
                    if(elem.classList.contains('unshow'))elem.classList.remove('unshow');
                });
        },

        // Saving changies
        updateData(){
            this.saveTasks();
        }
    },

    computed: {
        ...mapGetters(['getTasksList']),
    },
   
   
}
</script>

<style scoped>
    .popup-box{
        padding: 32px;
    }
    .close_btn{
        text-align: right;
    }
    .close_popup{
       font-size: 1.3rem;
       font-weight: 500;
       cursor: pointer;
    }
    .task{
        text-align: left;
        height: 300px;
        overflow-y: auto;
    }
    h2{
        text-align: center;
        margin-bottom: 32px;
    }
    .box_btn{
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
    }
    .button{
        display: block;
        border: 1px solid #8a8a8a;
        border-radius: 3px;
        background-color: #e6e6e6;
        font-size: 0.9rem;
        cursor: pointer;
        padding: 10px;
        margin: 16px;
        width: 70px;
    }
    .button:hover{
        background-color: #ffb433;
    }
    .unshow{
        display: none;
    }
    .wrap_points{
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .point{
        margin-bottom: 8px;
    }
    input{
        cursor: pointer;
    }
</style>