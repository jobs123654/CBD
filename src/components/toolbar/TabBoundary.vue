<template>
 <div :class="$style.root">
     <span @click="select(2)" :class="active==2?$style.height:$style.normal">朝阳区</span>
     <span @click="select(0)" :class="active==0?$style.height:$style.normal">功能区</span>
     <span @click="select(1)" :class="active==1?$style.height:$style.normal">中心区</span>
 </div>
</template>

<script>
    export default {
        name: "TabBoundary",
        props:{

        },
        data:function(){
            return {
                active:2,
            }
        },
        methods:{
           select:function (i) {
               this.$emit('tabBoundary',i)
               this.active=i;
           }

        }
    }
</script>

<style lang="scss" module>
  .root{

      width: 9%;
      height: 30px;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 63%;
      top:13%;
      background: url(../../assets/images/面板内边框.png) top/100% 100% no-repeat;
      background-color: #294b68;
      span{
          width: 30%;
          line-height: inherit;
          color: #D3D3D3;
          cursor: pointer;
          text-align: center;
          padding: 0 0.01rem;
          background: url(../../assets/images/面板间隔.png) right/1px 80% no-repeat;
      }
      .height{
          background-color: #1496c8;
      }
      .normal{
          background-color: #294b68;
      }
  }
</style>
