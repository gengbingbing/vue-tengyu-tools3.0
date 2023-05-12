<template>
    <div>
        <div class="tools">
            <el-button type="primary" :title="'基础按钮'" @click.stop="prePage" class="mr10"> 上一页</el-button>
            <el-button type="primary" :title="'基础按钮'" @click.stop="nextPage" class="mr10"> 下一页</el-button>
            <div class="page">{{ pageNum }}/{{ pageTotalNum }} </div>
            <el-button type="primary" :title="'基础按钮'" @click.stop="clock" class="mr10"> 顺时针</el-button>
            <el-button type="primary" :title="'基础按钮'" @click.stop="counterClock" class="mr10">逆时针</el-button>
        </div>
        <div class="pdf-container" ref="pdfContainer" @scroll="loadPages">
            <pdf ref="pdf" :src="url" :page="pageNum" :rotate="pageRotate" @progress="loadedRatio = $event"
                @page-loaded="pageLoaded($event)" @num-pages="pageTotalNum = $event" @error="pdfError($event)"
                @link-clicked="page = $event" style="height: auto;">
                <div class="pdf-pages">
                    <div v-for="n in pageTotalNum" :key="n" class="pdf-page" :data-page="n" ref="page">
                        <pdf-page :page="n"></pdf-page>
                    </div>
                </div>
            </pdf>
        </div>
    </div>
</template>
  
<script>
import pdf from 'vue-pdf'
import pdfPage from './pdfPage.vue'
export default {
    name: 'Home',
    components: {
        pdf,
        pdfPage
    },
    data() {
        return {
            url: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
            pageNum: 1,
            pageTotalNum: 16,
            pageRotate: 0,
            // 加载进度
            loadedRatio: 0,
            curPageNum: 0,
        }
    },
    mounted() {
        this.loadPages() // 手动调用一次 loadPages 方法
    },
    methods: {
        // 上一页函数，
        prePage() {
            var page = this.pageNum
            page = page > 1 ? page - 1 : this.pageTotalNum
            this.pageNum = page
        },
        // 下一页函数
        nextPage() {
            var page = this.pageNum
            page = page < this.pageTotalNum ? page + 1 : 1
            this.pageNum = page
        },
        // 页面顺时针翻转90度。
        clock() {
            this.pageRotate += 90
        },
        // 页面逆时针翻转90度。
        counterClock() {
            this.pageRotate -= 90
        },
        // 页面加载回调函数，其中e为当前页数
        pageLoaded(e) {
            this.curPageNum = e
        },
        // 其他的一些回调函数。
        pdfError(error) {
            console.error(error)
        },
        // 打印全部
        pdfPrintAll() {
            this.$refs.pdf.print()
        },
        // 打印指定部分
        pdfPrint() {
            this.$refs.pdf.print(100, [1, 2])
        },
        loadPages() {
            console.log(111111111111)
            // 获取页面容器
            const container = this.$refs.pdfContainer
            // 获取页面元素列表
            const pages = this.$refs.page || []
            // 获取页面高度
            const pageHeight = pages.length > 0 ? pages[0].offsetHeight : 0
            // 获取页面容器高度
            const containerHeight = container.offsetHeight
            // 获取页面容器滚动距离
            const containerScrollTop = container.scrollTop
            // 计算当前可见页面的索引范围
            const startIndex = Math.floor(containerScrollTop / pageHeight)
            const endIndex = Math.ceil((containerScrollTop + containerHeight) / pageHeight)
            // 加载可见范围内的页面
            for (let i = startIndex; i <= endIndex; i++) {
                const page = pages[i]
                if (page && !page.dataset.loaded) {
                    const pdfPage = page.querySelector('pdf-page')
                    if (pdfPage) {
                        pdfPage.load()
                        page.dataset.loaded = true
                    }
                }
            }
        }
    }
}
</script>
  
<style>
.tools {
    display: flex;
    justify-content: space-around;
    padding: 12px;
    align-items: center;
}

.pdf-container {
    height: 500px;
}

.el-scrollbar__wrap {
    height: 100%;
}

.el-scrollbar__thumb {
    background-color: #c1c1c1;
    border-radius: 6px;
    opacity: 0.6;
}

.el-scrollbar__thumb:hover {
    opacity: 0.8;
}

.el-scrollbar__bar {
    background-color: #f5f5f5;
    width: 8px;
    border-radius: 4px;
}
</style>