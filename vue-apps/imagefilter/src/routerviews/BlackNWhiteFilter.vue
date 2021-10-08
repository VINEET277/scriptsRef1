<template>
    <div class="blacknwhitecontainer">
        <div class="blacknwhitefilter">
            <input class="fileupload" type="file" ref="fileuploadEl"/><br/>
            <div>Is Working: {{ isWorking}}</div>
            <input class="suffix" type="text" v-model="suffix"/>
            <button class="bnwbtns" v-on:click="download" v-bind:disabled="isWorking">Download</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import Jimp from 'jimp';

import './BlackNWhiteFilter.scss';

export default defineComponent({
    setup() {
        const fileuploadEl = ref();

        const isWorking = ref(false);
        const suffix = ref('_bnw');

        const filename = ref('');
        const imageData = ref();

        onMounted(() => {
            fileuploadEl.value.addEventListener('change', () => {
                let file = fileuploadEl.value.files[0];
                if (file) {
                    const name = file.name;
                    const lastDot = name.lastIndexOf('.');
                    filename.value = name.substring(0, lastDot);
                    
                    let reader = new FileReader();
                    reader.onload = function () {
                        // console.log(reader.result);
                        bnw(reader.result);
                    }
                    reader.readAsArrayBuffer(file);
                }
            });
        });

        const bnw = (res: any) => {
            Jimp.read(res)
            .then((image) => {
                isWorking.value = true;
                const w = image.getWidth();
                const h = image.getHeight();

                for (let x = 0; x < w; x++){
                    for (let y = 0; y < h; y++){
                        let hexColour = image.getPixelColour(x, y);
                        let colourObj = Jimp.intToRGBA(hexColour);
                        
                        let filterVal1 = 200;
                        let filter1 = (colourObj.r < filterVal1 && colourObj.g < filterVal1 && colourObj.b < filterVal1);

                        if(!filter1){
                            // image.setPixelColour(Jimp.rgbaToInt(10, 10, 10, 255), x, y);
                            image.setPixelColour(Jimp.rgbaToInt(255, 255, 255, 0), x, y);
                        }
                        else {
                            image.setPixelColour(Jimp.rgbaToInt(255, 255, 255, 255), x, y);
                        }
                    }
                }

                imageData.value = image;
                isWorking.value = false;
            });
        }

        const download = () => {
            imageData.value.getBase64Async(Jimp.MIME_PNG)
            .then((b64png: any) => {
                // console.log(b64png);
                let a = document.createElement("a");
                a.href = b64png;
                a.download = filename.value + suffix.value + '.png';
                a.click();
            })
        }

        return { fileuploadEl, isWorking, suffix, download }
    },
})
</script>
