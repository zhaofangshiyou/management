<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="省份">
                  <el-select v-model="province_id"  clearable placeholder="请选择省份" @change="selectSite($event)">
                        <el-option
                        v-for="item in provinces"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="站点名称">
                  <el-select v-model="station_id"  clearable placeholder="请选择站点名称">
                        <el-option
                        v-for="item in station_site"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="卡号">
                    <el-input v-model="card_no" placeholder="请输入卡号"></el-input>
                </el-form-item>
                <el-form-item label="支付金额">
                    <el-input v-model="money" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:click="search">查询</el-button>
                </el-form-item>
			</el-form>
		</el-col>

     <!--列表-->
    <el-col :span="24" class="tab_header">
        <div class="tab_head_title">用户列表</div>
        <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
    <el-table :data="initList" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="80">
        </el-table-column>
        <el-table-column prop="card_no" label="卡号" width="200">
        </el-table-column>
        <el-table-column prop="station_id" label="站点ID" width="100">
        </el-table-column>
        <el-table-column prop="station_name" label="站点名称" width="150">
        </el-table-column>
        <el-table-column prop="trade_no" label="流水号" width="180">
        </el-table-column>
        <el-table-column prop="cc_flow_id" label="中控流水号" width="150">
        </el-table-column>
        <el-table-column prop="pay_status_name" label="支付状态" width="150">
        </el-table-column>
        <el-table-column prop="mount" label="订单金额" width="150">
        </el-table-column>
        <el-table-column prop="pay_mount" label="支付金额" width="150">
        </el-table-column>
        <el-table-column prop="good_name" label="油品类型" width="100">
        </el-table-column>
        <el-table-column prop="price" label="油品价格" width="150">
        </el-table-column>
        <el-table-column prop="discount" label="优惠金额"  width="150">
        </el-table-column>
        <el-table-column prop="amount" label="升数" width="100">
        </el-table-column>
        <el-table-column prop="gun_id" label="枪号" width="100">
        </el-table-column>
        <el-table-column prop="oil_id" label="油品ID" width="100">
        </el-table-column>
        <el-table-column prop="come_channel" label="用户来源" width="150">
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间" width="180">
        </el-table-column>
        <el-table-column prop="deleted_at" label="删除时间" width="180">
        </el-table-column>
    </el-table>
    
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="num" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>

<script>
  import { tempOrder,getProvince, getStationList } from '../../api/api';
  import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return {
        province_id: '',
        provinces: [],
        station_id: '',
        station_site: [],
        money: '',
        card_no: '',
        listLoading: false,
        initList: [],
        total: 0,
        page_num: 1,
        num: 15
      }
    },
    created: function() {
        this.getProvince();
        this.getList(this.province_id,this.station_id,this.card_no,this.page_num,this.num,this.money);
    },
    methods: {
        //获取省份
      getProvince: function() {
        getProvince().then(res => {
          if(res.data.status === 0) {
            this.provinces = res.data.data.provinces;
          }
        })
      },
      selectSite: function(event) {
        this.station_site.length = 0;
        this.station_id = '';
        let params = {
          province_id: event
        }
        getStationList(params).then(res => {
          if(res.data.status === 0) {
            this.station_site = res.data.data.station_site;
          }
        })
      },
      getList: function(province_id,station_id,card_no,page_num,num,money) {
        let params = {
          province_id: province_id,
          station_id: station_id,
          card_no: card_no,
          money: money,
          page_num: page_num,
          num: num
        }
        tempOrder(params).then(res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.orders_list;
            this.total = res.data.data.orders_cnt;
          }else{
            messageWarn(res.data.msg);
          }
        })
      },
      handleCurrentChange(val) {
        this.page_num = val;
        this.getList(this.province_id,this.station_id,this.card_no,this.page_num,this.num,this.money);
      },
      search() {
        this.getList(this.province_id,this.station_id,this.card_no,this.page_num,this.num,this.money);
      },
      //导出表格
      outExcelTable() {
        let data = '&card_no='+ this.card_no + '&province_id=' + this.province_id + '&station_id=' + this.station_id + '&money=' + this.money; 
        window.open(this.GLOBAL.url + '/backen/dev/orders?act=export'+data, '_blank');
      }
    }
  }

</script>