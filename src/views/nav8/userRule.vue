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
        <el-table-column prop="oil_92" label="92#优惠规则" width="150">
        </el-table-column>
        <el-table-column prop="oil_95" label="95#优惠规则" width="150">
        </el-table-column>
        <el-table-column prop="oil_98" label="98#优惠规则" width="150">
        </el-table-column>
        <el-table-column prop="oil_0" label="0#优惠规则" width="150">
        </el-table-column>
        <el-table-column prop="oil_10" label="-10#优惠规则" width="150">
        </el-table-column>
        <el-table-column prop="amount_start" label="起始金额" width="100">
        </el-table-column>
        <el-table-column prop="discount_type" label="优惠类型" width="150">
        </el-table-column>
        <el-table-column prop="discount_date_start" label="开始时间"  width="180">
        </el-table-column>
        <el-table-column prop="discount_date_end" label="结束时间" width="180">
        </el-table-column>
        <el-table-column prop="discount_days" label="优惠天数" width="150">
        </el-table-column>
        <el-table-column prop="is_overlay" label="是否可叠加" width="150">
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
  import { userRule,getProvince, getStationList } from '../../api/api';
  import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return {
        province_id: '',
        provinces: [],
        station_id: '',
        station_site: [],
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
        this.getList(this.province_id,this.station_id,this.card_no,this.page_num,this.num);
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
      getList: function(province_id,station_id,card_no,page_num,num) {
        let params = {
          province_id: province_id,
          station_id: station_id,
          card_no: card_no,
          page_num: page_num,
          num: num
        }
        userRule(params).then(res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.user_discount_list;
            this.total = res.data.data.user_discount_cnt;
          }else{
            messageWarn(res.data.msg);
          }
        })
      },
      handleCurrentChange(val) {
        this.page_num = val;
        this.getList(this.province_id,this.station_id,this.card_no,this.page_num,this.num);
      },
      search() {
        this.getList(this.province_id,this.station_id,this.card_no,this.page_num,this.num);
      },
      //导出表格
      outExcelTable() {
        let data = '&card_no='+ this.card_no + '&province_id=' + this.province_id + '&station_id=' + this.station_id; 
        window.open(this.GLOBAL.url + '/backen/dev/discount/users?act=export'+data, '_blank');
      }
    }
  }

</script>