<template>
    <div>
        <div class="white">
            <v-container class="px-0 pt-2 pb-1">
                <v-toolbar flat class="white px-0 pt-0 mt-0">
                    <v-toolbar-title class="ml-0 pl-0 subheading font-weight-medium hidden-md-and-up grey--text-darken-2">
                        {{pageTitle}}
                    </v-toolbar-title>
                    <v-toolbar-title class="ml-0 pl-0 headline hidden-sm-and-down grey--text-darken-2">
                        {{pageTitle}}
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn @click="filter = !filter" flat round color="grey darken-3" icon class="grey lighten-5"><v-icon>filter_list</v-icon></v-btn>
                </v-toolbar>
                <v-expand-transition>
                    <div v-show="filter" id="filter" class="transition-fast-in-fast-out mx-0 grey darken-3 pt-2 pl-2 pr-2 elevation-0 mb-4 hero-ba-ads">
                        <v-form ref="filterForm">
                            <v-layout wrap row>
                                <v-flex xs4 sm4 md2 lg1>
                                        <v-select
                                        :items="option"
                                        label="Type"
                                        background-color="#fff"
                                        v-model="purpose"
                                        box
                                        class="br-0 px-1"
                                        menu-props="offsetY"
                                        ></v-select>
                                </v-flex>
                                <v-flex xs8 sm8 md10 lg3>
                                    <v-autocomplete 
                                        :items="catList"
                                        box
                                        v-model="category"
                                        class="br-0 mx-1"
                                        background-color="#fff"
                                        label="Category"
                                        ></v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm3 md3 lg3>
                                    <v-autocomplete 
                                        :items="subCategoryList"
                                        v-model="subCat"
                                        box
                                        class="br-0 mx-1"
                                        background-color="#fff"
                                        label="Sub Category"
                                        ></v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm3 md3 lg2>
                                    <v-autocomplete 
                                        :items="regions"
                                        background-color="#fff"
                                        v-model="region"
                                        box
                                        class="br-0 mr-1"
                                        label="Region"
                                        ></v-autocomplete>
                                </v-flex>
                                
                                <v-flex xs6 sm2 md2 lg1>
                                    <v-text-field
                                        box
                                        type="number"
                                        class="br-0 mr-1"
                                        background-color="#fff"
                                        label="Min"
                                        v-model="min"
                                        ></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm2 md2 lg1>
                                    <v-text-field
                                        box
                                        type="number"
                                        class="br-0 mr-1"
                                        background-color="#fff"
                                        label="Max"
                                        v-model="max"
                                        ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm2 md2 lg1>
                                    <v-btn block @click="getFilter" :loading="filtering" dark round color="limeGreen"><v-icon>search</v-icon> Find</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </div>
                </v-expand-transition>
            </v-container>
        </div>
        <v-divider light />
        <div class="grey lighten-5">
            <v-container class="px-0">

                <v-layout wrap row>
                    <v-flex xs12 md9 class="px-2" style="min-height:300px">
                        <div style="display:flex" class="white hero-ba-ads mb-2">
                            <span style="display:inline-block" @click="resetFilter" class="py-3 px-2 subheading bt-hero1 bg-hero2 pointer hover v-ripple">
                                Results - <b>{{listing.length}}</b> items
                            </span>
                            <v-spacer></v-spacer>
                            <span class="mt-2">
                                <v-menu offset-y>
                                    <v-btn slot="activator" depressed dark small color="limeGreen"><v-icon size="19" class="mr-2">sort</v-icon>Sort By</v-btn>
                                    <v-list>
                                        <v-list-tile class="px-2" v-for="(sort, index) in sortBy" :key="index" @click="sort.click" style="cursor:pointer">
                                            <v-list-tile-title>
                                                {{sort.text}}
                                            </v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </span>
                        </div>

                        <Loader v-if="listing.length < 1" />
                        <Empty description="Its empty here! Try a less specific filter..." v-else-if="listing == 0">
                            <v-btn color="limeGreen" @click="resetFilter" dark round><v-icon left>restore</v-icon>Reset</v-btn>
                        </Empty>
                        <div v-else>
                            <template v-for="(item, index) in listing">
                                <v-card v-ripple flat :key="index" class="mb-3 bb-hero1 hero-ba-ads pointer" @click="router(item.id)">
                                    <v-card-text class="pa-1">
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
                                                <div class="headline text-capitalize font-weight-medium text-truncate mb-2">{{item.data.title}}</div>
                                                <div class="subheading mb-2"><v-icon size="20">place</v-icon> {{item.data.street+', '+item.data.area+', '+item.data.state}}</div>
                                                <div class="title font-weight-medium hero--text-1 mb-3">
                                                    <v-avatar size="30" class="mr-2"><img src="/img/cash.png"></v-avatar>
                                                    &#8358;{{Math.abs(item.data.price).toLocaleString('en-US')}}
                                                </div>
                                                <div class="text-truncate my-2">
                                                    <span class="caption"><v-icon size="17">verified_user</v-icon> For {{item.data.purpose}}</span>
                                                    <span class="caption ml-3 text-truncate"><v-icon size="17">local_hotel</v-icon> {{item.data.bedroom}} bedroom | <v-icon size="17">hot_tub</v-icon> {{item.data.bathroom}} bath</span>
                                                </div>
                                                <div class="text-truncated my-2">
                                                    <span class="caption"><v-icon size="17">visibility</v-icon> {{item.data.views ? item.data.views : 0}} view</span>
                                                </div>
                                                <p class="body-1 mb-0">{{item.data.description.substr(0, 200)}}...</p>
                                                <div style="display:flex">
                                                    <v-chip label dark class="text-trucate mt-3" color="grey darken-1" small>{{item.data.category}}  <v-icon size="15" class="mx-1">arrow_forward</v-icon> {{item.data.subCategory}}</v-chip>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-divider light />
                                    <div class="pa-2" style="display:flex">
                                        <v-spacer></v-spacer>
                                        <span class="grey--text caption text-truncate"><v-icon size="15">access_time</v-icon> {{timeManager(item.data.createdOn)}}</span>
                                    </div>
                                </v-card>

                                <v-img v-if="(index+1)/3 == 1 && $store.getters.inlineAds.length > 0" @click="launch($store.getters.inlineAds[0].link)" class="pointer mb-2 mx-auto" :src="$store.getters.inlineAds[0].album" max-width="800px" contain></v-img>
                            </template>

                            <div class="text-xs-center py-3 mb-3">
                                <v-btn @click="loadMore" v-show="showBtn" :loading="loadingMore" dark color="limeGreen">Load More</v-btn>
                            </div>
                        </div>
                    </v-flex>
                    <v-flex xs12 md3 class="px-2 hidden-sm-and-down">
                        <v-card flat class="mb-3 pt-3  text-xs-center hero-ba-ads">
                            <v-card-text>
                                <div class="title mb-2">Not finding what you're looking for?</div>
                                <div class="subheading font-weight-regular mb-3">Post a request, reputable agents will get in touch if and when property is avaliable</div>
                                <v-btn @click="$store.state.reqFormState = !$store.state.reqFormState" dark color="limeGreen"><v-icon size="19" class="mr-2">comment</v-icon>Make a Request</v-btn>
                            </v-card-text>
                        </v-card>
                        <v-card flat v-for="(ad, i) in $store.getters.sideBar.slice(0, 2)" :key="i" class="hero-ba-ads mb-4">
                            <v-img 
                                @click="launch(ad.link)"
                                :src="ad.album"
                                :lazy-src="ad.album"
                                aspect-ratio="1.3"
                                class="grey lighten-2"
                                >
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
                            <div class="px-1 caption"><v-icon size="15">event</v-icon> Sponsored by {{ad.owner}}</div>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import Empty from '../components/VEmpty.vue'
