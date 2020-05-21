<template>
    <div>
        <v-img  src="/img/aerial.jpg" class="relative" aspect-ratio="4.5">
            <div class="overlapper"></div>
            <v-container fill-height fluid class="pa-0 relative">
                <v-card v-if="agent.length < 1" color="white" class="my-4 mx-auto" dark style="max-width: 500px">
                    <v-card-text class="grey--text">
                        Getting Agent details...
                        <v-progress-linear
                            indeterminate
                            color="limeGreen"
                            class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
                <v-layout v-else fill-height column class="lightbox white--text text-xs-center">
                    <v-spacer></v-spacer>

                    <v-flex shrink class="mt-3">
                        <v-avatar tile class="elevation-5 white" size="150">
                            <img v-if="agent.displayPhoto" :src="agent.displayPhoto" class="border-white">
                            <img v-else src="/img/unknown.png" class="border-white">
                        </v-avatar>
                    </v-flex>

                    <v-flex shrink class="mb-2">
                        <div class="display-1 font-weight-bold hero-text mt-3 hidden-sm-and-down">{{agent.name}}</div>
                        <div class="headline font-weight-bold hero-text mt-3 hidden-md-and-up">{{agent.name}}</div>
                    </v-flex>
                    <v-flex shrink class="mb-3">
                        <v-btn dark color="limeGreen" @click="agentData = !agentData"><v-icon size="19" left>phone</v-icon> View Contact</v-btn>
                        <!-- <v-btn color="white"><v-icon size="19" left>warning</v-icon> Report Agent</v-btn> -->
                    </v-flex>
                    <v-spacer></v-spacer>
                </v-layout>
            </v-container>
        </v-img>
        <v-expansion-panel>
            <v-expansion-panel-content>
                <div slot="header" v-if="agent.companyName" class="text-xs-center title font-weight-medium"><v-icon class="mr-2">domain</v-icon> About Us</div>
                <v-card>
                    <v-card-text class="px-4 subheading">
                        <v-container class="pa-0">
                            <div class="mb-3">
                                <span class="font-weight-medium subheading mr-2 error--text">Company Name:</span>
                                <div class="title font-weight-regular mt-2">{{agent.companyName}}</div>
                            </div>
                            <div class="mb-3">
                                <span class="font-weight-medium subheading mr-2 error--text">Company Address</span>
                                <div class="title font-weight-regular mt-2">{{agent.address}}</div>
                            </div>
                            <div>
                                <div class="font-weight-medium subheading mb-1 error--text"> Company Specialization</div>
                                {{agent.about}}
                            </div>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider light />

        <div class="grey lighten-5">
            <v-container fluid grid-list-sm class="py-0 pt-2">
                <v-toolbar flat class="my-2" style="background: inherit">
                    <v-toolbar-title class="font-weight-medium grey--text-darken-3">
                        All Listings by Agent
                    </v-toolbar-title>

                    <v-spacer></v-spacer>
                    <div class="font-weight-medium subheading"><v-icon>search</v-icon> {{listing.length}}</div>
                </v-toolbar>

                <v-layout row wrap style="min-height:300px">
                    <v-flex v-if="listing === 0">
                        <Empty description="This agent hasn't uploaded any property yet..." />
                    </v-flex>
                    
                    <v-flex v-else-if="listing.length < 1">
                        <Loader/>
                    </v-flex>
                    <v-flex v-else v-for="(item, index) in listing" :key="index" xs12 sm6 lg3 class="px-2" >
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
                                                    <v-btn  @click="addFavourite(item.id)" class="hero-icon-bg" flat color="white" icon><v-icon size="25">
                                                        {{checkFavorite(item.data.admirers) ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
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
                                    <div class="title mt-2 text-truncate mb-2 font-weight-medium text-capitalize">{{item.data.title}}</div>
                                    <div class="body-1 mb-2 mr-1 text-truncate"><v-icon size="17">place</v-icon> {{item.data.street+', '+item.data.area+', '+item.data.local+', '+item.data.state}}</div>
                                    <span class="text-truncate">
                                        <span class="caption"><v-icon size="17">verified_user</v-icon> For Sale</span>
                                        <span class="caption ml-3 text-truncate"><v-icon size="17">local_hotel</v-icon> {{item.data.bedroom}} bedroom | <v-icon size="17">hot_tub</v-icon> {{item.data.bathroom}} bath</span>
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

                <div v-show="listing.length > 0" class="text-xs-center py-5">
                    <v-btn dark @click="loadMore" :loading="loadingMore" color="limeGreen">Load More</v-btn>
                </div>
            </v-container>
        </div>

        <v-dialog v-model="agentData" persistent max-width="400px">
            <v-toolbar card color="white">
                <v-avatar tile size="30"><img src="/img/admin.png"></v-avatar>
                <v-toolbar-title>Agent's Details</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="agentData = false">clear</v-icon>
            </v-toolbar>
            <v-card class="pa-3">
                <div class="text-xs-center">
                    <v-responsive>
                        <v-avatar size="80" class="grey lighten-2">
                            <img v-if="agent.displayPhoto" :src="agent.displayPhoto">
                            <img v-else src="/img/estate-agent2.png">
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="grey--text-darken-3 font-weight-medium title">{{agent.name}}</div>
                        <div v-if="agent.companyName" class="body-2 mt-1"><v-icon size="20" class="mr-1">domain</v-icon>{{agent.companyName}}</div>
                        <div class="mt-3"></div>
                        <v-chip color="grey darken-2" label>
                            <v-avatar tile color="grey darken-3" class="mr-2"><v-icon size="20" color="white">phone</v-icon></v-avatar> <span class="title font-weight-regular white--text">{{agent.mobile}}</span>
                        </v-chip>
                        <div v-if="agent.verified" class="mt-3 title">
                            <v-avatar
                              size="30"
                              class="mr-1"
                            >
                              <img src="/img/shield.png" alt="alt">
                            </v-avatar>
                            This Agent has been Verified
                        </div>
                    </v-card-text>
                </div>
                <v-card-actions>
                    <v-btn round  @click="call(agent.mobile)" depressed dark color="limeGreen">Call Now!</v-btn>
                    <v-btn round @click="chatWa(agent.mobile)" color="limeGreen darken-1" flat >Whatsapp</v-btn>
                </v-card-actions>
            </v-card>
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
    metaInfo: {
      title: "Agent Overview",
    },
    data() {
        return {
            actions: [
                {icon: "how_to_reg", click: "", name: "Contact details"},
                {icon: "warning", click: "", name: "Report Agent"}
            ],
            agentData: false,
            agent: [],
            listing: [],
            limit: 8,
            nextQuery: null,
            loadingMore: false,
            showBtn: true,
        }
    },
    created() {
        var urlId = this.$route.params.id
        var docRef = this.$store.state.db.collection("users").doc(urlId);
        docRef.get().then((doc) => {
            this.agent = doc.data()
            return this.agent.uid
        }).then(data => {
            // Fetches user's data from firestore
            var docRef = this.$store.state.db.collection("property");
            docRef.where("uid", "==", data).where("active", "==", true).orderBy("type", "desc").orderBy("createdOn", "desc").limit(this.limit).get()
            .then((querySnapshot) => {
                var document
                if (querySnapshot.empty) {
                    this.listing = 0
                } else {
                    querySnapshot.forEach((doc) => {
                        document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        this.listing.push(document)
                    });
                }

                var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
                this.nextQuery = this.$store.state.db.collection("property").where("uid", "==", data).where("active", "==", true).orderBy("type", "desc").orderBy("createdOn", "desc")
                .startAfter(lastVisible)
                .limit(this.limit)
            })
        }).catch((error) => {
            this.listing = 0
            this.$store.dispatch('setSnackText', "Unable to get agent's detail. Check internet connection!")
            this.$store.dispatch('setSnackState', true)
        });
    },
    methods: {
        router_alt(data) {
            this.$router.push('/property/'+data)
        },
        chatWa(num) {
            var merchantName = this.merchant == null ? 'Agent' : this.merchant.name
            var data = "Good day "+merchantName+", I'm interest in a property you posted... "+window.location.href
            var url = "https://wa.me/"+num+"?text="+ data
            window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
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

                var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
                this.nextQuery = this.$store.state.db.collection("property").where("uid", "==", this.agent.uid).where("active", "==", true).orderBy("type", "desc").orderBy("createdOn", "desc")
                .startAfter(lastVisible)
                .limit(this.limit)
                console.log(documentSnapshots)
            })
            .catch(err => {
                this.showBtn = false
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
        call(num){
            document.location.href="tel:"+num
        }
    }
}
</script>