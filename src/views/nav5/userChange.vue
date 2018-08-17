<template>
    <section>
        <!--工具条-->
  <el-row>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
            <el-form-item label="手机号">
                <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  v-on:click="handleSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success"  v-on:click="handleBind">绑定</el-button>
            </el-form-item>
			</el-form>
		</el-col>
  </el-row>

        <!--列表-->
        <el-col :span="24">
            <h4>信息列表</h4>
        </el-col>

        <el-row  :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="card_title">公众号信息</span>
                    </div>
                    <div class="card_item" v-for="item in gzh_ret"  v-show="gzh_ret.length > 0">
                        <div>卡号：{{item.cardno}}</div>
                        <div>卡内余额：<span class="money_color">{{item.balance}}</span>元</div>
                    </div>
                    <div class="card_item">
                        <div>姓 名：{{zh_gzh_name}}</div>
                    </div>
                    <div class="card_item">
                        <div>手机号：{{zh_gzh_phone}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="card_title">小程序信息</span>
                    </div>
                    <div class="card_item" v-if="xcx_ret.length > 0">
                        <div>卡号：{{xcx_ret[0].card_no}}</div>
                        <div>卡内余额：<span class="money_color">{{xcx_ret[0].person_balance}}</span>元</div>
                    </div>
                    <div class="card_item">
                        <div>姓 名：{{zh_xcx_name}}</div>
                    </div>
                    <div class="card_item">
                        <div>手机号：{{zh_xcx_phone}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <!--列表-->

    </section>
</template>

<script>
import { getExchangeMess,exchangeBind } from '../../api/api';
import { messageWarn } from '../../common/js/commonMethod';

    export default {
        data() {
            return {
                mobile: "",
                gzh_ret: [],
                xcx_ret: [],
                zh_gzh_name: '-',
                zh_xcx_name: '-',
                zh_gzh_phone: '-',
                zh_xcx_phone: '-'
            }
        },
        methods: {
           handleBind: function() {
             let cardno = this.gzh_ret.map((item) => {
               return item.cardno;
             })
             let cards = JSON.stringify(cardno);
             let params = {
               phone: this.mobile,
               cards: cards
             }
             exchangeBind(params).then((res) => {
               if(res.data.status === 0) {
                 messageWarn('绑定成功');
                 this.handleSearch();
               }
             })
           },
           handleSearch: function() {
             let params = {
               phone: this.mobile
             }
             getExchangeMess(params).then(res => {
              if(res.data.status === 0) {
                this.gzh_ret = res.data.data.gzh_ret;
                if(this.gzh_ret.length > 0) {
                  this.zh_gzh_name = this.gzh_ret[0].icusername;
                  this.zh_gzh_phone = this.gzh_ret[0].ContactTelep;
                }
                this.xcx_ret = res.data.data.xcx_ret;
                if(this.xcx_ret.length > 0) {
                  this.zh_xcx_name = this.xcx_ret[0].name;
                  this.zh_xcx_phone = this.xcx_ret[0].mobile;
                }
              }else{
                messageWarn(res.data.msg);
              }
            })
           }
        }
    }

</script>
<style>
    .card_item{
        padding: 20px 20px 20px 0;
        margin-left: 20px;
        border-bottom: 1px solid #E0E0E0;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        display: flex;
        justify-content: space-between;
    }
    .card_item:first-child{
        padding-top: 0;
    }
    .card_item:last-child{
        margin-bottom: 36px;
    }
    .money_color{
      color: #D71820;
    }
    .money{
        font-size:28px;
        font-family:PingFangSC-Regular;
        color:rgba(33,43,54,1);
    }
    .card_title{
        font-size:16px;
        font-family:PingFangSC-Medium;
        color:rgba(82,141,255,1);
    }
    .el-card__body{
        padding: 20px 0;
    }
</style>


