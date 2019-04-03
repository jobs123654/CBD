<template>
  <div :class="$style.root"></div>
</template>

<script>
  export default {
    mounted() {

      var scaleData = [
        {
          name: "工程建设",
          value: 10
        },
        {
          name: "产权交易",
          value: 10
        },
        {
          name: "土地交易",
          value: 10
        },
        {
          name: "其他交易",
          value: 10
        },
        {
          name: "土地交易",
          value: 10
        },
        {
          name: "其他交易",
          value: 10
        }
      ];

      var data = [];
      var color = [
        "#00ffff",
        "#00cfff",
        "#006ced",
        "#ffe000",
        "#ffa800",
        "#ff5b00",
        "#ff3000"
      ];
      for (var i = 0; i < scaleData.length; i++) {
        data.push(
                {
                  value: scaleData[i].value,
                  name: scaleData[i].name,
                  itemStyle: {
                    normal: {
                      borderWidth: 4,
                      shadowBlur: 200,
                      borderColor: color[i],
                      shadowColor: color[i]
                    }
                  }
                },
                {
                  value: 2,
                  name: "",
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      },
                      color: "rgba(0, 0, 0, 0)",
                      borderColor: "rgba(0, 0, 0, 0)",
                      borderWidth: 0
                    }
                  }
                }
        );
      }
      var seriesObj = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [30, 60],
          center: ["50%", "58%"],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                color: "#ddd",
                formatter: function(params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== "") {
                    return params.name + "\n{white|" + "占比" + percent + "%}";
                  } else {
                    return "";
                  }
                },
                rich: {
                  white: {
                    color: "#ddd",
                    align: "center",
                    padding: [3, 0]
                  }
                }
              },
              labelLine: {
                length: 7,
                length2: 10,
                show: true,
                color: "#00ffff"
              }
            }
          },
          data: data
        }
      ];
      let option = {
        title: {
          text: "CBD功能区不同行业税收占比(%)",
          textStyle: {
            color: "#fffdff",
            fontSize: 18,
            fontFamily: "Microsoft YaHei",
            fontWeight: "lighter"
          },
          top: 20,
          left: 20
        },
        // backgroundColor: '#04243E',
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: seriesObj
      };
      var myChart = echarts.init(this.$el);
      //使用制定的配置项和数据显示图表
      myChart.setOption(option);
    }
  };
</script>

<style lang="scss" module>
  .root {
    width: 100%;
    height: 100%;
  }
</style>
