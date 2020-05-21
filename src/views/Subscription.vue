<template>
    <div id="wrapper">
        <div class="white bb-hero1">
            <v-container class="pa-0">
                <v-toolbar flat class="pt-2 white">
                    <v-toolbar-title class="headline font-weight-medium grey--text-darken-3">
                       {{$route.name}}
                    </v-toolbar-title>
                </v-toolbar>
            </v-container>
        </div>
        <div class="grey lighten-5">
            <div v-if="$store.state.loggedIn" class="white">
                <v-img src="/img/hero.jpg" class="bb-hero1" aspect-ratio="3.5">
                    <v-layout py-3 column bottom-gradient fill-height class="lightbox">
                        <v-spacer></v-spacer>
                        <v-flex>
                            <v-container fill-height>
                                <v-layout wrap row>
                                    <v-flex xs12 class="px-2">
                                        <template v-if="$store.state.userData.mode == 'FREE'">
                                            <div class="hidden-sm-and-down white--text title py-3 px-2 hero-ba-ads elevation-5 mb-5 text-xs-center font-weight-regular grey darken-3 mx-auto"style="border-radius: 15px;max-width:900px">
                                                <v-icon left color="white">info</v-icon>
                                                {{note}}
                                            </div>
                                            <div class="hidden-md-and-up white subheading py-3 px-2 hero-ba-ads elevation-5 mb-5 white--text grey darken-3 text-xs-center mx-auto"style="border-radius: 15px">
                                                <v-icon left color="white">info</v-icon>
                                                {{note}}
                                            </div>
                                        </template>

                                        <div v-show="$store.state.userData.mode !== 'FREE'" class="text-xs-center mb-4">
                                            <v-avatar size="100"><img src="/img/premium.png" alt=""></v-avatar>
                                        </div>

                                        <v-card class="elevation-20 pt-4 pb-3 mb-1">
                                            <v-layout v-if="$store.state.userData" row wrap>
                                                <v-flex xs6 md3 class="mb-2">
                                                    <div class="caption text-xs-center subheading">Current Plan</div>
                                                    <div class="font-weight-bold headline text-xs-center text-capitalize">
                                                        {{$store.state.userData.lastActivePlan ? $store.state.userData.lastActivePlan : "Free mode"}}
                                                    </div>
                                                </v-flex>
                                                <v-flex xs6 md3 class="mb-2">
                                                    <div class="caption text-xs-center subheading">Premium Ads</div>
                                                    <div class="font-weight-bold display-1 text-xs-center">
                                                        {{$store.state.userData.premiumAds}}
                                                    </div>
                                                </v-flex>
                                                <v-flex  xs6 md3>
                                                    <div class="caption grey--text text-xs-center subheading">Advert Boost</div>
                                                    <div class="font-weight-bold display-1 text-xs-center">
                                                        {{$store.state.userData.boost}}<span class="font-weight-regular">x</span>
                                                    </div>
                                                </v-flex>
                                                <v-flex  xs6 md3>
                                                    <div class="caption grey--text text-xs-center subheading">Standard Ad</div>
                                                    <div class="font-weight-bold display-1 text-xs-center">{{$store.state.userData.mode == "FREE" ? $store.state.userData.standardAds : "&infin;"}}</div>
                                                </v-flex>
                                            </v-layout>
                                            <v-divider></v-divider>
                                            <v-card-text class="subheading text-xs-center">
                                                <template v-if="$store.state.userData.mode == 'FREE'">
                                                    <template v-if="$store.state.userData.active">
                                                        Your currently on our <span class="font-weight-medium">Free Trial</span> plan and have <span class="font-weight-medium">{{diffTime($store.state.userData.validity)}} days left.</span> Upgrade your account to gain full access.
                                                    </template>
                                                    <template v-else>
                                                        Your trial period of <span class="font-weight-medium">14 days</span> has expired... Please Upgrade your account to <span class="font-weight-medium">Premium</span>
                                                    </template>
                                                </template>
                                                <template v-else>
                                                    Your current plan duration is <span class="font-weight-medium">{{$store.state.userData.lastActivePlanDuration}} months</span>. You have <span class="font-weight-medium">{{diffTime($store.state.userData.validity)}} days left...</span>
                                                </template>
                                            </v-card-text>
                                        </v-card>

                                        <div class="mt-5 text-xs-center">
                                            <v-btn v-if="!$store.state.userData.active && $store.state.userData.mode !== 'FREE'" color="limeGreen" @click="$vuetify.goTo('#sub', options)" dark large>Renew Subscription</v-btn>
                                            <v-btn v-else color="limeGreen" @click="$vuetify.goTo('#sub', options)" dark large>Upgrade Plan</v-btn>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                        <v-spacer></v-spacer>
                    </v-layout>
                </v-img>
            </div>
            <v-container fluid class="mt-3" id="sub">
                <div class="text-xs-center py-3">
                    <div class="display-1 font-weight-bold mb-2">Subscription Plans</div>
                    <p class="subheading mx-auto" style="max-width:600px">Choose a subcription plan for your agent account...</p>
                </div>
                <v-layout wrap row>
                    <v-flex xs12 sm6 md4  v-for="(plan, index) in plans" :key="index">
                        <v-card class="elevation-2 text-xs-center py-3 mx-3 mb-4">
                            <div class="headline font-weight-bold">{{plan.name}}</div>
                            <div class="subheading py-2 px-2">{{plan.label}}</div>
                            <div class="py-4 my-2 limeGreen white--text display-2">&#8358;{{plan.price}}<span class="title" v-if="plan.price !== 0"> /month</span></div>

                            <v-list class="pt-3" dense>
                                <v-list-tile v-for="(feature, index) in plan.features" :key="index">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-if="feature" v-html="feature" class="text-xs-center subheading font-weight-regular">
                                        </v-list-tile-title>

                                        <v-list-tile-title v-else class="text-xs-center subheading font-weight-regular">
                                            ----
                                        </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                            <v-divider></v-divider>
                            <div class="text-xs-center mt-3">
                                <template  v-if="$store.state.loggedIn">
                                    <v-btn disabled v-if="!plan.premium" flat depressed color="limeGreen"> Basic Plan</v-btn>

                                    <v-btn v-else @click="plan.action(plan.price, plan.name)" dark depressed color="limeGreen"> <v-avatar tile size="25" class="mr-2"><img src="/img/cash2.png" alt=""></v-avatar> Pay Online Now</v-btn>
                                </template>

                                <v-btn v-else @click="$store.state.loginDialog = true" dark depressed color="limeGreen">Get Started Now</v-btn>
                            </div>
                        </v-card>
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
                        <p>You are about to make payment for our <span class="font-weight-medium">{{label}}</span>, Please specify the payment duration below!</p>
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
            
            <v-dialog
                v-model="pop"
                max-width="290"
                >
                <v-card>
                    <v-card-title class="headline">Do you want overwrite existing plan?</v-card-title>

                    <v-card-text>
                    You still have an active plan, continuing this process will reset your subscription plan to this new plan...
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="pop = false"
                    >
                        I Agree
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            plans: [
                {
                    price: 0,
                    name: "Free Plan",
                    features: [
                        "Unlimited Client requests",
                        "0 Premium Ad",
                        "5 Standard Ads",
                        "",
                        ""
                    ],
                    action: (price, label) => {
                        
                    },
                    label: "Suitable for trial",
                    premium: false,
                },
                {
                    price: 1500,
                    name: "Premium Bronze Plan",
                    features: [
                        "Unlimited Client requests",
                        "<span class='font-weight-medium'>3</span> Premium Ad per month",
                        "Unlimited Standard Ads",
                        "<span class='font-weight-medium'>8</span> Advert boost",
                        "Full Access to all our services"
                    ],
                    action: (price, label) => {
                        this.price = Math.abs(price)
                        this.label = label
                        this.paymentDialog = true
                        this.planCode = "BRONZE"
                        this.checkOldSub()
                    },
                    label: "Recommended for you",
                    premium: true,
                },
                {
                    price: 1700,
                    name: "Premium Silver Plan",
                    features: [
                        "Unlimited Client requests",
                        "<span class='font-weight-medium'>6</span> Premium Ad per month",
                        "Unlimited Standard Ads",
                        "<span class='font-weight-medium'>15</span> Advert boost",
                        "Full Access to all our services"
                    ],
                    action: (price, label) => {
                        this.price = Math.abs(price)
                        this.label = label
                        this.paymentDialog = true
                        this.planCode = "SILVER"
                        this.checkOldSub()
                    },
                    label: "Recommended for you",
                    premium: true,
                },
                {
                    price: 2000,
                    name: "Premium Gold Plan",
                    features: [
                        "Unlimited Client requests",
                        "<span class='font-weight-medium'>10</span> Premium Ad per month",
                        "Unlimited Standard Ads",
                        "<span class='font-weight-medium'>20</span> Advert boost",
                        "Full Access to all our services"
                    ],
                    action: (price, label) => {
                        this.price = Math.abs(price)
                        this.label = label
                        this.paymentDialog = true
                        this.planCode = "GOLD"
                        this.checkOldSub()
                    },
                    label: "Recommended for you",
                    premium: true,
                },
                {
                    price: 2500,
                    name: "Premium Diamond Plan",
                    features: [
                        "Unlimited Client requests",
                        "<span class='font-weight-medium'>15</span> Premium Ad per month",
                        "Unlimited Standard Ads",
                        "<span class='font-weight-medium'>30</span> Advert boost",
                        "Full Access to all our services"
                    ],
                    action: (price, label) => {
                        this.price = Math.abs(price)
                        this.label = label
                        this.paymentDialog = true
                        this.planCode = "DIAMOND"
                        this.checkOldSub()
                    },
                    label: "Recommended for you",
                    premium: true,
                },
                {
                    price: 5000,
                    name: "Premium Mega Plan",
                    features: [
                        "Unlimited Client requests",
                        "<span class='font-weight-medium'>30</span> Premium Ad per month",
                        "Unlimited Standard Ads",
                        "<span class='font-weight-medium'>60</span> Advert boost",
                        "Full Access to all our services"
                    ],
                    action: (price, label) => {
                        this.price = Math.abs(price)
                        this.label = label
                        this.paymentDialog = true
                        this.planCode = "MEGA"
                        this.checkOldSub()
                    },
                    label: "Recommended for you",
                    premium: true,
                }
            ],
            months: 1,
            paymentDialog: false,
            durationList: [
                "1 Month",
                "3 Months",
                "6 Months",
                "12 Months"
            ],
            duration: "1 Month",
            price: 3000,
            label: "Premium Plan",
            planCode: "",
            pop: false,
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
        },
        planData() {
            var data = {}

            switch (this.planCode) {
                case "BRONZE":
                    data = {
                        premium: 3,
                        boost: 8
                    }
                    break;
                    
                case "SILVER":
                    data = {
                        premium: 6,
                        boost: 15
                    }

                    break;
                
                case "GOLD":
                    data = {
                        premium: 10,
                        boost: 20
                    }
                    break;
                
                case "DIAMOND":
                    data = {
                        premium: 15,
                        boost: 30
                    }
                    break;
                
                case "MEGA":
                    data = {
                        premium: 30,
                        boost: 60
                    }
                    break;
            
                default:
                    data = {
                        premium: 3,
                        boost: 8
                    }
                    break;
            }

            return data
        },
        options () {
            return {
                duration: 1000,
                offset: 0,
                easing: 'easeInOutCubic'
            }
        },
        note() {
            if (this.$store.state.userData) {
                if (this.$store.state.userData.active) {
                    return "You are currently using free mode. Please upgrade to Premium for full feature access."
                } else {
                    return "Your trial period has elasped! Upgrade to PREMIUM"
                }
            } else {
                return ""
            }
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
                    // alert('success. transaction ref is ' + response.reference)
                    // console.log('success. transaction ref is ' + response.reference)

                    // Make update
                    self.rewardAgent()
                    self.$vuetify.goTo('#wrapper', this.options)
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
                        
                        // if (sfDoc.data().premiumAds) {
                        //     var temp1 = sfDoc.data().premiumAds;

                        //     temp1 = temp1 + (this.planData.premium * this.months)
                        // } else {
                        //     var temp1 = (this.planData.premium * this.months)
                        // }
                        var temp1 = (this.planData.premium * this.months)

                        // if (sfDoc.data().boost) {
                        //     var temp2 = sfDoc.data().boost;

                        //     temp2 = temp2 + (this.planData.boost * this.months)
                        // } else {
                        //     var temp2 = (this.planData.boost * this.months)
                        // }
                        var temp2 = (this.planData.boost * this.months)

                        
                        var temp3 = Math.abs(curDate) + Math.abs(timeInterval)

                        transaction.update(users, { 
                            premiumAds: temp1,
                            boost: temp2,
                            validity: temp3,
                            mode: "PREMIUM",
                            lastActivePlan: this.planCode,
                            statusCode: 200,
                            lastActivePlanDuration: this.months,
                            active: true
                        })
                    })
                    .then(() => {
                        this.$store.dispatch('setSnackText', "Account Updated")
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
        },
        timeManager(timeStamp) {
            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            var currentDate = new Date().toLocaleDateString("en-US", options)
            var date = new Date(timeStamp).toLocaleDateString("en-US", options)
            var time = new Date(timeStamp).toLocaleTimeString("en-US")
            
            return date
        },
        diffTime(timestamp) {
            var currentDate = new Date().getTime()
            var difference = timestamp - currentDate;
            var daysDifference = Math.floor(difference/1000/60/60/24);
            if (daysDifference < 0) {
                daysDifference = 0
            }
            return daysDifference;
        },
        checkOldSub() {
            var date = new Date().getTime()
            var self = this
            if(this.$store.state.loggedIn) {
                if (this.$store.state.userData.validity > date && this.$store.state.userData.mode == 'PREMIUM') {
                    setTimeout(() => {
                        self.pop = true
                    }, 1000)
                }
            }
        }
    }
}
</script>
