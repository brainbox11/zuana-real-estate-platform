<template>
    <div>
        <v-toolbar flat class="white hero-ba-ads mb-2">
            <v-toolbar-title class="font-weight-medium grey--text-darken-3">
                {{$route.name}}
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="font-weight-medium subheading"><v-icon>search</v-icon> {{listing.length}} found</div>
        </v-toolbar>
        <div v-if="listing === 0">
            <div class="text-xs-center py-5 px-3 white hero-ba-ads">
                <v-avatar tile size="100"><img src="/img/empty.svg" /></v-avatar>
                <p class="title font-weight-medium mt-4 mb-0">You haven't Posted any property yet!</p>
            </div>
        </div>
        <Loader v-else-if="listing.length < 1" />
        <div v-else>
            <v-card flat class="mb-3 bb-hero1 hero-ba-ads" v-for="(item, index) in listing" :key="index">
                <v-card-text class="pa-1 pointer" v-ripple @click="router(item.id)">
                    <v-layout wrap row >
                        <v-flex xs12 sm5 class="pa-2">
                            <v-img
                                :src="item.data.album[0].link"
                                :lazy-src="item.data.album[0].link"
                                aspect-ratio="1.3"
                                class="grey lighten-2"
                                >
                                <v-container class="pa-0" fill-height fluid>
                                    <v-layout fill-height>
                                    <v-flex xs12 >
                                        <span v-if="item.data.type !== 'Basic'" class="subheading elevation-1 font-weight-medium white--text hero-text-ads">{{item.data.type}} Ad</span>
                                    </v-flex>
                                    </v-layout>
                                </v-container>

                                <template v-slot:placeholder>
                                    <v-layout
                                        fill-height
                                        align-center
                                        justify-center
                                        ma-0
                                        >
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-layout>
                                </template>
                            </v-img>
                        </v-flex>
                        <v-flex xs12 sm7 class="pr-2 pl-3 pt-3">
                            <div class="headline font-weight-medium text-truncate mb-2">{{item.data.title}}</div>
                            <div class="subheading mb-2"><v-icon size="20">place</v-icon> {{item.data.street+', '+item.data.area+', '+item.data.state}}</div>
                            <div class="title font-weight-medium hero--text-1 mb-3">
                                <v-avatar size="30" class="mr-2"><img src="/img/cash.png"></v-avatar>
                                &#8358;{{Math.abs(item.data.price).toLocaleString('en-US')}}
                            </div>
                            <div class="text-truncate my-2">
                                <span v-if="item.data.active" class="caption"><v-icon size="17">verified_user</v-icon> For {{item.data.purpose}}</span>

                                <span v-else style="display:inline-block" class="body-2 grey lighten-4 py-2 px-4"><v-icon size="17">warning</v-icon> Deactivated</span>

                                <span  v-if="item.data.active" class="caption ml-3 text-truncate"><v-icon size="17">local_hotel</v-icon> {{item.data.bedroom}} bedroom | <v-icon size="17">hot_tub</v-icon> {{item.data.bathroom}} bath</span>
                            </div>
                            <p class="body-1 mb-0">{{item.data.description.substr(0, 200)}}...</p>
                            <div style="display:flex">
                                <v-chip label dark class="text-trucated mt-3" color="grey darken-1" small>{{item.data.category}}  <v-icon size="15" class="mx-1">arrow_forward</v-icon> {{item.data.subCategory}}</v-chip>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-divider light />
                <div class="pa-2">
                    <v-chip label dark color="grey darken-1">Views: {{item.data.views ? item.data.views : 0}}</v-chip>
                    <v-chip label dark color="grey darken-1">Phone Clicks: {{item.data.phoneClick ? item.data.phoneClick : 0}}</v-chip>
                    <v-chip label dark color="grey darken-1">Whatsapp Clicks: {{item.data.whatsappClick ? item.data.whatsappClick : 0}}</v-chip>
                    
                    <!-- dropdown menu -->
                    <v-menu offset-y>
                        <v-btn slot="activator" flat color="grey darken-1" icon class="ml-4 mt-2"><v-icon size="30">arrow_drop_down_circle</v-icon></v-btn>
                        <v-list>
                            <template v-if="item.data.active">
                                <v-list-tile class="px-2" v-for="link in menuDropDown" @click="link.click(item.id, item.data)" :key="link.text">
                                    <v-list-tile-title>
                                        {{link.text}}
                                    </v-list-tile-title>
                                </v-list-tile>
                            </template>
                            <template v-else>
                                <v-list-tile class="px-2" v-for="link in menuDropDown2" @click="link.click(item.id, item.data)" :key="link.text">
                                    <v-list-tile-title>
                                        {{link.text}}
                                    </v-list-tile-title>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-menu>
                </div>
            </v-card>

            <div class="text-xs-center py-3 mb-3">
                <v-btn @click="loadMore" v-show="showBtn" :loading="loadingMore" dark color="limeGreen">Load More</v-btn>
            </div>
        </div>

        <!-- Boost Dialog -->
        <v-dialog v-model="boostDialog" persistent max-width="500px" >
            <v-card>
                <v-toolbar card color="white" class="bb-hero1">
                    <v-toolbar-title>Advert Boost</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon @click="boostDialog = !boostDialog">clear</v-icon>
                </v-toolbar>
                
                <template v-if="!focusedProperty.boost">
                    <v-form v-if="focusedProperty.type == 'Premium'" class="px-4 pt-4 pb-5">
                        <template v-if="$store.state.userData.boost > 0">
                            <p class="subheading mb-0">Please choose a boost option to apply to property</p>

                            <v-radio-group class="ml-3" v-model="boost" column style="display:inline-block">
                                <v-radio class="mb-2" label="Boost" value="1"></v-radio>
                                <v-radio class="mb-2" label="Boost 2x" value="2"></v-radio>
                                <v-radio label="Boost 2x" value="3"></v-radio>
                            </v-radio-group>
                            
                            <v-btn block round dark color="limeGreen" :loading="boosting" @click="applyBoost" class="mx-0 mt-1">Apply Boost</v-btn>
                        </template>
                        <template v-else>
                            <div class="display-1 text-trucated grey lighten-5 px-1 mb-3 py-4 green--text font-weight-medium text-xs-center">
                                <v-avatar style="margin-top:  -10px" tile size="35">
                                    <img src="/img/boost.png">
                                </v-avatar>
                                0x
                            </div>
                            <p class="subheading mb-0">Opps!!! You don't have any <span>Ad Boost credit</span> remaining. Please purchase a new premium plan</p>
                        </template>
                    </v-form>
                    <div v-else class="subheading text-xs-center py-5 px-3">
                        Boost can only be applied to Premium Ads.
                    </div>
                </template>

                <template v-else>
                    <div class="subheading text-xs-center pb-5 px-3">
                        <div class="display-1 text-trucated grey lighten-5 mt-2 px-1 mb-3 py-4 green--text font-weight-medium text-xs-center">
                            <v-avatar style="margin-top:  -10px" tile size="35">
                                <img src="/img/boost.png">
                            </v-avatar>
                            {{focusedProperty.boost}}x
                        </div>
                        This Property has already been boosted!
                    </div>
                </template>
            </v-card>
        </v-dialog>

        <!-- Client Request Dialog -->
        <v-dialog v-model="editDialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="500px" >
            <v-card class="pb-4">
                <v-toolbar card color="white" class="bb-hero1 py-2">
                    <v-toolbar-title>Edit Property details</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon @click="editDialog = !editDialog">clear</v-icon>
                </v-toolbar>
                
                <v-form @submit="updateAd" class="px-3 pt-4 pb-3" ref="editForm">
                    <p class="mb-3 subheading">
                        Only the Ad details below are editable...
                    </p>

                    <v-text-field label="Property Title" flat v-model="eTitle" :rules="inputRules" solo prepend-inner-icon="spa" class="text-field-no-curve" color="#32CD32"></v-text-field>

                    <v-text-field type="number" label="Price (NGN)" flat v-model="ePrice" :rules="inputRules" solo prepend-inner-icon="account_balance_wallet" class="text-field-no-curve" color="#32CD32"></v-text-field>

                    <v-textarea label="Enter a description of the Property..." flat v-model="eDescription" prepend-inner-icon="mood" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-textarea>

                    <v-btn type="submit" :loading="editing" block round dark color="limeGreen" class="mr-4 mx-0 mt-3">Update Property</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Loader from '../../components/Loader.vue'