export default {
    components: {
        Loader,
        Empty
    },
    data() {
        return {
            //filter: (window.innerWidth > 1264),
            filter: true,
            option: [
                'Sale',
                'Rent'
            ],
            listing: [],
            purpose: "",
            categoryList: [
                {category: 'Co-working Space', subCategory: ['Conference Room', 'Desk', 'Meeting Room', 'Private Office', 'Workstation']},
                {category: 'Commercial Property', subCategory: ['Event Center', 'Factory', 'Hotel/Guest House', 'Office Space', 'School', 'Shop', 'Shop in a Mall', 'Show Room', 'Warehouse']},
                {category: 'Flat/Apartment', subCategory: ['Boys Quarters', 'Mini-flat', 'Penthouse', 'Self Contain', 'Shared Apartment', 'Studio Apartment']},
                {category: 'House', subCategory: ['Blocks of Flats', 'Detached Bungalow', 'Detached Duplex', 'Massionette', 'Semi-Detached Bungalow', 'Semi-Detached Duplex', 'Terraced Bungalow', 'Terraced Duplex']},
                {category: 'Land', subCategory: ['Commercial Land', 'Industrial Land', 'Joint-Venture Land', 'Mixed-Use Land', 'Residential land']},
            ],
            category: "",
            subCat: "",
            min: "",
            max: "",
            limit: 8,
            nextQuery: null,
            loadingMore: false,
            region: "",
            filtering: false,
            showBtn: true,
            firstTime: true,
            sortBy: [
                {text: "Most Recent", click: ()=> {
                    this.sortOrder = "desc"
                    this.sortControl = "createdOn"
                    this.makeSort()
                }},
                {text: "Most Viewed", click: ()=> {
                    this.sortOrder = "desc"
                    this.sortControl = "views"
                    this.makeSort()
                }},
                {text: "Lowest Price", click: ()=> {
                    this.sortControl = "price"
                    this.sortOrder = "asc"
                    this.makeSort()
                }},
            ],
            sortControl: "createdOn",
            sortOrder: "desc",
            state: ""
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
            if (this.category !== "") {
                temp = this.categoryList.filter(item => {
                    return item.category == this.category
                })

                temp = temp[0].subCategory
            } else {
                var temp = []
                this.categoryList.forEach(item => {
                    item.subCategory.forEach(subItem => {
                        temp.push(subItem)
                    })
                })
            }
            return temp
        },
        filterRef() {
            var property = this.$store.state.db.collection("property").where("active", "==", true)

            if (this.purpose) {
                property = property.where("purpose", "==", this.purpose)
            }
            if (this.category) {
                property = property.where("category", "==", this.category)
            }
            if (this.subCat) {
                property = property.where("subCategory", "==", this.subCat)
            }
            if (this.area) {
                property = property.where("state", "==", this.area)
            }
            if (this.region) {
                property = property.where("local", "==", this.region)
            }
            if (this.min) {
                this.min = Math.abs(this.min)
                property = property.where("price", ">=", this.min)
            } else if(this.max) {
                this.max =Math.abs(this.max)
                property = property.where("price", "<=", this.max)
            }

            return property
        },
        pageTitle() {
            if (this.$route.params.type == "Sale") {
                return "Property & Houses For Sale in "+ (this.state ? this.state : 'Nigeria')
            } else if (this.$route.params.type == "Rent") {
                return "Property & Houses For Rent in "+ (this.state ? this.state : 'Nigeria')
            } else {
                return "Property & Houses in "+ (this.state ? this.state : 'Nigeria')
            }
        },
        compPurpose() {
            return this.$route.params.type;
        },
        regions() {
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
            } else {
                this.$store.state.locationBank.map(temp => {
                    temp.state.locals.map(item => {
                        var x = item.name
                        subTemp.push(x)
                    })
                })
            }

            return subTemp.sort((a,b) => a < b ? -1 : 1)
        }
    },
    methods: {
        router(data) {
            this.$router.push('/property/'+data)
        },
        getFilter() {
            this.showBtn = true
            this.filtering = true
            this.listing = []

            if (this.purpose) {
                //this.$router.push('/listings/'+this.purpose+'?category='+this.category+'&subCat='+this.subCat+'&region='+this.region+'&min='+this.min)
                this.$router.push('/listings/'+this.purpose)
            } else {
                //this.$router.push('/listings?category='+this.category+'&subCat='+this.subCat+'&region='+this.region+'&min='+this.min)
                this.$router.push('/listings')
            }

            this.filterRef.limit(20).get()
            .then(documentSnapshots => {
                var document
                documentSnapshots.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.listing.push(document)
                });

                this.filtering = false

                var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
                if (lastVisible) {
                    this.nextQuery = this.filterRef.startAfter(lastVisible).limit(30)
                    this.showBtn = true
                } else {
                    this.showBtn = false
                }
                if(this.listing.length < 1) {
                    this.listing = 0
                }

            })
            .catch(err => {
                this.listings = 0
                this.filtering = false
                console.log(err)
            })
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
                });

                this.loadingMore = false

                if (this.purpose) {
                    var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
                    if (lastVisible) {
                        this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true)
                        .where("purpose", "==", this.purpose)
                        .orderBy("type", "desc")
                        .orderBy("boost", "desc")
                        .orderBy(this.sortControl, this.sortOrder)
                        .startAfter(lastVisible)
                        .limit(this.limit)
                        this.showBtn = true
                    } else {
                        this.showBtn = false
                    }
                } else {
                    var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
                    if (lastVisible) {
                        this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true)
                        .orderBy("type", "desc")
                        .orderBy("boost", "desc")
                        .orderBy(this.sortControl, this.sortOrder)
                        .startAfter(lastVisible)
                        .limit(this.limit)
                        this.showBtn = true
                    } else {
                        this.showBtn = false
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        timeManager(timeStamp) {
            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            var currentDate = new Date().toLocaleDateString("en-US", options)
            var date = new Date(timeStamp).toLocaleDateString("en-US", options)
            var time = new Date(timeStamp).toLocaleTimeString("en-US")

            if (currentDate == date) {
                return time
            } else {
                return date
            }

        },
        makeSort() {
            this.listing = []
            if (this.$route.query.search) {
                this.subCat = this.$route.query.search
                if (this.$route.query.type == "Sale") {
                    this.purpose = 'Sale'
                } else if(this.$route.query.type == "Rent") {
                    this.purpose = 'Rent'
                }

                if (this.purpose) {
                    var property = this.$store.state.db.collection("property").where("purpose", "==", this.purpose).where("active", "==", true)
                    .where("subCategory", "==", this.$route.query.search)
                    .orderBy("type", "desc")
                    .orderBy(this.sortControl, this.sortOrder)
                    .limit(20)
                } else {
                    var property = this.$store.state.db.collection("property").where("active", "==", true)
                    .where("subCategory", "==", this.$route.query.search)
                    .orderBy("type", "desc")
                    .orderBy(this.sortControl, this.sortOrder)
                    .limit(20)
                }

                property.get()
                .then((querySnapshot) => {
                    var document
                    querySnapshot.forEach((doc) => {
                        document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        this.listing.push(document)
                    });
                    this.showBtn = false

                    if(this.listing.length < 1) {
                        this.listing = 0
                    }
                })
                .catch((error) => {
                    this.listing = 0
                    console.log("Error getting documents: ", error);
                });
            } else {
                if (this.$route.params.type == "Sale") {
                    this.purpose = 'Sale'
                } else if(this.$route.params.type == "Rent") {
                    this.purpose = 'Rent'
                }

                if (this.purpose) {
                    var property = this.$store.state.db.collection("property").where("purpose", "==", this.purpose).where("active", "==", true)
                    .orderBy("type", "desc")
                    .orderBy(this.sortControl, this.sortOrder)
                    .limit(this.limit)
                } else {
                    var property = this.$store.state.db.collection("property").where("active", "==", true)
                    .orderBy("type", "desc")
                    .orderBy(this.sortControl, this.sortOrder)
                    .limit(this.limit)
                }

                property.get()
                .then((querySnapshot) => {
                    var document
                    querySnapshot.forEach((doc) => {
                        document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        this.listing.push(document)
                    });

                    if (this.purpose) {
                        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                        if (lastVisible) {
                            this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true)
                            .where("purpose", "==", this.purpose).orderBy("type", "desc").orderBy(this.sortControl, this.sortOrder)
                            .startAfter(lastVisible)
                            .limit(this.limit)
                            this.showBtn = true
                        } else {
                            this.showBtn = false
                        }
                    } else {
                        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                        if (lastVisible) {
                            this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true).orderBy("type", "desc").orderBy(this.sortControl, this.sortOrder)
                            .startAfter(lastVisible)
                            .limit(this.limit)
                            this.showBtn = true
                        } else {
                            this.showBtn = false
                        }
                    }

                    if(this.listing.length < 1) {
                        this.listing = 0
                    }
                })
                .catch((error) => {
                    this.listing = 0
                    console.log("Error getting documents: ", error);
                });
            }
        },
        resetFilter() {
            this.category = ""
            this.subCat = ""
            this.region = ""
            this.max = ""
            this.min = ""
            this.sortControl = "createdOn"
            this.sortOrder = "desc"
            this.state = ""
            this.$router.push('/listings')
            this.getProperty()
        },  
        launch(link) {
          window.open(link, '_blank')
        },
        getProperty() {
            this.listing = []
            if (this.purpose) {
                    var property = this.$store.state.db.collection("property").where("purpose", "==", this.purpose).where("active", "==", true)
                    .orderBy("type", "desc")
                    .orderBy("boost", "desc")
                    .orderBy("createdOn", "desc")
                    .limit(this.limit)
                } else {
                    var property = this.$store.state.db.collection("property").where("active", "==", true)
                    .orderBy("type", "desc")
                    .orderBy("boost", "desc")
                    .orderBy("createdOn", "desc")
                    .limit(this.limit)
                }
                
                property.get()
                .then((querySnapshot) => {
                    var document
                    querySnapshot.forEach((doc) => {
                        document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        this.listing.push(document)
                    });

                    if (this.purpose) {
                        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                        if (lastVisible) {
                            this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true)
                            .where("purpose", "==", this.purpose).orderBy("type", "desc")
                            .orderBy("type", "desc")
                            .orderBy("boost", "desc")
                            .orderBy("createdOn", "desc")
                            .startAfter(lastVisible)
                            .limit(this.limit)
                            this.showBtn = true
                        } else {
                            this.showBtn = false
                        }
                    } else {
                        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                        if (lastVisible) {
                            this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true)
                            .orderBy("type", "desc")
                            .orderBy("boost", "desc")
                            .orderBy("createdOn", "desc")
                            .startAfter(lastVisible)
                            .limit(this.limit)
                            this.showBtn = true
                        } else {
                            this.showBtn = false
                        }
                    }
                })
                .catch((error) => {
                    this.listing = 0
                    console.log("Error getting documents: ", error);
                })
        }
    },
    created() {
        var self = this
        if (this.$route.query.search) {
            this.category = this.$route.query.search
            if (this.$route.query.area) {
                this.state = this.$route.query.area
            }
            if (this.$route.query.type == "Sale") {
                this.purpose = 'Sale'
            } else if(this.$route.query.type == "Rent") {
                this.purpose = 'Rent'
            }

            var property

            if (this.purpose) {
                property = this.$store.state.db.collection("property").where("purpose", "==", this.purpose).where("active", "==", true)
                .where("category", "==", this.$route.query.search)
                .orderBy("type", "desc")
                .orderBy('createdOn', "desc")
                .limit(30)
            } else {
                property = this.$store.state.db.collection("property").where("active", "==", true)
                .where("category", "==", this.$route.query.search)
                .orderBy("type", "desc")
                .orderBy('createdOn', "desc")
                .limit(30)
            }

            property.get()
            .then((querySnapshot) => {
                var document
                querySnapshot.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.listing.push(document)
                });
                this.showBtn = false

                if(this.listing.length < 1) {
                    this.listing = 0
                }
            })
            .catch((error) => {
                this.listing = 0
                console.log("Error getting documents: ", error);
            });
        } else {
            if (this.$route.params.type == "Sale") {
                this.purpose = 'Sale'
            } else if(this.$route.params.type == "Rent") {
                this.purpose = 'Rent'
            }

            if (this.purpose) {
                var property = this.$store.state.db.collection("property").where("purpose", "==", this.purpose)
                .where("active", "==", true)
                .orderBy("type", "desc")
                .orderBy("boost", "desc")
                .orderBy('createdOn', "desc")
                .limit(this.limit)
            } else {
                var property = this.$store.state.db.collection("property").where("active", "==", true)
                .orderBy("type", "desc")
                .orderBy("boost", "desc")
                .orderBy('createdOn', "desc")
                .limit(this.limit)
            }

            property.get()
            .then((querySnapshot) => {
                var document
                querySnapshot.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.listing.push(document)
                });

                if (this.purpose) {
                    var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                    if (lastVisible) {
                        this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true)
                        .where("purpose", "==", this.purpose)
                        .orderBy("type", "desc")
                        .orderBy("boost", "desc")
                        .orderBy("createdOn", "desc")
                        .startAfter(lastVisible)
                        .limit(this.limit)
                        this.showBtn = true
                    } else {
                        this.showBtn = false
                    }
                } else {
                    var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                    if (lastVisible) {
                        this.nextQuery = this.$store.state.db.collection("property").where("active", "==", true)
                        .orderBy("type", "desc")
                        .orderBy("boost", "desc")
                        .orderBy("createdOn", "desc")
                        .startAfter(lastVisible)
                        .limit(this.limit)
                        this.showBtn = true
                    } else {
                        this.showBtn = false
                    }
                }

                if(this.listing.length < 1) {
                    this.listing = 0
                }
                if (this.listing.length < this.limit) {
                    this.showBtn = false
                } else {
                    this.showBtn = true
                }
            })
            .catch((error) => {
                this.listing = 0
                console.log("Error getting documents: ", error);
            });
        }
         
        this.firstTime = false
    },
    watch:  {
        compPurpose(data) {
            this.loadingMore = false
            this.purpose = data
            if(!this.firstTime) {
                this.getProperty()
            }
        }
    }
}
</script>
