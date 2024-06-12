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
    // data.id = String(LIST.length+1)
    data.date = data.date.replaceAll('-', '')
    // LIST.push(data)
    console.log(data);

    // 好像沒有真的push到要的東西
    fetch('https://script.google.com/macros/s/AKfycbxyC_VSdsHdEMESCJPYZBM06LmyZMMR4u8HmBC7MxotpdQH6oHpcoYMdXFdvktsTyI/exec', {
    method:'POST',
    body:encodeURI(JSON.stringify({data})),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
    })
    .then(res => {
        return res.json();   // 使用 json() 可以得到 json 物件
    }).then(result => {
        console.log(result); // 得到 {name: "oxxo", age: 18, text: "你的名字是 oxxo，年紀 18 歲～"}
    });

    for (const key in EDIT_LIST) {
        EDIT_LIST[key] = ''
    }
    // console.log(EDIT_LIST);
    // console.log(LIST);
}

// 原本進來的會是ISO 8601 格式的日期
// 經此函式將日期規格化
const formatDate = (isoString) => {
    if (new Date(isoString)=='Invalid Date') {
        return ''
    }
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
    // 回傳指定的單個格子
    // fetch('https://script.googleusercontent.com/macros/echo?user_content_key=Teb8WXlymtab4yPpwMv-5rYtDR0saTySndnwxRi_Tp4ocedvNaDV5_aHCuZM2jjsoVgcYhOyGNA9heVWU7nK2s-fC5DAobhfm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ6ZT4nmEyYjgJORkPGhzHZB8sigPc0RApIWwPp0xdHzIgnhm5KoSy1dOAI5sQJ3kNQF4AHy1ocvkse5RCir1U6Cy_nfkCu81w&lib=MHTvoJLb8qVQwedGFxTp-sOjag8hAtVU_')
    // 回傳整個表有的東西
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=VbR-F4_5QXGrbXrfLeV8kf3-jJPrLwtZriYPmrVaOIbmYpCN2WWX6P_eNh2oZrFCdLbJVhCDwTx15g__itm2HUQIj3_FBDF4m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAv1N21d6RNZ5hpwP5EscyoLx56ABV4wo_B3YubPfd3n58sZ3gH6VFpGv7-bEZD6ChJZrB0f6-rdRBqn7nX7cJ395LSJwrBnoQ&lib=MHTvoJLb8qVQwedGFxTp-sOjag8hAtVU_')
    .then((res) => res.json())
    .then((resJson) => {
        // console.log(resJson); //成功???!!
        // 這方法太笨了要改一下
        for (let i = 0; i < resJson.length; i++) {
            const element = resJson[i];
            LIST.push({
                id: i+1, 
                date: formatDate(element[0]), 
                kind: element[1],
                spend: element[2],
                memo: element[3],
                payment: element[4]
            })
            // LIST[i].date = formatDate(element[0])
            // LIST[i].kind = element[1]
            // LIST[i].spend = element[2]
            // LIST[i].memo = element[3]
            // LIST[i].payment = element[4]
        }
    })
    // console.log(EDIT_LIST);
    // add 時要給的是陣列格式
    // 例如 ['2023-06-05', '水水費', '3500', '買了很多衣服開心', '線上付款']
})

</script>