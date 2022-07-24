<template>
    <div>
        <el-select 
            :class="option.class"
            :multiple="option.multiple"
            :placeholder="opeion.placeholder"
            :clearable="option.clearable"
            v-model="from" 
        >
            <el-option
                v-for="item in option.op"
                :key="item.value"
                :lable="item.lable"
                :value="item.value"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    props: {
        option: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            from: this.option.fromProp
        }
    },
    watch: {
        'option.fromProp'(newVal) {
            this.from = newVal
        }
    }
}
</script>