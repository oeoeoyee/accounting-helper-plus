import { ref } from "vue";
import { defineStore } from "pinia";

const LIST = [
    {
        id:'1',
        date:'2',
        kind:'3',
        spend:'4',
        memo:'5',
        payment:'6'
    },
    {
        id:'1',
        date:'2',
        kind:'3',
        spend:'4',
        memo:'5',
        payment:'6'
    },
]

const EDIT_LIST = {
    id:'',
    date:'',
    kind:'',
    spend:'',
    memo:'',
    payment:''
}
// 1.顯示在下方的物件陣列

export const useStore = defineStore('todo-list', () => {
    const LIST_DEFAULT = ref(LIST)
    const EDIT_LIST_DEFAULT = ref(EDIT_LIST)
    return {
        LIST_DEFAULT, EDIT_LIST_DEFAULT
    }
})