<template>
  <div>
    <h1>jsPlumb</h1>
    --{{ JSON.stringify(productInfo) }}-- {{ $store.state.productInfo }}
    <button @click="clickBtn('Straight')">Straight</button>
    <button @click="clickBtn('Flowchart')">Flowchart</button>
    <button @click="clickBtn('Bezier')">Bezier</button>
    <button @click="clickBtn('StateMachine')">State machine</button>
    <div class="jsPlumbMain">
      <div class="jsPlumbDiv">
        <span id="A1">111</span><br /><br /><br />
        <span id="B1" style="float: right">222</span><br /><br /><br />
        <span id="B2">333</span><br /><br /><br />
        <span id="B3">444</span>
        <div id="A001" @click="clickLineChange()">点击删除虚线，添加为实线</div>
      </div>
      <div class="jsPlumbMap" id="canvas"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// https://www.cnblogs.com/leomYili/p/6346526.html
import { jsPlumb } from 'jsplumb';
let plumbIns = jsPlumb.getInstance();
const jsPlumbConfig = {
  Anchor: 'BottomCenter', //端点的定位点的位置声明（锚点）：left，top，bottom等
  Anchors: [null, null], //多个锚点的位置声明
  ConnectionsDetachable: true, //连接是否可以使用鼠标默认分离
  ConnectionOverlays: [], //附加到每个连接的默认重叠
  Connector: 'Bezier', //要使用的默认连接器的类型：折线，流程等
  Container: null, //设置父级的元素，一个容器
  DoNotThrowErrors: false, //如果请求不存在的Anchor，Endpoint或Connector，是否会抛出
  DragOptions: {}, //用于配置拖拽元素的参数
  DropOptions: {}, //用于配置元素的drop行为的参数
  Endpoint: 'Dot', //端点（锚点）的样式声明（Dot）
  Endpoints: [null, null], //多个端点的样式声明（Dot）
  EndpointOverlays: [], //端点的重叠
  EndpointStyle: { fill: '#456' }, //端点的css样式声明
  EndpointStyles: [null, null], //同上
  EndpointHoverStyle: null, //鼠标经过样式
  EndpointHoverStyles: [null, null], //同上
  HoverPaintStyle: null, //鼠标经过线的样式
  LabelStyle: { color: 'black' }, //标签的默认样式。
  LogEnabled: false, //是否打开jsPlumb的内部日志记录
  Overlays: [], //重叠
  MaxConnections: 1, //最大连接数
  PaintStyle: { lineWidth: 8, stroke: '#456' }, //连线样式
  ReattachConnections: false, //是否重新连接使用鼠标分离的线
  RenderMode: 'svg', //默认渲染模式
  Scope: 'jsPlumb_DefaultScope', //范围，标识
};
let self = this;
export default {
  data() {
    return {
      lineData: [
        {
          source: 'A1',
          target: 'B1',
        },
        {
          source: 'A1',
          target: 'B2',
        },
        {
          source: 'A1',
          target: 'B3',
        },
        {
          source: 'A001',
          target: 'A1',
        },
      ],
    };
  },
  mounted() {
    self = this;
    this.$nextTick(() => {
      this.init();

      this.changeProductInfo({
        domain: 'DOM-001',
        leafId: 'M007854',
      });
    });
  },
  computed: {
    ...mapState(['productInfo', 'piInfo']),
  },
  methods: {
    ...mapActions(['changeProductInfo', 'changePiInfo']),
    clickBtn(connectorType) {
      this.init(connectorType);
    },
    removePointLine() {
      let allLineArr = plumbIns.getAllConnections();
      if (allLineArr.length > 0) {
        allLineArr.forEach((item) => {
          plumbIns.deleteEveryConnection(item);
          plumbIns.deleteEveryEndpoint(item);
          plumbIns.remove(item);
        });
      }
    },
    clickLineChange() {
      console.log(self.productInfo, '============>>>');
      let connections = jsPlumb.$container;
      let Arr = [];
      /**
       * @connections 初始化添加的svg线
       * @deleteConnection 删除线的时候，必须同步删除  @connections  否则会到导致组件报错
       *
       */
      for (var i in connections) {
        if (connections[i].sourceId === 'A001') {
          plumbIns.deleteConnection(connections[i]);
        } else {
          Arr.push(connections[i]);
        }
      }
      jsPlumb.$container = Arr;

      plumbIns.connect({
        source: 'A001',
        target: 'A1',
        paintStyle: { stroke: 'red', strokeWidth: 3 },
        //   endpoint: ['Rectangle', { width: 1, height: 1 }],
        endpoint: ['Dot', { radius: 1 }],
        endpointStyle: {
          fill: 'lightgray',
          outlineStroke: 'darkgray',
          outlineWidth: 1,
        },
        Container: 'canvas',
        connector: ['Flowchart'],
        // anchor: ['Continuous', { faces: ['bottom', 'top'] }],
      });
    },
    init(connectorType) {
      this.removePointLine();
      plumbIns.reset();
      plumbIns.setContainer('canvas');
      jsPlumb.$container = [];
      this.lineData.forEach((item) => {
        /**
         * dashstyle: '2 4'  设置线条为虚线
         * overlays  线条覆盖物
         * anchor  节点划线的位置
         * @type Continuous: 自动选择点
         *
         */
        const line = plumbIns.connect({
          ...item,
          ...jsPlumbConfig,
          paintStyle: { stroke: 'blue', strokeWidth: 3, dashstyle: '2 4' },
          //   endpoint: ['Rectangle', { width: 1, height: 1 }],
          endpoint: ['Dot', { radius: 1 }],
          endpointStyle: {
            fill: 'lightgray',
            outlineStroke: 'darkgray',
            outlineWidth: 1,
          },
          Container: 'canvas',
          connector: [connectorType ? connectorType : 'Flowchart'],
          overlays: [
            ['Label', { id: item.source, location: 0.5, label: '5%' }],
          ],
          //   overlays: [['Arrow', { width: 12, length: 12, location: 0.5 }]],
          //   anchor: ['Continuous', { faces: ['bottom', 'top'] }],
          anchor: 'Continuous',
        });

        jsPlumb.$container.push(line);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.jsPlumbMain {
  height: 600px;
  width: 100%;
  position: relative;
  .jsPlumbDiv {
    position: absolute;
    top: 0;
    left: 0;
  }
  .jsPlumbMap {
    position: absolute;
    top: -177px;
    left: -221px;
  }
  #A1 {
    margin: 20px 120px;
    background: blue;
    border: 1px solid #e5e5e5;
    padding: 5px 12px;
    border-radius: 40px;
    text-align: center;
    width: 200px;
    height: 120px;
    line-height: 120px;
    color: white;
    display: block;
  }
  #A001 {
    border: 1px solid #e5e5e5;
    padding: 5px 12px;
    border-radius: 40px;
    text-align: center;
    margin: 50px 260px;
  }
}
</style>
