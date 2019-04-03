<template>
  <div
    :class="$style.root"
    v-show="visible"
  >
    <!--content-->
    <div :class="$style.title">
      <span :class="$style.tc">
        <span>CBD 统计分析</span>
      </span>
      <div :class="$style.close">
        <span @click="minimize">
          <img
            src="../../assets/images/缩小.png"
            alt=""
          >
        </span>
      </div>
    </div>
    <div :class="$style.content">
      <!--pie-->
      <div :class="$style.item2">
        <div :class="$style.item1">
          <ul v-if="items.length>0">
            <li>楼宇数量&nbsp;&nbsp;:&nbsp;&nbsp;{{items[itemIndex].data.楼宇数量}}个</li>
            <li>企业数量&nbsp;&nbsp;:&nbsp;&nbsp;{{items[itemIndex].data.企业数量}}个</li>
            <li>税收收入&nbsp;&nbsp;:&nbsp;&nbsp;{{items[itemIndex].data.税收收入}}万元</li>
            <!-- <li>税收增幅&nbsp;&nbsp;:&nbsp;&nbsp;{{items[itemIndex].data.tax_increase}}</li> -->
            <li>区级收入&nbsp;&nbsp;:&nbsp;&nbsp;{{items[itemIndex].data.区级收入}}万元</li>
            <!-- <li>区级增幅&nbsp;&nbsp;:&nbsp;&nbsp;{{items[itemIndex].data.district_increase}}</li> -->
          </ul>
        </div>
        <div :class="$style.jg">
          <img src="../../assets/images/面板间隔.png">
        </div>
        <div
          :class="$style.pie"
          ref="pie"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "CBDAnalysis",
  props: {
    items: Array
  },
  data: function() {
    return {
      visible: false,
      itemIndex: 0,
      visible:false,
      /*test*/
    };
  },
  computed: {
    analysisDataForEveryJX() {
      return this.$store.state.analysisDataForEveryJX;
    }
  },
  mounted: function() {
    // this.updateData();
  },
  watch: {
    items() {
      if (this.items.length > 0) {
        this.visible = true;
      }
      this.$nextTick(this.updateData);
    }
  },
  methods: {
    minimize: function() {
      this.visible = false;
    },
    updateData() {
      let c = this.items.map(function(e) {
        return {
          series: [
            {
              data: [
                {
                  name: "商务和租赁服务业",
                  value: e.data.商务和租赁服务业
                },
                {
                  name: "金融业",
                  value: e.data.金融业
                },
                {
                  name: "批发和零售业",
                  value: e.data.批发零售业
                },
                {
                  name: "房地产业",
                  value: e.data.房地产业
                },
                {
                  name: "科学研究和技术服务业",
                  value: e.data.科技研究和技术服务业
                },
                {
                  name: "文化、体育和娱乐业",
                  value: e.data.文化体育和娱乐业
                },
                {
                  name: "其他",
                  value: e.data.其他
                }
              ]
            }
          ]
        };
      });
      var myCharts1 =
        echarts.getInstanceByDom(this.$refs.pie) ||
        echarts.init(this.$refs.pie);
      var option = {
        baseOption: {
          timeline: {
            show: true,
            autoPlay: false,
            bottom: -1,
            left: "left",
            playInterval: 1500,
            rewind: true,
            data: this.items.map(e => e.year),
            color: "#0099FF",
            lineStyle: {
              color: "#2a90ef"
            },
            padding: [
              10, // 上
              -100, // 右
              30, // 下
              10 // 左
            ],
            label: {
              position: "top",
              color: "#ffffff",
              formatter: function(value, index) {
                // 格式化成月/日，只在第一个刻度显示年份
                var date = new Date(value);
                var texts = date.getFullYear();
                return texts;
              }
            },
            controlStyle: {
              color: "#2a90ef",
              borderColor: "#2a90ef"
            }
          },
          title: {
            show: false
          },
          tooltip: {},
          legend: {
            type: "scroll",
            orient: "vertical",
            show: true,
            right: "right",
            top: "5%",
            // bottom: 20,
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          series: [
            {
              // 系列三的一些其他配置
              type: "pie",
              radius: "60%",
              center: ["50%", "36%"],
              roseType: "area", //面积模式
              // labelLine: {
              //   //指示到模块的标签线
              //   show: false
              // },
              // label: {
              //   show: false
              // },
              color: [
                "#99FF99",
                "#00CC00",
                "#FF3333",
                "#FF6633",
                "#FF9900",
                "#66CCFF",
                "#0066CC"
              ]
            }
          ]
        },
        options: c
      };
      myCharts1.setOption(option);

      /*timeline*/
      let that = this;
      myCharts1.on("timelinechanged", function(timeLineIndex) {
        that.itemIndex = timeLineIndex.currentIndex;
        let year =  that.items[that.itemIndex].year;
        let features = that.analysisDataForEveryJX.filter(e => e[0].properties.年份 == year);
        that.$store.commit("setFeatures", [{features:features[0],type: "FeatureCollection"}]);
      });
    }
  }
};
</script>

<style lang="scss" module>
.root {
  width: 40%;
  background: url(../../assets/images/面板补充.png) center/100% 100% no-repeat;
  position: absolute;
  left: 2%;
  bottom: 10%;
  z-index: 9;
  color: white;
  .title {
    .tc {
      padding-top: 1.2%;
      padding-left: 5%;
      display: block;
      width: 40%;
      span {
        line-height: 30px;
        width: 10%;
        border-bottom: 3px solid #0099ff;
      }
    }
    .close {
      padding-left: 90%;
      margin-top: 0%;
      cursor: pointer;
    }
  }
  .content {
    display: flex;
    .item2 {
      position: relative;
      left: 1%;
      width: 100%;
      .item1 {
        cursor: pointer;
        margin-top: 0.1%;
        width: 30%;
        border-image: url(../../assets/images/面板间隔.png) 30 30 round;
        font-size: 12px;
        position: absolute;
        left: 2%;
        z-index: 1000;
        ul {
          background: url(../../assets/images/面板内边框.png) top/100% 100%
            no-repeat;
          padding: 0.15rem 0.21rem 0.04rem 0.21rem;
          li {
            list-style: none;
            margin: 0 0 0.1rem;
          }
        }
      }
      .jg {
        position: absolute;
        left: 34%;
      }
      .pie {
        width: 90%;
        height: 300px;
        margin: 1px auto;
      }
    }
  }
}
</style>
