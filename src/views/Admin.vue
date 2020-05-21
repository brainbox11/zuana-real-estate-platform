<template>
    <div class="white">
        <v-container class="pa-0">
            <v-toolbar flat class="pt-2 white">
                <v-toolbar-title class="headline hidden-sm-and-down font-weight-medium grey--text-darken-3">
                    Administration Panel
                </v-toolbar-title>
                <v-toolbar-title class="title hidden-md-and-up ml-0 pl-0 font-weight-medium grey--text-darken-3">
                    Administration Panel
                </v-toolbar-title>
            </v-toolbar>
        </v-container>
        <v-divider light />

        <v-container class="pt-4 pb-5" style="min-height: 500px">
            <v-tabs
                dark
                color="grey darken-3"
                grow
                icons-and-text
                centered
                show-arrows>

                <v-tabs-slider color="limeGreen"></v-tabs-slider>

                <v-tab class="" v-for="(tab, i) in tabsText" :key="i" :href="'#tab-' + (i+1)">
                    {{tab.text }}
                    <v-icon>{{tab.icon}}</v-icon>
                </v-tab>

                <v-tabs-items>
                  <v-tab-item v-for="i in 4" :key="i" :value="'tab-' + i">
                    <v-card v-if="i == 1" flat class="px-3 py-4">
                        <div class="text-xs-center font-weight-bold headline py-5 px-3">
                            <v-icon size="150">mood</v-icon><br>
                            Nothing here yet, try another tab...
                        </div>
                    </v-card>
                    <v-card v-else-if="i == 2" flat class="px-3 py-4">
                        <div class="subheading font-weight-regular mx-auto text-xs-center mt-2" style="max-width: 900px">
                            <template>
                                <div class="headline mb-3">Enter the UserId Associated with Agent's Account</div>
                                    <v-form @submit="getUser" class="py-2 mx-auto" ref="formUser" style="max-width: 500px">
                                        <v-text-field :rules="inputRules" label="User's Id" flat v-model="userId" prepend-inner-icon="person_outline"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>
                                        <div class="text-xs-center">
                                            <v-btn type="submit" :disabled="user.length > 0" dark :loading="finding" color="limeGreen">Submit</v-btn>
                                        </div>
                                    </v-form>
                            </template>
                            <div v-if="user">
                                <v-divider class="py-3"></v-divider>
                                <div class="headline py-4">User Details</div>
                                <div>Name: {{user.name}}</div>
                                <div>Status Active: {{user.active}}</div>
                                <div>Verified: {{user.verified? "True" : "False"}}</div>
                                <div>Featured: {{user.featured? "True" : "False"}}</div>
                                <v-btn v-show="!user.verified" color="success" @click="verify" :loading="verifying" dark class="mt-4">Verify Agent</v-btn>
                            </div>
                        </div>
                    </v-card>
                    <v-card style="max-width: 900px" v-else-if="i == 3" flat class="px-3 py-2 mt-2 mx-auto">
                        <div class="pb-0">
                            <v-btn round small dark @click="newAd = !newAd" color="limeGreen">New Advertisement</v-btn>
                        </div>
                        <Loader v-if="adverts.length < 1" />
                        <div class="py-5 headline" v-else-if="adverts == 0">
                            No Advertisement has been added yet
                        </div>
                        <div v-else class="py-3">
                            <v-expansion-panel>
                                <v-expansion-panel-content v-for="ad in adverts" :key="ad.data.owner">
                                    <v-card class="elevation-0 mb-1"  slot="header">
                                        <v-layout row wrap>
                                            <v-flex xs12 md6 class="mb-2">
                                                <div class="caption">Owner</div>
                                                <div class="subheading font-weight-bold">
                                                    {{ad.data.owner}}
                                                </div>
                                            </v-flex>
                                            <v-flex  xs6 sm5 md4>
                                                <div class="caption grey--text">Position</div>
                                                <div class="text-trucate">{{ad.data.position}}</div>
                                            </v-flex>
                                            <v-flex  xs6 sm4 md2>
                                                <div class="caption grey--text">Duration</div>
                                                <div>{{ad.data.duration}}</div>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>
                                    <v-card class="mt-0">
                                        <v-card-text class="px-4 pt-0">
                                            <div class="grey--text subheading">{{ad.data.caption}}</div>
                                            <div class="subheading">{{ad.data.link}}</div>
                                            <div class="py-2">
                                                <v-img class="mx-auto" :src="ad.data.album" max-width="200"></v-img>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </div>
                    </v-card>
                    <v-card v-else-if="i == 4" flat class="px-3 py-4">
                        <!-- <div class="subheading font-weight-regular mx-auto text-xs-center mt-4" style="max-width: 900px">
                            <div class="headline mb-3">Add a new admin</div>
                            <v-form class="py-2 mx-auto" style="max-width: 500px">
                                <v-text-field label="Email Address" flat v-model="email" prepend-inner-icon="mail_outline"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>
                                <div class="text-xs-center">
                                    <v-btn @click="addAdmin" dark :loading="adding" color="limeGreen">Submit</v-btn>
                                </div>
                            </v-form>
                        </div> -->
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
            </v-tabs>
            
            <!-- Ad Dialog -->
            <v-dialog v-model="newAd" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="500px" >
                <v-card class="pb-4">
                    <v-toolbar card color="white" class="bb-hero1 py-2">
                        <v-toolbar-title>New Advertisement</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon @click="newAd = !newAd">clear</v-icon>
                    </v-toolbar>
                    
                    <v-form @submit="setNewAd" class="px-3 pt-4 pb-3" ref="adForm">

                        <v-text-field label="Owner's Name" flat v-model="owner" :rules="inputRules" solo  class="text-field-no-curve" color="#32CD32"></v-text-field>

                        <v-select label="Postion" :items="positionList" flat v-model="position" :rules="inputRules" solo  class="text-field-no-curve" menu-props="offsetY" color="#32CD32"></v-select>

                        <v-select label="Duration" :items="durationList" flat v-model="duration" :rules="inputRules" solo  class="text-field-no-curve" menu-props="offsetY" color="#32CD32"></v-select>

                        <v-text-field label="Caption" flat v-model="caption" :rules="inputRules" solo  class="text-field-no-curve" color="#32CD32"></v-text-field>

                        <v-text-field label="Link" flat v-model="link" :rules="inputRules" solo  class="text-field-no-curve" color="#32CD32"></v-text-field>

                        <input v-if="!album" type="file"  ref="mediaSource" @change="processImg" name="userfile" accept=".jpg,.jpeg">
                        <img v-show="false" id="media" src="">

                        <v-card flat v-if="album" tile class="d-flex ma-1">
                            <v-img :src="album" contain :lazy-src="album" class="grey lighten-2">
                            <template v-slot:placeholder>
                                <v-layout fill-height align-center justify-center ma-0 >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-layout>
                            </template>
                            </v-img>
                        </v-card>

                        <v-btn type="submit" :loading="loading" block round dark color="limeGreen" class="mr-4 mx-0 mt-3">Upload</v-btn>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import Loader from '../components/Loader.vue'
