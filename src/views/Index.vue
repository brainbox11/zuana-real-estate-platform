<template>
    <div class="">
        <v-img src="/img/hero-header.jpg" class="bb-hero1" aspect-ratio="3.2">
            <v-layout py-3 column bottom-gradient fill-height class="lightbox white--text text-xs-center">
                <v-spacer></v-spacer>
                <v-flex shrink>
                    <v-layout row wrap>
                        <v-flex xs12 md1></v-flex>
                        <v-flex x12 md10 class="px-2">
                            <div class="hidden-sm-and-down mt-4" style="width:100%">
                                <div class="display-2 font-weight-bold hero-text mx-auto" style="text-shadow:0px 0px 1px #111111;;max-width:900px">Search Properties Across South South and South East Nigeria</div>
                                <div class="ml-2 white--text text--lighten-4 title hero-text mt-3 mb-3">
                                    <span style="text-shadow:0px 0px 1px #111111">We're dedicated to helping you find the perfect property of your choice...</span>
                                </div>
                            </div>
                            <div class="hidden-md-and-up mt-4" style="width:100%">
                                <div class="display-1 font-weight-bold" style="text-shadow:0px 0px 1px #111111;">Search Properties Across South-South and South-East Nigeria</div>
                                <div class="ml-2 white--text text--lighten-4 body-2">
                                    <span style="text-shadow:0px 0px 1px #111111">We're dedicated to helping you find the perfect property of your choice...</span>
                                </div>
                            </div>
                        </v-flex>
                        <v-flex xs12 md1></v-flex>
                        <v-flex xs12 md2></v-flex>
                        <v-flex x12 md8>
                            <v-form @submit="search" ref="homeSearch" class="mt-2 px-3 pt-2 pb-2 mb-2">
                                <v-layout wrap row>
                                    <v-flex style="flex:0" class="hidden-xs-only">
                                            <v-select
                                            :items="option"
                                            style="width:90px;text-align-center;"
                                            label="Type"
                                            v-model="type"
                                            solo
                                            class="br-0 px-1"
                                            menu-props="offsetY"
                                            ></v-select>
                                    </v-flex>
                                    <v-flex grow>
                                        <v-autocomplete 
                                            :items="catList"
                                            solo
                                            :rules="inputRules"
                                            v-model="subCat"
                                            class="br-0 mx-1"
                                            label="What are you looking For?"
                                            ></v-autocomplete>
                                    </v-flex>
                                    <v-flex grow>
                                        <v-combobox 
                                            :items="stateList"
                                            v-model="area"
                                            solo
                                            class="br-0 mr-1"
                                            label="Where are you looking?"
                                            ></v-combobox>
                                    </v-flex>
                                </v-layout>
                                <div class="text-xs-center">
                                    <v-btn type="submit" dark color="limeGreen"><v-icon left>search</v-icon> Search</v-btn>
                                    <!-- <v-btn dark to="/about">Learn More</v-btn> -->
                                    
                                </div>
                            </v-form>
                        </v-flex>
                        <v-flex xs12 md2></v-flex>
                    </v-layout>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-img>

        <div class="pt-0 pb-3 white elevation-3">
            <v-container grid-list-sm fluid>
                <p class="headline font-weight-medium text-xs-center">
                    Featured Agents
                </p>
                <v-layout row wrap class="relative">
                    <span class="delimiter-left pointer"><v-icon>arrow_back</v-icon></span>
                    <span class="delimiter-right pointer"><v-icon>arrow_forward</v-icon></span>
                    <v-flex v-if="featuredAgent.length < 1">
                        <Loader/>
                    </v-flex>
                    <v-flex
                        v-else
                        v-for="(agent, index) in featuredAgent"
                        :key="index"
                        xs6 md4 lg2
                        d-flex
                        :class="(index > 3) ? 'hidden-sm-and-down' : ''"
                        >
                        <v-card v-ripple @click="agent.isPatch ? $router.push(agent.url) : router(agent.uid)" flat class="pointer d-flex elevation-0 hero-ba-ads mx-1 pa-1 relative mb-1">
                            <v-img 
                                :src="agent.displayPhoto ? agent.displayPhoto : '/img/unknown.png'"
                                :lazy-src="agent.displayPhoto ? agent.displayPhoto : '/img/unknown.png'"
                                contain
                                aspect-ratio="2"
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
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <v-divider></v-divider>

        <v-container fluid>
            <div>
                <p class="headline font-weight-bold mt-3 text-xs-center">
                    Properties For Sale <br>
                    ____
                </p>
                <v-container grid-list-sm fluid class="pa-0 pt-3">
                    <v-layout row wrap>
                        <v-flex v-if="forSale.length < 1">
                            <Loader/>
                        </v-flex>
                        <v-flex v-else-if="forSale == 0">
                            <Empty description="Its empty here! No property for sale found..." />
                        </v-flex>
                        <v-flex
                            v-else
                            v-for="(item, index) in forSale"
                            :key="index"
                            xs12 sm6 lg3 class="px-2"
                            >
                            <v-hover>
                                <v-card flat title  class="mb-3 bb-hero1 hero-ba-ads" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`">
                                    <v-img
                                        class="white--text grey"
                                        aspect-ratio="1.5"
                                        :src="item.data.album[0].link"
                                        :lazy-src="item.data.album[0].link"
                                        >
                                        <v-container class="pa-0" fill-height fluid>
                                            <v-layout column fill-height>
                                                <v-flex shrink>
                                                    <div style="display: flex">
                                                        <v-spacer></v-spacer>
                                                        <v-btn @click="addFavourite(item.id)" class="hero-icon-bg" flat color="white" icon>
                                                            <v-icon size="25">
                                                                {{checkFavorite(item.data.admirers) ? 'favorite' : 'favorite_border' }}
                                                            </v-icon>
                                                        </v-btn>
                                                    </div>
                                                </v-flex>
                                                <v-spacer></v-spacer>
                                                <v-flex shrink>
                                                    <div style="display: flex" class="title font-weight-regular hero-text-bg">
                                                        <span>Price:</span>
                                                        <v-spacer></v-spacer>
                                                        <span class="font-weight-medium">&#8358;{{Math.abs(item.data.price).toLocaleString('en-US')}}</span>
                                                    </div>
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
                                    <div v-ripple class="px-3 py-2 pointer" @click="router_alt(item.id)">
                                        <div class="title text-capitalize mt-2 text-truncate mb-2 font-weight-medium">{{item.data.title}}</div>
                                        <div class="body-1 mb-2 mr-1 text-truncate"><v-icon size="17">place</v-icon> {{item.data.street+', '+item.data.area+', '+item.data.local+', '+item.data.state}}</div>
                                        <span class="text-truncate">
                                            <span class="caption"><v-icon size="17">verified_user</v-icon> For Sale</span>
                                            <span v-show="item.data.bedroom && item.data.bathroom" class="caption ml-3 text-truncate"><v-icon size="17">local_hotel</v-icon> {{item.data.bedroom}} bedroom | <v-icon size="17">hot_tub</v-icon> {{item.data.bathroom}} bath</span>
                                        </span>
                                    </div>
                                    <v-card-actions>
                                        <v-btn router :to="'/property/'+item.id" small flat dark round color="limeGreen">View property</v-btn>
                                        <v-spacer></v-spacer>
                                        <span class="grey--text caption text-truncate"><v-icon size="15">access_time</v-icon> {{timeManager(item.data.createdOn)}}</span>
                                    </v-card-actions>
                                </v-card>
                            </v-hover>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
            <div class="text-xs-center py-3" v-show="forSale.length">
                <v-btn route to="/listings/Sale" dark large color="limeGreen">View More...</v-btn>
            </div>
        </v-container>
        <v-divider></v-divider>
        <v-container fluid class="pb-4">
            <div>
                <p class="headline font-weight-bold mt-3 text-xs-center">
                    Properties For Rent <br>
                    ____
                </p>
                <v-container grid-list-sm fluid class="pa-0 pt-3">
                    <v-layout row wrap>
                        <v-flex v-if="forRent.length < 1">
                            <Loader/>
                        </v-flex>
                        <v-flex v-else-if="forRent == 0">
                            <Empty description="Its empty here! No property for rent found..." />
                        </v-flex>
                        <v-flex
                            v-else
                            v-for="(item, index) in forRent"
                            :key="index"
                            xs12 sm6 lg3 class="px-2"
                            >
                            <v-hover>
                                <v-card flat title  class="mb-3 bb-hero1 hero-ba-ads" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`">
                                    <v-img
                                        class="white--text grey"
                                        aspect-ratio="1.5"
                                        :src="item.data.album[0].link"
                                        :lazy-src="item.data.album[0].link"
                                        >
                                        <v-container class="pa-0" fill-height fluid>
                                            <v-layout column fill-height>
                                                <v-flex shrink>
                                                    <div style="display: flex">
                                                        <v-spacer></v-spacer>
                                                        <v-btn @click="addFavourite(item.id)" class="hero-icon-bg" flat color="white" icon>
                                                            <v-icon size="25">
                                                                {{checkFavorite(item.data.admirers) ? 'favorite' : 'favorite_border' }}
                                                            </v-icon>
                                                        </v-btn>
                                                    </div>
                                                </v-flex>
                                                <v-spacer></v-spacer>
                                                <v-flex shrink>
                                                    <div style="display: flex" class="title font-weight-regular hero-text-bg">
                                                        <span>Price:</span>
                                                        <v-spacer></v-spacer>
                                                        <span class="font-weight-medium">&#8358;{{Math.abs(item.data.price).toLocaleString('en-US')}}</span>
                                                    </div>
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
                                    <div class="px-3 py-2 pointer" v-ripple @click="router_alt(item.id)">
                                        <div class="title mt-2 text-capitalize text-truncate mb-2 font-weight-medium">{{item.data.title}}</div>
                                        <div class="body-1 mb-2 mr-1 text-truncate"><v-icon size="17">place</v-icon> {{item.data.street+', '+item.data.area+', '+item.data.local+', '+item.data.state}}</div>
                                        <span class="text-truncate">
                                            <span class="caption"><v-icon size="17">verified_user</v-icon> For Rent</span>
                                            <span v-show="item.data.bedroom && item.data.bathroom" class="caption ml-3 text-truncate"><v-icon size="17">local_hotel</v-icon> {{item.data.bedroom}} bedroom | <v-icon size="17">hot_tub</v-icon> {{item.data.bathroom}} bath</span>
                                        </span>
                                    </div>
                                    <v-card-actions>
                                        <v-btn router :to="'/property/'+item.id" small flat dark round color="limeGreen">View property</v-btn>
                                        <v-spacer></v-spacer>
                                        <span class="grey--text caption text-truncate"><v-icon size="15">access_time</v-icon> {{timeManager(item.data.createdOn)}}</span>
                                    </v-card-actions>
                                </v-card>
                            </v-hover>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
            <div class="text-xs-center py-3" v-show="forRent.length">
                <v-btn route to="/listings/Rent" dark large color="limeGreen">View More...</v-btn>
            </div>
        </v-container>
        <v-divider></v-divider>

        <div class="pb-5 pt-3 grey lighten-5" id="features">
            <div class="overlay"></div>
            <v-container fluid style="position:relative">
                <p class="headline font-weight-bold text-xs-center">
                    Hassle Free Property Search... <br>
                    ____
                </p>
                <v-container grid-list-sm class="pa-0 pt-3">
                    <v-layout row wrap>
                        <v-flex
                            v-for="item in hassle"
                            :key="item.title"
                            xs12 sm6 class="px-3 py-2"
                            >
                            <v-hover>
                                <v-card flat class="px-3 py-4 mb-3" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`">
                                    <v-layout>
                                        <v-flex class="mr-3">
                                            <v-avatar tile size="60" class="white">
                                                <img :src="item.img">
                                            </v-avatar>
                                        </v-flex>
                                        <v-flex>
                                            <div class="title mb-2 white--tex font-weight-bold">{{item.title}}</div>
                                            <div class="subheading white--tex">{{item.text}}</div>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-hover>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-container>
        </div>

        <div class="white">
            <v-container fluid class="">
                <v-card flat  tile class="py-1 white">
                    <v-layout wrap row>
                        <v-flex md4 >
                            <div class="text-xs-center">
                                <v-avatar tile size="150">
                                    <img src="/img/new-product.png">
                                </v-avatar>
                            </div>
                        </v-flex>
                        <v-flex md8  class="pt-3 text-xs-center text-md-left">
                            <p class="headline hidden-md-and-up font-weight-medium">Are you an estate Agent? or property owner? Post your property for Free</p>
                            <p class="display-1 hidden-sm-and-down font-weight-regular">Are you an estate Agent? or property owner? Post your property for Free</p>
                            <v-btn route to="/post" color="limeGreen" round dark><v-icon class="mr-2">unarchive</v-icon> Post a Property!</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-container>
            <v-divider dark></v-divider>
        </div>
        
        <!-- Popup ad -->
        <v-dialog v-if="$store.getters.popUpAds.length > 0" v-model="popUp" class="elevation-0" max-width="600px" >
          <template>
              <div class="text-xs-right"><v-btn icon flat @click="popUp = !popUp"><v-icon size="30" color="white">clear</v-icon></v-btn></div>
              <v-img @click="launch($store.getters.popUpAds[0].link)" :src="$store.getters.popUpAds[0].album" a contain>
              </v-img>
          </template>
        </v-dialog>
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
    data () {
      return {
        popUp: false,
        items: [
          'Imo State',
        ],
        option: [
            'Sale',
            'Rent'
        ],
        findIn: [
            {title:'Houses', img:'/img/home.png', link: ''},
            {title:'Flat & Apartment', img:'/img/apartment.png', link: ''},
            {title:'Shops', img:'/img/store.png', link: ''},
            {title:'Lands', img:'/img/forest.png', link: ''},
        ],
        featuredAgent: [],
        forSale: [],
        forRent: [],
        categoryList: [
            {category: 'Co-working Space', subCategory: ['Conference Room', 'Desk', 'Meeting Room', 'Private Office', 'Workstation']},
            {category: 'Commercial Property', subCategory: ['Event Center', 'Factory', 'Hotel/Guest House', 'Office Space', 'School', 'Shop', 'Shop in a Mall', 'Show Room', 'Warehouse']},
            {category: 'Flat/Apartment', subCategory: ['Boys Quarters', 'Mini-flat', 'Penthouse', 'Self Contain', 'Shared Apartment', 'Studio Apartment']},
            {category: 'House', subCategory: ['Blocks of Flats', 'Detached Bungalow', 'Detached Duplex', 'Massionette', 'Semi-Detached Bungalow', 'Semi-Detached Duplex', 'Terraced Bungalow', 'Terraced Duplex']},
            {category: 'Land', subCategory: ['Commercial Land', 'Industrial Land', 'Joint-Venture Land', 'Mixed-Use Land', 'Residential land']},
        ],
        subCat: "",
        area: "",
        inputRules: [
            v => (v && v.length !== '' && v.length >= 1) || ''
        ],
        type: '',
        hassle: [
            {title:'Search for properties with ease', img:'/img/seo.png', text: "We've made the process involved in your property search easy. Search for your perfect property from any device."},
            {title:'Be the first to know', img:'/img/promotion.png', text: 'Intelligent, non-intrusive on-time notification when your most ideal home or house comes to market.'},
            {title:'Make informed decision', img:'/img/decision.png', text: 'Buying or renting a property is a critical decision. Be armed with enough and relevant information.'},
            {title:'Find genuine real estate pros', img:'/img/admin.png', text: 'Curated list of reputable real estate agents you can consult for professional services.'},
        ],
        patchUp: [
            {"displayPhoto": "/img/premium.png", "isPatch": true, "url": "/featured-agent-advert"},
            {"displayPhoto": "/img/premium.png", "isPatch": true, "url": "/featured-agent-advert"},
            {"displayPhoto": "/img/premium.png", "isPatch": true, "url": "/featured-agent-advert"},
            {"displayPhoto": "/img/premium.png", "isPatch": true, "url": "/featured-agent-advert"},
            {"displayPhoto": "/img/premium.png", "isPatch": true, "url": "/featured-agent-advert"},
            {"displayPhoto": "/img/premium.png", "isPatch": true, "url": "/featured-agent-advert"},
        ],
        featuredLimit: 6
      }
    },
    computed: {
        subCategoryList() {
            var temp = []
            this.categoryList.forEach(item => {
                item.subCategory.forEach(subItem => {
                    temp.push(subItem)
                })
            })
            return temp
        },
        catList() {
            var temp = []
            var x = ''
            this.categoryList.map(item => {
                x = item.category
                temp.push(x)
            })
            return temp
        },
        stateList() {
            var temp = []
            var x = ''
            this.$store.state.locationBank.forEach(item => {
                x = item.state.name
                temp.push(x)
            })
            return temp
        }
    },
    created() {
        this.sortCat()
        var property = this.$store.state.db.collection("property")
         
        property.where("active", "==", true).where("purpose", "==", "Sale")
        .orderBy("type", "desc")
        .orderBy("boost", "desc")
        .orderBy("createdOn", "desc")
        .limit(4).get()
        .then((querySnapshot) => {
            this.forSale = []
            if (querySnapshot.empty) {
                this.forSale = 0
            } else {
                var document
                querySnapshot.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.forSale.push(document)
                });
            }
        })
        .catch((error) => {
            this.forSale = 0
            console.log("Error getting documents: ", error);
        });

        property.where("active", "==", true).where("purpose", "==", "Rent")
        .orderBy("type", "desc")
        .orderBy("boost", "desc")
        .orderBy("createdOn", "desc")
        .limit(4).get()
        .then((querySnapshot) => {
            this.forRent = []
            if (querySnapshot.empty) {
                this.forRent = 0
            } else {
                var document
                querySnapshot.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.forRent.push(document)
                });
            }
        })
        .catch((error) => {
            this.forRent = 0
            console.log("Error getting documents: ", error);
        });

        // Fetches featured agents
        var users = this.$store.state.db.collection("users")
         
        users.where("type", "==", 'Agent').where("featured", "==", 1).orderBy("createdOn").limit(12).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.featuredAgent.push(doc.data())
            })
            this.argumentAgents(this.featuredAgent)
            this.shuffle()
            //console.log(this.featuredAgent)
        })
        .catch((error) => {
            this.featuredAgent = 0
            console.log("Error getting documents: ", error);
        });
    },
    methods: {
        router(data) {
            this.$router.push('/agent/'+data)
        },
        router_alt(data) {
            this.$router.push('/property/'+data)
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
        search(e) {
            e.preventDefault()
            if(this.$refs.homeSearch.validate()){
                this.$router.push({ path: 'listings/'+this.type, query: { search: this.subCat, area: this.area } })
            } else {
                this.$store.dispatch('setSnackText', "Search field is required!")
                this.$store.dispatch('setSnackState', true)
            }
        },
        checkFavorite(data) {
            if(data) {
                if (this.$store.state.userData.uid) {
                    return data.includes(this.$store.state.userData.uid)
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        sortCat() {
            this.subCategoryList.sort((a,b) => a < b ? -1 : 1)
        },
        addFavourite(id) {
            if (this.$store.state.loggedIn) {
                var property = this.$store.state.db.collection("property").doc(id)
                var added = true
            
                this.$store.state.db.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(property)
                    .then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "Document does not exist!";
                        }
                        
                        if (sfDoc.data().admirers) {
                            var temp = sfDoc.data().admirers;

                            if (temp.includes(this.$store.state.userData.uid)) {
                                temp = temp.filter(item => {
                                    item !== this.$store.state.userData.uid
                                })
                                added = false
                            } else {
                                temp.push(this.$store.state.userData.uid)
                            }
                        } else {
                            var temp = []
                            temp.push(this.$store.state.userData.uid)
                        }
                        transaction.update(property, { admirers: temp })
                    })
                    .then(() => {
                        if (added) {
                            this.$store.dispatch('setSnackText', "1 item added to your Favorites")
                        } else {
                            this.$store.dispatch('setSnackText', "1 item removed to your Favorites")
                        }
                        this.$store.dispatch('setSnackState', true)
                    })
                    .catch(err => {
                        this.$store.dispatch('setSnackText', err)
                        this.$store.dispatch('setSnackState', true)
                        console.log(err)
                    })
                })
            } else {
                this.$store.dispatch('setSnackText', "You must be logged in to favorite a property!")
                this.$store.dispatch('setSnackState', true)
            }
        },
        launch(link) {
          window.open(link, '_blank')
        },
        argumentAgents(data) {
            let limit = this.featuredLimit
            let dataLength = data.length
            let gap = limit - dataLength

            if (gap > 0) {
                let patch = this.patchUp.slice(0, gap)
                patch.forEach(item => {
                    this.featuredAgent.push(item)
                })
            }
        },
        shuffle() {
            let counter = this.featuredAgent.length

            if (counter > this.featuredLimit) {
                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    let index = Math.floor(Math.random() * counter);

                    // Decrease counter by 1
                    counter--;

                    // And swap the last element with it
                    let temp = this.featuredAgent[counter];
                    this.featuredAgent[counter] = this.featuredAgent[index];
                    this.featuredAgent[index] = temp;
                }
            }
        }
    },
    mounted() {
        var self = this
        // Setup background timer
        setTimeout(() => {
          self.popUp = true
          setInterval(() => {
            self.popUp = true
          }, 300000)
        }, 15000)

        // window.addEventListener("resize", () => {
        //     if (window.innerWidth > 1263) {
        //         this.featuredLimit = 6
        //     } else if(window.innerWidth < 1263 && window.innerWidth > 959) {
        //         this.featuredLimit = 3
        //     } else {
        //         this.featuredLimit = 2
        //     }
        // });
    }
}
</script>

<style scoped>
    .bg-white {
        background: rgba(255, 255, 255, 0.97);
    }
    .br-0 {
        border-radius:0px!important;
    }
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        position: absolute;
        width: 100%;
        border-radius: 10px;
    }
    #features {
        background: url('/img/retail-boulevard-banner1.jpg');
        background-size: cover;
        position: relative;
        color: #fff!important;
    }
    #features > div.overlay {
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
