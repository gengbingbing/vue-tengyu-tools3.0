<template>
    <div>
        <el-input v-model="from" :placeholder="option.placeholder"></el-input>
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