export default {
    components: {
        Loader
    },
    data() {
        return {
            email: "",
            adding: false,
            tabsText: [
                {text: "Analytics", icon: "graphic_eq"},
                {text: "Human Resource", icon: "people_outline"},
                {text: "Advertisements", icon: "bubble_chart"},
                {text: "Listing", icon: "widgets"}
            ],
            adverts: [],
            position: "",
            duration: "",
            owner: "",
            caption: "",
            link: "",
            loading: false,
            newAd: false,
            inputRules: [
                v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!'
            ],
            positionList: [
                "SideBar",
                "PopUp",
                "Inline"
            ],
            durationList: ["1", "3", "12"],
            album: "",
            user: "",
            userId: "",
            finding: false,
            verifying: false
        }
    },
    methods: {
        addAdmin() {
            if(/.+@.+/.test(this.email)) {
                this.adding = true
                const addAdminRole = this.$store.state.functions.httpsCallable('addAdminRole')
                addAdminRole({ email: this.email }).then(result => {
                    this.adding = false
                    this.$store.dispatch('setSnackText', result.message)
                    this.$store.dispatch('setSnackState', true)
                    this.email = ""
                }).catch(err => {
                    this.adding = false
                    console.log(err)
                })
            } else {
                this.$store.dispatch('setSnackText', "Invaild Email")
                this.$store.dispatch('setSnackState', true)
            }
        },
        setNewAd(e) {
            e.preventDefault()

            if (this.$refs.adForm.validate()) {
                if (this.album == "") {
                    this.$store.dispatch('setSnackText', "Please add an image!")
                    this.$store.dispatch('setSnackState', true)
                    return
                }

                this.loading = true

                var date = new Date().getTime()
                var expire = date + (60*60*24*30*1000*Math.abs(this.duration))

                this.$store.state.db.collection('adverts').add({
                    createdOn: date,
                    owner: this.owner,
                    caption: this.caption,
                    position: this.position,
                    duration: this.duration+" Month",
                    expiresOn: expire,
                    link: this.link,
                    album: this.album,
                }).then((docRef) => {
                    this.$store.dispatch('setSnackText', "Advertisement has been uploaded")
                    this.$store.dispatch('setSnackState', true)
                    this.loading = false
                    this.$refs.adForm.reset()
                    this.$refs.adForm.resetValidation()
                    this.newAd = false
                    this.album = ""
                }).catch(err => {
                    this.loading = false
                    this.$store.dispatch('setSnackText', err)
                    this.$store.dispatch('setSnackState', true)
                })
            }
        },
        // Image upload methods
        compress(source_img_obj, quality, output_format) {      
            var mime_type = "image/jpeg"
            if(typeof output_format !== "undefined" && output_format=="png"){
                mime_type = "image/png";
            }
            var cvs = document.createElement('canvas');

            const width = 700;
            const scaleFactor = width / source_img_obj.naturalWidth;
            cvs.width = width;
            cvs.height = source_img_obj.naturalHeight * scaleFactor;

            cvs.getContext('2d').drawImage(source_img_obj, 0, 0, width, source_img_obj.naturalHeight * scaleFactor);

            console.log(cvs.width+' and '+cvs.height)

             var newImageData = cvs.toDataURL(mime_type, quality/100);
             var result_image_obj = new Image();
             result_image_obj.src = newImageData;

             return result_image_obj;
        },
        showPreview(input,previewer){
            //read file object and extract image as encoded url
            var file = input;
            var preview = previewer;
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false);

            reader.readAsDataURL(file);
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
        processImg() {
            var self = this

            const original = document.querySelector("input[type=file]").files[0]
            
            if (original == '') {
                return
            }

            var preview = document.querySelector("img[id=media]")
            this.showPreview(original,preview)

            preview.onload = () => {
                preview = document.querySelector("img[id=media]")

                var target_img = document.createElement("IMG");
                target_img.src = self.compress(preview,50,'jpg').src;

                var blobImg = self.dataURItoBlob(target_img.src)

                const imgName = "Ads_"+ (Math.random() * 1000000) + ".jpg"

                var storageRef = self.$store.state.storage.ref('AdvertImage/'+imgName)

                var uploadTask = storageRef.put(blobImg)

                uploadTask.on('state_changed', (snapshot) => {
                    // Observe state changes event such as progress, pause, resume etc...
                    var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100

                    console.log("Upload is ",progress, " done")
                }, (error) => {
                    self.$store.dispatch('setSnackText', "Error: "+error.message)
                    self.$store.dispatch('setSnackState', true)
                    console.log(error.message)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        var data = {
                            name: imgName,
                            link: downloadURL
                        }
                        self.album = downloadURL
                    })
                })
            }
        },
        getUser(e) {
            e.preventDefault()

            if (this.$refs.formUser[0].validate()) {
                this.finding = true

                // Fetches user's data from firestore

                var docRef = this.$store.state.db.collection("users").doc(this.userId);
                docRef.get().then((doc) => {
                    this.finding = false
                    if (doc.exists) {
                        // Updates user's data when it is retrived
                        this.user = doc.data()
                        this.$store.dispatch('setSnackText', "One user found!")
                        this.$store.dispatch('setSnackState', true)
                        console.log(this.user)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("Couldn't find any user with provided Id");
                        this.$store.dispatch('setSnackText', "Couldn't find any user with provided Id")
                        this.$store.dispatch('setSnackState', true)
                    }
                }).catch(err => {
                    this.finding = false
                    console.log("Error: "+err);
                })
            }
        },
        verify() {
            this.verifying = true

            var verify = this.$store.state.db.collection("users").doc(this.user.uid)

            // Set the Updates
            verify.update({
                verified: 1
            })
            .then(() => {
                this.verifying = false
                this.$store.dispatch('setSnackText', "User has been verified!")
                this.$store.dispatch('setSnackState', true)
                this.user = ""
            })
            .catch(error => {
                this.verifying = false
                this.$store.dispatch('setSnackText', "Error verifying agent: "+error)
                this.$store.dispatch('setSnackState', true)
            })
        }
    },
    created() {
        if (!this.$store.state.isAdmin) {
            this.$router.push("/")
        }

        var ad = this.$store.state.db.collection("adverts").limit(20)
         ad.get()
         .then((querySnapshot) => {
            var document
            querySnapshot.forEach((doc) => {
                document = {
                    id: doc.id,
                    data: doc.data()
                }
                this.adverts.push(document)
            });

            if(this.adverts.length < 1) {
                this.adverts = 0
            }
        })
    }
}
</script>
