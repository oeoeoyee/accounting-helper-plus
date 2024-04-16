<template>
<!-- props的地方都還沒弄，無法操作中 -->
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <div class="title" style="">
          <div>記帳小幫手</div>
          <span></span>
      </div>
      <todoInput @input='addTodo'></todoInput>
      <div class="main">
            <!-- <div @change="changeTab">
                <ul>
                    <li :class="{tab:isChosen == 'all'}" @click.prevent="isChosen = 'all'; tabName()"><a href="#">全部</a></li>
                    <li :class="{tab:isChosen == 'need'}" @click.prevent="isChosen = 'need'; tabName()"><a href="#">必要</a></li>
                    <li :class="{tab:isChosen == 'want'}" @click.prevent="isChosen = 'want'; tabName()"><a href="#">想要</a></li>
                </ul>
            </div> -->
          <!-- <kind-label @tabName='changeTab'></kind-label> -->
          <table>
              <thead>
              <td>
                  <th>日期<button @click="resetDate" class="resetBtn">排序</button></th>
                  <th>支出種類</th>
                  <th>花費</th>
                  <th>備註</th>
                  <th>付款方式</th>
                  <th>編輯</th>
                  <th>重要</th>
              </td>
              </thead>
              <tbody>
              <!-- <todoItem v-for='todo in todosShow' :label='todo' :todos-edit='todosEdit' @delItem="itemDel" @edit_a_item="editItem"></todoItem> -->
              </tbody>
          </table>
      </div>
    </div>      
  </div>
</template>

<script setup>
import todoInput from '@/components/todoInput.vue'
import { ref } from "vue";
import { useStore } from '@/store/itemInfo'

const store = useStore()
console.log(store);

// todos是現在所有的項目
const todos = ref([])

// todosShow是要顯示的項目(用於切換tab時)(動作的最後都會讓其值 = this.todos)
const todosShow = ref([])

// todosEdit是項目要更動時會用到的
// 應在父層就定義，因為之後會改值，指定義在子層的話會改不到
const todosEdit = ref([
    {
        date:'',
        kind:'',
        spend:'',
        memo:'',
        payment: '',
        index_key:''
    },
])

// 很多變數要用ref去重寫
const addTodo = (submitData) => {
  // console.log(this.todosEdit[0].index_key);
  submitData.date = submitData.date.replaceAll('-', '')
  todos.value.push(submitData);
  todosShow.value = [...todos.value]
}

const resetDate = () => {
  // 用sort來排列日期(回傳負數的話，前面的數在前面，回傳正整數的話，後面的數在前面)
  todos.value.sort(function(a, b) {
      return b.date < a.date ? 1 : -1
  })
  // 如果之後是從資料庫取資料，那要再加一欄是它的index_key，要改的會是indexkey的排序，叫資料時再對indexkey來放資料(?)
  todosShow.value = [...todos.value]
}

const itemDel = (index_key) => {
  // 接收從下面(todo-item)傳過來的要刪除的index_key
  console.log('success!',index_key)
  let delConfirm = confirm('是否刪除此項?');
  if(delConfirm){
      // splice(要刪除的項次, 刪除的個數)
      for(let i=0; i<todos.value.length; i++){
          if(todos.value[i].index_key === index_key){
              todos.value.splice(i, 1)
          }
      }
  }else{}
  todosShow.value = [...todos.value]
}

const editItem = (todosEdit) => {
  for(let i=0; i<todos.value.length; i++){
      if(todos.value[i].index_key === todosEdit.index_key){
          Object.assign(todos.value[i],todosEdit)
      }
  }
  todosShow.value = [...todos.value]
  todosEdit.value= [
      {
          date:'',
          kind:'',
          spend:'',
          memo:'',
          payment: '',
          index_key:''
      },
  ]
}

const changeTab = (tabName) => {
  todosShow.value = [];
  if(tabName === 'all'){
      // todosShow.value.push(todos.value)
      todosShow.value = [...todos.value]
  }else{
      let needArr = ['日常飲食','電信費','交通費'];
      let wantArr = ['學習','假日(聚餐、出遊)','治裝水水','其他(喜好)'];
      if(tabName === 'need'){
          todos.value.forEach(item => {
              if(needArr.indexOf(item.kind) !== -1){
                  todosShow.value.push(item);
              }
          });
      }else if(tabName === 'want'){
          todos.value.forEach(item => {
              if(wantArr.indexOf(item.kind) !== -1){
                  todosShow.value.push(item);
              }
          });
      }
  }
}

</script>

