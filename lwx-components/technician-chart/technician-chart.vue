<template>
<div class="tc-container clearfix">
    <div class="tc-fix-left pull-left" ref="left">
        <div class="bg-fff-left"></div>
        <div class="left-item" 
            v-for="(item, i) in leftList" 
            :key="i" @click="itemClick(item)"
            :style="{width: leftWidth + 'px'}">
            {{item.name}}
        </div>
    </div>
    <div class="tc-content pull-left" :style="{marginLeft: leftWidth + 'px'}">
        <div class="content-header clearfix" :style="{width: contentWith + 'px'}">
            <div class="content-header-item pull-left" v-for="(item, i) in timeList" :key="i" :style="{width: timeWidth + 'px'}">
                {{item.time}}
                <div class="header-item-line" 
                    :style="{height: lineHeight + 'px', left: timeWidth / 2 + 'px', borderWidth: lineWidth + 'px'}">
                </div>
            </div>
        </div> 
        <div class="content-body">
            <div class="body-item" v-for="(item, i) in bodyList" :key="i" @click="itemClick(item)">
                <div class="bule-strip pull-left" 
                    v-for="(value, i) in item.duration" :key="i"
                    :style="{width: value.width + 'px', marginLeft: value.marginLeft + 'px' }"></div>
            </div>
        </div> 
        <div class="line-red" :style="{height: lineHeight + 'px', left: redLineLeft() + 'px'}" ref="redLine"></div> 
    </div>
</div>
</template>
<script>
/**
 * create by lwx on 2018/03/10 15:48
 * 
 * @prop tempWidth 步长宽度 ( 支持最小宽度70 ) default 100
 * @prop tempMinutes 间隔时间 ( 以分钟为单位 ) default 10
 * @prop defaultStartTime 默认开始时间 ( 支持到分钟 ) default '07:30'
 * @prop defaultEndTime 默认结束时间 ( 支持到分钟 ) default '17:10'
 * @prop leftWidth 左侧宽度 ( 支持最小宽度50 ) default 120
 * @prop lineWidth 辅助线宽度 ( 不需要可以传0 ) default 1
 * @function itemClick 点击行触发时间, 参数item
 * 
 * 注意: (defaultEndTime - defaultStartTime) / tempMinutes 必须是整数
 *  (结束时间 - 开始时间) / 时间间隔 => 目前只支持整数, 考虑到实现起来对
 *  之前的结构有变动, 并且牵一发动全身. 故弃之...
 *      
 */
