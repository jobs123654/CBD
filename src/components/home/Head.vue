<template>
    <div :class="$style.root">
        <div :class="$style.item">
            <h2>CBD区域楼宇/企业展示分析系统</h2>
        </div>
        <hr>
        <div :class="$style.item">

            <span :class="$style.time">{{time}}</span>
            <span :class="$style.date">
                <span :class="$style.month">{{day}}</span>
                <span :class="$style.time">{{date}}</span>
            </span>
        </div>
        <hr>
        <div :class="$style.item">
            <!--<span :class="$style.sun">
                <img src="../../assets/images/首页/太阳.png" alt="">
            </span>-->
            <div :class="$style.tt">
                <span :class="$style.degree">20&#176;C</span>
                <span :class="$style.font">晴</span>
            </div>
        </div>
        <hr>
        <div :class="$style.item">
            <div>PM2.5</div>
            <div>40</div>
        </div>
        <hr>
        <div :class="$style.item" @click="enter">
            <span>进入系统</span>
        </div>

            <img src="../../assets/images/首页/TOP.png" alt="">

        </div>
</template>

<script>
    let dd=new Date()
    let days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    export default {
        name: "Head",
        data:function(){
          return{
             time:this.getTime(dd),
             day:this.getDay(dd),
             date:this.getDate(dd),
          }
        },
        mounted:function(){
          setInterval(function () {
              let t=new Date()
             this.time=this.getTime(t)
                 this.day=this.getDay(t)
                     this.date=this.getDate(t)
          }.bind(this),1000)
        },
        methods:{
            enter:function () {
                this.$emit('enter');
            },
            getTimeFormate:function (a) {
                return a.toString().length>1?a:'0'+a
            },
            getDate:function (d) {
              return  d.getFullYear()+"-"+this.getTimeFormate((d.getMonth()+1))+"-"+this.getTimeFormate(d.getDate())
            },
            getDay:function (d) {
                return d.getDay()>6?days[0]:days[d.getDay()]
            },
            getTime:function (d) {
                return this.getTimeFormate(d.getHours())+":"+this.getTimeFormate(d.getMinutes())+":"+this.getTimeFormate(d.getSeconds())
            }
        }
    }
</script>

<style lang="scss" module>

    $base_color:#00a2f7;

    $title_font_color:#fff;
    $title_font_size:35px;
    $base_small_font:14px;

    @mixin cborder($color){
        border:1px solid $color;
    }
    .root{

        width: 100%;

        height:70px;
        line-height: 40px;;
        @include cborder(grey);
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        justify-content: left;
        hr{
            border:1px solid $base_color ;
            height: 40%;
            margin:1.2% 1% 0 1%;
        }
        hr:nth-of-type(4){

        }
        img{
          position: absolute;
            top:85%;
        }
        .item{

        }
        .item:nth-of-type(1){
            width: 26.5%;
              h2{
                  color: $title_font_color;
                  font-size: $title_font_size;
                  /*letter-spacing: 4px;*/
              }
            margin: 17px 0 0 42px;
        }
        .item:nth-of-type(2){
            color: $base_color;
            margin-top: 14px;
            width: 11%;
            display: flex;
            flex-flow: row nowrap;
            .time{
                font-family: Amrica;
                font-size: 32px;
            }
            .date{
                margin-left: 0.05rem;

                display: flex;
                flex-direction: column;
                line-height: 13px;

                font-size: $base_small_font;
                span{
                    /*width:1%;*/
                }
                .month{
                    margin-top: 0.06rem;

                }
                .time{
                    font-size: $base_small_font;
                }
            }
        }
        .item:nth-of-type(3){
            margin-top: 0.07rem;
            width: 2%;
            color: $base_color;
            /*background-color: #66ccee;*/
            display: flex;
            .sun{

             font-size: 20px;
               img{
                   width: 1%;

                   display: block;
                   margin: -1.6% -0.8%;
               }
            }
            .tt{
                margin: 0.13rem 0 0 0.1rem;
                line-height: 13px;
                font-size: $base_small_font;
                display: flex;
                flex-direction: column;
            }


        }
        .item:nth-of-type(4){
            width: 2%;
            color: $base_color;
            padding-top: 0.18rem;
            font-size: $base_small_font;
            div{

                line-height: 15px;
            }
        }
        .item:nth-of-type(5){

            margin-left: 33%;
            margin-top: 1.4%;
            height: 70%;
            width: 9%;

            background: url(../../assets/images/首页/切换按钮.png) top/100% 100%  no-repeat;
            cursor: pointer;
            span{
                color: white;
                // margin: 5% 22%;
                margin-top: 5%;
                margin-left: 26%;
                font-family: '微软雅黑';

                font-size: 24px;

            }
        }

    }
</style>
