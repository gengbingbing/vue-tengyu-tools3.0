<template>
    <div>
        <div style="margin: 15px; width: 800px;">
            <el-input placeholder="请输入图片地址" v-model="img" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="changePanorama"></el-button>
            </el-input>

            <p @click="() => img = 'https://images.unsplash.com/photo-1501183638710-841dd1904471'">
                https://images.unsplash.com/photo-1501183638710-841dd1904471</p>
            <p @click="() => img = 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353'">
                https://images.unsplash.com/photo-1505691723518-36a5ac3be353</p>
            <p @click="() => img = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'">
                https://images.unsplash.com/photo-1512917774080-9991f1c4c750</p>
        </div>
        <div id="photosphere" class="photosphere"></div>
    </div>
</template>
<script>
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'

import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/plugins/markers.css";
export default {
    components: {},
    data() {
        return {
            panoramadata: null,
            img: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
            selectMarkers: [],
        }
    },
    computed: {},
    created() {
    },
    mounted() {
        this.init()
    },
    methods: {
        changePanorama() {
            this.panoramadata.setPanorama(this.img);
            const markersPlugin = this.panoramadata.getPlugin(MarkersPlugin);
            markersPlugin.clearMarkers()
        },
        init() {
            console.log(this.img)
            const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';
            this.panoramadata = new Viewer({
                container: document.getElementById('photosphere'),
                panorama: this.img,
                size: {
                    width: '100%',
                    height: screen.availHeight
                },
                caption: '360°全景图',
                plugins: [
                    [
                        MarkersPlugin,
                        {
                            markers: [
                                {
                                    // image marker that opens the panel when clicked
                                    id: 'image',
                                    longitude: -0.34,
                                    latitude: -0.065,
                                    image: require('../../../assets/icon/right.png') || baseUrl + 'pictos/pin-blue.png',
                                    width: 60,
                                    height: 60,
                                    anchor: 'bottom center',
                                    zoomLvl: 100,
                                    data: {
                                        href: 'https://photo-sphere-viewer-4.netlify.app/plugins/plugin-markers.html#events'
                                    },
                                },
                                {
                                    // polygon marker
                                    id: 'polygon',
                                    polylineRad: [
                                        [6.2208, 0.0906], [0.0443, 0.1028], [0.2322, 0.0849], [0.4531, 0.0387],
                                        [0.5022, -0.0056], [0.4587, -0.0396], [0.2520, -0.0453], [0.0434, -0.0575],
                                        [6.1302, -0.0623], [6.0094, -0.0169], [6.0471, 0.0320], [6.2208, 0.0906], [6.2208, 0.0906]
                                    ],
                                    svgStyle: {
                                        fill: 'rgba(255, 0, 0, 0.6)',
                                        stroke: 'rgba(255, 255, 50, 1)',
                                        strokeWidth: '2px'
                                    },
                                    tooltip: {
                                        content: '多边形标记：危险区域',
                                        position: 'bottom right'
                                    }
                                },
                                {
                                    // image marker rendered in the 3D scene
                                    id: 'imageLayer',
                                    imageLayer: baseUrl + 'pictos/tent.png',
                                    width: 120,
                                    height: 94,
                                    longitude: -0.45,
                                    latitude: -0.1,
                                    tooltip: '帐篷',
                                },
                                {
                                    // polyline marker
                                    id: 'polyline',
                                    polylinePx: [
                                        [2478, 1635], [2184, 1747], [1674, 1953], [1166, 1852],
                                        [709, 1669], [301, 1519], [94, 1399], [34, 1356], [120, 1156]
                                    ],
                                    svgStyle: {
                                        stroke: 'rgba(140, 190, 10, 0.8)',
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: '10px'
                                    },
                                    tooltip: '帐篷路线'
                                },
                            ],
                        }
                    ]
                ]

            })

            const markersPlugin = this.panoramadata.getPlugin(MarkersPlugin);

            markersPlugin.on('select-marker', (e, marker) => {
                console.log(`Cursor is over marker ${marker.id}`, marker);
                marker.data && marker.data.href && window.open(marker.data.href, '_blank');
            });

            this.panoramadata.on('click', (e, data) => {
                if (!data.rightclick) {
                    markersPlugin.addMarker({
                        id: '#' + Math.random(),
                        longitude: data.longitude,
                        latitude: data.latitude,
                        image: baseUrl + 'pictos/pin-red.png',
                        width: 32,
                        height: 32,
                        anchor: 'bottom center',
                        tooltip: 'Generated pin',
                        data: {
                            generated: true
                        }
                    });
                }
            });
        }
    }
}
</script>
<style scoped>
.photosphere {
    width: 100% !important;
    height: calc(100% - 90px) !important;
}
</style>