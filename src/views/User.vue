<template>
    <div>
        <!-- <div class="white">
            <v-container class="pa-0">
                <v-toolbar flat class="pt-2 white">
                    <v-toolbar-title class="headline font-weight-medium grey--text-darken-3">
                        {{$route.name}}
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn flat icon><v-icon size="30">arrow_forward_ios</v-icon></v-btn>
                </v-toolbar>
            </v-container>
        </div>
        <v-divider light /> -->
        <div class="grey lighten-5">
            <v-container class="px-0" fill-height>
                <v-layout wrap row>
                    <v-flex xs12 md3 class="pa-2 hidden-sm-and-down">
                        <v-card v-if="userData.length < 1" color="white" class="mb-2" dark>
                            <v-card-text class="grey--text">
                                Getting User details...
                                <v-progress-linear
                                    indeterminate
                                    color="limeGreen"
                                    class="mb-0"
                                ></v-progress-linear>
                            </v-card-text>
                        </v-card>
                        <v-card v-else class="hero-ba-ads">
                            <v-img src="/img/user_bg.png" aspect-ratio="3.5">
                                <v-layout column class="py-4 px-1">
                                    <v-flex class="text-xs-center">
                                        <v-avatar class="grey lighten-2" tile size="120">
                                            <img v-if="userData.displayPhoto" :src="userData.displayPhoto">
                                            <img v-else src="/img/login.png">
                                        </v-avatar>
                                    </v-flex>
                                    <v-flex class="text-xs-center mt-2">
                                        <div class="title mt-4 text-truncate">{{userData.name}}</div>
                                    </v-flex>
                                </v-layout>
                            </v-img>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 md9 class="pa-2" style="min-height:300px">
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actions: [
                {icon: "filter", link: "/user/listing", name: "My Listings"},
                {icon: "favorite", link: "/user/favorite", name: "Favorites"},
                {icon: "live_help", link: "/user/requests", name: "Client Requests"}
            ],
        }
    },
    computed: {
        userData() {
            return this.$store.state.userData
        }
    }
}
</script>
