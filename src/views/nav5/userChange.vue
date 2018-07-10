<template>
    <section>
        <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
                <el-form-item label="手机号">
                <el-input v-model="phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  v-on:click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success"  v-on:click="search">绑定</el-button>
            </el-form-item>
			</el-form>
		</el-col>

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
                    <div class="card_item">
                        <div>卡内余额</div>
                        <div class="money">￥2000</div>
                    </div>
                    <div class="card_item">
                        <div>卡号：10035510541</div>
                    </div>
                    <div class="card_item">
                        <div>姓 名：兆小方</div>
                    </div>
                    <div class="card_item">
                        <div>手机号：16620886066</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="card_title">小程序信息</span>
                    </div>
                    <div class="card_item">
                        <div>卡内余额</div>
                        <div class="money">￥0</div>
                    </div>
                    <div class="card_item">
                        <div>卡号：10035510541</div>
                    </div>
                    <div class="card_item">
                        <div>姓 名：兆小方</div>
                    </div>
                    <div class="card_item">
                        <div>手机号：16620886066</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <!--列表-->

    </section>
</template>

<script>  
    export default {
        data() {
            return {
                
            }
        },
        methods: {
           
        }
    }

</script>
<style>
    .card_item{
        padding: 20px;
        border-bottom: 1px solid #E0E0E0;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
    }
    .card_item:first-child{
        padding-top: 0;
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


