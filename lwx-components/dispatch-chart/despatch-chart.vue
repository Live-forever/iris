<template>
<div class="dc-container clearfix">
    <div class="dc-left pull-left">
        <div class="left-item" v-for="(item, i) in leftList" :key="i" :style="{width: leftWidth + 'px'}">
            <div v-if="item.id === 'select'">
                <b-form-select v-model="selectWork" :options="workType" ref="select">
                </b-form-select>
            </div>
            {{item.name}}
        </div>
    </div>
    <div class="wrapper" style="width: (100% - 495px)">
        <div class="dc-content pull-left" :style="{width: contentWidth + 'px', marginLeft: leftWidth + 'px'}">
            <div class="dc-content-header clearfix" >
                <div class="time-item pull-left" v-for="(item, i) in timeList" :key="i" 
                    :style="{fontSize: item.fs + 'px', width: tempWidth + 'px'}">
                    <span>{{item.time}}</span>
                    <div class="line-center" :style="{right: tempWidth / 2 + 'px'}"></div>
                    <div class="line-right"></div> 
                    <div class="clo-line" v-show="item.fs === 16" 
                    :style="{height: lineHeight + 'px', left: tempWidth / 2 - 1 + 'px'}"></div>  
                </div>
            </div>
            <div class="dc-content-main">
                <div class="main-item" v-for="(item, i) in mainList" :key="i">
                    <model :data="item" ref="model" :tempWidth="tempWidth"></model>
                </div>
            </div>  
            <div class="line-red" :style="{height: lineHeight + 'px', left: redLineLeft() + 'px'}" ref="redLine"></div> 
            <div class="line-dashed dashed-start" 
                 :style="{height: lineHeight + 'px', left: dashedStartLeft + 'px'}" 
                 ref="startLine"
                 v-if="dashedStartLeft"></div>
            <div class="line-dashed dashed-end" 
                 :style="{height: lineHeight + 'px', left: dashedEndLeft + 'px'}" 
                 ref="endLine"
                 v-if="dashedEndLeft"></div>                        
        </div>  
    </div>  
</div>
</template>
<script>

import Model from '../model/model'

const TEXT_LEFT_WIDTH = 10

/**
 * update by lwx on 2018/03/13 12:30
 * 
 * @param dataList 主数据
 * @param tempWidth 步长宽度 ( 支持最小宽度70 ) default 100
 * @param tempMinutes 间隔时间 ( 以分钟为单位 ) default 10
 * @param defaultStartTime 默认开始时间 ( 支持到分钟 ) default '07:20'
 * @param defaultEndTime 默认结束时间 ( 支持到分钟 ) default '23:20'
 * @param leftWidth 左侧宽度 ( 支持最小宽度50 ) default 100
 * @param startTime  辅助线开始时间
 * @param endTime 辅助线结束时间
 * @param useTime 耗时
 * @see TEXT_LEFT_WIDTH 右侧remark文字和前面的默认margin
 * 
 * 注意: (defaultEndTime - defaultStartTime) / tempMinutes 必须是整数
 *  (结束时间 - 开始时间) / 时间间隔 => 目前只支持整数, 考虑到实现起来对
 *  之前的结构有变动, 并且牵一发动全身. 故弃之...
 *      
 */