export default {
    components: {
        Loader
    },
    data() {
        return {
            menuDropDown: [
                {text: "Boost Property", click: (id, data)=> {
                    this.focusedPropertyId = id
                    this.focusedProperty = data
                    this.boostDialog = true
                }},
                {text: "Mark as Sold", click: (id, data)=> {
                    var edit = this.$store.state.db.collection("property").doc(id);
                    edit.update({
                        active: false
                    })
                    .then(() => {
                        this.$store.dispatch('setSnackText', "Property has been deactivated!")
                        this.$store.dispatch('setSnackState', true)

                        this.listing = []
                        this.getProperty()
                    })
                }},
                // {text: "Edit Image", click: ""},
                {text: "Edit Property", click: (id, data)=> {
                    this.focusedPropertyId = id
                    this.focusedProperty = data
                    this.editDialog = true
                }},
                {text: "Delete Ad", click: (id, data)=> {
                    // Deletes Ad and images if any
                    this.$store.state.db.collection("property").doc(id).delete()
                    .then(() => {
                        console.log("Document successfully deleted!");
                        
                        this.$store.dispatch('setSnackText', "Post has been discarded!")
                        this.$store.dispatch('setSnackState', true)

                        this.listing = []
                        this.getProperty()
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }},
            ],
            menuDropDown2: [
                {text: "Publish Ad", click: (id, data)=> {
                    var date = new Date().getTime()

                    var edit = this.$store.state.db.collection("property").doc(id);
                    edit.update({
                        active: true,
                        createdOn: date,
                        expiresOn: date + (60*60*24*30*1000)
                    })
                    .then(() => {
                        this.$store.dispatch('setSnackText', "Property has been Published!")
                        this.$store.dispatch('setSnackState', true)

                        this.listing = []
                        this.getProperty()
                    })
                }},
                // {text: "Edit Image", click: ""},
                {text: "Edit Property", click: (id, data)=> {
                    this.focusedPropertyId = id
                    this.focusedProperty = data
                    this.editDialog = true
                }},
                {text: "Delete Ad", click: (id, data)=> {
                    // Deletes Ad and images if any
                    this.$store.state.db.collection("property").doc(id).delete()
                    .then(() => {
                        this.$store.dispatch('setSnackText', "Post has been discarded!")
                        this.$store.dispatch('setSnackState', true)

                        this.listing = []
                        this.getProperty()
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }},
            ],
            listing: [],
            nextQuery: null,
            limit: 8,
            showBtn: true,
            loadingMore: false,
            focusedPropertyId: "",
            focusedProperty: [],
            boostDialog: false,
            boost: "1",
            boosting: false,
            editDialog: false,
            editing: false,
            inputRules: [
                v => (v && v.length !== '') || 'This Field is required!'
            ],
            eTitle: "",
            ePrice: "",
            eDescription: ""
        }
    },
    created() {
        this.getProperty()
    },
    methods: {
        router(data) {
            this.$router.push('/property/'+data)
        },
        loadMore() {
            this.loadingMore = true
            this.nextQuery.get()
            .then(documentSnapshots => {
                var document
                documentSnapshots.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.listing.push(document)
                })

                this.loadingMore = false
                var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
                this.nextQuery = this.$store.state.db.collection("property").where("uid", "==", localStorage.uid).orderBy("createdOn", "desc")
                .startAfter(lastVisible)
                .limit(this.limit)
            })
            .catch(err => {
                this.showBtn = false
                console.log(err)
            })
        },
        getProperty() {
            var property = this.$store.state.db.collection("property")
         
            property.where("uid", "==", localStorage.uid).orderBy("createdOn", "desc").limit(this.limit).get()
            .then((querySnapshot) => {
                var document
                querySnapshot.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.listing.push(document)
                });

                if (this.listing.length > 0) {
                    var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                    this.nextQuery = this.$store.state.db.collection("property").where("uid", "==", localStorage.uid).orderBy("createdOn", "desc")
                    .startAfter(lastVisible)
                    .limit(this.limit)
                } else {
                    this.listing = 0
                }
            })
            .catch((error) => {
                this.listing = 0
                console.log("Error getting documents: ", error);
            });
        },
        applyBoost() {
            var date = new Date()
            var expire = date.getTime() + (60*60*24*7*1000)
            this.boosting = true

            var boost = this.$store.state.db.collection("property").doc(this.focusedPropertyId);
            boost.update({
                boost: Math.abs(this.boost),
                boostTime: expire
            })
            .then(() => {
                this.boostDialog = false
                this.boost = "1"
                this.boosting = false
                this.focusedPropertyId = ""
                this.focusedProperty = []
                this.$store.dispatch('setSnackText', "Property has been boosted")
                this.$store.dispatch('setSnackState', true)

                this.listing = []
                this.getProperty()
            })
            .then(() => {
                var users = this.$store.state.db.collection("users").doc(this.$store.state.userData.uid)
                
                this.$store.state.db.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(users)
                    .then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "Document does not exist!";
                        }
                        
                        if (sfDoc.data().boost) {
                            if(sfDoc.data().boost > 0) {
                                var temp1 = sfDoc.data().boost - Math.abs(this.boost)
                            } else {
                                var temp1 = 0
                            }
                        } else {
                            var temp1 = 0
                        }

                        transaction.update(users, { 
                            boost: temp1
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
            })
            .catch(err => {
                this.boosting = false
                console.log("Error: "+err)
            })
        },
        updateAd(e) {
            e.preventDefault()

            if (this.$refs.editForm.validate()) {
                this.editing = true
                var edit = this.$store.state.db.collection("property").doc(this.focusedPropertyId);
                edit.update({
                    title: this.eTitle,
                    price: Math.abs(this.ePrice),
                    description: this.eDescription
                })
                .then(() => {
                    this.$refs.editForm.reset()
                    this.$refs.editForm.resetValidation()
                    this.editDialog = false
                    this.editing = false
                    this.$store.dispatch('setSnackText', "Ad has been Update!")
                    this.$store.dispatch('setSnackState', true)

                    this.focusedPropertyId = ""
                    this.focusedProperty = []
                    this.listing = []
                    this.getProperty()
                })
            }
        }
    },
    watch: {
        focusedProperty(data) {
            if (this.editDialog) {
                this.eTitle = data.title
                this.ePrice = data.price
                this.eDescription = data.description
            }
        }
    }
}
</script>
