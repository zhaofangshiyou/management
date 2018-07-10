<template>
    <el-form ref="globalForm" :model="globalForm"  label-width="180px" class="from_box">
        <el-form-item label="微信手续费：">
            <el-input-number v-model="globalForm.wxCharge" size="100"  controls-position="right" :min="0.00" :precision="2" :step="0.1"></el-input-number><span class="unit">%</span>
        </el-form-item>
        <el-form-item label="用户每月优惠升数限制：">
            <el-input-number v-model="globalForm.maxOil" size="100" :min="0" controls-position="right"></el-input-number><span class="unit">升/每月</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('globalForm')">保存</el-button>
            <el-button @click="resetForm('globalForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>  
    export default {
        data() {
            return {
                globalForm:{
                    wxCharge: "",
                    maxOil: ""
                }
            }
        },
        methods: {
            resetForm(formName) {
                this.globalForm ={
                    wxCharge: "",
                    maxOil: ""
                }
            }
        }
    }

</script>

<style>
    .from_box{
        margin-top: 20px;
    }
    .unit{
        font-size:10px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:22px;
        padding-left: 10px;
    }
    .el-input-number{
        width: 260px;
    }
</style>
