<template>
    <div>
        <div class="white">
            <v-container class="pa-0">
                <v-toolbar flat class="pt-2 white">
                    <v-toolbar-title class="headline hidden-sm-and-down font-weight-medium grey--text-darken-3">
                        <v-btn icon>
                            <v-avatar tile size="30">
                                <img src="/img/estate-agent.png">
                            </v-avatar>
                        </v-btn>
                        {{$route.name}}
                    </v-toolbar-title>
                    <v-toolbar-title class="title hidden-md-and-up ml-0 pl-0 font-weight-medium grey--text-darken-3">
                        <v-btn icon>
                            <v-avatar tile size="30">
                                <img src="/img/estate-agent.png">
                            </v-avatar>
                        </v-btn>
                        {{$route.name}}
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn flat icon><v-icon size="30">more_vert</v-icon></v-btn>
                </v-toolbar>
            </v-container>
        </div>
        <v-divider light />

        <div style="min-height:500px">
            <Loader v-if="agents.length < 1"/>
            <Empty description="Its empty here! No agent was found..." v-else-if="agents == 0" />
            <v-container v-else grid-list-sm>
                <div class="title mt-2 mb-4 px-2"><v-icon>find_in_page</v-icon> {{agents.length}} Agents found</div>
                <v-layout row wrap>
                    <v-flex
                        v-for="(agent, index) in agents"
                        :key="index"
                        xs6 sm4 md3
                        class="mb-2"
                        >
                        <v-card flat class="grey lighten-5 mx-1 pa-1 pointer relative" v-ripple @click="$router.push('/agent/'+agent.uid)">
                            <v-img 
                                :src="agent.displayPhoto ? agent.displayPhoto : '/img/unknown.png'"
                                :lazy-src="agent.displayPhoto ? agent.displayPhoto : '/img/unknown.png'"
                                contain
                                aspect-ratio="1.2"
                                class="grey lighten-2"
                                >
                                <span v-if="agent.verified" class="body-2 font-weight-medium white--text hero-text-ads2"><v-avatar tile size="25"><img src="/img/medal.png"></v-avatar> <span class="hidden-xs-only ml-2">Verified</span></span>

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
                            <v-card-text class="text-truncate pa-2 white text-xs-center hero-ba-ads font-weight-medium subheading">
                                {{agent.name}}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <div v-show="false" class="text-xs-center my-5">
                    <v-btn dark round color="limeGreen">Load More</v-btn>
                </div>
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
    metaInfo: {
      title: "All Our Top Agents and Agencies",
    },
    data() {
        return {
            agents: [],
            nextQuery: "",
            limit: 30,
        }
    },
    created() {
        var users = this.$store.state.db.collection("users")
         
        users.where("type", "==", 'Agent').orderBy("createdOn").orderBy("verified", "desc").orderBy("featured", "desc").limit(this.limit).get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                this.agents = 0
            } else {
                querySnapshot.forEach((doc) => {
                    this.agents.push(doc.data())
                });
            }

            // var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
            // this.nextQuery = this.$store.state.db.collection("property").where("type", "==", 'Agent').orderBy("createdOn")
            // .orderBy("verified", "desc")
            // .orderBy("featured", "desc")
            // .startAfter(lastVisible)
            // .limit(this.limit)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
}
</script>
