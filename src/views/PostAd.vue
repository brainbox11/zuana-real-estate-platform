<template>
    <div style="height:100%">
        <Loader v-show="!rendered" />
        <div v-show="rendered" class="grey lighten-5 pb-4 postAd" style="height:100%">
            <div class="pt-4 hidden-sm-and-down"></div>

            <v-container v-show="stage == 1" class="px-0 white elevation-2 py-3" style="max-width:800px">
                <div class="headline text-xs-center pt-2 pb-2">POST A PROPERTY</div>
                <div class="subheading text-xs-center pb-4">
                    Complete the steps below to put your property in front of millions of home-seekers
                </div>
                <v-stepper v-model="e1" class="elevation-0">
                    <v-stepper-header class="elevation-0">
                        <v-stepper-step :editable="e1 > 1 && e1 < 4" :complete="e1 > 1" step="1">Address</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :editable="e1 > 2 && e1 < 4" :complete="e1 > 2" step="2">Price</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :editable="e1 > 3 && e1 < 4" :complete="e1 > 3" step="3">Description</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 4" step="4">Features</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 5" step="5">Pictures</v-stepper-step>

                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-toolbar card color="white" class="text-xs-center">
                                <v-spacer/>
                                <v-toolbar-title>Address of property</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            
                            <v-form @submit="addressValidator" class="mx-auto" style="max-width: 700px" ref="addressForm">

                                <v-select v-model="state" :items="stateList" :rules="inputRules" label="State" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="map" menu-props="offsetY"></v-select>

                                <v-select  v-model="local" :items="localityList" :rules="inputRules" label="Local Government Area" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="my_location" menu-props="offsetY"></v-select>

                                <!-- <v-select  v-model="area" :items="areaList" :rules="inputRules" label="Area / Town Name" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="near_me" menu-props="offsetY"></v-select> -->

                                <v-text-field  v-model="area" :rules="inputRules" label="Area / Town Name" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="near_me"></v-text-field>

                                <v-text-field label="Street Name" flat v-model="street" prepend-inner-icon="person_pin_circle" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>
                                
                                <div class="text-xs-center">
                                    <v-btn type="submit" dark color="limeGreen" class="mr-4 mx-0 mt-3">Continue<v-icon right>keyboard_arrow_right</v-icon></v-btn>
                                </div>
                            </v-form>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-toolbar card color="white" class="text-xs-center">
                                <v-spacer/>
                                <v-toolbar-title>Price of property</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            
                            <v-form @submit="priceValidator" class="mx-auto" style="max-width: 700px" ref="priceForm">

                                <v-select v-model="currency" :items="currencyList" :rules="inputRules" label="Currency" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="account_balance" menu-props="offsetY"></v-select>

                                <v-text-field type="number" label="Price" flat v-model="price" prepend-inner-icon="account_balance_wallet" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                <v-select  v-model="purpose" :items="purposeList" :rules="inputRules" label="Property Purpose" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="help" menu-props="offsetY"></v-select>

                                <v-select v-show="purpose == 'Rent'"  v-model="duration" :items="durationList" label="Rental Duration" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="help" menu-props="offsetY"></v-select>
                                
                                <div class="text-xs-center">
                                    <v-btn type="submit" dark color="limeGreen" class="mr-4 mx-0 mt-3">Continue<v-icon right>keyboard_arrow_right</v-icon></v-btn>
                                </div>
                            </v-form>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-toolbar card color="white" class="text-xs-center">
                                <v-spacer/>
                                <v-toolbar-title>Description of property</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            
                            <v-form @submit="descValidator" class="mx-auto" style="max-width: 700px" ref="descForm">

                                <v-text-field label="Enter a Title" flat v-model="title" prepend-inner-icon="bookmark_border" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                <v-select v-model="category" :items="catList" :rules="inputRules" label="Select a property category" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="card_membership" menu-props="offsetY"></v-select>

                                <v-select v-model="subCategory" :items="subCategoryList" :rules="inputRules" label="Select a property category" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="label_important" menu-props="offsetY"></v-select> 

                                <div class="grey--text mb-2"><span class="font-weight-medium">Note:</span> Set number of bedroom and bathroom to zero if not required!</div>
                                
                                <v-layout>
                                    <v-flex>
                                        <v-select :disabled="category == 'Land'" v-model="bedroom" :items="count" :rules="inputRules" label="Bedrooms" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="local_hotel" menu-props="offsetY"></v-select>
                                    </v-flex>
                                    <v-flex>
                                        <v-select :disabled="category == 'Land'" v-model="bathroom" :items="count" :rules="inputRules" label="Bathrooms and Toilet" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="hot_tub" menu-props="offsetY"></v-select>
                                    </v-flex>
                                </v-layout>

                                <!-- <div class="grey--text mb-2"><span class="font-weight-medium">Optional:</span> Specify the dimension of the property in meters</div>
                                
                                <v-layout>
                                    <v-flex>
                                        <v-text-field type="number" v-model="length" :rules="inputRules" label="Lenght (in meters)" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="swap_horiz" menu-props="offsetY"></v-text-field>
                                    </v-flex>
                                    <v-flex>
                                        <v-text-field type="number" v-model="breath" :rules="inputRules" label="Breadth (in meters)" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="swap_vert" menu-props="offsetY"></v-text-field>
                                    </v-flex>
                                </v-layout> -->

                                <v-textarea label="Enter property description.." flat v-model="description" prepend-inner-icon="description" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-textarea>
                                
                                <div class="text-xs-center">
                                    <v-btn type="submit" dark color="limeGreen" class="mr-4 mx-0 mt-3">Continue<v-icon right>keyboard_arrow_right</v-icon></v-btn>
                                </div>
                            </v-form>
                        </v-stepper-content>

                        <v-stepper-content step="4">
                            <div class="px-3 mx-auto" style="max-width:700px">
                                <div class="title font-weight-regular">Select any feature that can be attributed to the property (Optional)</div>
                                <v-layout wrap row>
                                    <v-flex xs12 sm6 md4 v-for="item in features" :key="item">
                                        <v-checkbox :disabled="saving" v-model="selected" :label="item" :value="item"></v-checkbox>
                                    </v-flex>
                                </v-layout>
                                <div>
                                    <v-btn color="limeGreen" :loading="saving" dark @click="saveAd">
                                        <v-icon left>photo</v-icon>
                                        Save and Add picture
                                    </v-btn>
                                </div>
                            </div>

                        </v-stepper-content>

                        <v-stepper-content step="5">
                            <div class="px-2 mx-auto" style="max-width:700px;">
                                <div class="title font-weight-regular mb-2"><v-avatar size="32"><img src="/img/camera.png" alt=""></v-avatar> Add a photo to your Ad</div>
                                <div class="body-1 my-2"><span class="font-weight-medium">Tips: </span>Please ensure you photo are presentable and of good quality..</div>

                                <div v-show="uploading">
                                    <span class="caption">Please wait... upload in progress...</span>
                                    <v-progress-linear v-model="progress" color="limeGreen"></v-progress-linear>
                                </div>
                                <div class="mb-2 hero-ba-ads grey lighten-5" style="min-height:200px">
                                    <v-container grid-list-sm fluid>
                                        <v-layout row wrap>
                                            <v-flex xs4 sm2 d-flex v-for="pic in album" :key="pic">
                                                <v-card flat tile class="d-flex ma-1">
                                                    <v-img :src="pic.link" :lazy-src="pic.link" aspect-ratio="1" class="grey lighten-2">
                                                        <!-- <div class="text-xs-right"><v-icon v-ripple class="black white--text" style="cursor:pointer" @click="deleteImg(pic.name)">clear</v-icon></div> -->
                                                    <template v-slot:placeholder>
                                                        <v-layout fill-height align-center justify-center ma-0 >
                                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                        </v-layout>
                                                    </template>
                                                    </v-img>
                                                </v-card>
                                            </v-flex>
                                            <v-flex xs4 sm2 d-flex>
                                                <v-card flat tile class="d-flex ma-1"  v-ripple @click="attach">
                                                    <v-img src="/img/add-image.png" aspect-ratio="1" class="grey lighten-2">
                                                    </v-img>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </div>
                                <input type="file" ref="mediaSource" v-show="false" @change="processImg" name="userfile" accept=".jpg,.jpeg,.png">
                                <div>
                                    <v-btn :disabled="!album.length" :loading="savingImg" color="limeGreen" @click="attachImg" dark>
                                        Continue <v-icon right>chevron_right</v-icon>
                                    </v-btn>
                                </div>
                            </div>

                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-container>

            <v-container v-show="stage == 2" class="px-0 white elevation-2 pb-0 pt-3" style="max-width:600px">
                <div class="headline text-xs-center pt-2 pb-2 bb-hero1">ONE MORE STEP</div>
                <!-- <v-divider></v-divider> -->
                <div class="subheading text-xs-center pt-2 px-3">
                    <v-responsive class="my-3">
                        <v-avatar size="70"><img src="/img/premium.png" alt=""></v-avatar>
                    </v-responsive>
                    <p class="headline font-weight-bold">Would you like to make this Ad Premium?</p>
                    <p class="mb-0">We recommend you publish your Advert as a <span class="font-weight-medium">Premium Ad</span>. This gives your Advert top rank amongst other Ads and you get a higher audience from potential customers for 30 days...</p>
                    <v-radio-group :disabled="publishing" v-model="choice" column style="display:inline-block">
                        <v-radio class="mb-3" label="Make Premium" value="true"></v-radio>
                        <v-radio label="No, thanks" value="false"></v-radio>
                    </v-radio-group>

                    <div v-show="choiceBanner == '2'" class=" elevation-20 py-4 mb-5 mt-2">
                        <v-layout wrap row class="px-3">
                            <v-flex x12 sm4 class="pr-3">
                                <img src="/img/cash2.png">
                            </v-flex>
                            <v-flex x12 sm8 class="text-sm-left">
                                <p class="pt-2">You current have <span class="font-weight-medium">{{premiumAdsCount}} Premium Credits.</span> Click the button below to buy Premium Credits...</p>
                                <v-btn route to="/subscription" dark round color="limeGreen"><v-icon class="mr-1">account_balance_wallet</v-icon> Buy Premium Ad Credit</v-btn>
                            </v-flex>
                        </v-layout>
                    </div>
                    
                    <div v-show="choiceBanner == '1'" class=" elevation-20 py-4 mb-5 mt-2">
                        <v-layout wrap row class="px-3">
                            <v-flex x12 sm4 class="pr-3">
                                <img src="/img/premium.png">
                            </v-flex>
                            <v-flex x12 sm8 class="text-sm-left">
                                <p class="pt-2">Your Ad will be published as a <span class="font-weight-medium">Premium Ad</span>, and will be active for 30 days... You now have <span class="font-weight-medium">{{premiumAdsCount - 1}} Premium Ad Credit</span> left.</p>
                            </v-flex>
                        </v-layout>
                    </div>

                    <div v-show="choiceBanner == '3'" class=" elevation-10 py-4 mb-5 mt-2">
                        <v-layout wrap row class="px-3">
                            <v-flex x12 sm4 class="pr-3">
                                <img src="/img/paper-plane.png">
                            </v-flex>
                            <v-flex x12 sm8 class="text-sm-left">
                                <p class="pt-4">This Ad is currently going to be published as a <span class="font-weight-medium">Standard Ad</span>. Go Premium to give this Ad a boost in ranking...</p>
                            </v-flex>
                        </v-layout>
                    </div>
                </div>
                <v-divider></v-divider>
                <div class="py-3 px-2 text-xs-left">
                    <v-btn :loading="publishing" :disabled="choiceBanner == '0' || choiceBanner == '2'" :dark="choiceBanner == '1' || choiceBanner == '3'" @click="publishAd" large color="limeGreen"><v-icon class="mr-1">publish</v-icon> Publish Ad</v-btn>
                    <v-btn @click="discardAd" :disabled="publishing" flat large><v-icon class="mr-1">clear</v-icon> Cancel Ad</v-btn>
                </div>
            </v-container>

            <v-container v-show="stage == 3" class="px-0 white elevation-2 pb-0 pt-3" style="max-width:600px">
                <div class="headline text-xs-center pt-2 pb-2 bb-hero1">COMPLETE</div>
                <div class="subheading text-xs-center pt-2 pb-5 px-3">
                    <v-responsive class="mt-2">
                        <v-avatar tile size="150"><img src="/img/thank-you.gif" alt=""></v-avatar>
                    </v-responsive>
                    <p class="headline font-weight-bold">Hurray, your Ad was successfully published.</p>
                    <p class="mb-0">We recommend you always publish your Ads as a <span class="font-weight-medium">Premium Ad</span>. This gives your Advert top rank amongst other Ads and you get a higher audience from potential customers for 30 days...</p>
                </div>
                <v-divider></v-divider>
                <div class="py-3 px-2 text-xs-center">
                    <v-btn :disabled="false" @click="reset" dark color="limeGreen"><v-icon class="mr-1">unarchive</v-icon> Post another Property</v-btn>
                    <v-btn :disabled="false" router to="/user/listing" dark color="limeGreen"><v-icon class="mr-1">dashboard</v-icon> View Listing</v-btn>
                </div>
            </v-container>

            <div class="pb-4 hidden-sm-and-down"></div>
        </div>
        <img v-show="false" id="media" src="">
    </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import { setTimeout } from 'timers';
