/*大屏配置*/
indexConfig = {
	/*首页图表配置*/
	chartsOption: [
		{
			backgroundColor: '#1b2735',
			title: {
				text: 'CPU使用率',
				textStyle: {
					fontWeight: 'normal',
					fontSize: 25,
					color: 'rgb(97, 142, 205)'
				}
			},
			series: [{
				type: 'liquidFill',
				radius: '80%',
				data: [0.025,0.025,0.025,0.025,0.025],
				backgroundStyle: {
					borderWidth: 5,
					borderColor: 'rgb(255,0,255,0.9)',
					color: 'rgb(255,0,255,0.01)'
				},
				label: {
					normal: {
						formatter: 0.025 * 100 + '%',
						textStyle: {
							fontSize: 50
						}
					}
				}
			}]
		},
		// 左中
		{

			title: {
				text: 'CBD功能区GDP历年税收(万元)',
				textStyle: {
					color: '#fffdff',
					fontSize: 18,
					fontFamily: 'Microsoft YaHei',
					fontWeight: 'lighter',
				},
				top: 20,
				left: 20,
			},
			grid: {
				top: '25%',
				left: '3%',
				right: '5%',
				bottom: '15%',
				containLabel: true,
			},
			legend: {
				itemGap: 50,
				data: ['CBD功能区', '朝阳区'],
				textStyle: {
					color: '#f9f9f9',
					borderColor: '#fff'
				},
				icon: 'rect',
				bottom: '4%'
			},
			xAxis: [{
				type: 'category',
				boundaryGap: true,
				axisLine: {
					show: true,
					lineStyle: {
						color: '#49c2dc'
					}
				},
				axisLabel: { //坐标轴刻度标签的相关设置
					textStyle: {
						color: '#d1e6eb',
						margin: 15,
					},
				},
				axisTick: {
					show: false,
				},
				data: ['2015年', '2016年', '2017年', '2018年'],
			}],
			yAxis: [{
				type: 'value',
				min: 0,
				// max: 140,
				splitNumber: 5,

				axisLine: {
					show: true,
					lineStyle: {
						color: '#49c2dc'
					}
				},
				axisLabel: { //坐标轴刻度标签的相关设置
					textStyle: {
						color: '#d1e6eb',
						margin: 15,
					},
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#49c2dc'
					}
				},

				axisLabel: {
					formatter: '{value}'
				}

			}],
			series: [{
				name: '朝阳区',
				type: 'line',
				// smooth: true, //是否平滑曲线显示
				// 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				showAllSymbol: true,
				symbol: 'emptyCircle',
				symbolSize: 6,
				lineStyle: {
					normal: {
						color: "#28ffb3", // 线条颜色
					},
					borderColor: '#f0f'
				},

				itemStyle: {
					normal: {
						color: "#28ffb3",

					}
				},
				tooltip: {
					show: false
				},
				areaStyle: { //区域填充样式
					normal: {
						//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(0,154,120,1)'
							},
							{
								offset: 1,
								color: 'rgba(0,0,0, 0)'
							}
						], false),
						shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
						shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
					}
				},
				data: [440, 470, 535, 681]
			}, {
				name: 'CBD功能区',
				type: 'bar',
				barWidth: 20,
				tooltip: {
					show: false
				},

				itemStyle: {
					normal: {
						color: function(params) {
							var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
							return colorList[params.dataIndex];
						}
					}
				},
				data: [393, 438, 485, 631]
			}]
		},
		// 左下
		{
		textStyle: {
			color: '#fffbff'
		},
		color: ['#3398DB'],
		title: {
			text: 'CBD功能区历年资产规模（万元）', // '注册转化漏斗(总体转化率10%)',
			textStyle: {
				color: '#fffdff',
				fontSize: 18,
				fontFamily: 'Microsoft YaHei',
				fontWeight: 'lighter',
			},
			top: 20,
			left: 20,
		
		},
		
		grid: {
			left: '3%',
			right: '7%',
			bottom: '5%',
			containLabel: true
		},
		
		"xAxis": [{
			boundaryGap: false,
			"type": "category",
			axisLine: {
				show: true,
				lineStyle: {
					color: '#49c2dc'
				}
			},
			"splitLine": {
				"show": false
			},
			"axisTick": {
				"show": false
			},
			"splitArea": {
				"show": false
			},
			axisLabel: { //坐标轴刻度标签的相关设置
				textStyle: {
					color: '#fffbff',
					margin: 15,
				},
			},
			"data": ['2015年', '2016年', '2017年', '2018年'],
		}],
		"yAxis": [{
			"type": "value",
			"splitLine": {
				"show": false
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#49c2dc'
				}
			},
			"axisTick": {
				"show": false
			},
			axisLabel: { //坐标轴刻度标签的相关设置
				textStyle: {
					color: '#fffbff',
					margin: 15,
		
				},
				formatter: '{value}'
			},
			"splitArea": {
				"show": false
			},
		
		
		}],
		series: [{
		
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 5,
			showSymbol: false,
		
			lineStyle: {
				normal: {
					color: "#28ffb3", // 线条颜色
				},
				borderColor: '#f0f'
			},
		
			itemStyle: {
				normal: {
					color: "#28ffb3",
		
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(0,154,120,1)'
						},
						{
							offset: 1,
							color: 'rgba(0,0,0, 0)'
						}
					], false),
					shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
					shadowBlur: 10
				}
			},
		
			data: [145, 165, 210, 263]
		}, ]
		

		},
		// 右上
		{

			textStyle: {
				color: '#fffbff'
			},
			color: ['#3398DB'],
			title: {
				text: 'CBD功能区历年税收收入（万元）', // '注册转化漏斗(总体转化率10%)',

				textStyle: {
					color: '#fffdff',
					fontSize: 18,
					fontFamily: 'Microsoft YaHei',
					fontWeight: 'lighter',
				},
				top: 20,
				left: 20,

			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['2018年', '2017年', '2016年', '2015年'], //['用户数']
				textStyle: {
					color: '#fffdff',
					fontSize: 12,
					fontFamily: 'Microsoft YaHei',
				},
			},
			grid: {
				left: '4%',
				right: '15%',
				bottom: '10%',
				containLabel: true
			},
			xAxis: {
				type: 'value',

				data: [200000, 400000, 600000, 800000, 1000000],
				splitLine: {
					show: true,
					lineStyle: {
						// 使用深浅的间隔色
						color: 'rgb(43,38,71)'
					}
				},
				axisLine: {
					lineStyle: {
						type: 'solid',
						// color: 'rgb(37,42,84)',
						width: '2' //坐标线的宽度
					},

				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					align: '3%',
					fontSize: 10,

					formatter: function(value) {
						// 格式化成月/日，只在第一个刻度显示年份
						return value;
					}
				}
			},
			yAxis: {
				type: 'category',
				data: ['2018年', '2017年', '2016年', '2015年'], //['用户数']

				splitLine: {
					show: true,
					lineStyle: {
						// 使用深浅的间隔色
						color: 'rgb(43,38,71)'
					}
				},
				axisTick: {
					show: true,

					alignWithLabel: true,
					inside: true,
					length: 306,
					lineStyle: {
						color: '#474864'
					}
				},
				barGap: '10%',

				axisLine: {

					lineStyle: {
						type: 'solid',
						// color: 'rgb(37,42,84)',
						width: '2' //坐标线的宽度
					}
				},
			},
			series: [{
				name: '税收收入',
				barWidth: 10, //设置柱子宽度
				type: 'bar',
				// nameGap:'10%',
				// boundaryGap: ['20%', '20%'],
				data: [900000, 800000, 700000, 600000, ],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: "#1e66e5" // 0% 处的颜色
						}, {
							offset: 0.5,
							color: "#1c8aea" // 60% 处的颜色
						}, {
							offset: 1,
							color: "#19bcf2" // 100% 处的颜色
						}], false)
					}
				}
			}]
		},
		//右中
		{
			textStyle: {
				color: '#fffbff'
			},
			color: ['#3398DB'],
			
			title: {
				text: 'CBD功能区GDP历年税收占比(%)',
				textStyle: {
					color: '#fffdff',
					fontSize: 18,
					fontFamily: 'Microsoft YaHei',
					fontWeight: 'lighter',
				},
				top: 20,
				left: 20,
			},
			
			grid: {
				top: '25%',
				left: '3%',
				right: '5%',
				bottom: '15%',
				containLabel: true,
			},
			"legend": {
			
				textStyle: {
					color: '#fffbff',
				},
				itemGap: 50,
				"data": ['CBD功能区', '朝阳区'],
				bottom: '4%',
			},
			
			
			"calculable": true,
			"xAxis": [{
				"type": "category",
				axisLine: {
					show: true,
					lineStyle: {
						color: '#49c2dc'
					}
				},
				"splitLine": {
					"show": false
				},
				"axisTick": {
					"show": false
				},
				"splitArea": {
					"show": false
				},
				axisLabel: { //坐标轴刻度标签的相关设置
					textStyle: {
						color: '#fffbff',
						margin: 15,
					},
				},
				"data": ['2015年', '2016年', '2017年', '2018年'],
			}],
			"yAxis": [{
				"type": "value",
				"splitLine": {
					"show": false
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#49c2dc'
					}
				},
				"axisTick": {
					"show": false
				},
				axisLabel: { //坐标轴刻度标签的相关设置
					textStyle: {
						color: '#fffbff',
						margin: 15,
			
					},
					formatter: '{value}'
				},
				"splitArea": {
					"show": false
				},
			
			
			}],
			
			"series": [{
					"name": "朝阳区",
					"type": "bar",
					"stack": "总量",
					"barMaxWidth": 35,
					"barGap": "10%",
					"itemStyle": {
						"normal": {
							"color": "rgba(255,144,128,1)",
			
						}
					},
					"data": [
						527,
						676,
						707,
						790,
					],
				},
			
				{
					"name": "CBD功能区",
					"type": "bar",
					"stack": "总量",
					"itemStyle": {
						"normal": {
							"color": "rgba(0,191,183,1)",
							"barBorderRadius": 0,
			
						}
					},
					"data": [
						527,
						676,
						707,
						790,
			
					]
				},
			]
		},
		//右下
		{
			textStyle: {
				color: '#fffbff'
			},
			title: {
				text: 'CBD功能区入驻企业数量', // '注册转化漏斗(总体转化率10%)',
				textStyle: {
					color: '#fffdff',
					fontSize: 18,
					fontFamily: 'Microsoft YaHei',
					fontWeight: 'lighter',
				},
				top: 20,
				left: 20,
			},
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(255,255,255,0.7)',
				axisPointer: {
					type: 'shadow'
				},
				formatter: function(params) {
					// for text color
					var color = colorList[params[0].dataIndex];
					var res = '<div style="color:' + color + '">';
					res += '<strong>' + params[0].name + '消费（元）</strong>'
					for (var i = 0, l = params.length; i < l; i++) {
						res += '<br/>' + params[i].seriesName + ' : ' + params[i].value
					}
					res += '</div>';
					return res;
				}
			},
			legend: {
				bottom: '4%',
				textStyle: {
					color: '#fffdff',
					fontSize: 12,
					fontFamily: 'Microsoft YaHei',
				},
				itemGap: 5,
				itemHeight: 7,
				// data:['1数量','2数量','3数量'],
			},
			toolbox: {
				show: false,

			},
			calculable: true,
			grid: {
				left: '15%', // 与容器左侧的距离
				top: '25%', // 与容器右侧的距离

			},
			xAxis: [{
				boundaryGap: true,
				type: 'category',
				data: [2011, 2012, 2013, 2014, 2015, 2016],
				splitLine: {
					show: true,
					lineStyle: {
						color: '#202e5b'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {

					lineStyle: {
						type: 'solid',
						color: '#3d829f',
						width: '2' //坐标线的宽度
					}
				},
			}],
			yAxis: [{
				type: 'value',
				splitLine: {
					show: true,
					lineStyle: {
						color: '#202e5b'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {

					lineStyle: {
						type: 'solid',
						color: '#3d829f',
						width: '2' //坐标线的宽度
					}
				},
			}],
			series: [{
					name: '楼宇数量1',
					type: 'bar',
					itemStyle: {
						normal: {
							color: '#33CCFF',
						}
					},
					data: [4804.7, 1444.3, 1332.1, 908, 871.8, 1983.7]
				},
				{
					name: '楼宇数量2',
					type: 'bar',
					itemStyle: {
						normal: {
							color: '#00FF00',
						}
					},
					data: [4804.7, 1444.3, 1332.1, 908, 871.8, 1983.7]
				},
				{
					name: '楼宇数量3',
					type: 'bar',
					itemStyle: {
						normal: {
							color: '#FF6600',
						}
					},
					data: [4804.7, 1444.3, 1332.1, 908, 871.8, 1983.7]
				},

			]
		},
		/**/
	]
}
