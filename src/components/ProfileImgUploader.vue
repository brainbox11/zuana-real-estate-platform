<template>
    <div>
        <v-btn absolute color="orange" class="white--text" @click="dialog = !dialog" depressed fab small right bottom>
            <v-icon>photo_camera</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-toolbar class="bb-hero1" color="white">
                <v-toolbar-title><v-icon class="mr-1">present_to_all</v-icon> Choose Display Image</v-toolbar-title> 
                <v-spacer></v-spacer>
                <v-icon @click="dialog = !dialog">clear</v-icon>
            </v-toolbar>
            <v-card>
                <v-card-text class="subheading">
                  <span class="font-weight-medium">Recommended:</span> We recommend you use your business Logo as your display photo.
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="text-xs-center">
                    <v-avatar tile size="200">
                        <img id="displayImg" src="/img/unknown.png">
                    </v-avatar>
                </v-card-text>
                <v-divider light/>
                <v-card-actions class="py-3 px-3">
                    <v-spacer></v-spacer>
                    <v-btn flat  dark color="limeGreen" round @click="attach"><v-icon class="mr-2">add_circle_outline</v-icon> Choose Image</v-btn>
                    <v-btn depressed :dark="submitable" color="limeGreen" :loading="uploading" :disabled="!submitable" round @click="upload"><v-icon class="mr-2">unarchive</v-icon> Upload</v-btn>
                </v-card-actions>
                <input type="file" ref="mediaSource" v-show="false" @change="processImg" name="userfile" accept=".jpg,.jpeg,.png">
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "VImgUploader",
    data() {
        return {
            dialog: false,
            uploading: false,
            submitable: false,
        }
    },
    methods: {
        upload() {
            this.uploading = true
            var src_img = document.querySelector("img[id=displayImg]");
            var target_img = document.createElement("IMG");
            target_img.src = this.compress(src_img,50,'jpg').src;
            
            //convert base64 to blob and append to formdata
            var blob = this.dataURItoBlob(target_img.src);

            const imgName = "DP"+ (Math.random() * 1000000) + ".jpg"

            var storageRef = this.$store.state.storage.ref('propertyImage/'+imgName)

            var uploadTask = storageRef.put(blob)

            uploadTask.on('state_changed', (snapshot) => {
                // Observe state changes event such as progress, pause, resume etc...
                var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100

                console.log("Upload is ",progress, " done")
            }, (error) => {
                this.uploading = false
                
                this.$store.dispatch('setSnackText', "Error: "+error.message)
                this.$store.dispatch('setSnackState', true)
                //console.log(error.message)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    var user = this.$store.state.db.collection("users").doc(this.$store.state.userData.uid);

                    user.update({
                            displayPhoto: downloadURL,
                        })
                        .then(() => {
                            this.uploading = false
                            this.dialog = false
                            this.$store.dispatch('syncUserData')
                            this.$store.dispatch('setSnackText', "Display Photo Updated")
                            this.$store.dispatch('setSnackState', true)
                            this.$store.dispatch('syncUserData')
                        })
                        .catch(error => {
                            this.uploading = false
                            this.$store.dispatch('setSnackText', "Error: "+error)
                            this.$store.dispatch('setSnackState', true)
                        });
                })
            })
        },
        compress(source_img_obj, quality, output_format){      
             var mime_type = "image/jpeg";
             if(typeof output_format !== "undefined" && output_format=="png"){
                mime_type = "image/png";
             }
             var cvs = document.createElement('canvas');
             cvs.width = source_img_obj.naturalWidth;
             cvs.height = source_img_obj.naturalHeight;

             var x = 0
             var y = 0
            
            if(cvs.width > cvs.height) {
                y = (cvs.width - cvs.height) / 2
                cvs.height = cvs.width
            } else if(cvs.width < cvs.height) {
                x = (cvs.height - cvs.width) / 2
                cvs.width = cvs.height
            }

            //  Sets canvas background color
             cvs.background = "white"
             cvs.getContext("2d").fillStyle = 'white'
             cvs.getContext("2d").fillRect( 0, 0, cvs.width, cvs.height)

             cvs.getContext("2d").drawImage(source_img_obj, x, y);
             var newImageData = cvs.toDataURL(mime_type, quality/100);
             var result_image_obj = new Image();
             result_image_obj.src = newImageData;
             return result_image_obj;
        },
        //function we use to convert encoded url form of image data into blob type image data
        dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        },
        showPreview(input,previewer){
            //read file object and extract image as encoded url
            var file = input;
            var preview = previewer;
            var reader = new FileReader()

            reader.addEventListener("load", function () {
                preview.src = reader.result
            }, false);

            reader.readAsDataURL(file)
        },
        processImg() {
            var self = this

            self.media = true
            var comp = document.querySelector("input[type=file]").files[0]
            var preview = document.querySelector("img[id=displayImg]")
            self.showPreview(comp,preview)

            setTimeout(()=> {
                var src_img = document.querySelector("img[id=displayImg]")
                preview.src = self.compress(src_img,50,'jpg').src
                this.submitable = true
            }, 2000)
        },
        attach() {
            this.$refs.mediaSource.click()
        },
        resetMedia() {
            this.media = false
        }
    }
}
</script>