export default {
    components: {
        Loader
    },
    data() {
        return {
            choice: '',
            stage: 1,
            progress: 0,
            uploading: false,
            rendered: false,
            e1: 1,
            state: "Imo State",
            local: "",
            area: "",
            street: "",
            inputRules: [
                v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!'
            ],
            currencyList: [
                "Naira",
                "Dollar"
            ],
            currency: "Naira",
            price: null,
            purposeList: [
                'Sale',
                'Rent'
            ],
            purpose: "",
            durationList: [
                'Yearly',
                'Monthly',
                'Daily'
            ],
            duration: "Yearly",
            title: "",
            category: null,
            categoryList: [
                {category: 'Co-working Space', subCategory: ['Conference Room', 'Desk', 'Meeting Room', 'Private Office', 'Workstation']},
                {category: 'Commercial Property', subCategory: ['Event Center', 'Factory', 'Hotel/Guest House', 'Office Space', 'School', 'Shop', 'Shop in a Mall', 'Show Room', 'Warehouse']},
                {category: 'Flat/Apartment', subCategory: ['Boys Quarters', 'Mini-flat', 'Penthouse', 'Self Contain', 'Shared Apartment', 'Studio Apartment']},
                {category: 'House', subCategory: ['Blocks of Flats', 'Detached Bungalow', 'Detached Duplex', 'Massionette', 'Semi-Detached Bungalow', 'Semi-Detached Duplex', 'Terraced Bungalow', 'Terraced Duplex']},
                {category: 'Land', subCategory: ['Commercial Land', 'Industrial Land', 'Joint-Venture Land', 'Mixed-Use Land', 'Residential land']},
            ],
            subCategory: null,
            bedroom: '0',
            bathroom: '0',
            toilet: 0,
            description: "",
            count: ['0','1','2','3','4','5','6','7','8','9','10+'],
            selected: [],
            features: [
                'New',
                'Old',
                'Renovated',
                'Furnished',
                'Cheap',
                '24 hours Electricity',
                'Fast Internet',
                'Church Nearby',
                'Parking Space',
                'Swimming Pool',
                'Security',
                'Elevator',
                'Gym',
                'Market Nearby',
                'C of O',
                'Free WIFI',
                'Drainage System',
                'Jacuzzi',
                'POP Ceiling',
                'Boys Quarter',
                'Children Playground',
                'Street Light',
                'Big Compound',
                'Supermmarket NearBy',
                'Survey',
            ],
            saving: false,
            album:[],
            hasPremiumAd: false,
            premiumAdsCount: 0,
            publishing: false,
            savingImg: false,
            isHouse: false,
            breath: '',
            length: '',
        }
    },
    metaInfo: {
      title: 'Post a property to the public',
      // override the parent template and just use the above title only
      titleTemplate: null
    },
    methods: {
        addressValidator(e) {
            e.preventDefault()
            if(this.$refs.addressForm.validate()){
                this.e1 = 2
            }
        },
        priceValidator(e) {
            e.preventDefault()
            if(this.$refs.priceForm.validate()){
                this.e1 = 3
            }
            console.log('submit')
        },
        descValidator(e) {
            e.preventDefault()
            if(this.$refs.descForm.validate()){
                this.e1 = 4
            }
        },
        saveAd() {
            var self = this
            this.saving = true
            var date = new Date()
            var expire = date.getTime() + (60*60*24*30*1000)

            if (this.purpose == "Sale") {
                this.duration = ""
            }

            this.$store.state.db.collection('property').add({
                uid: this.$store.state.userData.uid,
                updatedOn: date.getTime(),
                createdOn: date.getTime(),
                title: self.title,
                description: self.description,
                state: self.state,
                local: self.local,
                area: self.area,
                street: self.street,
                currency: self.currency,
                price: Math.abs(self.price),
                purpose: self.purpose,
                duration: self.duration,
                category: self.category,
                subCategory: self.subCategory,
                bedroom: Math.abs(self.bedroom),
                bathroom: Math.abs(self.bathroom),
                features: self.selected,
                expiresOn: expire,
                album: "",
            }).then((docRef) => {
                localStorage.setItem('propertyId', docRef.id)
                self.$store.dispatch('setSnackText', "Property saved... Add a photo now!")
                self.$store.dispatch('setSnackState', true)
                this.saving = false
                this.e1 = 5
            }).catch(err => {
                this.saving = false
                self.$store.dispatch('setSnackText', err)
                self.$store.dispatch('setSnackState', true)
            })
        },
        // Image upload methods
        compress(source_img_obj, quality, output_format){      
             var mime_type = "image/jpeg";
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
            this.uploading = true
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

                const imgName = "Zuana_"+ (Math.random() * 1000000) + ".jpg"

                var storageRef = self.$store.state.storage.ref('propertyImage/'+imgName)

                var uploadTask = storageRef.put(blobImg)

                uploadTask.on('state_changed', (snapshot) => {
                    // Observe state changes event such as progress, pause, resume etc...
                    self.progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100

                    //console.log("Upload is ",self.progress, " done")
                }, (error) => {
                    self.uploading = false
                    
                    self.$store.dispatch('setSnackText', "Error: "+error.message)
                    self.$store.dispatch('setSnackState', true)
                    //console.log(error.message)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        var data = {
                            name: imgName,
                            link: downloadURL
                        }
                        self.album.push(data)
                        console.log(self.album)
                        self.uploading = false
                        self.progress = 0
                    })
                })
            }
        },
        attach() {
            this.$refs.mediaSource.click()
        },
        deleteImg(data) {
            var self = this
            // Create a reference to the file to delete
            var desertRef = this.$store.state.storage.ref('propertyImage/'+data);
            console.log(desertRef)

            // Delete the file
            desertRef.delete().then(function() {
                // File deleted successfully
                var temp = self.album.filter(item => {
                    return item.name !== data
                })
                this.album = []
                this.album = temp
                console.log("Image removed!")
            }).catch(function(error) {
                // Uh-oh, an error occurred!
                console.log(error)
            });
        },
        attachImg() {
            var id = localStorage.propertyId
            var self = this

            this.savingImg = true

            var attachAlbum = this.$store.state.db.collection("property").doc(id);
            attachAlbum.update({
                album: self.album
            })
            .then(() => {
                localStorage.setItem("preview", self.album[0].link)
                this.savingImg = false
                this.stage = 2
                localStorage.setItem('propertyImg', true)
                self.$store.dispatch('setSnackText', "Photos uploaded")
                self.$store.dispatch('setSnackState', true)
            })
            .catch(error => {
                this.savingImg = false
                self.$store.dispatch('setSnackText', error)
                self.$store.dispatch('setSnackState', true)
            });
        },
        publishAd() {
            var id = localStorage.propertyId

            this.publishing = true

            var adType = "Basic"
            if (this.choice == 'true' && this.hasPremiumAd == true) {
                adType = "Premium"
            }

            var date = new Date()
            var expire = date.getTime() + (60*60*24*30*1000)

            var publish = this.$store.state.db.collection("property").doc(id);
            publish.update({
                active: true,
                whatsappClick: 0,
                views: 0,
                phoneClick: 0,
                type: adType,
                expiresOn: expire,
                boost: 0,
                boostTime: 0,
                approved: true
            })
            .then(() => {
                var body = {
                    "app_id": this.$appId,
                    "included_segments": ["All"],
                    "headings": {"en": "New Property Available"},
                    "contents": {"en": this.title},
                    "chrome_web_image": localStorage.preview,
                    "ttl": "2419200"
                }

                this.$axios.post(this.$onesignalRequestUrl, body, this.$onesignalHeader)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .then(() => {
                this.stage = 3
                this.publishing = false
                localStorage.removeItem('propertyImg')
                localStorage.removeItem('propertyId')
                this.$store.dispatch('setSnackText', "Ad has been successfully Published")
                this.$store.dispatch('setSnackState', true)
            })
            .then(() => {
                if (this.$store.state.loggedIn && this.choice == 'true') {

                    var users = this.$store.state.db.collection("users").doc(this.$store.state.userData.uid)
                
                    this.$store.state.db.runTransaction((transaction) => {
                        // This code may get re-run multiple times if there are conflicts.
                        return transaction.get(users)
                        .then((sfDoc) => {
                            if (!sfDoc.exists) {
                                throw "Document does not exist!";
                            }
                            
                            if (sfDoc.data().premiumAds) {
                                if(sfDoc.data().premiumAds > 0) {
                                    var temp1 = sfDoc.data().premiumAds - 1
                                } else {
                                    var temp1 = 0
                                }
                            } else {
                                var temp1 = 0
                            }

                            transaction.update(users, { 
                                premiumAds: temp1
                            })
                        })
                        .then(() => {
                            this.$store.dispatch('setSnackText', "Product has been made a Premium Ad")
                            this.$store.dispatch('setSnackState', true)
                            this.$store.dispatch('syncUserData')
                        })
                        .catch(err => {
                            this.$store.dispatch('setSnackText', err)
                            this.$store.dispatch('setSnackState', true)
                            console.log(err)
                        })
                    })
                }
            })
            .catch(error => {
                this.publishing = false
                this.$store.dispatch('setSnackText', error)
                this.$store.dispatch('setSnackState', true)
                console.log(error)
            });
        },
        reset() {
            // General data reset
            this.$refs.addressForm.reset()
            this.$refs.priceForm.reset()
            this.$refs.descForm.reset()
            
            this.$refs.addressForm.resetValidation()
            this.$refs.priceForm.resetValidation()
            this.$refs.descForm.resetValidation()

            this.stage = 1
            this.e1 = 1
            this.album = []
            this.bedroom ="0"
            this.bathroom ="0"

            localStorage.removeItem('propertyId')
            localStorage.removeItem('propertyImg')
        },
        discardAd() {
            if (localStorage.propertyId) {
                // Deletes Ad and images if any
                this.$store.state.db.collection("property").doc(localStorage.propertyId).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }

            this.reset()
            this.bedroom ="0"
            this.bathroom ="0"
            this.$store.dispatch('setSnackText', "Post has been discarded!")
            this.$store.dispatch('setSnackState', true)
        }
    },
    computed: {
        catList() {
            var temp = []
            var x = ''
            this.categoryList.map(item => {
                x = item.category
                temp.push(x)
            })
            return temp
        },
        subCategoryList() {
            var temp = []
            if (this.category) {
                temp = this.categoryList.filter(item => {
                    return item.category == this.category
                })

                temp = temp[0].subCategory
                return temp
            } else {
                return []
            }
        },
        choiceBanner() {
            if (this.choice == 'true') {
                if (this.hasPremiumAd) {
                    return "1"
                } else {
                    return "2"
                }
            } else if(this.choice == 'false') {
                return "3"
            } else {
                return "0"
            }
        },
        stateList() {
            var temp = []
            var x = ''
            this.$store.state.locationBank.forEach(item => {
                x = item.state.name
                temp.push(x)
            })
            return temp
        },
        localityList() {
            var temp = []
            var subTemp = []

            if (this.state) {
                temp = this.$store.state.locationBank.filter(item => {
                    return item.state.name == this.state
                })

                temp = temp[0].state.locals

                temp.map(item => {
                    var x = item.name
                    subTemp.push(x)
                })
            }
            return subTemp
        }
    },
    created() {
        this.rendered = true
        if (localStorage.propertyId) {
            if (!localStorage.propertyImg) {
                this.e1 = 5
            } else {
                this.stage = 2
            }
        }
        // this.e1 = 3
        // this.stage = 2
        if (this.$store.state.userData.premiumAds && this.$store.state.userData.premiumAds > 0) {
            this.hasPremiumAd = true
            this.premiumAdsCount = this.$store.state.userData.premiumAds
        }
    }
}
</script>

<style scoped>
    .postAd {
        background: url('/img/aerial.jpg');
        background-size: cover;
    }
</style>