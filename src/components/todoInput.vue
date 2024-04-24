<template>
    <form @submit.prevent='submit'>
    <!-- <form> -->
        <input type='date' v-model='EDIT_LIST.date' class="date_input" placeholder="日期"/>
        <select v-model='EDIT_LIST.kind' class="kind_input" placeholder="消費種類">
            <option value="日常飲食">日常飲食</option>
            <option value="電信費">電信費</option>
            <option value="交通費">交通費</option>
            <option value="學習">學習</option>
            <option value="假日(聚餐、出遊)">假日(聚餐、出遊)</option>
            <option value="治裝水水">治裝水水</option>
            <option value="其他(喜好)">其他(喜好)</option>
        </select>
        <input type='text' placeholder='150' v-model='EDIT_LIST.spend'/>
        <input type='text' placeholder='輸入備註' v-model='EDIT_LIST.memo'/>
        <input type="radio" name="payment" id="online" value="線上" v-model='EDIT_LIST.payment'>
        <input type="radio" name="payment" id="cash" value="現金" v-model='EDIT_LIST.payment'>
        <div class="payment_btn">
            <label for="online" class="sbtn pink_btn">線上</label>
            <label for="cash" class="sbtn green_btn">現金</label>
        </div>
        <button type='submit' class='submitBtn'>送出</button>
    </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from '@/store/itemInfo'

const store = useStore()
const LIST = store.LIST_DEFAULT
const EDIT_LIST = store.EDIT_LIST_DEFAULT

props: {
    EDIT_LIST
}

const submit = () => {
    // 要拷貝才不會EDIT_LIST歸零了data也受影響，因為一層而已所以淺拷貝
    const data = Object.assign({}, EDIT_LIST)
    data.id = String(LIST.length+1)
    LIST.push(data)
    for (const key in EDIT_LIST) {
        EDIT_LIST[key] = ''
    }
    console.log(EDIT_LIST);
    console.log(LIST);
}

onMounted(() => {
    console.log(EDIT_LIST);
})

</script>