<template>
    <div id="table">
        <el-table
        :data="sliceData"
        border
        style="width: 100%;">
            <el-table-column
                prop="date"
                label="用户头像"
                width="180">
                <template slot-scope="scope">
                    <img class="userHead" :src="scope.row.userHead" alt="头像">
                </template>
            </el-table-column>
            <el-table-column
            prop="date"
            label="注册日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleFrozen(scope.$index,scope.row)">{{scope.row.isFrozen ? '解冻' : '冻结'}}</el-button>
                <el-button type="text" size="small" style="color:#F56C6C" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page" :page-size="pageSize" :current-page.sync="currentPage"
        background
        layout="prev, pager, next"
        :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'users',
    data() {
      return {
        tableData: [],
        currentPage:1,
        pageSize: 4
      }
    },
    computed: {
        sliceData(){
            return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    mounted(){
        axios.get('/api2/admin/getUsers').then(res=>{
            if(res.data.status === 0){
                console.log(res.data.obj)
                this.tableData = res.data.obj
            }
        })
    },
    methods: {
        handleFrozen(index,row){
            // console.log(index)
            // console.log(row)
            this.$confirm('你确定要执行吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                axios.get(`/api2/admin/upFreeze?email=${row.email}&isFrozen=${row.isFrozen}`).then(res=>{
                    if(res.data.status === 0){
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        new Promise((res,rej)=>{
                            setTimeout(() => {
                                res()
                            }, 1000);
                        }).then(()=>{
                            window.location.reload()
                        })
                    }else{
                        this.$alert(res.data.msg, '', {
                            confirmButtonText: '确定',
                            callback: () => {
                                window.location.reload();
                            }
                        })
                    }
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消执行'
                });          
            });
            axios.get(`/api2/admin/upFreeze?email=${row.email}&isFrozen=${row.isFrozen}`).then(res=>{
                // console.log(res.data)
                if(res.data.status === 0){
                    // alert('执行成功！')
                    /* this.$alert(res.data.msg, '', {
                        confirmButtonText: '确定',
                        callback: () => {
                            window.location.reload();
                        }
                    }); */
                }else{
                    alert('执行失败！')
                }
            })
        },
        handleDelete(index,row){
            this.$confirm('你确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                axios.get(`/api2/admin/deleteUser?email=${row.email}`).then(res=>{
                    if(res.data.status === 0){
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        new Promise((res,rej)=>{
                            setTimeout(() => {
                                res()
                            }, 1000);
                        }).then(()=>{
                            window.location.reload()
                        })
                    }else{
                        this.$alert(res.data.msg, '', {
                            confirmButtonText: '确定',
                            callback: () => {
                                window.location.reload();
                            }
                        })
                    }
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消执行'
                });          
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .page{
        margin-top: 20px;
    }
    .userHead{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-left: 30px;
    }
</style>
