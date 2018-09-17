<template>
  <div class="seating-map">
    <div class="map-wrap">
      <div class="map-left-wrap">
        <h1 class="map-select-wrap set-header-bg">仓位图工具</h1>
        <div class="Graphical-wrap">
          <el-row>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="graphicTable">
                <i class="iconfont item-icon icon-biaoge1"></i>
              </div>
              <p>绘制表格</p>
            </el-col>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawArea">
                <!--<i class="iconfont item-icon icon-zuowei2"></i>-->
                <span class="item-area"></span>
              </div>
              <p>区域</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('row')">
                <span class="item-area"></span>
              </div>
              <p>横过道</p>
            </el-col>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('col')">
                <span class="item-area" style="padding: 20px 20px;"></span>
              </div>
              <p>纵过道</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('room')" v-if="form.radio == 'room'">
                <i class="iconfont item-icon icon-fangjian"></i>
              </div>
              <div class="item-wrap" v-else>
                <i class="iconfont item-icon icon-fangjian"></i>
              </div>
              <p>房间</p>
            </el-col>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('toilet')">
                <i class="iconfont item-icon icon-weishengjian"></i>
              </div>
              <p>卫生间</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('exit')">
                <i class="iconfont item-icon icon-chukou"></i>
              </div>
              <p>出口</p>
            </el-col>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('entrance')">
                <i class="iconfont item-icon icon-rukou"></i>
              </div>
              <p>入口</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('seat')" v-if="form.radio == 'seat'">
                <i class="iconfont item-icon icon-zuowei2"></i>
              </div>
              <div class="item-wrap" v-else>
                <i class="iconfont item-icon icon-zuowei2"></i>
              </div>
              <p>座椅</p>
            </el-col>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('badSeat')" v-if="form.radio == 'seat'">
                <i class="iconfont item-icon icon-seat-due2"></i>
              </div>
              <div class="item-wrap" v-else>
                <i class="iconfont item-icon icon-seat-due2"></i>
              </div>
              <p>损坏座椅</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('shop')">
                <i class="iconfont item-icon icon-xiaomaibu"></i>
              </div>
              <p>小卖部</p>
            </el-col>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('animal')">
                <span class="item-des">宠物区</span>
              </div>
              <!--<p>宠物区</p>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('bag')">
                <span class="item-des">行李区</span>
              </div>
              <!--<p>行李区</p>-->
            </el-col>
            <el-col class="Graphical-item" :span="12">
              <div class="item-wrap" @click="drawItem('text')">
                <span class="item-des">文本区</span>
              </div>
              <!--<p>文本输入</p>-->
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="map-right-wrap" id="mapWrap">
        <div class="map-control-wrap" id="mapControlBtn">
          <el-button type="primary" size="mini" :round="true" @click="saveImg">保存图片</el-button>
          <el-button type="primary" size="mini" :round="true" @click="clearCanvas">清空画布</el-button>
          <el-button type="primary" size="mini" :round="true" @click="clearEle(pX, pY)">删除元素</el-button>
          <el-button type="primary" size="mini" :round="true" @click="submitSeat">提交</el-button>
        </div>
        <div class="detail-right-wrap">
          <ul class="seat-index" id="seatIndex">
            <li v-for="item in indexList" :key="item.index" @click="changeNum(item)">{{item}}</li>
          </ul>
          <ul class="seat-letter" id="seatLetter">
            <li v-for="item in letterList" :key="item.index" @click="changeLetter(item)">{{item}}</li>
          </ul>
          <canvas id="seatMap">你的浏览器不支持canvas,请升级你的浏览器</canvas>
        </div>
        <!--<img :src="saveImgUrl" alt="">-->
        <!--<a :download="saveImgUrl" :href="saveImgUrl"></a>-->
      </div>
    </div>
    <!--填写座位弹窗-->
    <el-dialog title="绘制条件" :visible.sync="dialogFormVisible" :center="true" width="25%">
      <el-form :model="form">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio" @change="radioStatus">
            <el-radio :label="'seat'">座位图</el-radio>
            <el-radio :label="'room'">房间图</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="列数" :label-width="formLabelWidth">
          <el-input class="select-input" v-model="form.row" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="行数" :label-width="formLabelWidth">
          <el-input class="select-input" v-model="form.col" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="drawTabel">确 定</el-button>
      </div>
    </el-dialog>
    <!--绘制区域弹窗-->
    <el-dialog title="区域范围" :visible.sync="areaVisible" :center="true" width="25%">
      <el-form :model="areaForm">
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input class="select-input" v-model="areaForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="列数" :label-width="formLabelWidth">
          <el-input class="select-input" v-model="areaForm.col" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="行数" :label-width="formLabelWidth">
          <el-input class="select-input" v-model="areaForm.row" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="背景色" :label-width="formLabelWidth">
          <el-select v-model="queryColor">
            <el-option v-for="item in colorList" :key="item.value" :value="item.label" :label="item.label" class="set-flex"><p class="selectColor" :style="{backgroundColor: item.label}"></p><span>{{item.label}}</span></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="areaVisible = false">取 消</el-button>
        <el-button @click="sureDrawArea">确 定</el-button>
      </div>
    </el-dialog>
    <!--绘制座椅弹窗-->
    <!--<el-dialog title="座位添加" :visible.sync="seatVisible" :center="true" width="25%">-->
    <!--<el-form :model="seatForm">-->
    <!--<el-form-item label="座位" :label-width="formLabelWidth">-->
    <!--<el-radio-group v-model="seatForm.radio" @change="seatRadioStatus">-->
    <!--<el-radio :label="'1'">单个</el-radio>-->
    <!--<el-radio :label="'2'">多个</el-radio>-->
    <!--</el-radio-group>-->
    <!--</el-form-item>-->
    <!--<div v-if="seatForm.seatStatus">-->
    <!--<el-form-item label="列数" :label-width="formLabelWidth">-->
    <!--<el-input class="select-input" v-model="seatForm.col" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="行数" :label-width="formLabelWidth">-->
    <!--<el-input class="select-input" v-model="seatForm.row" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="" :label-width="formLabelWidth">-->
    <!--<span>最多不超过{{areaForm.row - 1}}行，{{areaForm.col}}列</span>-->
    <!--</el-form-item>-->
    <!--</div>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="seatVisible = false">取 消</el-button>-->
    <!--<el-button @click="sureDrawSeat">确 定</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  export default {
    name: 'seatingMap',
    data () {
      return {
        colorList: [
          {
            value: '01',
            label: '#409EFF'
          },
          {
            value: '02',
            label: '#67C23A'
          },
          {
            value: '03',
            label: '#E6A23C'
          },
          {
            value: '04',
            label: '#F56C6C'
          },
          {
            value: '05',
            label: '#909399'
          }
        ],
        queryColor: '#409EFF',
        dialogFormVisible: false, // 绘制表格弹窗
        areaVisible: false, // 绘制区域弹窗
        seatVisible: false, // 绘制座椅弹窗
        form: {
          name: '',
          row: null,
          col: null,
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          radio: 'seat', // 创建表格条件
          checkList: []
        },
        areaForm: { // 绘制区域表单
          name: '',
          row: '',
          col: '',
          color: ''
        },
        seatForm: { // 绘制座位表单
          seatStatus: false, // 生成座位单个多个
          row: null,
          col: null,
          radio: '1'
        },
        formLabelWidth: '80px',
        canvas: null, // canvas容器
        num: 1, // 计数
        positionList: [], // 坐标列表
        deleteList: [], // 删除列表
        pX: null, // 元素横坐标
        pY: null, // 元素纵坐标
        oldX: null, // 旧元素x坐标
        oldY: null, // 旧元素y坐标
        indexList: [], // 序号数组
        letterList: [], // 字母数组
        changeText: null, // 改变的文字
        saveImgUrl: '',
        clickX: null, // 点击时的X坐标
        clickY: null, // 点击时的Y坐标
        areaX: null, // 区域X坐标
        areaY: null, // 区域Y坐标
        seatData: {
          title: null,
          type: 'table',
          status: 0,
          tableRow: null,
          tableCol: null,
          rectWidth: 50,
          rectHeight: 50,
          width: null,
          height: null,
          item: [], // 元素部分
          x: 0,
          y: 0,
          endX: null,
          endY: null
        }, // 座位数据
        areaName: '', // 添加座位时用来判断所属区域
        areaStatus: false, // 判断是否是在区域内
        repect: false, // 判断元素是否重复
        repectNum: null, // 判断元素是否重复
        itemStatus: false,
        outerStatus: false
      }
    },
    methods: {
      radioStatus () {
        console.log(this.form.radio)
      },
      graphicTable () { // 打开表格弹窗
        this.dialogFormVisible = !this.dialogFormVisible
        this.form.row = null
        this.form.col = null
      },
      drawTabel () { // 绘制表格
        let _this = this
        let rectW = 50
        let rectH = 50
        this.canvas = document.getElementById('seatMap')
        let ctx = this.canvas.getContext('2d')
        this.canvas.width = rectW * this.form.row
        this.canvas.height = rectH * this.form.col
        this.canvas.style.border = '1px solid #ccc'
        /* 绘制座位图 */
        for (let i = 0; i < this.form.row; i++) {
          for (let j = 0; j < this.form.col; j++) {
            ctx.strokeStyle = '#F6F6F6'
            ctx.strokeRect(i * rectW, j * rectW, rectW, rectH)
            let p = {
              x: i * rectW,
              y: j * rectH,
              endx: (i + 1) * rectW,
              endy: (j + 1) * rectH,
              rowName: '',
              colName: '',
              row: this.form.row,
              col: this.form.col,
              img: '',
              type: '',
              id: '',
              status: null,
              name: '',
              width: 50,
              height: 50,
              borderColor: '',
              fontColor: '',
              fontSize: '',
              textX: null,
              textY: null
            }
            this.positionList.push(p)
          }
        }
        ctx.stroke()
        /* 表格数据增加 */
        this.seatData.title = '座位图'
        this.seatData.width = _this.form.row * rectW
        this.seatData.height = _this.form.col * rectH
        this.seatData.tableRow = Number(_this.form.row)
        this.seatData.tableCol = Number(_this.form.col)
        this.seatData.endX = rectW * _this.form.row
        this.seatData.endY = rectH * _this.form.col
        this.dialogFormVisible = false // 关闭弹窗
        /* 绘制标记 */
        this.drawIndex(this.form.row, this.form.col)
        /* 每个canvas元素点击 */
        this.watchClick()
      },
      drawIndex (row, col) { // 绘制序号
        this.indexList = []
        this.letterList = []
        for (let i = 1; i <= col; i++) {
          this.indexList.push(String(i + '排'))
        }
        for (let j = 0; j < row; j++) {
          this.letterList.push(String.fromCharCode(65 + j))
        }
      },
      watchClick () { // 监听canvas点击事件
        this.canvas.addEventListener('click', this.clickFn)
      },
      clickFn (e) {
        this.clearSelectRect()
        let p = this.getPosition(e)
        this.clickX = p.x
        this.clickY = p.y
        /* 监听并设置相应点击坐标 */
        for (let i = 0; i < this.positionList.length; i++) {
          if ((p.x >= this.positionList[i].x && p.x <= this.positionList[i].endx) && (p.y >= this.positionList[i].y && p.y <= this.positionList[i].endy)) {
            this.pX = this.positionList[i].x // 存储图片X坐标
            this.pY = this.positionList[i].y // 存储图片Y坐标
          }
          /* delete删除元素 */
          // window.onkeydown = (e) => {
          //   let ev = e || window.event
          //   if (ev.code === 'Backspace') {
          //     ctx.clearRect((_this.pX + 5), (_this.pY + 5), 40, 40)
          //     this.positionList[i].imgData.src = ''
          //     ctx.stroke()
          //   }
          // }
        }
        /* 创建选框 */
        this.createSelectRect(this.pX, this.pY, 40, 40)
        /* 监听并处理 */
        let data = this.seatData.item
        for (let i in data) {
          if (data[i].areaType === 'area') {
            if ((p.x >= data[i].title.x && p.x <= data[i].title.endX) && (p.y >= data[i].title.y && p.y <= data[i].title.endY)) {
              this.clearSelectRect()
              this.createSelectRect(data[i].x - 5, data[i].y - 5, data[i].width, data[i].height)
              this.pX = null
              this.pY = null
              break
            }
            if ((p.x >= data[i].x && p.x <= data[i].endX) && (p.y >= data[i].y && p.y <= data[i].endY)) {
              this.areaName = this.seatData.item[i].title.name
              this.areaStatus = true
            }
          }
        }
      },
      drawArea () { // 绘制区域
        if (this.clickX && this.clickY) {
          this.areaVisible = true
          this.areaForm = {
            name: '',
            row: '',
            col: '',
            color: ''
          }
        } else {
          alert('请先选择起始位置')
        }
      },
      sureDrawArea () { // 确定绘制区域
        let canvas = document.getElementById('seatMap')
        let ctx = canvas.getContext('2d')
        ctx.strokeStyle = this.queryColor
        ctx.strokeRect(this.pX, this.pY, this.areaForm.col * 50, this.areaForm.row * 50)
        ctx.fillStyle = this.queryColor
        ctx.fillRect(this.pX, this.pY, this.areaForm.col * 50, 50)
        ctx.fillStyle = '#fff'
        ctx.font = '30px Arial'
        ctx.fillText(this.areaForm.name, this.pX + 20, this.pY + 35)
        ctx.fill()
        this.areaVisible = false
        /* 存储区域数据 */
        let data = {
          areaType: 'area',
          areaStatus: true,
          title: {
            name: this.areaForm.name,
            x: this.pX,
            y: this.pY,
            endX: this.pX + this.areaForm.col * 50,
            endY: this.pY + 50,
            width: this.areaForm.col * 50,
            height: 50
          },
          x: this.pX,
          y: this.pY,
          endX: this.pX + this.areaForm.col * 50,
          endY: this.pY + this.areaForm.row * 50,
          width: this.areaForm.col * 50,
          height: this.areaForm.row * 50,
          bgColor: this.queryColor,
          fontColor: this.queryColor,
          item: []
        }
        this.seatData.item.push(data)
        this.clickX = this.clickY = null
        this.clearSelectRect() // 清除选框
      },
      drawItem (type) {
        if (this.pX === null || this.pY === null) return
        let _this = this
        let ctx = this.canvas.getContext('2d')
        let params = { // 初始参数
          id: '',
          areaType: '',
          areaStatus: null,
          areaName: '',
          type: '',
          status: null,
          img: '',
          name: '',
          x: _this.pX + 5,
          y: _this.pY + 5,
          width: 40,
          height: 40,
          endX: _this.pX + 45,
          engY: _this.pY + 45,
          borderColor: '',
          fontColor: '#cccccc',
          fontSize: '12px arial',
          textX: _this.pX + 15,
          textY: _this.pY + 30
        }
        let img = new Image()
        /* 初始清空图形 */
        ctx.clearRect(this.pX + 5, this.pY + 5, 40, 40)
        if (type === 'row') {
          /* 数据处理 */
          params.id = ''
          params.type = 'rowWay'
          params.status = 0
          params.img = './static/seatMap/line.png'
          params.name = '过道'
          /* 插入处理 */
          img.src = './static/seatMap/line.png'
          ctx.fillStyle = params.fontColor
          ctx.font = params.fontSize
          ctx.fillText(params.name, params.textX, params.textY)
        } else if (type === 'col') {
          /* 数据处理 */
          params.id = ''
          params.type = 'colWay'
          params.status = 1
          params.img = './static/seatMap/colLine.png'
          params.name = '过道'
          /* 插入处理 */
          img.src = './static/seatMap/colLine.png'
          ctx.fillStyle = params.fontColor
          ctx.font = params.fontSize
          ctx.fillText(params.name, params.textX, params.textY)
        } else if (type === 'room') {
          this.$prompt('请输入房间号', {
            center: true,
            inputValue: '房间',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            /* 数据处理 */
            params.id = ''
            params.type = 'room'
            params.status = 0
            params.img = './static/seatMap/room.png'
            params.name = value
            params.fontColor = '#000'
            params.fontSize = '10px arial'
            /* 插入处理 */
            img.src = './static/seatMap/room.png'
            ctx.fillStyle = params.fontColor
            ctx.font = params.fontSize
            ctx.fillText(params.name, params.textX - 10, params.textY - 15)
          }).catch(() => {})
        } else if (type === 'toilet') {
          /* 数据处理 */
          params.id = ''
          params.type = 'toilet'
          params.status = 3
          params.img = './static/seatMap/toilet.png'
          params.name = '卫生间'
          /* 插入处理 */
          img.src = './static/seatMap/toilet.png'
        } else if (type === 'exit') {
          img.src = './static/seatMap/exit.png'
          params.id = ''
          params.type = 'exit'
          params.status = 4
          params.img = './static/seatMap/exit.png'
          params.name = '出口'
        } else if (type === 'entrance') {
          img.src = './static/seatMap/entrance.png'
          params.id = ''
          params.type = 'entrance'
          params.status = 5
          params.img = './static/seatMap/entrance.png'
          params.name = '入口'
        } else if (type === 'seat') {
          img.src = './static/seatMap/seat2.png'
          this.seatVisible = false // 关闭弹窗
          /* 数据处理 */
          params.id = ''
          params.type = 'seat'
          params.status = 6
          params.img = './static/seatMap/seat2.png'
          params.name = '待选座位'
        } else if (type === 'badSeat') {
          img.src = './static/seatMap/sunhuaiZW.png'
          params.id = ''
          params.type = 'badSeat'
          params.status = 7
          params.img = './static/seatMap/sunhuaiZW.png'
          params.name = '损坏座椅'
        } else if (type === 'shop') {
          /* 数据处理 */
          params.id = ''
          params.type = 'shop'
          params.status = 8
          params.name = '小卖部'
          params.borderColor = '#f49f4c'
          params.textX = _this.pX + 5
          /* 插入处理 */
          ctx.strokeStyle = params.borderColor
          ctx.strokeRect(_this.pX + 5, _this.pY + 5, 40, 40)
          ctx.fillStyle = params.fontColor
          ctx.font = params.fontSize
          ctx.fillText(params.name, params.textX, params.textY)
        } else if (type === 'animal') {
          /* 数据处理 */
          params.id = ''
          params.type = 'animal'
          params.status = 9
          params.img = './static/seatMap/animal.png'
          params.name = '宠物区'
          params.fontColor = '#000'
          params.textX = _this.pX + 5
          /* 插入处理 */
          ctx.fillStyle = params.fontColor
          ctx.font = params.fontSize
          ctx.fillText(params.name, params.textX, params.textY)
          img.src = './static/seatMap/animal.png'
        } else if (type === 'bag') {
          /* 数据处理 */
          params.id = ''
          params.type = 'bag'
          params.status = 10
          params.img = './static/seatMap/bag1.png'
          params.name = '行李区'
          params.fontColor = '#000'
          params.textX = _this.pX + 5
          /* 插入处理 */
          img.src = './static/seatMap/bag1.png'
          ctx.fillStyle = params.fontColor
          ctx.font = params.fontSize
          ctx.fillText(params.name, params.textX, params.textY)
        } else if (type === 'text') {
          alert('文本区')
          params.id = ''
          params.type = 'text'
          params.status = 0
          params.img = './static/seatMap/line.png'
          params.name = '文本区'
        }
        ctx.fill()
        img.onload = function () {
          ctx.drawImage(img, _this.pX + 5, _this.pY + 5, 40, 40)
        }
        /* 数据处理 */
        /* 判断是否在区域内 */
        let data = this.seatData.item
        if (this.areaStatus) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].areaType === 'area') {
              if (this.areaName === data[i].title.name) {
                if (data[i].item.length > 0) {
                  for (let j in data[i].item) {
                    if (this.pX + 5 === data[i].item[j].x && this.pY + 5 === data[i].item[j].y) {
                      params.areaName = this.areaName
                      data[i].item[j] = params
                      this.itemStatus = true
                      break
                    }
                  }
                  if (!this.itemStatus) {
                    params.areaName = this.areaName
                    data[i].item.push(params)
                  }
                  this.itemStatus = false
                } else {
                  params.areaName = this.areaName
                  data[i].item.push(params)
                }
              }
            }
          }
        } else {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (this.pX + 5 === data[i].x && this.pY + 5 === data[i].y) {
                params.areaName = this.areaName
                data[i] = params
                this.outerStatus = true
                break
              }
            }
            if (!this.outerStatus) {
              params.areaType = 'outerArea'
              params.areaStatus = false
              data.push(params)
            }
            this.outerStatus = false
          } else {
            params.areaType = 'outerArea'
            params.areaStatus = false
            data.push(params)
          }
        }
        this.seatData.item = data
        this.areaStatus = false
      },
      getPosition (ev) { // 获取坐标函数
        let x, y
        if (ev.layerX || ev.layerX === 0) {
          x = ev.layerX
          y = ev.layerY
        } else if (ev.offsetX || ev.offsetX === 0) {
          x = ev.offsetX
          y = ev.offsetY
        }
        return {x: x, y: y}
      },
      changeNum (item) { // 改变index
        this.$prompt('请输入', {
          center: true,
          inputValue: item,
          inputPattern: /\S/,
          inputErrorMessage: '不能为空，若没有请用"无"代替',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let list = this.indexList
          for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
              this.$set(this.indexList, i, value)
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      changeLetter (item) { // 改变字母
        this.$prompt('请输入', {
          center: true,
          inputValue: item,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let list = this.letterList
          for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
              this.$set(this.letterList, i, value)
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      saveImg () { // 保存图片
        // this.saveImgUrl = this.canvas.toDataURL('image/png')
      },
      clearCanvas () { // 清空画布操作
        this.pX = null
        this.pY = null
        this.clickX = null
        this.clickY = null
        this.seatData.item = []
        this.clearSelectRect() // 清除选框
        this.drawTabel()
      },
      clearEle (x, y) { // 删除画布元素
        let canvas = document.getElementById('seatMap')
        let ctx = canvas.getContext('2d')
        /* 删除元素 */
        if (x !== null || y !== null) {
          /* 删除区域内元素 */
          if (this.areaStatus) {
            for (let i = 0; i < this.seatData.item.length; i++) {
              if (this.seatData.item[i].areaType === 'area') {
                if (this.areaName === this.seatData.item[i].title.name) {
                  for (let j in this.seatData.item[i].item) {
                    if (x + 5 === this.seatData.item[i].item[j].x && y + 5 === this.seatData.item[i].item[j].y) {
                      this.seatData.item[i].item.splice(j, 1)
                      ctx.clearRect(x + 5, y + 5, 40, 40)
                    }
                  }
                }
              }
            }
          } else {
            /* 删除区域外元素 */
            for (let i = 0; i < this.seatData.item.length; i++) {
              if (x + 5 === this.seatData.item[i].x && y + 5 === this.seatData.item[i].y) {
                this.seatData.item.splice(i, 1)
                ctx.clearRect(x + 5, y + 5, 40, 40)
              }
            }
          }
        }
      },
      submitSeat () { // 提交数据
        console.log(this.seatData)
        sessionStorage.seatJson = JSON.stringify(this.seatData)
        this.clearSelectRect() // 清除选框
      },
      createSelectRect (x, y, w, h) { // 创建选框
        let sD = document.getElementById('selectDiv')
        let oMap = document.getElementById('mapWrap')
        if (sD) {
          oMap.removeChild(sD)
        }
        let oDiv = document.createElement('div')
        oDiv.id = 'selectDiv'
        oDiv.style.border = '1px dashed red'
        oDiv.style.width = w + 'px'
        oDiv.style.height = h + 'px'
        oDiv.style.position = 'absolute'
        oDiv.style.top = y + 95 + 'px'
        oDiv.style.left = x + 55 + 'px'
        oMap.appendChild(oDiv)
      },
      clearSelectRect () { // 清除选框
        let sD = document.getElementById('selectDiv')
        let oMap = document.getElementById('mapWrap')
        if (sD) {
          oMap.removeChild(sD)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .map-wrap {
    display: flex;
  }
  .map-left-wrap {
    background-color: #ccc;
    width: 250px;
    height: 100%;
    .map-select-wrap {
      height: 40px;
      line-height: 40px;
      font-weight: normal;
      color: #fff;
      background-color: #008dc4;
    }
    .Graphical-wrap {
      background-color: #f9f9f9;
      position: relative;
      width: 250px;
    }
    .Graphical-item {
      padding: 10px;
      box-sizing: border-box;
    }
    .item-wrap {
      display: block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      margin: 0 auto;
      font-size: 14px;
      cursor: pointer;
    }
    .item-icon {
      font-size: 40px;
      font-weight: normal;
    }
    .item-area {
      border: 1px solid #000;
      padding: 10px 30px;
    }
    .item-des {
      padding: 10px 5px;
      border: 1px solid #000;
    }
  }
  .map-right-wrap {
    margin-left: 15px;
    flex-grow: 1;
    text-align: left;
    background-color: #fff;
    position: relative;
    .map-control-wrap {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-bottom: 1px dashed #ccc;
      box-sizing: border-box;
      text-align: right;
    }
    .detail-right-wrap {
      position: relative;
    }
    #seatMap {
      margin-left: 50px;
      margin-top: 50px;
    }
    .seat-index {
      position: absolute;
      left: 0;
      top: 50px;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 50px;
    }
    .seat-letter {
      position: absolute;
      left: 50px;
      top: 0;
      li {
        float: left;
        height: 50px;
        width: 50px;
        text-align: center;
        line-height: 50px;
      }
    }
  }
  .selectColor {
    height: 24px;
    margin: 5px;
    width: 50px;
    box-sizing: border-box;
  }
</style>
