<template>
<div class="model-containent clearfix" :style="{marginLeft: data.left + 'px'}" @click="modelClick">
   <span class="pull-left"
        :style="{marginRight: data.disparity < 0 ? -data.disparity + 'px' : 0, width: tempWidth / 2 + 'px' }"
        >{{data.station}}</span>
   <div class="bg-box pull-left" :style="{width: data.width + 'px'}">
       <div class="bg-doing" :style="{width: data.doingWidth + 'px', left: data.disparity + 'px'}"></div>
       <div class="bg-top" :style="{width: data.width + 'px', marginLeft: data.disparity + 'px'}"></div>
       <div class="bg-bottom"></div>
   </div>
   <span class="pull-left" :style="{marginLeft: textLeft()}">{{data.remark}}</span>
</div>
</template>
<script>

export default {
    props: {
        data: [Object],
        tempWidth: [Number]
    },
    methods: {
        modelClick() {
            this.$emit('modelClick')
        },
        textLeft() {
            return  this.data.disparity < 0 
                        ? '10px'
                        :  this.data.doingWidth > this.data.width
                            ? this.data.doingWidth - this.data.width + this.data.disparity + 10 + 'px'
                            : this.data.disparity + 10 + 'px'
        }
    }  
}
</script>
<style scoped>
.model-containent {
    height: 26px;
    line-height: 26px;
    cursor: pointer;
}
.model-containent>span {
    display: block;
    text-align: center;
    font-size: 14px;
    color: #30465D;
}

.bg-box {
    position: relative;
    border-radius: 3px;    
}
.bg-doing {
    position: absolute;
    height: 18px;
    background-color: #3D69A5
}
.bg-top {
    height: 18px;
    background-color: #E2E6EF;
}
.bg-bottom {
    height: 8px;
    background-color: #BDC4CE;
}
</style>


