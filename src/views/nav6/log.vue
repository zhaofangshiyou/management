<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
        <el-form-item label="时间">
            <el-date-picker
                v-model="time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="账号">
              <el-input v-model="account" placeholder="请选择"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
			</el-form>
		</el-col>

     <!--列表-->
     <el-col :span="24" class="tab_header">
        <div class="tab_head_title">消费列表</div>
        <el-button type="success" size="small" @click="outExcelTable">&nbsp;&nbsp;导出&nbsp;&nbsp;</el-button>
    </el-col>
		<el-table :data="initList" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" label="序号" width="100">
			</el-table-column>
			<el-table-column prop="login" label="账号">
			</el-table-column>
			<el-table-column prop="name" label="操作员名称">
			</el-table-column>
			<el-table-column prop="role_name" label="操作员角色">
			</el-table-column>
			<el-table-column prop="ip" label="IP地址">
			</el-table-column>
			<el-table-column prop="obj" label="操作内容">
			</el-table-column>
      <el-table-column prop="created_at" label="操作时间">
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
  import { log } from '../../api/api';
	import { messageWarn } from '../../common/js/commonMethod';
  export default {
    data() {
      return {
        listLoading: false,
        time: [],
        initList: [],
        total: 0,
        begin_time: '',
        end_time: '',
        account: '',
        page_num: 1,
        num: 15,
      }
    },
    created: function() {
        this.getList(this.begin_time,this.end_time,this.account,this.page_num,this.num);
    },
    methods: {
      search: function() {
        this.begin_time = "";
        this.end_time = "";
        if(this.time[0]) {
          let begin_date = new Date(this.time[0]);
          this.begin_time = begin_date.getFullYear() + '-' + (begin_date.getMonth() + 1) + '-' + begin_date.getDate() + ' ' + begin_date.getHours() + ':' + begin_date.getMinutes() + ':' + begin_date.getSeconds(); 
        }
        if(this.time[1]) {
          let end_date = new Date(this.time[1]);
          this.end_time = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate() + ' ' + end_date.getHours() + ':' + end_date.getMinutes() + ':' + end_date.getSeconds(); 
        }
        this.getList(this.begin_time,this.end_time,this.account,this.page_num,this.num);
      },
      handleCurrentChange: function(val) {
        this.page_num = val;
        this.getList(this.begin_time,this.end_time,this.account,this.page_num,this.num);

      },

      getList: function(begin_time,end_time,account,page_num,num) {
        let params ={
          begin_time: begin_time,
          end_time: end_time,
          account: account,
          page_num: page_num,
          num: num
        }
        log(params).then( res=> {
          if(res.data.status === 0) {
            this.initList = res.data.data.log_list;
            this.total = res.data.data.log_cnt;
          }else{
            messageWarn(res.data.msg);
          }
        })
      },
      //导出表格
      outExcelTable() {
        let data = '&begin_time='+ this.begin_time + '&end_time=' + this.end_time + '&login=' + this.account; 
        window.open(this.GLOBAL.url + '/backen/dev/logs?act=export'+data, '_blank');
      }
    }
  }

</script>