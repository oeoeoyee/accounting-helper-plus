<template>
    <tr>
        <td>
            <span :class="{active:isEdit}">{{label.date}}</span>
            <input type="text" v-model="todosEdit[0].date" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">{{label.kind}}</span>
            <input type="text" v-model="todosEdit[0].kind" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">{{label.spend}}</span>
            <input type="text" v-model="todosEdit[0].spend" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">{{label.memo}}</span>
            <input type="text" v-model="todosEdit[0].memo" :class="{active:isConfirm}" class="inputstyle">
        </td>
        <td>
            <span :class="{active:isEdit}">{{label.payment}}</span>
            <input type="text" v-model="todosEdit[0].payment" :class="{active:isConfirm}" class="inputstyle">
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