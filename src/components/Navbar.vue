<template>
    <nav>
        <v-toolbar app  color="white" class="bb-hero1" style="border-bottom: 3px solid #32CD32!important;">
            <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title router class="pointer" v-ripple @click="$router.push('/')">
                
                <img src="/img/zuana.jpg" width="70" class="mt-2 hidden-md-and-up" alt="">
                <img src="/img/zuana.jpg" width="100" class="mt-2 hidden-sm-and-down" alt="">
                
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-md-and-up">
                <v-badge class="badge" v-if="$store.state.loggedIn" overlap right color="limeGreen">
                    <template v-if="$store.state.notification !== 0" v-slot:badge>
                        <span>{{$store.state.notification}}</span>
                    </template>
                    <v-btn router to="/user/notification" flat icon><v-icon>notifications_active</v-icon></v-btn>
                </v-badge>
                <v-btn flat icon v-if="$store.state.loggedIn" router to="/post"><v-icon>cloud_upload</v-icon></v-btn>
                <v-btn flat v-if="!$store.state.loggedIn" icon @click="$store.state.loginDialog = !$store.state.loginDialog"><v-icon>portrait</v-icon></v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and-down">
                <!-- <v-btn class="bra-0" router to="/" flat>Home</v-btn> -->
                <v-btn class="bra-0" router to="/listings/Sale" flat>For Sale</v-btn>
                <v-btn class="bra-0" router to="/listings/Rent" flat>For Rent</v-btn>
                <v-btn class="bra-0" router to="/agents" flat>Agents</v-btn>

                <v-btn v-if="!$store.state.loggedIn" dark depressed tile class="bra-0" color="limeGreen" @click="$store.state.loginDialog = !$store.state.loginDialog"><v-icon class="mr-2">portrait</v-icon> Sign Up or Login</v-btn>

                <!-- dropdown menu -->
                <v-menu offset-y v-if="$store.state.loggedIn">
                    <v-btn slot="activator" dark depressed tile class="bra-0" color="limeGreen">
                        <v-icon left>expand_more</v-icon>
                        <span>Dashboard</span>
                    </v-btn>
                    <v-list>
                        <v-list-tile class="px-2" v-for="link in dashboard" :key="link.text" router :to="link.route">
                            <v-list-tile-action style="min-width:40px">
                                <v-icon v-if="link.text !== 'Notification'"  size="20">{{link.icon}}</v-icon>
                                <v-badge v-else overlap right color="limeGreen">
                                    <template v-if="$store.state.notification !== 0" v-slot:badge>
                                        <span>{{$store.state.notification}}</span>
                                    </template>
                                    <v-icon size="20">{{link.icon}}</v-icon>
                                </v-badge>
                            </v-list-tile-action>
                            <v-list-tile-title>
                                {{link.text}}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile class="px-2" style="cursor:pointer" @click="signOutDialog = true">
                            <v-list-tile-action style="min-width:40px">
                                <v-icon size="20">exit_to_app</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-title>
                                Logout
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-btn class="bra-0" flat router to="/post"><v-chip class="pointer" label dark>Post A Property</v-chip></v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-navigation-drawer app temporary v-model="drawer">
            <v-list v-if="$store.state.loggedIn" class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img v-if="$store.state.userData.displayPhoto" :src="$store.state.userData.displayPhoto">
                        <img v-else src="/img/unknown.png">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{$store.state.userData.name}}</v-list-tile-title>
                        <span class="caption"><v-icon size="15" class="mr-2">person_outline</v-icon> {{$store.state.userData.type}}</span>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-layout v-else class="py-3 px-2">
                <v-flex><v-btn block dark depressed color="limeGreen" @click="registerDialog = true"><v-icon class="mr-1">person_add</v-icon> Register</v-btn></v-flex>
                <v-flex><v-btn block dark flat color="limeGreen" @click="$store.state.loginDialog = true"><v-icon class="mr-1">person_outline</v-icon> Login</v-btn></v-flex>
            </v-layout>

            <v-list class="pt-0">
                <v-divider></v-divider>

                <v-list-tile v-for="(item, index) in menuListMobile" :key="index" router :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile  v-if="$store.state.loggedIn" @click="signOutDialog = true">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            </v-navigation-drawer>

            <!-- Login Dialog -->
            <v-dialog v-model="$store.state.loginDialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="500px" >
                <v-card class="py-2">
                    <v-toolbar card color="white" class="bb-hero1 py-2">
                        <v-avatar size="32">
                            <img src="/img/users.png">
                        </v-avatar>
                        <v-toolbar-title>Sign in to your account</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon @click="$store.state.loginDialog = !$store.state.loginDialog">clear</v-icon>
                    </v-toolbar>
                    
                    <v-form @submit="signIn" class="px-3 pt-4 pb-5" ref="signIn">
                        <p v-show="loginLoader" class="mb-3">
                            <v-progress-linear indeterminate color="limeGreen"></v-progress-linear>
                        </p>
                        <v-text-field label="Email Address" flat v-model="signInUsername" :rules="inputRules" solo prepend-inner-icon="alternate_email" class="text-field-curve mb-2" color="#32CD32"></v-text-field>

                        <v-text-field :type="show ? 'text' : 'password'" label="Password" flat v-model="signInPwd" prepend-inner-icon="lock" :rules="pwdRules"  solo class="text-field-curve" :append-icon="show ? 'visibility' : 'visibility_off'" @click:append="show = !show" color="#32CD32"></v-text-field>
                        
                        <div class="mb-1 mt-0">
                            <v-btn flat small round class="grey lighten-4" color="grey"  @click="forget = true">Forgot Password?</v-btn>
                        </div>

                        <v-btn type="submit" :loading="loginLoader" block round dark color="limeGreen" class="mr-4 mx-0 mt-3">Sign In</v-btn>

                        <div class="text-xs-center subheading mt-4 font-weight-medium mb-3">OR</div>  
                            
                        <div class="text-xs-center">
                            <v-btn block large flat round color="grey darken-3" class="grey lighten-4 font-weight-medium" @click="registerHandler()">
                                <v-avatar size="28" class="mr-1">
                                    <img src="/img/shield.png">
                                </v-avatar>
                                Create an account for free
                            </v-btn>
                        </div>
                    </v-form>
                </v-card>
                <v-dialog v-model="forget" max-width="400px">
                    <v-card>
                        <v-card-title>
                            Password Recovery
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                            type="email"
                            label="Enter your email address..."
                            v-model="recovEmail"
                            item-value="text"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="limeGreen" :loading="reseting" flat @click="resetPass">Send Reset Email</v-btn>
                            <v-btn color="limeGreen" flat @click="forget=false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-dialog>

            <!-- Sign Up Dialog -->
            <v-dialog v-model="registerDialog" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="500px" >
                <v-card class="pb-4">
                    <v-toolbar card color="white" class="bb-hero1 py-2">
                        <v-avatar size="32">
                            <img src="/img/users.png">
                        </v-avatar>
                        <v-toolbar-title>Create an account</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon @click="registerDialog = !registerDialog">clear</v-icon>
                    </v-toolbar>
                    
                    <v-form @submit="signUp" class="px-3 pt-4 pb-3" ref="signUp">
                        <p v-show="regLoader" class="mb-3">
                            <v-progress-linear indeterminate color="limeGreen"></v-progress-linear>
                        </p>

                        <v-text-field label="Full Name" flat v-model="regName" :rules="inputRules" solo prepend-inner-icon="person_outline" class="text-field-curve" color="#32CD32"></v-text-field>

                        <v-text-field label="Email Address" flat v-model="regEmail" :rules="emailRules" solo prepend-inner-icon="alternate_email" class="text-field-curve" color="#32CD32"></v-text-field>

                        <v-text-field :type="show2 ? 'text' : 'password'" label="Password" flat v-model="regPwd" prepend-inner-icon="lock" :rules="pwdRules"  solo class="text-field-curve" :append-icon="show2 ? 'visibility' : 'visibility_off'" @click:append="show2 = !show2" color="#32CD32"></v-text-field>

                        <v-tooltip top>
                            <v-text-field type="number" label="Mobile Number (eg: 09036*****)" flat v-model="regMobile" :rules="mobileRules" solo prepend-inner-icon="phone" class="text-field-curve" color="#32CD32" slot="activator"></v-text-field>

                            <span>Please you provide a working phone number, because this the major way other users or visitors can contact you!</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <v-select v-model="regType" :items="userType" :rules="inputRules" label="Choose an account type" flat solo class="text-field-curve" color="#32CD32" prepend-inner-icon="how_to_reg" menu-props="offsetY" slot="activator"></v-select>

                            <span>You can sign up as an Agent</span>
                        </v-tooltip>
                        
                        <div class="mb-1 mt-0">
                            <v-btn flat small round class="grey lighten-4" color="grey darken-2"  @click="loginHandler">Already have an account?</v-btn>
                            <v-btn @click="showTerms" flat small round color="grey darken-2">Terms and Conditions <v-icon>arrow_right</v-icon></v-btn>
                        </div>
                        <v-checkbox v-model="checkbox" :rules="[v => v || 'You must agree to continue!']" label="Do you agree to our Terms & Conditions?" required></v-checkbox>

                        <v-btn type="submit" :loading="regLoader" block round dark color="limeGreen" class="mr-4 mx-0 mt-1">Register</v-btn>
                    </v-form>
                </v-card>
            </v-dialog>

            <!-- Signout dialog -->
            <v-dialog max-width="400" persistent v-model="signOutDialog">
                <v-card>
                    <v-card-text>
                        <v-avatar><v-icon>exit_to_app</v-icon></v-avatar><span class="subheading">Are you sure you want to logout?</span>
                        <br>
                        <p v-if="signout" class="text-center">
                            Logging out...
                            <v-progress-linear indeterminate color="limeGreen" class="my-1"></v-progress-linear>
                        </p>
                        <div style="text-align: right">
                            <v-btn depressed round dark color="limeGreen" @click="signOut">Yes</v-btn>
                            <v-btn depressed flat round @click="signOutDialog = false">No</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            signout: false,
            signOutDialog: false,
            items: [
                { title: 'Home', icon: 'dashboard' ,link: '/', auth: false},
                { title: 'For Sale', icon: 'account_balance' ,link: '/listings/Sale', auth: false},
                // { title: 'For Rent', icon: 'local_activity' ,link: '', auth: false},
                { title: 'For Rent', icon: 'local_activity' ,link: '/listings/Rent', auth: false},
                { title: 'Agents', icon: 'people_outline' ,link: '/agents', auth: false},
                { title: 'Favorites', icon: 'favorite' ,link: '/user/favorite', auth: true},
                { title: 'My Listings', icon: 'filter' ,link: '/user/listing', auth: true},
                { title: 'Post a Property', icon: 'unarchive' ,link: '/post', auth: false},
                { title: 'Subscription', icon: 'account_balance_wallet' ,link: '/subscription', auth: true},
                { title: 'Client Request', icon: 'live_help' ,link: '/user/requests', auth: true},
                { title: 'Profile', icon: 'portrait' ,link: '/profile', auth: true},
                { title: 'Privacy/Policy', icon: 'spa' ,link: '/policy', auth: false},
                { title: 'Terms and Condition', icon: 'assignment' ,link: '/terms', auth: false},
                { title: 'About', icon: 'book' ,link: '/about', auth: false}
            ],
            loginLoader: false,
            loginDialog: false,
            show: false,
            show2: false,
            inputRules: [
                v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!'
            ],
            mobileRules: [
                v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!',
                v => Number.isInteger(Math.abs(v)) || 'Phone number must follow the format: "07036877555"',
                v => (v.length === 11) || 'Mobile Number should be 11 digits!'
            ],
            pwdRules: [
                v => (v && v.length !== '' && v.length >= 6) || 'Minimum length is 6  characters'
            ],
            userRules: [
                v => (v && v.length !== '' && v.length >= 3) || 'Minimum length is 3  characters'
            ],
            emailRules: [
                v => (v && v.length !== '' && v.length >= 1) || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            signInUsername: "",
            signInPwd: "",
            regName: "",
            regEmail: "",
            regPwd: "",
            regType: "",
            regAddress: "",
            regMobile: "",
            dashboard: [
                { icon: 'person_outline', text: 'View Profile', route: '/profile', note: false},
                { icon: 'notifications_active', text: 'Notification', route: '/user/notification', note: true},
                { icon: 'favorite', text: 'Favorite', route: '/user/favorite', note: false},
                { icon: 'filter', text: 'My Listings', route: '/user/listing', note: false},
                { icon: 'account_balance_wallet', text: 'Subscription', route: '/subscription', note: false},
                { icon: 'live_help', text: 'Client Requests', route: '/user/requests', note: false},
            ],
            registerDialog: false,
            regLoader: false,
            userType: [
                "Agent",
            ],
            userList: ["View Profile", "Notification"],
            checkbox: false,
            recovEmail: "",
            forget: false,
            reseting: false
        }
    },
    methods: {
        signIn(e) {
            e.preventDefault()
            var self = this
            if(self.$refs.signIn.validate()){
                self.loginLoader = true
                
                // Log user in
                self.$store.state.auth.signInWithEmailAndPassword(self.signInUsername, self.signInPwd).then(() => {

                    // Handles Ui states
                    self.loginLoader = false
                    self.loginDialog = false
                    self.$store.state.loginDialog = false
                    self.$store.dispatch('setSnackText', "You successfully logged in as Fernando!")
                    self.$store.dispatch('setSnackState', true)

                    this.$refs.signIn.reset()
                    this.$refs.signIn.resetValidation()
                }).catch(err => {
                    self.loginLoader = false
                    self.$store.dispatch('setSnackText', err)
                    self.$store.dispatch('setSnackState', true)
                })
            }
        },
        signUp(e) {
            e.preventDefault()
            var self = this
            if(self.$refs.signUp.validate()){
                self.regLoader = true

                var date = new Date()
                var uid = ""
                var trialTime = 60*60*24*14*1000

                // Signs Up a user
                self.$store.state.auth.createUserWithEmailAndPassword(self.regEmail, self.regPwd).then(cred => {
                    uid = cred.user.uid

                    return self.$store.state.db.collection('users').doc(cred.user.uid).set({
                        uid: cred.user.uid,
                        name: self.regName,
                        mobile: self.regMobile,
                        email: self.regEmail,
                        type: self.regType,
                        createdOn: date.getTime(),
                        validity: date.getTime() + trialTime,
                        mode: "FREE",
                        lastActivePlan: "",
                        premiumAds: 0,
                        standardAds: 5,
                        boost: 0,
                        active: true,
                        statusCode: 200,
                        verified: 0,
                        featured: 1,
                        banned: 0
                    })
                }).then(() => {
                    // Handles Ui and Ux
                    self.regLoader = false
                    self.registerDialog = false
                    self.$router.push('/success')
                    self.$store.dispatch('setSnackText', "Your account has been successfully created!")
                    self.$store.dispatch('setSnackState', true)

                    this.$refs.signUp.reset()
                    this.$refs.signUp.resetValidation()
                })
                .then(() => {
                    var user = self.$store.state.auth.currentUser;

                    user.sendEmailVerification().then(() => {
                        // Email sent.
                        self.$store.dispatch('setSnackText', "Check your email for verification link")
                        self.$store.dispatch('setSnackState', true)
                    }).catch((error) => {
                        self.$store.dispatch('setSnackText', "Error: "+error)
                        self.$store.dispatch('setSnackState', true)
                    });
                })
                .catch(err => {
                    console.log(err)
                    self.regLoader = false
                    self.$store.dispatch('setSnackText', err)
                    self.$store.dispatch('setSnackState', true)
                })
            }
        },
        signOut() {
            // remove current PlayerId for user remove firestore
            if (localStorage.playerId && localStorage.uid) {
                var playerId = localStorage.playerId
                var userRef = this.$store.state.db.collection("users").doc(localStorage.uid);

                this.$store.state.db.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(userRef)
                    .then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "User does not exist!";
                        }
                        
                        if (sfDoc.data().playerId) {
                            var temp = sfDoc.data().playerId;

                            if (temp.includes(playerId)) {
                                var index = temp.indexOf(playerId);

                                if (index > -1) {
                                    temp.splice(index, 1);
                                }

                                transaction.update(userRef, { playerId: temp })
                            }
                        }
                    })
                    .then(() => {
                        console.log("PlayerId has been removed From Firebase!")
                    })
                    .catch(err => {
                        console.log("Error: "+err)
                    })
                })
            }
            
            // Logs out current user
            this.signout = true

            this.$store.state.auth.signOut().then(() => {
                console.log('You logged Out!')

                this.signout = false
                this.signOutDialog = false
                this.$router.push('/')
                this.$store.dispatch('setSnackText', "Your Successfully logged out!")
                this.$store.dispatch('setSnackState', true)
            })
            .catch(err => {
                this.signout = false
                this.$store.dispatch('setSnackText', err)
                this.$store.dispatch('setSnackState', true)
            })
        },
        registerHandler() {
            var self = this

            self.$store.state.loginDialog = false
            setTimeout(() => {
                self.registerDialog = true
            }, 300)
        },
        loginHandler() {
            var self = this

            self.registerDialog = false
            setTimeout(() => {
                self.$store.state.loginDialog = true
            }, 300)
        },
        showTerms() {
            this.registerDialog = false
            this.$router.push('/terms')
        },
        resetPass() {
            if(this.recovEmail) {
                if (/.+@.+/.test(this.recovEmail)) {
                    this.reseting = true
                    this.$store.state.auth.sendPasswordResetEmail(this.recovEmail)
                    .then(() => {
                        this.reseting = false
                        this.$store.dispatch('setSnackText', "A Password email has been sent to your email")
                        this.$store.dispatch('setSnackState', true)
                        this.forget = false
                        this.recovEmail = ""
                    })
                    .catch(err => {
                        this.reseting = false
                        this.$store.dispatch('setSnackText', "Error: "+ err)
                        this.$store.dispatch('setSnackState', true)
                    })
                } else {
                    this.$store.dispatch('setSnackText', "Provided email address is invalid")
                    this.$store.dispatch('setSnackState', true)
                }
            } else {
                this.$store.dispatch('setSnackText', "You didn't enter any email")
                this.$store.dispatch('setSnackState', true)
            }
        }
    },
    computed: {
        menuListMobile() {
            if (this.$store.state.loggedIn) {
                return this.items
            } else {
                return this.items.filter(item => {
                    return item.auth === false
                })
            }
        }
    }
}
</script>

<style scoped>
    
</style>
