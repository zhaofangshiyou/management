<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="卡号">
                    <el-input v-model="card_no" placeholder="请输入卡号"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
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
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="open_id" label="open_id" width="200">
        </el-table-column>
        <el-table-column prop="card_no" label="卡号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="id_card" label="身份证" width="150">
        </el-table-column>
        <el-table-column prop="sex_name" label="性别">
        </el-table-column>
        <el-table-column prop="car_type" label="车型信息" width="150">
        </el-table-column>
        <el-table-column prop="car_num" label="车牌" width="150">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="150">
        </el-table-column>
        <el-table-column prop="total_vol" label="加油升数" width="100">
        </el-table-column>
        <el-table-column prop="welfare_amount" label="公益金">
        </el-table-column>
        <el-table-column prop="score" label="积分">
        </el-table-column>
        <el-table-column prop="created_at" label="开卡时间" width="180">
        </el-table-column>
        <el-table-column prop="deleted_at" label="锁户时间" width="180">
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
  import { getWxUser } from '../../api/api';
  import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return { 
        card_no: '',
        mobile: '',
        listLoading: false,
        initList: [],
        total: 0,
        page_num: 1,
        num: 15
      }
    },
    created: function() {
      this.getList(this.card_no,this.mobile,this.page_num,this.num);
    },
    methods: {
      getList: function(card_no,mobile,page_num,num) {
        let params = {
          card_no: card_no,
          mobile: mobile,
          page_num: page_num,
          num: num
        }
        getWxUser(params).then(res => {
          if(res.data.status === 0) {
            this.initList = res.data.data.user_list;
            this.total = res.data.data.user_list_cnt;
          }else{
            messageWarn(res.data.msg);
          }
        })
      },
      handleCurrentChange(val) {
        this.page_num = val;
        this.getList(this.card_no,this.mobile,this.page_num,this.num);
      },
      search() {
        this.getList(this.card_no,this.mobile,this.page_num,this.num);
      },
      //导出表格
      outExcelTable() {
        let data = '&card_no='+ this.card_no + '&mobile=' + this.mobile; 
        window.open(this.GLOBAL.url + '/backen/users/wx/list?act=export'+data, '_blank');
      }
    }
  }

</script>