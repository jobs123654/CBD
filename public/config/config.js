// eslint-disable-next-line no-undef
config = {
  title: "CBD区域楼宇/企业展示分析系统",
  map: {
    center: [508925.06, 305125.97],
    zoom: 7,
    layerSwitcherControl: {
      'position'  :  {'bottom': '100', 'right': '7'},
      // title of base layers
      'baseTitle' : '基础图层',
      // title of layers
      'overlayTitle' : '其他图层',
      // layers you don't want to manage with layer switcher
      'excludeLayers' : [],
      // css class of container element, maptalks-layer-switcher by default
      'containerClass' : 'maptalks-layer-switcher'
    },

    spatialReference: {
      projection: "identity",
      resolutions: [
        140.00000000000003,
        70.00000000000001,
        28.0,
        14.0,
        7.0,
        2.8000000000000003,
        1.4000000000000001,
        0.5600000000000002
      ],
      fullExtent: {
        top: 328267.01403450756,
        left: 498274.8324539737,
        bottom: 292043.1403319263,
        right: 534368.7214544317
      }
    },
    attribution: false,


  },
  baseLayer: {
    urlTemplate:
      "http://192.168.46.30:8090/iserver/services/map-Map/wmts100/朝阳区矢量地图/default/Custom_朝阳区矢量地图/{z}/{y}/{x}.png",
    repeatWorld: false,
    tileSystem: [1, -1, 498274.8324539737, 328267.01403450756]
  },

  /*首页地图*/
  indexMap: {
    center: [512931.75, 312722.45],
    zoom: 1,
    spatialReference: {
      projection: "identity",
      resolutions: [
        32.116000000000014,
        16.058000000000032,
        4.014360000000001,
        2.0070399999999946
      ],
      fullExtent: {
        top: 328367.13,
        left: 488077.87,
        bottom: 291947.38,
        right: 529109.97
      }
    },
    attribution: false
  },
  indexBaseLayer: {
    // urlTemplate: "http://192.168.46.30:8090/iserver/services/map-CyMap/rest/maps/Map",
    urlTemplate:
      "http://192.168.46.30:8090/iserver/services/map-CyMap/wmts100/Map/default/Custom_Map/{z}/{y}/{x}.png",
    repeatWorld: false,
    tileSystem: [1, -1, 488077.8681179732, 328367.1283149669]
  },
  /*影像图*/
  imgLayer: {
    urlTemplate:
      "http://192.168.46.30:8090/iserver/services/map-Map/wmts100/朝阳区影像地图/default/Custom_朝阳区影像地图/{z}/{y}/{x}.png",
    tileSystem: [1, -1, 493348.00833995664, 333299.3163286119],
    repeatWorld: false

  },
  /*三维图*/
  threeDimensional: {
    option: {
      // animation: false, //动画控制不显示
      // baseLayerPicker: false, //图层控制显示
      // geocoder: false, //地名查找不显示
      // timeline: true, //时间线不显示
      // sceneModePicker: false, //投影方式显示
      navigation: false,
      selectionIndicator: false,
      infoBox: false,
      shadows: true,
      // eslint-disable-next-line no-undef
      sceneMode: Cesium.SceneMode.COLUMBUS_VIEW // 哥伦布视图
    },
    url: "", // 传参数用
    // 水晶模
    emeraldUrl:
      "http://192.168.46.228:8090/iserver/services/3D-cbd_sjm/rest/realspace",
    // 白膜
    albugineaUrl:
      "http://192.168.46.228:8090/iserver/services/3D-cbd_bm/rest/realspace",
    // 真实模型
    sceneUrl:
      "http://192.168.46.228:8090/iserver/services/3D-CBDbuild/rest/realspace",
    map_url:
      "http://192.168.46.228:8090/iserver/services/map-dom/rest/maps/dom_adjust",
    center: {
      x: 508925.06,
      y: 305125.97,
      z: 1000
    },
    gallery: {
      // 楼座查询
      height: 750,
      url:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/rest/maps/楼座面",
      foreignTableName: "BUILDINFODATA b",
      joinFilter: "b.buildid_new=LZ_C_CBD_3_22_1.buildid_new",
      query_key: "modeid_new",
      field: "BUILDNAME",
      queryParams: {
        name: "LZ_C_CBD_3_22_1@CBDGIS",
        fields: [
          "b.buildname as 楼座名称",
          "b.buildid_new as 楼座编号",
          "b.project_name as 所属楼宇",
          "b.parkname as 所属园区",
          "b.buildid as 楼宇编号",
          "b.parkid as 园区编号",
          "b.high as 楼座高度",
          "b.floor as 楼座总层数",
          "b.floor_up as 地上楼层数",
          "b.floor_under as 地下楼层数",
          "b.area_all as 总建筑面积",
          "b.area_over as 地上面积",
          "b.area_under as 地下面积",
          "b.o_area as 写字楼建筑面积",
          "b.o_area2 as 写字楼可供出租出售面积",
          "b.o_area_rent as 写字楼已出租面积",
          "b.o_area_sale as 写字楼已出售面积",
          "b.o_area_ent as 写字楼已入驻企业面积",
          "b.o_vacancyrate as 写字楼空置率",
          "b.o_rentprice as 写字楼平均租赁价格",
          "b.o_wuguanprice as 写字楼平均物管费",
          "b.a_area as 高档公寓建筑面积",
          "b.a_area2 as 高档公寓可供出租出售面积",
          "b.a_count as 高档公寓套数",
          "b.a_vacancyrate as 高档公寓空置率",
          "b.a_rentprice as 高档公寓平均租赁价格",
          "b.a_wuguanprice as 高档公寓平均物管费",
          "b.b_area as 商业建筑面积",
          "b.b_area2 as 商业可供出租出售面积",
          "b.b_vacancyrate as 商业空置率",
          "b.b_rentprice as 商业平均租赁价格",
          "b.b_wuguanprice as 商业平均物管费",
          "b.h_area as 酒店建筑面积",
          "b.h_area2 as 酒店可供出租出售面积",
          "b.h_vacancyrate as 酒店空置率",
          "b.h_rentprice as 酒店平均租赁价格",
          "b.h_wuguanprice as 酒店平均物管费",
          "b.h_star as 星级评定情况",
          "b.h_star_area as 星级酒店面积",
          "b.h_star_count as 星级酒店房间数",
          "b.rep_date as 数据维护更新时间"
        ]
      }
    },
    build: {
      // 楼宇查询
      url:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/rest/maps/楼宇面",
      foreignTableName: "PROJECTINFODATA p",
      joinFilter: "p.builditemname=LY_C_CBD.楼宇名称",
      field: "楼宇名称",
      queryParams: {
        name: "LY_C_CBD@CBDGIS",
        fields: [
          "p.builditemname as 楼宇名称",
          "p.builditemid_new as 楼宇编号",
          "p.builditem_type as 楼宇功能",
          "p.rent_type as 写字楼租售类型",
          "p.builditem_sale_qk as 写字楼出售情况",
          "p.house_property as 房屋性质",
          "p.house_commencementtime as 动工时间",
          "p.house_completiontime as 建成时间",
          "p.house_openingtime as 开业时间",
          "p.buildingcount as 楼座数量",
          "p.builditem_pm_type as 楼宇物业等级",
          "p.build_leed_standard as 建筑LEED标准",
          "p.accreditation as 政府及行业组织认证情况",
          "p.area_all as 楼宇总面积",
          "p.area_over as 地上面积",
          "p.area_under as 地下面积",
          "p.office_area as 写字楼面积",
          "p.business_area as 商业面积",
          "p.apart_area as 高档公寓面积",
          "p.hotel_area as 酒店面积",
          "p.vendor as 开发商单位名称（四方）",
          "p.property_right_org_name as 产权单位名称（四方）",
          "p.operate_name as 运营单位名称（四方）",
          "p.pmcname as 物业管理单位名称（四方）",
          "p.carno_sum as 机动车停车位数量（规划实施）",
          "p.carno_upground as 地上停车（规划实施）",
          "p.carno_under as 地下停车（规划实施）",
          "p.carno_under_fix as 地下停车（固定）（规划实施）",
          "p.carno_under_rent as 地下停车（时租）（规划实施）",
          "p.isarea as 是否有自行车停车场（规划实施）",
          "p.bicyclearea_park as 自行车停车场面积（规划实施）",
          "p.bicyclearea_up as 地上面积（规划实施）",
          "p.bicyclearea_under as 地下面积（规划实施）",
          "p.wall_materials as 外墙材料（楼宇运营）",
          "p.struct_type as 结构类型（楼宇运营）",
          "p.cool_way as 制冷方式（楼宇运营）",
          "p.elevator_num as 电梯数量（楼宇运营）",
          "p.elevator_vendor as 电梯厂家（楼宇运营）",
          "p.elevator_speed as 梯运行速度（楼宇运营）",
          "p.elevator_standard as 电梯标准（楼宇运营）"
        ]
      }
    }
  },
  resourceList: [
    {
      name: "综合分析",
      map_url:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/rest/maps/CBD%E8%A1%97%E4%B9%A1",
      foreignTableName: "regionchangedata a", // 外部表的名称
      datasource: "CBDGIS",
      map_dataset: "DOMAIN_XJ_CBD",

      left_table_id: "简称",
      right_table_id: "regionname",
      CLforeignTableName: "regioncldata a",
      fields: [
        "a.year as 年份",
        "a.regionname as 街乡名称",
        "a.projectnum as 楼宇数量",
        "a.entnum as 企业数量",
        "a.swentnum as 商务和租赁服务业",
        "a.jrentnum as 金融业",
        "a.plentnum as 批发零售业",
        "a.fdcentnum as 房地产业",
        "a.kjentnum as 科技研究和技术服务业",
        "a.wtentnum as 文化体育和娱乐业",
        "a.otherentnum as 其他",
        "a.tax as 税收收入",
        "a.taxtb as 税收增幅",
        "a.qjsr as 区级收入"
      ],
      children: [
        {
          name: "楼宇数量",
          queryFields: ["a.projectnum as value"]
        },
        {
          name: "企业数量",
          queryFields: ["a.entnum as value"]
        },
        {
          name: "行业占比",
          queryFields: [
            "a.swentnum as swentnum",
            "a.jrentnum as jrentnum",
            "a.plentnum as plentnum",
            "a.fdcentnum as fdcentnum",
            "a.kjentnum as kjentnum",
            "a.wtentnum as wtentnum",
            "a.otherentnum as otherentnum"
          ]
        },
        {
          name: "税收收入",
          queryFields: ["a.tax as value"]
        },
        {
          name: "税收增幅",
          queryFields: ["a.taxtb as value"]
        },
        {
          name: "区级收入",
          queryFields: ["a.qjsr as value"]
        }
      ]
    },
    {
      name: "楼宇分析",
      map_url:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/rest/maps/%E6%A5%BC%E5%AE%87%E7%82%B9",
      scene_url:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/rest/maps/%E6%A5%BC%E5%AE%87%E9%9D%A2",

      foreignTableName: "PPCHANGEDATA", // 外部表的名称
      pro_name: "PROJECTNAME", // 外部表楼宇名称
      park_name: "PARKNAME", // 外部表园区名称
      other_pro_name: "楼宇名称", // 楼宇空间表名称

      other_part_name: "楼宇名称", // 园区空间表名称
      datasource: "CBDGIS", // 数据集
      map_dataset: "LY_CBD", // 点数据
      scene_dataset: "LY_C_CBD", // 面数据
      ProjectInfoName: "builditemname",
      children: [
        {
          name: "楼宇与园区分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "重点楼宇",
              color: "#DC143C",
              queryAttributeFilter: "PROJECTTYPE = 0" // 结果过滤条件
            },
            {
              name: "一般楼宇",
              color: "#19BE6B",
              queryAttributeFilter: "PROJECTTYPE = 1" // 结果过滤条件
            },
            {
              name: "重点园区",
              color: "#0000FF",
              queryAttributeFilter: "PARKTYPE = 0" // 结果过滤条件
            },
            {
              name: "一般园区",
              color: "#FFFF00",
              queryAttributeFilter: "PARKTYPE = 1" // 结果过滤条件
            }
          ]
        },
        {
          name: "纳税过亿楼宇与园区分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "纳税过亿楼宇",
              color: "#DC143C",
              queryAttributeFilter: "TAX > 10000 and PARKTYPE is null" // 结果过滤条件
            },
            {
              name: "纳税过亿园区",
              color: "#19BE6B",
              queryAttributeFilter: "TAX > 10000 and PROJECTTYPE is null" // 结果过滤条件
            }
          ]
        },
        {
          name: "楼宇与园区价值能力分析",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "楼宇地均产出大于7500万/万平方米",
              color: "#DC143C",
              queryAttributeFilter: "TAXPERAREA > 7500 and PARKTYPE is null" // 结果过滤条件
            },
            {
              name: "楼宇地均产出小于7500万/万平方米",
              color: "#19BE6B",
              queryAttributeFilter: "TAXPERAREA < 7500 and PARKTYPE is null" // 结果过滤条件
            },
            {
              name: "园区地均产出大于7500万/万平方米",
              color: "#0000FF",
              queryAttributeFilter: "TAXPERAREA > 7500 and PROJECTTYPE is null" // 结果过滤条件
            },
            {
              name: "园区地均产出小于7500万/万平方米",
              color: "#FFFF00",
              queryAttributeFilter: "TAXPERAREA < 7500 and PROJECTTYPE is null" // 结果过滤条件
            }
          ]
        },
        {
          name: "楼宇品质分级分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "超甲级楼宇分布",
              color: "#DC143C",
              queryAttributeFilter: "QUALITYRATING = '超甲级'" // 结果过滤条件
            },
            {
              name: "甲级楼宇分布",
              color: "#19BE6B",
              queryAttributeFilter: "QUALITYRATING = '甲级'" // 结果过滤条件
            }
          ]
        },
        {
          name: "CBD楼宇联盟分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "楼宇联盟会员单位分布",
              color: "#DC143C",
              queryAttributeFilter: "PARKTYPE is null and ISLEAGUE = 1" // 结果过滤条件
            }
          ]
        }
      ]
    },
    {
      name: "企业分析",
      map_url:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/rest/maps/%E4%BC%81%E4%B8%9A%E7%82%B9",
      datasource: "CBDGIS",
      map_dataset: "CBDJYQY",
      foreignTableName: "entchangedata",
      queryField: "地名",
      left_table_id: "ZZJGDM",
      right_table_id: "NAT_ORG_CODE",
      infoData: {
        tablename: "entchangedata t",
        fields: [
          "t.ORG_NAME as 企业名称",
          "t.NAT_ORG_CODE as 组织机构代码",
          "t.ORG_ADDR as 注册地址",
          "t.REGIONNAME as 所属街乡",
          "t.PROJECTNAME as 所属楼宇",
          "t.PROJECTID as 楼宇编号",
          "t.TYPEID as 企业类型"
        ]
      },
      children: [
        {
          name: "区域企业总体分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "区域企业总体分布",
              color: "#DC143C",
              queryAttributeFilter: ""
            }
          ]
        },
        {
          name: "重点企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "重点企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '01'" // 结果过滤条件
            }
          ]
        },
        {
          name: "企业主体变化分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "新注册企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '02'" // 结果过滤条件
            },
            {
              name: "新迁入企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '03'" // 结果过滤条件
            },
            {
              name: "注吊销企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '05'" // 结果过滤条件
            },
            {
              name: "迁出企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '04'" // 结果过滤条件
            }
          ]
        },
        {
          name: "新注册过亿企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "新注册过亿企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '06'" // 结果过滤条件
            }
          ]
        },
        {
          name: "特色企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "世界500强企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '09'" // 结果过滤条件
            },
            {
              name: "上市公司分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '10'" // 结果过滤条件
            },
            {
              name: "独角兽企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '11'" // 结果过滤条件
            },
            {
              name: "总部企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '12'" // 结果过滤条件
            },
            {
              name: "跨国公司地区总部企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '13'" // 结果过滤条件
            },
            {
              name: "外资企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '14'" // 结果过滤条件
            },
            {
              name: "功能性企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '017'" // 结果过滤条件
            }
          ]
        },
        {
          name: "纳税过亿企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "纳税过亿企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '07'" // 结果过滤条件
            }
          ]
        },
        {
          name: "异地纳税企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "异地纳税企业分布",
              color: "#19BE6B",
              queryAttributeFilter: "typeid = '08'" // 结果过滤条件
            }
          ]
        },
        {
          name: "不同行业类型企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "商务和租赁服务业分布"
            },
            {
              name: "金融业分布"
            },
            {
              name: "批发和零售业分布"
            },
            {
              name: "房地产业分布"
            },
            {
              name: "科学研究和技术服务业分布"
            },
            {
              name: "文化、体育和娱乐业分布"
            },
            {
              name: "其他"
            }
          ]
        }
      ]
    },
    //  企业迁徙
    {
      name: "企业迁徙",
      children: [
        {
          name: "2018年企业迁徙情况",
          queryFields: [] // 查询展示字段
        }
      ]
    },
    {
      name: "信用分析",
      children: [
        {
          name: "高风险企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "高风险企业分布"
            }
          ]
        },
        {
          name: "经济异常企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "经济异常企业分布"
            }
          ]
        },
        {
          name: "行政处罚企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "行政处罚企业分布"
            }
          ]
        },
        {
          name: "黑名单企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "黑名单企业分布"
            }
          ]
        },
        {
          name: "红名单企业分布",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "红名单企业分布"
            }
          ]
        },
        {
          name: "重点监测企业",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "重点监测企业"
            }
          ]
        },
        {
          name: "瞬时风险企业",
          queryFields: [], // 查询展示字段
          children: [
            {
              name: "瞬时风险企业"
            }
          ]
        }
      ]
    },
    {
      name: "基础设施"
    }
  ],
  /*区域网格*/
  AreaGrids: [
    {
      id: "CBD功能区",
      label: "CBD功能区",
      urlTemplate:
          "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD功能区",
      checked: false,
      opacity:0.5
    },
      {
      id: "CBD核算范围",
      label: "CBD核算范围",
      urlTemplate:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD核算范围",
      checked: false,
        opacity:0.5
    },
    {
      id: "CBD中心区",
      label: "CBD中心区",
      urlTemplate:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD中心区",
      checked: false,
      opacity:0.5
    },
    {
      id: "CBD西区",
      label: "CBD西区",
      urlTemplate:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD西区",
      checked: false,
      opacity:0.5
    },
    {
      id: "CBD东区",
      label: "CBD东区",
      urlTemplate:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD东区",
      checked: false,
      opacity:0.5
    },
    {
      id: "CBD核心区",
      label: "CBD核心区",
      urlTemplate:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD核心区",
      checked: false,
      opacity:0.5
    },
    {
      id: "CBD街乡",
      label: "CBD街乡",
      urlTemplate:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD街乡",
      checked: false,
      opacity:0.5
    },
    {
      id: "CBD社区",
      label: "CBD社区",
      urlTemplate:
        "http://192.168.46.228:8090/iserver/services/map-CBDALL/wms130/CBD社区",
      checked: false,
      opacity:0.5
    }
  ],
  /*地址前缀*/
  moudlePath: 'http://192.168.46.220:8080/cboard/dashboard/getAggregateData.do?',
  /*功能区指标API*/
  GNQAPI: [
    {
      "GDPIncome":'datasetId=331&cfg= {"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"e62eb025-9ec5-4bbf-aa47-c8b42f0c98a9"}],"filters":[],"values":[{"column":"GDP","aggType":"sum"}]}',
      "TaxIncome": 'datasetId=350&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"408e0d21-dcde-4f83-8811-2bb708268909"}],"filters":[],"values":[{"column":"TAX","aggType":"sum"}]}',
      'AssetSize':'datasetId=329&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"954740c0-43c9-4a64-937b-940165e22ed0"}],"filters":[],"values":[{"column":"ASSETSIZE","aggType":"sum"}]}',
      'GDPZB':'datasetId=332&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"dc33cf4f-94d5-4a55-9291-15e733708b8a"}],"filters":[],"values":[{"column":"GDPZB","aggType":"sum"}]}',
      'TaxIncomeZB':'datasetId=333&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"1f35f99b-4718-4df1-8029-a34b912749b7"}],"filters":[],"values":[{"column":"TAXZB","aggType":"sum"}]}',
      'AssetSizeZB':'datasetId=334&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"92a045e1-0166-4ff8-bbdd-3b41e276e45d"}],"filters":[],"values":[{"column":"ASSETSIZEZB","aggType":"sum"}]}',
    }
  ],
  /*中心区指标API*/
  ZXQAPI: [
    {
      "GDPIncome":'datasetId=335&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"022b5297-7831-4464-a305-2c9a32af5f41"}],"filters":[],"values":[{"column":"GDP","aggType":"sum"}]}',
      "TaxIncome": 'datasetId=351&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"98c978c1-fa7c-46ba-a0b3-55cb930bf63f"}],"filters":[],"values":[{"column":"TAX","aggType":"sum"}]}',
      'AssetSize':'datasetId=336&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"efba7cba-53e1-4bbc-a2b8-ff62ba7d83ed"}],"filters":[],"values":[{"column":"ASSETSIZE","aggType":"sum"}]}',
      'GDPZB':'datasetId=337&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"fdf1a411-de7a-425b-9243-1a7faaa070d0"}],"filters":[],"values":[{"column":"GDPZB","aggType":"sum"}]}',
      'TaxIncomeZB':'datasetId=338&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"f20c23ae-7bc8-442a-8665-33a3c1b772bc"}],"filters":[],"values":[{"column":"TAXZB","aggType":"sum"}]}',
      'AssetSizeZB':'datasetId=339&cfg={"rows":[],"columns":[{"columnName":"YEAR","filterType":"eq","values":[],"id":"93c02ef8-71cc-4ec3-8b56-d0b515ea9496"}],"filters":[],"values":[{"column":"ASSETSIZEZB","aggType":"sum"}]}',
    }
  ]
};

// eslint-disable-next-line no-unused-vars
const sceneConfig = {
  // 区域网格-三维
  zoningGridConfig: [
    {
      index: 0,
      name: "CBD中心区",
      file_name: "DOMAIN_CENTER_CBD.json",
      color: "#FFA500"
    },
    {
      index: 1,
      name: "CBD西区",
      file_name: "DOMAIN_WEST_CBD.json",
      color: "#008000"
    },
    {
      index: 2,
      name: "CBD东区",
      file_name: "DOMAIN_EAST_CBD.json",
      color: "#1E90FF"
    },
    {
      index: 3,
      name: "CBD核心区",
      file_name: "DOMAIN_HX_CBD_1.json",
      color: "#FF0000"
    }
  ]
};

// 场景飞行路线
// eslint-disable-next-line no-unused-vars
const flyRoute = [
  {
    name: "CBD飞行路线",
    file: "CBD-C01.fpf"
  }
];
