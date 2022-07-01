<template>
    <div class="link-com">
        <div class="first">
            <swiper class="like" :options="likeOptions" ref="linkRef" v-if="likeData.length">
                <swiper-slide class="like-item" v-for="(item, index) in likeData" :key="index">
                    <div v-if="likeType == 'detail'" @click="goTo(item.product_id)">
                        <img :src="item.img" />
                        <p class="goods-name">{{ item.product_name }}</p>
                        <p class="price-box1" v-if="item.final_price != item.price">
                            <span class="p-price">{{ item.final_price }}</span>
                            <span class="o-price">{{ item.price }}</span>
                        </p>
                        <p class="price-box2" v-else>
                            <span class="o-price">{{ item.final_price }}</span>
                        </p>
                    </div>
                    <div v-else-if="likeType == 'noResult'" @click="goTo(item.product_id)">
                        <img :src="item.img" />
                        <p>{{ item.name }}</p>
                        <p>
                            <span>{{ item.final_price }}</span>
                            <span class="o-price" v-if="item.final_price != item.price">{{ item.price }}</span>
                        </p>
                    </div>
                    <div v-else @click="goTo(item.product_id)">
                        <img :src="item.img" />
                        <p>{{ item.final_price }}</p>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="like-img-next" slot="button-next">
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="like-img-prev" slot="button-prev">
                <i :class="['el-icon-arrow-left']"></i>
            </div>
        </div>

        <swiper :options="accessoriesMain" class="big" ref="mainImg">
            <swiper-slide class="img-item" v-for="(item,index) in likeData" :key="index">
                <img :src="item.img" style="width: 200px; height: auto;" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'

