<template>
    <div>
        <div class="white">
            <v-container class="pa-0">
                <v-toolbar flat class="pt-2 white">
                    <v-toolbar-title class="headline font-weight-medium grey--text-darken-3">
                        <v-btn icon>
                            <v-avatar tile size="40">
                                <img src="/img/id-card.png">
                            </v-avatar>
                        </v-btn>
                        My Account details
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-menu offset-y v-if="$store.state.loggedIn">
                        <v-btn slot="activator" flat icon><v-icon size="30">more_vert</v-icon></v-btn>

                        <v-list>
                            <template v-for="action in actions">
                                <v-list-tile class="px-2" :key="action.text" @click="action.click">
                                    <v-list-tile-action style="min-width:40px">
                                        <v-icon size="20">{{action.icon}}</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-title>
                                        {{action.name}}
                                    </v-list-tile-title>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-container>
        </div>
        <v-divider light />

        <div class="grey lighten-5">
            <v-container class="px-0" fill-height>
                <v-layout wrap row>
                    <v-flex x12 md3 class="pa-2">
                        <v-card class="hero-ba-ads">
                            <v-img src="/img/user_bg.png" aspect-ratio="3.5">
                                <v-layout column class="py-4 px-1">
                                    <v-flex class="text-xs-center">
                                        <v-avatar tile size="120">
                                            <img v-if="$store.state.userData.displayPhoto" :src="$store.state.userData.displayPhoto">
                                            <img v-else src="/img/login.png">
                                            <VImgUploader />
                                        </v-avatar>
                                    </v-flex>
                                    <v-flex class="text-xs-center mt-2">
                                        <div class="title mt-4 text-truncate">{{name}}</div>
                                    </v-flex>
                                </v-layout>
                            </v-img>
                            <v-divider light />
                            <v-list subheader>
                                <v-subheader>Activated Services</v-subheader>
                                <template v-if="activated.length > 0">
                                    <v-list-tile v-for="(item, index) in activated" :key="index" @click="item.click">
                                        <v-list-tile-avatar>
                                            <v-avatar
                                              tile
                                              size="30"
                                            >
                                              <img :src="item.icon">
                                            </v-avatar>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title class="subheading font-weight-medium green--text-darken1">
                                                {{item.name}}
                                            </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </template>
                                <p class="px-3" v-else>You haven't activated any of our service (Such as Premium Plan or Account Verification)</p>
                            </v-list>
                        </v-card>
                    </v-flex>
                    <v-flex x12 md9 class="pa-2">
                        <v-card class="hero-ba-ads" style="min-height: 400px" flat>
                            <v-tabs v-model="tabs">
                                <v-tab href="#1"><v-icon left>person_outline</v-icon> Personal Details</v-tab>
                                <v-tab v-if="$store.state.userData.type == 'Agent'" href="#2"><v-icon left>domain</v-icon> Business Details</v-tab>
                                <!-- <v-tab href="#3"><v-icon left>lock</v-icon> Change Password</v-tab> -->
                                <v-tab href="#4"><v-icon left>settings</v-icon> Account</v-tab>
                            </v-tabs>
                            <v-divider/>
                            <v-tabs-items v-model="tabs">
                                <v-tab-item value="1">
                                    <v-toolbar card color="white" class="py-2">
                                        <v-avatar tile size="32">
                                            <img src="/img/folder.png">
                                        </v-avatar>
                                        <v-toolbar-title>Personal Details</v-toolbar-title>
                                    </v-toolbar>
                                    <v-divider light></v-divider>
                                    
                                    <v-form @submit="saveDetails" class="px-3 pt-4 pb-5 mx-auto" style="max-width: 700px" ref="saveDetailForm">
                                        <p v-show="saveLoader" class="mb-3">
                                            <v-progress-linear indeterminate color="limeGreen"></v-progress-linear>
                                        </p>

                                        <v-text-field label="Name of Agency or individual" flat v-model="name" prepend-inner-icon="person_outline" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                        <v-text-field disabled label="Email Address" flat v-model="email" prepend-inner-icon="alternate_email" :rules="emailRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                        <v-text-field label="Phone Number" flat v-model="mobile" prepend-inner-icon="phone" :rules="mobileRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                        <v-text-field disabled label="Account Type" flat v-model="type" prepend-inner-icon="portrait" solo class="text-field-no-curve" color="#32CD32"></v-text-field>
                                       
                                        <div class="text-xs-center">
                                            <v-btn type="submit" :loading="saveLoader" dark color="limeGreen" class="mr-4 mx-0 mt-3"><v-icon left>save</v-icon> Save</v-btn>
                                        </div>
                                    </v-form>
                                </v-tab-item>
                                <v-tab-item v-if="$store.state.userData.type == 'Agent'" value="2">
                                    <v-toolbar card color="white" class="py-2">
                                        <v-avatar tile size="32">
                                            <img src="/img/admin.png">
                                        </v-avatar>
                                        <v-toolbar-title>Business Details</v-toolbar-title>
                                    </v-toolbar>
                                    <v-divider light></v-divider>
                                    
                                    <v-form @submit="businessDetails" class="px-3 pt-4 pb-5 mx-auto" style="max-width: 700px" ref="businessForm">
                                        <p v-show="bizLoader" class="mb-3">
                                            <v-progress-linear indeterminate color="limeGreen"></v-progress-linear>
                                        </p>

                                        <p><v-icon size="18">info</v-icon> Fill this form only if you are a registered Business</p>
                                        <v-text-field label="Business Name" flat v-model="business" prepend-inner-icon="store" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                        <v-text-field label="Business Address" flat v-model="address" prepend-inner-icon="place" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                        <v-select v-model="state" :items="stateList" :rules="inputRules" label="Business State" flat solo class="text-field-no-curve" color="#32CD32" prepend-inner-icon="pin_drop" menu-props="offsetY"></v-select>

                                        <v-text-field label="Business Website *Optional*" flat v-model="website" prepend-inner-icon="language"  solo class="text-field-no-curve" color="#32CD32"></v-text-field>

                                        <v-textarea label="About the company..." flat v-model="about" prepend-inner-icon="business" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-textarea>
                                       
                                        <div class="text-xs-center">
                                            <v-btn type="submit" :loading="bizLoader" dark color="limeGreen" class="mr-4 mx-0 mt-3"><v-icon left>save</v-icon> Save</v-btn>
                                        </div>
                                    </v-form>
                                </v-tab-item>

                                <!-- <v-tab-item value="3">
                                    <v-toolbar card color="white" class="py-2">
                                        <v-avatar size="32">
                                            <img src="/img/security.png">
                                        </v-avatar>
                                        <v-toolbar-title>Change my Password</v-toolbar-title>
                                    </v-toolbar>
                                    <v-divider light></v-divider>
                                    
                                    <v-form @submit="changePwd" class="px-3 pt-4 pb-5 mx-auto" style="max-width: 700px" ref="changePass">
                                        <p v-show="passLoader" class="mb-3">
                                            <v-progress-linear indeterminate color="limeGreen"></v-progress-linear>
                                        </p>

                                        <v-text-field :type="show ? 'text' : 'password'" label="Enter New Password" flat v-model="pass" prepend-inner-icon="lock" :rules="pwdRules"  solo class="text-field-curve" :append-icon="show ? 'visibility' : 'visibility_off'" @click:append="show = !show" color="#32CD32"></v-text-field>

                                        <v-text-field :type="show2 ? 'text' : 'password'" label="Confirm New Password" flat v-model="confirmPass" prepend-inner-icon="lock" :rules="pwdRules"  solo class="text-field-curve" :append-icon="show2 ? 'visibility' : 'visibility_off'" @click:append="show2 = !show2" color="#32CD32"></v-text-field>
                                       
                                        <v-btn type="submit" :loading="passLoader" block round dark color="limeGreen" class="mr-4 mx-0 mt-3">Reset</v-btn>
                                    </v-form>
                                </v-tab-item> -->

                                <v-tab-item value="4">
                                    <v-empty-state description="By clicking the delete button you thereby denounce membership of this platform and your account will be deleted!" iconSize="15em" icon="delete_sweep" title="Delete My Account">
                                        <v-btn round color="error" :loading="deleting" @click="deleteMe()"><v-icon left>delete</v-icon> Yes, Continue!</v-btn>
                                    </v-empty-state>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-dialog
                v-model="pop"
                max-width="290"
                >
                <v-card>
                    <v-card-title class="title"><v-icon left>info</v-icon> Message</v-card-title>

                    <v-card-text class="text-xs-center">
                        {{label}}
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="pop = false"
                        >
                            Ok
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import VEmptyState from "../components/VEmptyState.vue";
import VImgUploader from "../components/ProfileImgUploader.vue";
export default {
    components: {
        VEmptyState,
        VImgUploader
    },
    metaInfo: {
      title: 'User Dashboard',
      // override the parent template and just use the above title only
      titleTemplate: null
    },
    data() {
        return {
            pop: false,
            actions: [
                {icon: "person_outline", click: () => {this.tabs = '1'}, name: "Personal Details"},
                {icon: "domain", click: () => {this.tabs = '2'}, name: "Business Details"},
                // {icon: "lock", click: () => {this.tabs = '3'}, name: "Change Password"},
                // {icon: "settings", click: () => {this.tabs = '4'}, name: "Manage My Account"},
            ],
            tabs: '1',
            show: false,
            show2: false,
            passLoader: false,
            pass: "",
            confirmPass: "",
            mobileRules: [
                v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!',
                v => (v && v.length === 11) || 'Mobile Number should be 11 digits!'
            ],
            pwdRules: [
                v => (v && v.length !== '' && v.length >= 6) || 'Minimum lenght is 6  characters'
            ],
            userRules: [
                v => (v && v.length !== '' && v.length >= 3) || 'Minimum lenght is 3  characters'
            ],
            inputRules: [
                v => (v && v.length !== '' && v.length >= 0) || 'This Field is Required'
            ],
            emailRules: [
                v => (v && v.length !== '' && v.length >= 1) || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            saveLoader: false,
            name: "",
            email: "",
            mobile: "",
            type: "",
            address: "",
            bizLoader: false,
            business: "",
            state: "",
            about: "",
            website: "",
            deleting: false,
            userData: [],
            label: ""
        }
    },
    methods: {
        changePwd(e) {
            e.preventDefault()
            const self = this;
            if(self.$refs.changePass.validate()){
                if (this.pass !== this.confirmPass) {
                    this.$store.dispatch('setSnackText', "Provided Passwords did not match!")
                    this.$store.dispatch('setSnackState', true)

                    return
                }
            }
        },
        saveDetails(e) {
            e.preventDefault()
            const self = this;
            if(self.$refs.saveDetailForm.validate()){
                self.saveLoader = true

                var details = self.$store.state.db.collection("users").doc(self.$store.state.userData.uid);

                // Set the Updates personal details
                return details.update({
                        name: self.name
                    })
                    .then(() => {
                        self.saveLoader = false
                        self.$store.dispatch('setSnackText', "Personal details updated!")
                        self.$store.dispatch('setSnackState', true)
                        self.$store.dispatch('syncUserData')
                    })
                    .catch(error => {
                        self.saveLoader = false
                        self.$store.dispatch('setSnackText', "Error updating personal details: "+error)
                        self.$store.dispatch('setSnackState', true)
                    });
            }
        },
        businessDetails(e) {
            e.preventDefault()
            const self = this;
            if(self.$refs.businessForm.validate()){

                self.bizLoader = true

                var business = self.$store.state.db.collection("users").doc(self.$store.state.userData.uid);

                if (this.website == undefined) {
                    this.website = ""
                }

                // Set the Updates Business details
                business.update({
                    companyName: self.business,
                    primaryState: self.state,
                    address: self.address,
                    website: self.website,
                    about: self.about
                })
                .then(() => {
                    self.bizLoader = false
                    self.$store.dispatch('syncUserData')
                    self.$store.dispatch('setSnackText', "Business details updated!")
                    self.$store.dispatch('setSnackState', true)
                })
                .catch(error => {
                    self.bizLoader = false
                    self.$store.dispatch('setSnackText', "Error updating business details: "+error)
                    self.$store.dispatch('setSnackState', true)
                });
            }
        },
        deleteMe() {
            this.deleting = true
            this.$store.state.db.collection("users").doc(this.$store.state.userData.uid).delete()
            .then(() => {
                return this.$store.state.auth.currentUser.delete()
            })
            .then(() => {
                this.$router.push('/')
                this.deleting = false
                this.$store.dispatch('setSnackText', "Your account has been deleted. You are no longer a member of this platform!")
                this.$store.dispatch('setSnackState', true)
                this.$store.state.auth.signOut()
                console.log('deleted')
            })
            .catch(err => {
                this.deleting = false
                console.log(err)
            })
        },
        initializeUser(data) {
            this.name = this.userData.name
            this.email = this.userData.email
            this.mobile = this.userData.mobile
            this.type = this.userData.type + " Account"
            this.address = this.userData.address
            this.business = this.userData.companyName
            this.state = this.userData.primaryState
            this.website = this.userData.website
            this.about = this.userData.about
        },
        diffTime(timestamp) {
            var currentDate = new Date().getTime()
            var difference = timestamp - currentDate;
            var daysDifference = Math.floor(difference/1000/60/60/24);
            if (daysDifference < 0) {
                daysDifference = 0
            }
            return daysDifference;
        }
    },
    created() {
        if(this.$store.state.userData.length < 1) {
            this.$router.push('/')
        }
        // Initializes userdata array with userdata
        this.userData = this.$store.state.userData,
        this.initializeUser(this.userData)

        if (!this.$store.state.userData.displayPhoto) {
            this.pop = true
            this.label = "Please Upload a Business Logo or Display photo for your account!"
        }
    },
    computed: {
        stateList() {
            var temp = []
            var x = ''
            this.$store.state.locationBank.map(item => {
                x = item.state.name
                temp.push(x)
            })
            return temp
        },
        activated() {
            let data = [
                    {icon: "/img/premium.png", click: () => {
                            this.pop = true
                            this.label = "Your current plan duration is "+this.$store.state.userData.lastActivePlanDuration+" months. You have "+this.diffTime(this.$store.state.userData.validity)+" days left..."
                        }, name: "Premium Plan Active", show: this.$store.state.userData.mode !== "FREE"},
                    {icon: "/img/shield.png", click: () => {
                            this.pop = true
                            this.label = "You Account has been verified"
                        }, name: "Account Verified", show: this.$store.state.userData.verified === 1},
                    {icon: "/img/medal.png", click: () => {
                            this.pop =true
                            this.label = "You are currently a Featured agent on Zuana Homepage"
                        }, name: "Your are Featured Agent", show: this.$store.state.userData.mode === 1}
                ]
            return data.filter(item => {
                return item.show
            })
        }
    }
}
</script>
