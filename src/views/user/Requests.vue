<template>
    <div class="mb-4">
        <v-toolbar flat class="white hero-ba-ads">
            <v-toolbar-title class="font-weight-medium grey--text-darken-3">
                {{$route.name}}
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="font-weight-medium subheading"><v-icon>search</v-icon> {{requests.length}}</div>
        </v-toolbar>

        <Loader v-if="requests.length < 1"/>
        <div v-else-if="requests == 0" class="text-xs-center py-5">
             <v-avatar tile size="100"><img src="/img/request.png" /></v-avatar>
            <p class="headline font-weight-medium mt-3 mb-0">No client request was found...</p>
        </div>
        <div v-else class="main">
            <p class="py-3 text-xs-center mb-0 px-2 subheading hero-ba-ads white">Below are the recent property request made by clients! Please ensure to contact the clients...</p>
            <v-expansion-panel>
                <v-expansion-panel-content v-for="(request, index) in requests" :key="index">
                    <v-card class="elevation-0 mb-1"  slot="header">
                        <v-layout row wrap>
                            <v-flex xs12 md6 class="mb-2">
                                <div class="caption"></div>
                                <div class="subheading font-weight-medium">
                                    <v-avatar tile size="30" class="mr-2">
                                        <img src="/img/request2.png">
                                    </v-avatar>
                                    Request from 
                                    {{request.name}}
                                </div>
                            </v-flex>
                            <v-flex  xs6 sm5 md4>
                                <div class="caption grey--text">Purpose</div>
                                <div class="text-trucate">{{request.purpose}}</div>
                            </v-flex>
                            <v-flex  xs6 sm4 md2>
                                <div class="caption grey--text">Request Date</div>
                                <div>{{timeManager(request.createdOn)}}</div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-card class="mt-0">
                        <v-card-text class="px-4 pt-0">
                            <div class="font-weight-medium green--text subheading">Maximum Budget: &#8358;{{Math.abs(request.budget).toLocaleString('en-US')}}</div>
                            <div class="grey lighten-5 px-2 py-3 mt-1 subheading">{{request.description}}</div>
                            <div class="grey--text subheading mt-3">Client Contact</div>
                            <v-chip color="grey darken-2" label>
                                <v-avatar tile color="grey darken-3" class="mr-2"><v-icon size="20" color="white">phone</v-icon></v-avatar> <span class="subheading font-weight-regular white--text">{{request.contact}}</span>
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
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
            requests: []
        }
    },
    created() {
        var docRef = this.$store.state.db.collection("requests").orderBy("createdOn", "desc").limit(20)

        docRef.get().then((doc) => {
            if (doc.empty) {
                this.requests = 0
            } else {
                doc.forEach((doc) => {
                    this.requests.push(doc.data())
                });
            }
        }).catch((error) => {
          this.requests = 0
          this.$store.dispatch('setSnackText', "Unable to get Client Requests. Check internet connection!")
          this.$store.dispatch('setSnackState', true)
          console.log(error)
        });
    },
    methods: {
        timeManager(timeStamp) {
            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            var currentDate = new Date().toLocaleDateString("en-US", options)
            var date = new Date(timeStamp).toLocaleDateString("en-US", options)
            var time = new Date(timeStamp).toLocaleTimeString("en-US")

            if (currentDate == date) {
                return time+" Today"
            } else {
                return date
            }

        }
    }
}
</script>