export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            likeOptions: {
                observer: true,
				observeParents: true,
				observeSlideChildren: true,
				slidesPerView: 4,
				slidesPerGroup: 4,
				loopedSlides: 4,
				spaceBetween: 20,
				autoHeight: true,
				navigation: {
					nextEl: '.like-img-next',
					prevEl: '.like-img-prev'
				},
                on: {
                    slideChange: () => {
                        console.log(this.$refs.linkRef.swiper.activeIndex, this.likeData.length)
                    }
                }
            },
            likeData: [
                {
                    "product_id": "108",
                    "sku": "DOT465170-01",
                    "name": "Payton Grün Geometrische Brille",
                    "size": "L",
                    "true_sku": "OT465170-01",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €35.95",
                    "final_price": "EUR €15.00",
                    "percent": 58,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//0/1/01_171.jpg",
                    "img_href": "https://deadmin.xmslol.cn/171.html",
                    "true_qty": 66,
                    "presell_status": 1,
                    "wish_count": "179",
                    "is_wish": 0
                },
                {
                    "product_id": "97",
                    "sku": "DOT02018-01",
                    "name": "Denis Hell Schildkröte Cat Eye Brille",
                    "size": "L",
                    "true_sku": "OT02018-01",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €42.95",
                    "final_price": "EUR €7.99",
                    "percent": 81,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//f/i/file_2.jpg",
                    "img_href": "https://deadmin.xmslol.cn/2.html",
                    "true_qty": 88,
                    "presell_status": 1,
                    "wish_count": "84",
                    "is_wish": 0
                },
                {
                    "product_id": "66",
                    "sku": "DFX0206-03",
                    "name": "Hilary Rosa Durchsichtig Schmetterling-Form Brille",
                    "size": "M",
                    "true_sku": "FX0206-03",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €42.95",
                    "final_price": "EUR €42.95",
                    "percent": 0,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//1/_/1_1084.jpg",
                    "img_href": "https://deadmin.xmslol.cn/1084.html",
                    "true_qty": 10,
                    "presell_status": 1,
                    "wish_count": "80",
                    "is_wish": 0
                },
                {
                    "product_id": "72",
                    "sku": "DFX0536-01",
                    "name": "Matthew Grün Rund Brille",
                    "size": "M",
                    "true_sku": "FX0536-01",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €38.95",
                    "final_price": "EUR €27.27",
                    "percent": 30,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//0/2/02_99.png",
                    "img_href": "https://deadmin.xmslol.cn/99.html",
                    "true_qty": 108,
                    "presell_status": 1,
                    "wish_count": "104",
                    "is_wish": 0
                },
                {
                    "product_id": "190",
                    "sku": "DTX055276-01",
                    "name": "Yahya Gold Kristall Rund Vollrand  Brille",
                    "size": "M",
                    "true_sku": "TX055276-01",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €48.95",
                    "final_price": "EUR €24.48",
                    "percent": 50,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//1/_/1_418_1.jpg",
                    "img_href": "https://deadmin.xmslol.cn/1.html",
                    "true_qty": 51,
                    "presell_status": 1,
                    "wish_count": "87",
                    "is_wish": 0
                },
                {
                    "product_id": "46",
                    "sku": "DFA0742-01",
                    "name": "Abigail Hell Schildkröte Runde Brille",
                    "size": "120-130mm",
                    "true_sku": "FA0742-01",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €38.95",
                    "final_price": "EUR €38.95",
                    "percent": 0,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//4/_/4_615_3.jpg",
                    "img_href": "https://deadmin.xmslol.cn/3.html",
                    "true_qty": 75,
                    "presell_status": 1,
                    "wish_count": "46",
                    "is_wish": 0
                },
                {
                    "product_id": "87",
                    "sku": "DOM02100-01",
                    "name": "Faust Dunkelblau Cat Eye Brille",
                    "size": "M",
                    "true_sku": "OM02100-01",
                    "is_tryon": 0,
                    "is_box": 0,
                    "price": "EUR €42.95",
                    "final_price": "EUR €30.07",
                    "percent": 30,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//0/1/01_2_1.jpg",
                    "img_href": "https://deadmin.xmslol.cn/1.html",
                    "true_qty": 7,
                    "presell_status": 1,
                    "wish_count": "107",
                    "is_wish": 0
                },
                {
                    "product_id": "19",
                    "sku": "DFA0457-02",
                    "name": "Martha Kristall Cat Eye Brille",
                    "size": "M",
                    "true_sku": "FA0457-02",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €38.95",
                    "final_price": "EUR €38.95",
                    "percent": 0,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//1/_/1_1094.jpg",
                    "img_href": "https://deadmin.xmslol.cn/1094.html",
                    "true_qty": 36,
                    "presell_status": 1,
                    "wish_count": "44",
                    "is_wish": 0
                },
                {
                    "product_id": "7",
                    "sku": "DFA0457-01",
                    "name": "Martha Rosa Blumenmuster Cat Eye Brille",
                    "size": "M",
                    "true_sku": "FA0457-01",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €38.95",
                    "final_price": "EUR €38.95",
                    "percent": 0,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//1/_/1_1080.jpg",
                    "img_href": "https://deadmin.xmslol.cn/1080.html",
                    "true_qty": 41,
                    "presell_status": 1,
                    "wish_count": "48",
                    "is_wish": 0
                },
                {
                    "product_id": "6",
                    "sku": "DFP0300-01",
                    "name": "Lucy Lila Grün Cat Eye TR90",
                    "size": "M",
                    "true_sku": "FP0300-01",
                    "is_tryon": 0,
                    "is_box": 0,
                    "price": "EUR €31.95",
                    "final_price": "EUR €7.00",
                    "percent": 78,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//1/_/1_158_3.jpg",
                    "img_href": "https://deadmin.xmslol.cn/3.html",
                    "true_qty": 7,
                    "presell_status": 1,
                    "wish_count": "14",
                    "is_wish": 0
                },
                {
                    "product_id": "67",
                    "sku": "DFX0231-01",
                    "name": "Eleanore Rosa Cat Eye Brille",
                    "size": "M",
                    "true_sku": "FX0231-01",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €42.95",
                    "final_price": "EUR €7.99",
                    "percent": 81,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//0/1/01_44.jpg",
                    "img_href": "https://deadmin.xmslol.cn/44.html",
                    "true_qty": 14,
                    "presell_status": 1,
                    "wish_count": "49",
                    "is_wish": 0
                },
                {
                    "product_id": "126",
                    "sku": "DZM0957-04",
                    "name": "Eras Grün Cat Eye Brille",
                    "size": "M",
                    "true_sku": "ZM0957-04",
                    "is_tryon": 1,
                    "is_box": 0,
                    "price": "EUR €48.95",
                    "final_price": "EUR €48.95",
                    "percent": 0,
                    "img": "https://deadmin.xmslol.cn/media/catalog/product//2/_/2_162.jpg",
                    "img_href": "https://deadmin.xmslol.cn/162.html",
                    "true_qty": 23,
                    "presell_status": 1,
                    "wish_count": "50",
                    "is_wish": 0
                }
            ],
            cur: 0,
            accessoriesMain: {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                direction: 'vertical',
                grabCursor : true,
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.link-com {
    .first {
        position: relative;
        margin: 20px;
    }
}
.like {
    width: 90%;
    margin: auto;
    .like-item {
        cursor: pointer;
        img {
            display: block;
            width: 100%;
            height: auto;
        }
    }
}
.like-img-next {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -18px;
    cursor: pointer;
    i {
        font-size: 36px;
    }
}
.like-img-prev {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -18px;
    cursor: pointer;
    i {
        font-size: 36px;
    }
}
.swiper-button-disabled {
    cursor: not-allowed;
    i {
        color: #817979 !important;
    }
}
.big{
    height: 210px;
    width: 210px;
    background: #bbb9b8;
    .swiper-slide{
        @include flex($col: center);
        &>div {
            width: 100%;
        }
        .swiper-video-icon {
            position: absolute;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border: none;
            z-index: 9;
        }
        .video-img{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor:pointer;
            z-index: 1;
        }
        img{
            // max-width: 100%;
            width: 84.15%;
            max-width: 690px;
            height: auto;
            display: block;
            margin: auto;
        }
        
    }
}
</style>
