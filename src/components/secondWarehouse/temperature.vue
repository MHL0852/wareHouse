<template>
  <div class="temperature">
    <div class="top">
      <h4>{{data.title}}</h4>
    </div>
    <div class="body">
      <div id="charts">
        <div id="main" ref="temperatureLine" style="width:100%;height:3.00rem;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import {util} from "@/API"
  import moment from 'moment'
  import {baseUrl, wareListService} from '@/libs/constant'

  export default {
    name: "temperature",
    props: ["data"],
    data() {
      return {
        coldStorage: [],
        freeze: [],
        electric: [],
        timeValue: [],
        myEchart:{},
      }
    },
    mounted() {
      this.init();
      this.getData();
      setInterval(this.getData, 120000)
    },
    methods: {
      init: function () {
        this.myEchart = echarts.init(this.$refs.temperatureLine);
        window.addEventListener("resize", this.myEchart.resize);
        let {coldStorage, freeze, electric} = this.data;
        this.coldStorage = coldStorage;
        this.freeze = freeze;
        this.electric = electric;
        this.myEchart.setOption(
          {
            color: ["#fd8560", "#9bcb64", "#2ec8cb"],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              right: '10%'
            },
            toolbox: {
              feature: {
                dataView: {show: false, readOnly: false},
                restore: {show: false},
                saveAsImage: {show: false}
              }
            },
            legend: {
              data: [this.coldStorage.name, this.freeze.name, this.electric.name],
              textStyle: {
                color: '#727483'
              }
            },
            xAxis:
              {
                name: '',
                type: 'category',
                boundaryGap: false,
                scale: true,
                axisLine: {
                  show: "false",
                  lineStyle: {
                    color: "#727483",
                    width: 1,
                    type: 'dashed',
                    opacity: 1,
                  }
                },
                nameTextStyle: {
                  show: "false",
                  color: "#fff",
                  fontSize: 14,
                  verticalAlign: "bottom",

                },
                axisLabel: {
                  rotate: 45,
                  color: "#727483",
                  // formatter: '{value}'
                },
                axisTick: {
                  show: false,
                  alignWithLabel: false
                },
                data: this.timeValue
              },
            yAxis: [
              {
                type: 'value',
                name: '温度',
                splitNumber: 5,
                position: 'left',
                splitLine: {
                  show: false,
                  // type:'dashed'
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    color: "#008acd"
                  }
                },
                nameTextStyle: {
                  color: "#fff",
                  fontSize: 14,
                  verticalAlign: "bottom",

                },
                axisLabel: {
                  color: "#727483",
                  formatter: '{value} ℃'
                }
              },
              {
                type: 'value',
                name: '电量',
                splitNumber: 4,
                position: 'right',
                offset: 0,
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: "#727483",
                    width: 0.5,
                    type: "dashed",
                  }
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  onZero: true,
                  lineStyle: {
                    color: "#008acd"
                  }
                },
                nameTextStyle: {
                  color: "#fff",
                  fontSize: 14,
                  verticalAlign: "bottom",
                },
                axisLabel: {
                  color: "#727483",
                  formatter: '{value}'
                }
              }
            ],
            series: [
              {
                name: this.coldStorage.name,
                type: 'line',
                symbol: "circle",
                size: 6,
                smooth: 0.3,
                data: this.coldStorage.value
              },
              {
                name: this.freeze.name,
                type: 'line',
                symbol: "diamond",
                size: 6,
                data: this.freeze.value
              },
              {
                name: this.electric.name,
                type: 'line',
                smooth: 0.3,
                size: 6,
                yAxisIndex: 1,
                data: this.electric.value
              }
            ]
          }
        )
      },
      getData: function () {
        if (this.$refs.temperatureLine) {
          /**
           * 获取24小时温度变化
           **/
          util(baseUrl, {
            params: {
              serviceName: wareListService,
              wareHouseId: this.data.bid,
              method: 'getWarehouse24HTemperateById'
            }
          }).then(response => {
              let res = response.data.data.data ? JSON.parse(response.data.data.data) : {};
              let coldValue = [],
                timeValue = [],
                test = [],
                freezeValue = [];
              for (let key in res.cold) {
                if (res.cold.hasOwnProperty(key)) {
                  test.push({
                    coldValue: res.cold[key],
                    time: key,
                    freeze: res.freeze[key]
                  })
                }
              }
              test = test.sort((a, b) => {
                return moment(a.time, 'yyyy-MM-DD HH:mm:ss').diff(moment(b.time, 'yyyy-MM-DD HH:mm:ss'), 'hours')
              });
              test.forEach(item => {
                coldValue.push(item.coldValue);
                timeValue.push(moment(item.time, 'yyyy-MM-DD HH:mm:ss').format('HH:mm'));
                freezeValue.push(item.freeze)
              })
              this.timeValue = timeValue;
              this.$set(this.coldStorage,'value',coldValue);
              this.$set(this.freeze,'value',freezeValue);
              this.myEchart.setOption(
                {
                  color: ["#fd8560", "#9bcb64", "#2ec8cb"],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'cross'
                    }
                  },
                  grid: {
                    right: '10%'
                  },
                  toolbox: {
                    feature: {
                      dataView: {show: false, readOnly: false},
                      restore: {show: false},
                      saveAsImage: {show: false}
                    }
                  },
                  legend: {
                    data: [this.coldStorage.name, this.freeze.name, this.electric.name],
                    textStyle: {
                      color: '#727483'
                    }
                  },
                  xAxis:
                    {
                      name: '',
                      type: 'category',
                      boundaryGap: false,
                      scale: true,
                      axisLine: {
                        show: "false",
                        lineStyle: {
                          color: "#727483",
                          width: 1,
                          type: 'dashed',
                          opacity: 1,
                        }
                      },
                      nameTextStyle: {
                        show: "false",
                        color: "#fff",
                        fontSize: 14,
                        verticalAlign: "bottom",

                      },
                      axisLabel: {
                        rotate: 45,
                        color: "#727483",
                        // formatter: '{value}'
                      },
                      axisTick: {
                        show: false,
                        alignWithLabel: false
                      },
                      data: this.timeValue
                    },
                  yAxis: [
                    {
                      type: 'value',
                      name: '温度',
                      splitNumber: 5,
                      position: 'left',
                      splitLine: {
                        show: false,
                        // type:'dashed'
                      },
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        lineStyle: {
                          color: "#008acd"
                        }
                      },
                      nameTextStyle: {
                        color: "#fff",
                        fontSize: 14,
                        verticalAlign: "bottom",

                      },
                      axisLabel: {
                        color: "#727483",
                        formatter: '{value} ℃'
                      }
                    },
                    {
                      type: 'value',
                      name: '电量',
                      splitNumber: 4,
                      position: 'right',
                      offset: 0,
                      splitLine: {
                        show: true,
                        lineStyle: {
                          color: "#727483",
                          width: 0.5,
                          type: "dashed",
                        }
                      },
                      axisTick: {
                        show: false
                      },
                      axisLine: {
                        onZero: true,
                        lineStyle: {
                          color: "#008acd"
                        }
                      },
                      nameTextStyle: {
                        color: "#fff",
                        fontSize: 14,
                        verticalAlign: "bottom",
                      },
                      axisLabel: {
                        color: "#727483",
                        formatter: '{value}'
                      }
                    }
                  ],
                  series: [
                    {
                      name: this.coldStorage.name,
                      type: 'line',
                      symbol: "circle",
                      size: 6,
                      smooth: 0.3,
                      data: this.coldStorage.value
                    },
                    {
                      name: this.freeze.name,
                      type: 'line',
                      symbol: "diamond",
                      size: 6,
                      data: this.freeze.value
                    },
                    {
                      name: this.electric.name,
                      type: 'line',
                      smooth: 0.3,
                      size: 6,
                      yAxisIndex: 1,
                      data: this.electric.value
                    }
                  ]
                }
              )
            },
            err => {
              console.log(err);
            });
        }
      }
    }
  }
</script>

<style scoped>
  .temperature {
    display: inline-block;
    float: left;
    margin: .10rem;
    padding: 0;
    width: 9.90rem;
    height: 3.60rem;
    background: #343743;
  }

  .temperature .top {
    border-bottom: 1px solid #5b5f66;
  }

  .temperature .top h4 {
    color: #fff;
    font-size: .18rem;
    line-height: .50rem;
    margin: 0;
    padding-left: .20rem;
  }
</style>
