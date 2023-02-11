<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="医院名称">
                <el-input v-model="hospitalSet.hosname" />
            </el-form-item>
            <el-form-item label="医院编号">
                <el-input v-model="hospitalSet.hoscode" />
            </el-form-item>
            <el-form-item label="api基础路径">
                <el-input v-model="hospitalSet.apiUrl" />
            </el-form-item>
            <el-form-item label="联系人姓名">
                <el-input v-model="hospitalSet.contactsName" />
            </el-form-item>
            <el-form-item label="联系人手机">
                <el-input v-model="hospitalSet.contactsPhone" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="saveBtnDisabled" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import hospset from "@/api/yygh/hospset";

export default {
    data() {
        return {
            hospitalSet: {},
            saveBtnDisabled: false
        };
    },
    created() {
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getHospSetById(id)
        } else {
            this.hospitalSet = {}
        }
    },
    methods: {
        save() {
            hospset
                .saveHosp(this.hospitalSet)
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "添加成功",
                    });
                    this.$router.push({ path: '/hospitalset/list' })
                })
                .catch(() => {
                    this.$message({
                        type: "error",
                        message: "操作失败",
                    });
                });
        },
        update() {
            hospset
                .updateHospitalSet(this.hospitalSet)
                .then((response) => {
                    this.$message({
                        type: "success",
                        message: "修改成功",
                    });
                    this.$router.push({ path: '/hospset/list' })
                })
                .catch((error) => {
                    this.$message({
                        type: "error",
                        message: "操作失败",
                    });
                });
        },
        saveOrUpdate() {
            this.saveBtnDisabled = true
            if (this.hospitalSet.id) {
                this.update()
            } else {
                this.save()
            }
            this.saveBtnDisabled = false
        },
        getHospSetById(id) {
            hospset.getHospSetById(id)
                .then(response => {
                    this.hospitalSet = response.data
                })
        }
    },
};
</script>