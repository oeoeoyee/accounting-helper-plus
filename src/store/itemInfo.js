import { defineStore } from "pinia";

export const useStore = defineStore('main', {
    state: () => {
        return {
            date:'',
            kind:'',
            spend:'',
            memo:'',
            payment:''
        }
    },
})