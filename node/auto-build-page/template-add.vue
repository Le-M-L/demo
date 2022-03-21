<template>
    <DDialog :title="title" :icon="icon" :show.sync="show">
        <DForm ref="Dform" :form-items="formMode" :data="formData" />
        <div slot="footer">
            <el-button :loading="isLoading" size="small" type="primary" @click="submit">确 定</el-button>
            <el-button size="small" @click="show = false">关 闭</el-button>
        </div>
    </DDialog>
</template>

<script>
import addMxins from "@/mixins/addMxins";
export default {
    mixins: [addMxins],
    data() {
        return {
            title: form.id ? "修改" : "新增",
            icon: form.id ? "el-icon-edit" : "el-icon-circle-plus-outline",
            show: false,
            formMode: [
                {
                    label: "学校名称",
                    prop: "schoolName",
                    component: "input",
                    md: 24,
                    sm: 24,
                },
            ],
            request: {
                add: "%addUrl%",
                edit: "%editUrl%",
                detail: "%detailUrl%",
            },
            formData:{}
        };
    },
    methods: {
        //获取详情
        getDetail() {
            this.show = true;
            this.$store.commit("upLoading", true);
            this.$api.$get(this.request.detail, data).then(({data}) => {
               this.formData = data;
            })
            .finally(() => {
                store.commit("upLoading", false);
            });
        },
        async submit() {
            let form = this.getFormData();
            if (!form) return;
            let url = form.id ? this.request.edit : this.request.add;
            this.$store.commit("upLoading", true);
            this.$api
                .carry(url, form)
                .then(({ data }) => {
                    form.id ? this.$msg("修改成功", "success") : this.$msg("添加成功", "success");
                    this.show = false;
                    this.$emit("search", { pageNow: 1, pageSize: 10 });
                })
                .finally(() => {
                    this.$store.commit("upLoading", false);
                });
        },
    },
};
</script>

<style scoped lang="scss"></style>
