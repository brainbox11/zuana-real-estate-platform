<template>
    <div>
        <v-img src="/img/chicago.jpg" class="bb-hero1" aspect-ratio="3.5">
            <v-layout py-3 column bottom-gradient fill-height class="lightbox white--text text-xs-center">
                <v-spacer></v-spacer>
                <v-flex>
                    <v-container class="text-xs-center">
                        <div class="display-3 font-weight-bold mx-auto hero-text hidden-sm-and-down">
                            We'll help you find the perfect property of your choice...
                        </div>
                        <div class="headline font-weight-bold mx-auto hero-text hidden-md-and-up py-5">
                            We'll help you find the perfect property of your choice...
                        </div>
                    </v-container>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-img>
        <div class="white">
            <v-container class="py-5" fill-height>
                <v-layout wrap row>
                    <v-flex x12 sm4>
                        <p class="display-2 py-3">
                            <span class="py-2 font-weight-bold">
                                About Zuana.com.ng
                            </span>
                        </p>
                    </v-flex>
                    <v-flex x12 sm8>
                        <p class="headline font-weight-medium">Who we are?</p>
                        <div class="subheading mb-4" style="max-width: 600px">
                            Zuana is an online property listing platform dedicated to connecting property owners and estate agents with prospective tenants and buyers.
                            We help prospective tenants seamlessly rent apartments, shops, houses and any property that suits that their needs. We help landlords get their properties right to the interested clients.

                        </div>
                        <p class="headline font-weight-medium">Vision</p>
                        <div class="subheading" style="max-width: 600px">
                            Become the largest property listing platform in south-south/south-east Nigeria by market size that delivers superior value to our users.
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>

        <div class="grey lighten-5">
            <v-container class="py-5" fill-height>
                <v-layout wrap row>
                    <v-flex x12 sm4 class="px-4 mb-3">
                        <img src="/img/about.jpeg" style="width:100%" alt="">
                    </v-flex>
                    <v-flex x12 sm8>
                        <p class="headline font-weight-medium">Mission</p>
                        <div class="subheading mb-4" style="max-width: 600px">
                            To connect property owners and estate agents with prospective tenants and buyers.
                        </div>
                        <p class="headline font-weight-medium">Goal</p>
                        <div class="subheading" style="max-width: 600px">
                            Increase the awareness on the importance of technology in the property market of the region.
                        </div>
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
            
        }
    }
}
</script>