export default {
    props: {
        list: [Array],
        tempWidth: {
            type: [Number],
            default: 100  
        },
        tempMinutes: {
            type: [Number],
            default: 10
        },
        defaultStartTime: {
            type: [String],
            default: '07:30'
        },
        defaultEndTime: {
            type: [String],
            default: '17:10'
        },
        leftWidth: {
            type: [Number],
            default: 120
        },
        lineWidth: {
            type: [Number],
            default: 1
        }
    },
    data() {
        return {
            timeList: [],
            timeWidth: this.tempWidth,
            bodyList: [],
            t: null
        }
    },
    created() {
        // 默认开始时间精确到分钟 
        let defaultStartArr = this.defaultStartTime.split(':')
        // let defaultEndArr = this.defaultEndTime.split(':')
        
        let sh = parseInt(defaultStartArr[0])
        let sm = parseInt(defaultStartArr[1])
        // let eh = parseInt(defaultEndArr[0])
        // let em = parseInt(defaultEndArr[1])
        
        let len = Math.ceil(this.totalMinutes / this.tempMinutes)
        for(let i = 0; i <= len; i ++) {
                if(sm / 60 >= 1) {
                    sm = sm % 60
                    sh += 1
                }
                // 
                // if(sh === eh && sm >= em) {
                //     this.timeList.push({
                //         time: `${eh}:${em} ${r}`
                //     })
                //     break
                // }
                let h = sh < 10 ? `0${sh}` : sh,
                    m = sm < 10 ? `0${sm}` : sm,
                    r = sh > 11 ? 'PM' : 'AM'
                let obj = {
                    time: `${h}:${m} ${r}`
                }
                this.timeList.push(obj)
                sm += this.tempMinutes
        }
    },
    computed: {
        leftList() {
            let arr = [{name: ''}]
            this.list.forEach(item => {
                let obj = {
                    name: item.name
                }
                arr.push(obj)
            })
            return arr
        },
        contentWith() {
            return this.totalMinutes * this.timeWidth / this.tempMinutes + this.timeWidth
        },
        lineHeight() {
            return this.list.length * 40
        },
        totalMinutes() {
            return this.getTotalMinutes(this.defaultEndTime) - this.getTotalMinutes(this.defaultStartTime)
        },
        minuteWidth() {
            return this.tempWidth / this.tempMinutes
        }
    },
    mounted() {
        this.list.forEach((item, j) => {
            this.bodyList.push({
                name: item.name,
                duration: []
            })  
            for(let i = 0; i < item.duration.length; i ++) {
                let startArr = item.duration[i].startTime.split(':')
                let endArr = item.duration[i].endTime.split(':')
                let startMinutes = parseInt(startArr[0]) * 60 + parseInt(startArr[1])
                let endMinutes = parseInt(endArr[0]) * 60 + parseInt(endArr[1])
                // 这里有个逆向思维, 必须是当前开始时间 - 上一个结束时间 得出下一个时间段的marginleft值, 且不能用变量保存
                let obj = {
                    width: (endMinutes - startMinutes) * this.minuteWidth,
                    marginLeft: i === 0 ? (startMinutes - this.getTotalMinutes(this.defaultStartTime)) * this.minuteWidth + this.tempWidth / 2
                                        : (startMinutes - (parseInt(item.duration[i - 1].endTime.split(':')[0]) * 60 + parseInt(item.duration[i - 1].endTime.split(':')[1]))) * this.minuteWidth
                }
                this.bodyList[j].duration.push(obj)
            }
        })
        // 红线( 当前时间 )展示在可视范围之内
        let currentMinutes = new Date().getHours() * 60 + new Date().getMinutes()
        let scrollLeft = (currentMinutes - this.getTotalMinutes(this.defaultStartTime)) / this.totalMinutes * this.$el.childNodes[2].scrollWidth
        this.$el.parentNode.scrollLeft = scrollLeft - this.leftWidth

        this.t = setInterval(() => {
            try {
                this.$refs.redLine.style.left = this.redLineLeft() + 'px'
            }catch (e) {}  
        }, 60000)
    },
    methods: {
        redLineLeft() {
            let currentMinutes = new Date().getHours() * 60 + new Date().getMinutes()
            return (currentMinutes - this.getTotalMinutes(this.defaultStartTime)) * this.minuteWidth + this.tempWidth / 2
        },
        itemClick(item) {
            this.$emit('itemClick', item)
        },
        getTotalMinutes(time) {
            if(typeof time === 'string') {
                let arr = time.split(':')
                return parseInt(arr[0]) * 60 + parseInt(arr[1])
            }
        }
    },
    destoryed() {
        clearInterval(this.t)  
    }
}
</script>
<style scoped>

/* container - style */
.tc-container {}

/* left - style */
.tc-fix-left {
    position: absolute;
    z-index: 10;
}
.bg-fff-left {
    position: absolute;
    left: -16px;
    width: 16px;
    height: 100%;
    background-color: #fff;
    z-index: 10;
}
.tc-fix-left > div:nth-last-child(1) {
    border-bottom: 1px solid #ccc;
}
.left-item {
    background-color: #fff;    
    /* width: 120px; */
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc; 
    box-sizing: border-box;  
    cursor: pointer;  
}

/* content - style */
.tc-content {
    position: relative;
    /* margin-left: 120px; */
    border-right: 1px solid #ccc;  
}

.content-header-item {
    position: relative;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #4C6681;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;    
}
.header-item-line {
    position: absolute;
    top: 39px;
    /* left: 60px; */
    border-left: 1px solid #ccc;    /* 辅助线 */
}

.body-item {
    padding: 10px 0;
    height: 40px;
    border-bottom: 1px solid #ccc;   
    cursor: pointer; 
}
.bule-strip {
    height: 20px;
    background-color: #3D69A5;
    border-radius: 3px;
    margin-left: 60px;
}

.line-red {
    position: absolute;
    top: 39px;
    border-left: 4px solid #D5303B;;
}
</style>
