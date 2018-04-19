<template>
<div>
    <transition name="fade">
        <div class="select-box" v-if="show">
            <div class="m-head">
                <div class="ns_left" @click="close">{{ cancelText }}</div>
                <div class="ns_right" @click="confirm">{{ confirmText }}</div>                
            </div>
            <div class="item-box">
                <mt-picker :slots="slots" @change="valuesChange" value-key="text"></mt-picker>
            </div>
        </div>
    </transition>
    <div class="modal" v-show="show" @click="close"></div>
</div>
</template>
<script>
/**
 *  create by lwx 2018/01/04 ( updateTime )
 *  @version 0.0.3
 *  @prop items(values列表数据), initValue( 上一次选中的value, 初始默认值取items中间值 )
 *  @event hangOk(selectObj)
 * 
 *  注: 组件根据需求更改过三次, 内部可能有一些没有必要的方法( 不影响使用 )
 * 
 */
import Vue from 'vue'
import { Picker } from 'mint-ui'
Vue.component(Picker.name, Picker)

const find = (arr, currentValue) => {
    // 设置初始默认值  ( 取中间值 )
    const len = arr.length
    if(!currentValue.text) {
        return len % 2 === 1 ? Math.floor(len/2) : len/2 - 1
    }
    for(let i=0, len=arr.length; i<len; i++) {
        if(currentValue.text === arr[i].text) {
            return i
        }
    }
}
export default {
    props: {
        items: {
            type: Array,
            default: () => []
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        initValue: {
            type: Object,
            default: () => {
                return {
                    text: '',
                    value: ''
                }
            }
        }
    },
    data() {
        return {
            show: false,
            itemObj: {},
        }
    },
    computed: {
        slots() {
            return [
                {
                    flex: 1,
                    values: this.items, 
                    className: 'slot1',
                    defaultIndex: find(this.items, this._initValue),
                    value: this.items[find(this.items, this._initValue)]
                }
            ]
        },
        _initValue() {
            return this.initValue
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        confirm() {
            this.close()
            this.$emit('handOk', this.itemObj)
        },
        valuesChange(picker, val) { 
            this.slots[0].defaultIndex = find(this.items, this._initValue)
            this.slots[0].value = this.items[find(this.items, this._initValue)]
            this.itemObj = typeof val[0] == "object" ? val[0] : this.slots[0].values[2]
        }
    }
}
</script>
<style lang="scss" scoped>
    .select-box {
        position: fixed;
        -webkit-transform: translateZ(0);
        bottom: 0;
        width: 100%;
        background-color: #fff;
        z-index: 100;
        .m-head {
            top: 0;
            height: rem(80);
            display: flex;
            line-height: rem(80);
            color: #333;
            border-bottom: 2px solid rgba(240, 242, 245, 1);
            padding: 0 rem(20);
            div {
                flex: 1;
                height: rem(80);
                text-align: center;
                line-height: rem(80);
                color: #26a2ff;
                font-size: remp(16);
            }
        }
        .item-box {
            max-height: rem(420);
            overflow-y: scroll;
            .item {
                height: rem(80);
                border-bottom: 1px solid rgba(240, 242, 245, 0.8);
                text-align: center;
                line-height: rem(80);
                color: #6F7472;
            }
            .item:hover {
                background-color: #ccc
            }
        }
        .confirm-box {
            padding: rem(6) rem(30);
        }
    }
    .modal {
        position: fixed;
        -webkit-transform: translateZ(0);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        z-index: 99;
    }

    .fade-enter-active, .fade-leave-active {
        bottom: 0;
        transition: .2s ease-out;
    }
    .fade-enter, .fade-leave-to {
        bottom: -300px;
    }
</style>
