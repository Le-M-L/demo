<template>
    <div>
        <!-- 列表 -->
        <TablePagin :table="tableAll" @btn="btn" :form="form" @search="search">
            <!-- 表头右边插槽 -->
            <template #tabelTopRight></template>
            <!-- 表头左下按钮插槽 -->
            <template #tableBtmCenter></template>
            <!-- 表头右下插槽 -->
            <template #tableBtmRight></template>
        </TablePagin>
        <!-- 添加修改 -->
        <AddForm ref="AddForm" @search="search" />
        <!-- 详情 -->
        <Detail ref="Detail" />
    </div>
</template>

<script>
import myMixins from "@/mixins";
import AddForm from "./add";
import Detail from "./detail";

export default {
    mixins: [myMixins],
    computed: {
        AddForm,
        Detail,
    },
    data() {
        return {
            //表格数据
            tableAll: {
                loading: false,
                tableData: [],
                tableLabel: [
                    {
                        prop: "pushState", // 展示的字段名
                        title: "状态", //列表名称
                        tag: { type: 1 }, //是否使用tag
                        width: "50", //列表宽度
                        types: 16, //根据状态重写字段
                    },
                ],
                tableOption: {
                    title: "操作",
                    width: "160",
                    buttons: null,
                },
                total: 0, //分页总数
                ids: { item: [] }, //列表选中数据存放处
            },
            //列表请求数据
            form: {
                pageSize: 10,
                pageNow: 1,
            },
            request: {
                search: "%searchUrl%",
            },
        };
    },
    methods: {
        btn(methods, obj) {
            let that = this;
            let data = {};
            switch (methods) {
                case "add":
                    break;
                case "deit":
                    break;
                case "detail":
                    break;
                case "search":
                    break;
                case "delete":
                    break;
                default:
                    break;
            }
        },
    },
};
</script>

<style scoped lang="scss"></style>
