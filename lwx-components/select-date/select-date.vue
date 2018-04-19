<template>
<div class="row">
    <div class="col-md-7 inp-box">
        <b-form-input v-model="date" readonly/>        
    </div>
    <div class="col-md-5 btn-box">
        <span @click="prev"><</span>
        <span @click="next">></span>
    </div>
</div>

</template>
<script>

import { formatDate } from 'common/api-common'

/** 
 * 
 * creat by lwx on 2018-04-03 11:19
 * @name select-date 简易选择时间组件  功能: 选择前一天, 后一天 
 * @param setDate
 * @event get-date 返回时间格式 yyyy-mm-dd
 * 
 */
export default {
    props: {
        setDate: {
            type: String,
            default: formatDate(new Date())
        }
    },
    data() {
        return {
            currentDate: formatDate(new Date()),
            year: this.setDate.split('-')[0],
            month: this.setDate.split('-')[1],
            day: this.setDate.split('-')[2]
        }
    },
    computed: {
        date: {
            get() {
                return `${this.year}-${this.month}-${this.day}`
            },
            set() {}
        }
    },
    mounted() {
        
        this.setDate !== this.currentDate 
            ? this.$emit('get-date', this.setDate) 
            : this.$emit('get-date', this.date)

        // this.year = '2018'  test
        // this.month = '01'
        // this.day = '01'        
    },
    methods: {
        prev() {
            if(this.day != 1) {
                let d = parseInt(this.day) - 1
                this.day = d < 10 ? `0${d}` : d  
            }else if(this.day == 1) {
                if(this.month == 1) {
                    this.year = parseInt(this.year) - 1
                    this.month = '12'
                    this.day = '31'
                    return
                }
                let m = parseInt(this.month) - 1
                this.month = m < 10 ? `0${m}` : m 
                this.day = this.getDays(this.year, this.month)
            }
        },
        next() {
            if(this.day < this.getDays(this.year, this.month)) {
                let d = parseInt(this.day) + 1
                this.day = d < 10 ? `0${d}` : d  
            }else if(this.day == this.getDays(this.year, this.month)) {
                if(this.month == 12) {
                    this.year = parseInt(this.year) + 1
                    this.month = '01'
                    this.day = '01'
                    return
                }
                let m = parseInt(this.month) + 1
                this.month = m < 10 ? `0${m}` : m 
                this.day = '01'
            }
        },
        getDays(year, month) {
            // 31: 1, 3, 5, 7, 8, 10, 12
            // 30: 4, 6, 9, 11
            // 29: 2 ( 闰年: 年数能被4整除 )  
            // 28: 2 ( 平年: 年数不能被4整除 )
            let y = parseInt(year),
                m = parseInt(month)
            if(m === 2) {
                return y % 4 === 0 ? 29 : 28
            }else if(m === 4 || m === 6 || m === 9 || m === 11 ) {
                return 30
            }else {
                return 31
            }
        }
    },
    watch: {
        date(val) {
            this.$emit('get-date', val)
        }
    }
}
</script>
<style scoped>
.inp-box .form-control[readonly] {
    background-color: #fff !important;
}
.btn-box span{
    display: inline-block;
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #b2bec6;
    color: #fff;
    margin-top: 2px;
    cursor: pointer;
}
</style>


