<template>
    <div class="white">
        <v-container class="pa-0">
            <v-toolbar flat class="pt-2 white">
                <v-toolbar-title class="headline hidden-sm-and-down font-weight-medium grey--text-darken-3">
                    Featured Real Estate Companies Adverts
                </v-toolbar-title>
                <v-toolbar-title class="title hidden-md-and-up ml-0 pl-0 font-weight-medium grey--text-darken-3">
                    Featured Real Estate Companies Adverts
                </v-toolbar-title>
            </v-toolbar>
        </v-container>
        <v-divider light />

        <div class="grey lighten-5">
            <v-container class="pt-4 pb-5">
                <v-img max-width="750" class="mx-auto elevation-1" src="/img/featuredBanner.jpg" contain></v-img>
                <div class="subheading font-weight-regular mx-auto mt-5 text-xs-center" style="max-width: 800px">
                    Market your Real Estate company by featuring your company logo on the Zuana homepage. 
                    When your logo is clicked by a site visitor, it will load your company page on Zuana.
                </div>

            </v-container>
        </div>

        <v-divider light></v-divider>
        <div class="">
            <v-container class="py-5 mx-auto" style="max-width: 900px">
                <v-layout wrap row>
                    <v-flex xs12 sm12 class="px-3 mb-5">
                        <p class="headline font-weight-medium">Requirement</p>
                        <div class="subheading">
                            This service is only available to verified agents. If your account has not been verified, follow the steps below to get your account verified... <br><br>
                            To become a verified Agent you have to send the below documents scanned in COLOR to <span class="font-weight-medium">support@zuana.com.ng</span> for us the review so as to certify you account:
                            <ol class="mt-3">
                                <li>Incorporation Certificate or Business Name Registration Certificate</li>
                                <li>A Utility bill not more than 3 months old. Example: NEPA or water bill</li>
                            </ol>
                        </div>
                    </v-flex>
                    <v-flex xs12 sm12 class="px-3">
                        <p class="headline font-weight-medium">The Payment Cost</p>
                        <div class="subheading">
                            The below are the subcription cost for making your account featured on zuana homepage:
                            <ul class="mt-3">
                                <li>1 Month - ₦2,500</li>
                                <li>6 Months - ₦15,000</li>
                                <li>12 Months - ₦30,000</li>
                            </ul>
                            <template v-if="$store.state.loggedIn">
                                <template v-if="$store.state.userData.featured == 1">
                                    <v-btn class="mt-3 grey lighten-5" flat round route to="/profile" dark color="limeGreen">Your are already a featured Agent!</v-btn>
                                </template>
                                <template v-else>
                                    <v-btn class="mt-3" round large @click="paymentDialog = !paymentDialog" dark color="limeGreen"> <v-avatar tile size="25" class="mr-2"><img src="/img/cash2.png" alt=""></v-avatar> Pay Online Now</v-btn>
                                </template>
                            </template>
                            <template v-else>
                                <v-btn @click="$store.state.loginDialog = true" class="mt-3" flat color="limeGreen" dark>Sign up/Login to get started <v-icon>arrow_right</v-icon></v-btn>
                            </template>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>

            <!-- Payment Dialog -->
            <v-dialog v-model="paymentDialog" persistent max-width="500px" >
                <v-card>
                    <v-toolbar card color="white" class="bb-hero1 py-2">
                        <v-avatar tile size="32">
                            <img src="/img/cash.png">
                        </v-avatar>
                        <v-toolbar-title>Online Payment Modal</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon @click="paymentDialog = !paymentDialog">clear</v-icon>
                    </v-toolbar>
                    
                    <v-form class="px-3 pt-4 pb-5" ref="payment">
                        <div class="display-1 text-trucated grey lighten-5 px-1 mb-3 py-4 green--text font-weight-medium text-xs-center">
                            <v-avatar style="margin-top:  -10px" tile size="35">
                                <img src="/img/coins.png">
                            </v-avatar>
                            &#8358;{{Math.abs(amount/100).toLocaleString('en-US')}} <span class="subheading hidden-xs-only font-weight-regular"> for {{duration}}</span>
                        </div>
                        <p class="subheading">You are about to make your <span class="font-weight-medium">business profile feature</span> on Zuana Homepage. Please select a duration below!</p>
                        <v-select
                            v-model="duration"
                            :items="durationList"
                            solo
                            flat
                            prepend-inner-icon="access_time"
                            class="text-field-no-curve mb-2"
                            label="Duration"
                            menu-props="offsetY"
                            ></v-select>
                        
                        <v-btn block round dark color="limeGreen" @click="payWithPaystack()" class="mr-4 mx-0 mt-3">Make Payment</v-btn>
                    </v-form>
                </v-card>
            </v-dialog>
        </div>
        <v-divider></v-divider>
        <v-container class="text-xs-center headline py-5">
          For further inquries and questions, contact on support@zuana.com.ng
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            paymentDialog: false,
            months: 1,
            durationList: [
                "1 Month",
                "6 Months",
                "12 Months"
            ],
            duration: "1 Month",
            price: 2500,
        }
    },
    computed: {
        email() {
            if (this.$store.state.userData) {
                return this.$store.state.userData.email
            } else {
                return ""
            }
        },
        firstname() {
            if (this.$store.state.userData) {
                return this.$store.state.userData.name.split(" ")[0]
            } else {
                return "User1"
            }
        },
        lastname() {
            if (this.$store.state.userData) {
                var x = this.$store.state.userData.name.split(" ")[1]
                return x ? x : ""
            } else {
                return ""
            }
        },
        mobile() {
            if (this.$store.state.userData) {
                return this.$store.state.userData.mobile
            } else {
                return ""
            }
        },
        amount() {
            var duration = Math.abs(this.duration.split(" ")[0])
            this.months = duration
            return duration * this.price * 100
        }
    },
    methods: {
        payWithPaystack(){
            const self = this
            var handler = PaystackPop.setup({
                key: this.$payStack,
                email: this.email,
                amount: this.amount,
                currency: "NGN",
                //ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                firstname: this.firstname,
                lastname: this.lastname,
                // label: "Optional string that replaces customer email"
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Mobile Number",
                            variable_name: "mobile_number",
                            value: this.mobile
                        }
                    ]
                },
                callback: function(response){
                    self.paymentDialog = false
                    // Make update
                    self.rewardAgent()
                },
                onClose: function(){
                    alert('window closed');
                }
            });
            handler.openIframe();
        },
        rewardAgent() {
            var date = new Date()
            const curDate = date.getTime()
            const timeInterval = (60 * 60 * 24 *30*1000) * this.months

            if (this.$store.state.loggedIn) {

                var users = this.$store.state.db.collection("users").doc(this.$store.state.userData.uid)
            
                this.$store.state.db.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(users)
                    .then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "Document does not exist!";
                        }
                        var temp = Math.abs(curDate) + Math.abs(timeInterval)

                        transaction.update(users, { 
                            featured: 1,
                            validity: temp,
                        })
                    })
                    .then(() => {
                        this.$store.dispatch('setSnackText', "Congrat! You are now a featured Agent!")
                        this.$store.dispatch('setSnackState', true)
                        this.$store.dispatch('syncUserData')
                    })
                    .catch(err => {
                        this.$store.dispatch('setSnackText', err)
                        this.$store.dispatch('setSnackState', true)
                        console.log(err)
                    })
                })
            } else {
                this.$store.dispatch('setSnackText', "Sorry, we were unable to update data. Contact support center")
                this.$store.dispatch('setSnackState', true)
            }
        }
    }
}
</script>
