<template>
    <div>
        <v-toolbar flat class="white hero-ba-ads mb-2">
            <v-toolbar-title class="font-weight-medium grey--text-darken-3">
                {{$route.name}}
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="font-weight-medium subheading"><v-icon size="18">search</v-icon> {{listing.length}}</div>
        </v-toolbar>
        <Loader v-if="listing.length < 1" />
        <div v-else-if="listing === 0" class="text-xs-center py-5">
            <v-avatar tile size="170"><img src="/img/empty.svg" /></v-avatar>
            <p class="headline font-weight-medium mt-4 mb-0">You haven't added any item to your favorite list</p>
        </div>
        <div v-else>
            <v-card v-ripple flat class="mb-3 bb-hero1 hero-ba-ads" v-for="(item, index) in listing" :key="index" @click="router(item.id)">
                <v-card-text class="pa-1 pointer">
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
                            <div class="headline font-weight-medium text-capitalize text-truncate mb-2">{{item.data.title}}</div>
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
                                <span class="caption"><v-icon size="17">visibility</v-icon> {{item.data.views ? item.data.views : 0}} Views</span>
                            </div>
                            <p class="body-1 mb-0">{{item.data.description.substr(0, 200)}}...</p>
                            <div style="display:flex">
                                <v-chip label dark class="text-trucated mt-3" color="grey darken-1" small>{{item.data.category}}  <v-icon size="15" class="mx-1">arrow_forward</v-icon> {{item.data.subCategory}}</v-chip>
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

            <div class="text-xs-center py-3 mb-3">
                <v-btn dark color="limeGreen">Load More</v-btn>
            </div>
        </div>
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
            listing: []
        }
    },
    created() {
        var property = this.$store.state.db.collection("property")
         
        property.where("active", "==", true).where("admirers", "array-contains", localStorage.uid).limit(20).get()
        .then((querySnapshot) => {
            var document
            querySnapshot.forEach((doc) => {
                document = {
                    id: doc.id,
                    data: doc.data()
                }
                this.listing.push(document)
            });
            if (this.listing.length < 1) {
                this.listing = 0
            }
        })
        .catch((error) => {
            this.listing = 0
            console.log("Error getting documents: ", error);
        });
    },
    methods: {
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
        router(data) {
            this.$router.push('/property/'+data)
        }
    }
}
</script>
