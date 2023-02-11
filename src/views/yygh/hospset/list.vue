<template>
    <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchObj.hosname" placeholder="医院名称" />
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        </el-form>
        <div>
            <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
        </div>
        <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.9)" :data="list" stripe style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="50" label="序号" />
            <el-table-column prop="hosname" label="医院名称" />
            <el-table-column prop="hoscode" label="医院编号" />
            <el-table-column prop="apiUrl" label="api基础路径" width="200" />
            <el-table-column prop="contactsName" label="联系人姓名" />
            <el-table-column prop="contactsPhone" label="联系人手机" />
            <el-table-column label="状态" width="80">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? "可用" : "不可用" }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-delete"
                        @click="removeDataById(scope.row.id)"></el-button>
                    <el-button v-if="scope.row.status === 1" type="primary" size="mini" icon="el-icon-unlock"
                        @click="lockHospSet(scope.row.id, 0)"></el-button>
                    <el-button v-else type="danger" size="mini" icon="el-icon-lock"
                        @click="lockHospSet(scope.row.id, 1)"></el-button>
                    <router-link :to="'/hospitalset/edit/' + scope.row.id" style="margin-left: 10px;">
                        <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                    </router-link>

                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :current-page="current" :page-size="limit" :total="total"
            style="padding: 30px 0; text-align: center" layout="total, prev, pager, next, jumper"
            @current-change="getList" />
    </div>
</template>

<script>
import hospset from "@/api/yygh/hospset";

export default {
    data() {
        return {
            current: 1,
            limit: 10,
            searchObj: {},
            list: [],
            total: 0,
            selectionList: [],
            loading: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        async getList(page = 1) {
            this.loading = true
            this.current = page;
            const res = await hospset.getHospList(this.current, this.limit, this.searchObj)
            this.list = res.data.records;
            this.total = res.data.total;
            this.loading = false
            console.log(res);
        },
        removeDataById(id) {
            this.$confirm(
                "此操作将永久删除医院是设置信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    //确定执行then方法
                    //调用接口
                    this.loading = true
                    hospset.deleteHospById(id)
                        .then(() => {
                            this.loading = false
                            //提示
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            //刷新页面
                            this.getList();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        handleSelectionChange(selection) {
            this.selectionList = selection
        },
        removeRows() {
            this.$confirm(
                "此操作将永久删除医院是设置信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    var ids = []
                    this.selectionList.forEach(e => {
                        ids.push(e.id)
                    })
                    //确定执行then方法
                    //调用接口
                    hospset.batchRemoveHospSet(ids)
                        .then(() => {
                            //提示
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            //刷新页面
                            this.getList();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        lockHospSet(id, status) {
            hospset
                .lockHospSet(id, status)
                .then((response) => {
                    this.$message({
                        type: "success",
                        message: "操作成功"
                    });
                    this.getList(1)
                })
                .catch((error) => {
                    this.$message({
                        type: "error",
                        message: "操作失败"
                    });
                });
        }
    },
};
</script>
