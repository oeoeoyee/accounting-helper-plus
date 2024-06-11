<template>
    <table>
        <thead>
            <!-- <th>排序</th> -->
            <th>日期<button @click="resetDate" class="resetBtn">排序</button></th>
            <th>支出種類</th>
            <th>花費</th>
            <th>備註</th>
            <th>付款方式</th>
            <th>編輯</th>
            <th>重要</th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in todosShow" :key="index">
            <!-- <tr> -->
                <!-- <td>
                    <span>{{ item.id }}</span>
                </td> -->
                <td>
                    <!-- <span v-if="!isEdit && nowEdit === item.id">{{ item.date }}</span> -->
                    <span v-if="nowEdit !== item.id">{{ item.date }}</span>
                    <input type="text" v-if="nowEdit === item.id" v-model="item.date" class="inputstyle">
                    <!-- <input type="text" v-model="item.date" :class="{active:!isEdit}" class="inputstyle"> -->
                </td>
                <td>
                    <span v-if="nowEdit !== item.id">{{ item.kind }}</span>
                    <!-- <span :class="{active:!isEdit}">{{ item.kind }}</span> -->
                    <input type="text" v-if="nowEdit === item.id" v-model="item.kind" class="inputstyle">
                    <!-- <input type="text" v-model="item.kind" :class="{active:!isEdit && nowEdit === index}" class="inputstyle"> -->
                </td>
                <td>
                    <span v-if="nowEdit !== item.id">{{ item.spend }}</span>
                    <!-- <span :class="{active:isEdit}">{{ item.spend }}</span> -->
                    <input type="text" v-if="nowEdit === item.id" v-model="item.spend" class="inputstyle">
                    <!-- <input type="text" v-model="item.spend" :class="{active:!isEdit && nowEdit === index}" class="inputstyle"> -->
                </td>
                <td>
                    <span v-if="nowEdit !== item.id">{{ item.memo }}</span>
                    <!-- <span :class="{active:isEdit}">{{ item.memo }}</span> -->
                    <input type="text" v-if="nowEdit === item.id" v-model="item.memo" class="inputstyle">
                    <!-- <input type="text" v-model="item.memo" :class="{active:!isEdit && nowEdit === index}" class="inputstyle"> -->
                </td>
                <td>
                    <span v-if="nowEdit !== item.id">{{ item.payment }}</span>
                    <!-- <span :class="{active:isEdit}">{{ item.payment }}</span> -->
                    <input type="text" v-if="nowEdit === item.id" v-model="item.payment" class="inputstyle">
                    <!-- <input type="text" v-model="item.payment" :class="{active:!isEdit && nowEdit === index}" class="inputstyle"> -->
                </td>
                <td>
                    <button @click="editItem('update', item.id)" :class="{active:isEdit}" class="editBtn">修改</button>
                    <button @click="editItem('confirm')" :class="{active:!isEdit}" class="confirmBtn">確認</button>
                    <button @click="editItem('del', item.id)" class="delBtn">刪除</button>
                </td>
                <td>
                    <i class="fa-solid fa-crown king_icon"  @click="important" :class="isImportant"></i>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from '@/store/itemInfo'

const store = useStore()
const LIST = store.LIST_DEFAULT
const EDIT_LIST = store.EDIT_LIST_DEFAULT

// "編輯時"才會是true
const isEdit = ref(false)
const nowEdit = ref(0)

const todosShow = ref(LIST)
// props: {
//     todos-show
// }

// 重新思考排序

const editItem = (action, id) => {
    if(action === 'update'){
        nowEdit.value = id
        isEdit.value = !isEdit.value
    }else if(action === 'confirm'){
        nowEdit.value = 0
        isEdit.value = !isEdit.value
    }else if(action === 'del'){
        alert(`確認要刪除項次${id}嗎?`)
        for (let i = 0; i < LIST.length; i++) {
            const element = LIST[i];
            if (element.id === id) {
                LIST.splice(id-1, 1)
            }
        }
    }
//   for(let i=0; i<todos.value.length; i++){
//       if(todos.value[i].index_key === todosEdit.index_key){
//           Object.assign(todos.value[i],todosEdit)
//       }
//   }
//   todosShow.value = [...todos.value]
//   todosEdit.value= [
//       {
//           date:'',
//           kind:'',
//           spend:'',
//           memo:'',
//           payment: '',
//           index_key:''
//       },
//   ]
}

onMounted(() => {
    // console.log(todos-show);
})

</script>