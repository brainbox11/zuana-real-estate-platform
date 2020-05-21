<template>
    <div class="white">
        <v-img src="/img/hero.jpg" class="bb-hero1" aspect-ratio="3.5">
            <v-layout column bottom-gradient fill-height class="lightbox white--text text-xs-center">
                <v-spacer></v-spacer>
                <v-flex>
                    <v-container class="text-xs-center">
                        <div class="display-3 font-weight-bold mx-auto hero-text hidden-sm-and-down">
                            Your account was successfully created!
                        </div>
                        <div class="headline font-weight-bold mx-auto hero-text hidden-md-and-up py-3">
                            Your account was successfully created!
                        </div>
                        <div class="subheading mx-auto" style="max-width:900px">
                            Thanks for signing up. Please comfirm your email to continue. Check your mail and follow the instruction... We respect your privacy. Your information is safe and will never be shared.
                        </div>
                        <div class="text-xs-center pt-4">
                            <v-btn route to="/profile" dark color="limeGreen" large>Continue</v-btn>
                        </div>
                    </v-container>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-img>
        <div>
            <v-container class="pb-5">
                <v-layout wrap row>
                    <v-flex x12 sm4 class="text-xs-center hidden-sm-and-down">
                        <v-responsive class="mt-2">
                            <v-avatar tile size="150"><img src="/img/thank-you.gif" alt=""></v-avatar>
                        </v-responsive>
                    </v-flex>
                    <v-flex x12 sm8>
                        <p class="headline font-weight-medium">Who we are?</p>
                        <div class="subheading mb-4" style="max-width: 600px">
                            Zuana is an online property listing platform dedicated to connecting property owners and estate agents with prospective tenants and buyers
                            We help prospective tenants seamlessly rentapartments, shops, houses and any property that suits that their needs. We help landlords get their properties right to the interested clients. <br><br>

                            We've made the process involved in your property search easy. Search for your perfect property from any device.
                            Curated list of reputable real estate agents you can consult for professional services.

                        </div>
                        <div>
                            <v-btn route to="/about" color="limeGreen" dark round>Learn More...</v-btn>
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
