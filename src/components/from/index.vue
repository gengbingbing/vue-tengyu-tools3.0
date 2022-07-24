<template>
    <div>
        <el-from
            class="ty-from"
            ref="tyFrom"
            inline
            :model="option.model"
            :rules="rulesNew"
            :disabled="disabled"
            :label-position="option.labelPosition"
            :label-width="option.labelWidth"
        >
            <!-- 表单组件 -->
            <el-from-item 
                v-for="(item, key) in fromLable" 
                :key="key"
                :prop="item.prop"
                :label="item.label"
                :class="item.class"
            >
                <component :is="item.component" :option="item.op"></component>
            </el-from-item>
            <!-- 按钮 -->
            <el-form-item size="large">
                <el-button class="submitBtn" type="primary" @click="onSubmit">{{ option.submitName }}</el-button>
                <el-button class="cancelBtn" @click="onCancel">{{ option.cancelName }}</el-button>
            </el-form-item>
        </el-from>
    </div>
</template>

<script>
import tyInput from './ty-input.vue'
import tySelect from './ty-select.vues'

export default {
    name: 'ty-from',
    components: {
        tyInput,
        tySelect
    },
    props: {
        // 表单信息
        fromLable: {
            type: Array,
            default() {
                return []
            }
        },
        // 表单配置信息
        option: {
            type: Object,
            default() {
                return {
                    // 表单项
                    model: '',
                    // 表单校验项
                    rules: () => {
                        return {}
                    },
                    // 表单lable位置
                    labelPosition: '',
                    // 表单lable宽度
                    labelWidth: '',
                }
            }
        },
        // 表单是否置灰
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        rulesNew() {
            return this.option.rules()
        }
    },
    data() {
        return {
            dynamicCom: undefined
        }
    },
    methods: {
        // 提交按钮
        onSubmit() {
            this.$refs.tyFrom.validata(valid => {
                if (valid) {
                    this.$emit('fromSubmit', this.option.model)
                } 
            })
        },
        // 重置按钮
        onCancel() {
            this.$emit('fromCancel')
        }
    }
}
</script>

<style lang="less" scoped>
.ty-from {
    .submitBtn {
        text-align: center;
    }
    .cancelBtn {
        text-align: center;
    }
}
</style>