<template>
    <tr v-for="(item, index) in todosShow" :key="index">
    <!-- <tr> -->
        {{index}}
        <td>
            <span :class="{active:isEdit}">日期</span>
            <input type="text" v-model="item.date" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">消費種類</span>
            <input type="text" v-model="item.kind" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">金額</span>
            <input type="text" v-model="item.spend" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">備註</span>
            <input type="text" v-model="item.memo" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">付款方式</span>
            <input type="text" v-model="item.payment" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <button @click="edit_b_item" :class="{active:isEdit}" class="editBtn">修改</button>
            <button @click="edit_a_item" :class="{active:isConfirm}" class="confirmBtn">確認</button>
            <button @click="del_item" class="delBtn">刪除</button>
        </td>
        <td>
            <i class="fa-solid fa-crown king_icon"  @click="important" :class="isImportant"></i>
        </td>
    </tr>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from '@/store/itemInfo'

const store = useStore()
const LIST = store.LIST_DEFAULT
const EDIT_LIST = store.EDIT_LIST_DEFAULT

const isConfirm = ref(false)

const todosShow = ref(LIST)
// props: {
//     todos-show
// }

onMounted(() => {
    // console.log(todos-show);
})

</script>