export default {
    props: {
        dataList: [Array],
        startTime: [String],
        endTime: [String],
        useTime: [String],

        defaultStartTime: {
            type: [String],
            default: '08:00'
        },
        defaultEndTime: {
            type: [String],
            default: '17:00'
        },
        tempMinutes: {
            type: [Number],
            default: 10
        },
        tempWidth: {
            type: [Number],
            default: 120
        },
        leftWidth: {
            type: [Number],
            default: 100
        },
        workType: {
            type: Array,
            default: () => []
        },
        selectWork: {
            type: String,
            default: ''
        }
    },
    components: {
        Model
    },
    data() {
        return {
            t: null,
        }
    },
    computed: {
        leftList() {
            let arr = [{
                id: 'select'
            }]
            this.dataList.forEach((item) => {
                let obj = {
                    name: item.name
                }
                arr.push(obj)
                for(let i = 0; i < item.list.length - 1; i++) {
                    arr.push({name: ''})
                }
            })
            return arr
        },
        list() {
            let arr = []
            for(let i = 0; i < this.dataList.length; i ++) {
                for(let j = 0; j < this.dataList[i].list.length; j ++) {
                    arr.push(this.dataList[i].list[j])
                }
            }
            return arr
        },
        mainList() {
            let arr = []
            this.list.forEach(item => {
                if(!item.estimateStartTime || !item.estimateEndTime) {
                    arr.push({
                        doingWidth: 0,   
                        left: 0,
                        disparity: 0,
                        width: 0,
                        station: '',
                        remark: ''
                    })
                    return
                }
             
                // ( 预计结束时间 - 预计开始时间 ) * 每分钟的宽度
            let _width = this.getWidth(item.estimateEndTime, item.estimateStartTime),
                // ( 实际开始时间 - 预计开始时间 ) * 每分钟的宽度
                _disparit = item.actualStartTime 
                                ? this.getWidth(item.actualStartTime, item.estimateStartTime)
                                : 0,
                // ( 预计开始时间 - 看板开始时间 ) * 每分钟的宽度
                _left = this.getWidth(item.estimateStartTime, this.defaultStartTime),
                // 判断技师是否打卡, 以及关卡
                _dw   = item.actualStartTime 
                            ? item.actualEndTime 
                                ? this.getWidth(item.actualEndTime, item.actualStartTime)
                                : this.getWidth(`${new Date().getHours()}:${new Date().getMinutes()}`, item.actualStartTime)
                            : 0, 
                obj = {
                    doingWidth: _dw,   
                    left: _left,
                    disparity: _disparit,
                    width: _width,
                    station: item.station,
                    remark: item.remark
                }
                arr.push(obj)
            })
            return arr
        },
        timeList() {
            let defaultStartArr = this.defaultStartTime.split(':')
            let sh = parseInt(defaultStartArr[0])
            let sm = parseInt(defaultStartArr[1])
            let len = Math.ceil(this.totalMinutes / this.tempMinutes)
            let arr = []

            for(let i = 0; i <= len; i ++) {
                if(sm / 60 >= 1) {
                    sm = sm % 60
                    sh += 1
                }
                let h = sh < 10 ? `0${sh}` : sh,
                    m = sm < 10 ? `0${sm}` : sm
                let obj = {
                    time: `${h}:${m}`,
                    fs: m === '00' ? 16 : 14
                }
                arr.push(obj)
                sm += this.tempMinutes
            }
            return arr
        },
        contentWidth() {
            return this.tempWidth * this.timeList.length
        },
        lineHeight() {
            return this.mainList.length * 40
        },
        dashedStartLeft() {
            if(!this.startTime) {
                return 0
            }else {
                return this.getWidth(this.startTime, this.defaultStartTime) + this.tempWidth / 2 - 2
            }
        },
        dashedEndLeft() {
            if(!this.useTime && !this.startTime) {
                return 0
            }else if(this.endTime) {
                return this.getWidth(this.endTime, this.defaultStartTime) + this.tempWidth / 2 - 2
            }else {
                let useWidth = this.getTotalMinutes(this.useTime) * this.minuteWidth
                return this.dashedStartLeft + useWidth
            }
        },
        totalMinutes() {
            return this.getTotalMinutes(this.defaultEndTime) - this.getTotalMinutes(this.defaultStartTime)
        },
        minuteWidth() {
            return this.tempWidth / this.tempMinutes
        },
    },
    mounted() {
        this.$refs.select[0].$refs.input.style.border = 'none'
        this.scrollView()

        this.t = setInterval(() => {
            try {
                this.$refs.redLine.style.left = this.redLineLeft() + 'px'
                this.changeDoingWidth()
            }catch (e) {}
        }, 5000)
    },
    methods: {
        redLineLeft() {
            let currentMinutes = new Date().getHours() * 60 + new Date().getMinutes()
            return (currentMinutes - this.getTotalMinutes(this.defaultStartTime)) * this.minuteWidth + this.tempWidth / 2
        },
        changeDoingWidth() {
            let h = new Date().getHours(),
                m = new Date().getMinutes()
            for(let i = 0; i < this.detail.list.length; i ++) {
                if(!this.detail.list[i].estimateStartTime || !this.detail.list[i].estimateEndTime) {
                    continue
                }
                let _actualStartTime = this.detail.list[i].actualStartTime,
                    _estimateStartTime = this.detail.list[i].estimateStartTime,
                    _estimateEndTime = this.detail.list[i].estimateEndTime    
                if(this.detail.list[i].actualStartTime && !this.detail.list[i].actualEndTime) {
                    this.$refs.model[i].$el.childNodes[2].childNodes[0].style.width = this.getWidth(`${h}:${m}`, _actualStartTime) + 'px'
                    let _disparity = this.getWidth(_actualStartTime, _estimateStartTime)
                    if(this.getTotalMinutes(_actualStartTime) <= this.getTotalMinutes(_estimateStartTime)
                        && this.getTotalMinutes(`${h}:${m}`) <= this.getTotalMinutes(_estimateEndTime)) {
                            this.$refs.model[i].$el.lastChild.style.marginLeft = TEXT_LEFT_WIDTH + 'px'
                    }else if(this.getTotalMinutes(`${h}:${m}`) > this.getTotalMinutes(_estimateEndTime)) {
                        this.$refs.model[i].$el.lastChild.style.marginLeft = this.getWidth(`${h}:${m}`, _estimateEndTime) + TEXT_LEFT_WIDTH + 'px'
                    }
                }
            }
        },
        modelClick(item) {
            this.$emit('modelClick', item)
        },
        getTotalMinutes(time) {
            if(typeof time === 'string') {
                let arr = time.split(':')
                return parseInt(arr[0]) * 60 + parseInt(arr[1])
            }
        },
        getWidth(st, et) {
            return (this.getTotalMinutes(st) - this.getTotalMinutes(et)) * this.minuteWidth
        },
        scrollView(currentMinutes) {
            let _currentMinutes = currentMinutes || new Date().getHours() * 60 + new Date().getMinutes() 
            let scrollWidth = this.$el.childNodes[2].scrollWidth
            let scrollLeft = (_currentMinutes - this.getTotalMinutes(this.defaultStartTime)) / this.totalMinutes * scrollWidth
            this.$el.childNodes[2].scrollLeft = scrollLeft - this.leftWidth * 2
        }
    },
    watch: {
        dashedStartLeft() {
            let startMinutes = this.getTotalMinutes(this.startTime)
            this.scrollView(startMinutes)
        }
    },
    destoryed() {
        clearInterval(this.t)  
    }
}
</script>
<style scoped>
/* left */
.dc-left {
    position: absolute;
    z-index: 10;
    background: #fff;
}
.left-item {
    /* width: 140px; */
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #4C6681;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
.left-item:not(:first-child) {
    /* background: #BBD6F1; */
}

.wrapper {
    overflow-x: scroll;
}
/* content */
.dc-content {
    position: relative;
}

.time-item {
    position: relative;
    /* width: 100px; */
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #ccc;   
    font-size: 14px;
    color: #4C6681; 
}
.line-center {
    position: absolute;
    /* right: 50px; */
    bottom: 0;
    width: 1px;
    height: 10px;
    background-color: #ccc
}
.line-right {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 1px;
    height: 10px;
    background-color: #ccc
}
.clo-line {
    position: absolute;
    top: 40px;
    left: 49px;
    width: 1px;
    background-color: #ccc;
}
.line-red {
    position: absolute;
    top: 39px;
    border-left: 4px solid #D5303B;
}
.line-dashed {
    position: absolute;
    top: 39px;
    border-left: 4px dashed #5F90CE;
}

/* content - main */
.main-item {
    height: 40px;
    border-bottom: 1px solid #ccc;
    padding-top: 7px;
}
</style>


