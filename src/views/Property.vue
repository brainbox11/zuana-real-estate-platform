<template>
    <div>

        <div class="grey lighten-5 main">
            <v-container class="px-0">
                <Loader v-if="property.length < 1" />
                <v-layout v-else wrap row>
                    <v-flex xs12 md8>
                        <div class="pa-2">
                            <v-card flat class="mb-2 hero-ba-ads">
                                <div class="headline text-capitalize py-3 font-weight-medium px-2 hidden-sm-and-down">{{property.title}}</div>
                                <div class="title text-capitalize py-3 font-weight-medium px-2 hidden-md-and-up">{{property.title}}</div>
                                <v-img
                                    :src="items[imgCount].link"
                                    :lazy-src="items[imgCount].link"
                                    aspect-ratio="1.7"
                                    class="grey darken-3"
                                    >
                                    <v-container class="pa-0" fill-height fluid>
                                        <v-layout fill-height>
                                            <v-flex xs12 class="relative">
                                                <span v-if="property.type !== 'Basic'" class="subheading elevation-1 font-weight-medium white--text hero-text-ads">{{property.type}} Ad</span>

                                                <div class="v-img-carousel">
                                                    <span v-ripple @click="toggleImg(0)"><v-icon size="30" color="grey lighten-3">chevron_left</v-icon></span>
                                                    <v-spacer></v-spacer>
                                                    <span class=" title font-weight-bold white--text"><v-icon size="25" class="mt-1" color="white">camera_alt</v-icon> {{imgCount+1}}/{{items.length}}</span>
                                                    <v-spacer></v-spacer>
                                                    <span v-ripple @click="toggleImg(1)"><v-icon size="30" color="grey lighten-3">chevron_right</v-icon></span>
                                                </div>
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
                                <v-card-text>
                                    <div class="headline font-weight-medium hero--text-1 mb-3">
                                        <v-avatar size="30" class="mr-2"><img src="/img/cash.png"></v-avatar>
                                        &#8358;{{Math.abs(property.price).toLocaleString('en-US')}} <span v-if="property.duration" class="subheading">{{property.duration}}</span>
                                    </div>
                                    <div class="subheading mb-2"><v-icon size="20">place</v-icon> {{property.street+', '+property.area+', '+property.local+', '+property.state}}</div>
                                    <div class="text-truncate my-2">
                                        <span class="caption"><v-icon size="17">verified_user</v-icon> For {{property.purpose}}</span>
                                        <span v-show="property.bedroom && property.bathroom" class="caption ml-3 text-truncate"><v-icon size="17">local_hotel</v-icon> {{property.bedroom}} bedroom | <v-icon size="17">hot_tub</v-icon> {{property.bathroom}} bath</span>
                                    </div>
                                    <div style="display:flex">
                                        <v-chip label dark class="text-trucated mt-3" color="grey darken-1" small>{{property.category}}, {{property.subCategory}}</v-chip>
                                        <v-spacer></v-spacer>
                                        
                                    </div>
                                    <div class="text-truncated mt-2" style="display:flex">
                                        <span class="grey--text caption text-truncate mt-3"><v-icon size="15">access_time</v-icon> {{timeManager(property.createdOn)}}</span>

                                        <v-spacer></v-spacer>

                                        <v-btn @click="addFavourite(pid)" :loading="favoriteLoading" dark depressed color="limeGreen" fab small><v-icon>{{checkFavorite(property.admirers) ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
                                        
                                        <v-dialog v-model="dialogShare" width="400">
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-on="on" depressed fab small dark color="limeGreen" ><v-icon>share</v-icon></v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                    <span class="title font-weight-bold">Share</span>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                    class="mx-0"
                                                    icon
                                                    @click="dialog = false"
                                                    >
                                                    <v-icon>mdi-close-circle-outline</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-list>
                                                    <v-list-tile @click="shareFb">
                                                        <v-list-tile-action>
                                                            <v-avatar tile size="25">
                                                                <img src="/img/facebook.png">
                                                            </v-avatar>
                                                        </v-list-tile-action>
                                                        <v-card-title>Facebook</v-card-title>
                                                    </v-list-tile>
                                                    <v-list-tile @click="shareWa">
                                                        <v-list-tile-action>
                                                            <v-avatar tile size="25">
                                                                <img src="/img/whatsapp.png">
                                                            </v-avatar>
                                                        </v-list-tile-action>
                                                        <v-card-title>Whatsapp</v-card-title>
                                                    </v-list-tile>
                                                </v-list>
                                                <v-text-field
                                                    ref="link"
                                                    :label="copied ? 'Link copied' : 'Click to copy link'"
                                                    class="pa-3"
                                                    readonly
                                                    :value="urlValue"
                                                    @click="copy"
                                                ></v-text-field>
                                            </v-card>
                                        </v-dialog>
                                        <span class="caption"><v-icon size="17">visibility</v-icon> {{property.views}} Views</span>
                                    </div>
                                </v-card-text>
                            </v-card>
                            <v-card flat class="mb-2 hero-ba-ads">
                                <v-card-text>
                                    <div class="subheading font-weight-medium">Property overview</div>
                                    {{property.description}}
                                </v-card-text>
                                <v-card-text v-if="facility.length">
                                    <div class="subheading font-weight-medium">Facilities/Features</div>
                                    <v-chip label dark v-for="(item, i) in facility" :key="i" color="grey darken-1">{{facility[i]}}</v-chip>
                                </v-card-text>
                            </v-card>

                            <v-card flat class="mb-2 py-3 hero-ba-ads">
                                <v-card-text class="body-1">
                                    <div class="subheading font-weight-medium">Disclaimer</div>
                                    This property consists of an advertisement by <span class="font-weight-medium" v-if="merchant">{{merchant.companyName == undefined ? merchant.name : merchant.companyName}}</span>. Zuana only serves as a medium for the advertisement of this property. Zuana is only communicating this property offer and is not responsible for selling the property.
                                    <br>
                                    Zuana neither warrants nor is making any representations with respect to properties or offers listed on the site.
                                    Property descriptions and other information provided on our website are intended for information and marketing purposes and, although displayed in good faith, we will not in any circumstances accept responsibility for their inaccuracy.
                                    The property adverts and listings on our website do not constitute property particulars; these should be available directly from the agent marketing the property on Zuana. It is the responsibility of prospective buyers/tenants to satisfy themselves as to the accuracy of any property descriptions displayed and the responsibility of agents to ensure the accuracy and integrity of property descriptions provided on our website.
                                    Zuana shall not in any way be responsible for the individual actions of agents during relations with users, both off and on the Zuana.com.ng website.

                                </v-card-text>
                            </v-card>

                            <p class="title mt-5 mb-4 font-weight-bold text-xs-center">
                                Similar Properties<br>
                                ____
                            </p>
                            <div v-if="similar === 0">
                                <Empty description="No similar property from this Agent was found..." />
                            </div>
                            <Loader v-else-if="similar.length < 1" />
                            <div v-else>
                                <v-card v-ripple flat class="mb-3 bb-hero1 hero-ba-ads" v-for="(item, index) in similar" :key="index" @click="router(item.id)">
                                    <v-card-text class="pa-1">
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
                                                            <span class="subheading elevation-1 font-weight-medium white--text hero-text-ads">{{item.data.type}} Ad</span>
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
                                                <div class="headline font-weight-medium text-truncate mb-2">{{item.data.title}}</div>
                                                <div class="subheading mb-2"><v-icon size="20">place</v-icon> {{item.data.street+', '+item.data.area+', '+item.data.state}}</div>
                                                <div class="title font-weight-medium hero--text-1 mb-3">
                                                    <v-avatar size="30" class="mr-2"><img src="/img/cash.png"></v-avatar>
                                                    &#8358;{{Math.abs(item.data.price).toLocaleString('en-US')}}
                                                </div>
                                                <div class="text-truncate my-2">
                                                    <span class="caption"><v-icon size="17">verified_user</v-icon> For {{item.data.purpose}}</span>
                                                    <span class="caption ml-3 text-truncate"><v-icon size="17">local_hotel</v-icon> {{item.data.bedroom}} bedroom | <v-icon size="17">hot_tub</v-icon> {{item.data.bathroom}} bath</span>
                                                </div>
                                                <p class="body-1 mb-0 text-truncate">{{item.data.description}}</p>
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
                            </div>
                        </div>
                    </v-flex>
                    <v-flex xs12 md4>
                        <div class="pa-2">
                            <v-card v-if="merchant == null" color="white" class="mb-2" dark>
                                <v-card-text class="grey--text">
                                    Getting Agent details...
                                    <v-progress-linear
                                        indeterminate
                                        color="limeGreen"
                                        class="mb-0"
                                    ></v-progress-linear>
                                </v-card-text>
                            </v-card>
                            <div v-else>
                                <v-card flat class="mb-2 pt-3 text-xs-center hero-ba-ads">
                                    <v-responsive class="pt-2">
                                        <v-avatar size="120" class="grey lighten-2">
                                            <img v-if="merchant.displayPhoto" :src="merchant.displayPhoto">
                                            <img v-else src="/img/estate-agent2.png">
                                        </v-avatar>
                                    </v-responsive>
                                    <v-card-text>
                                        <div class="grey--text">Marketed By</div>
                                        <v-btn route :to="'/agent/'+property.uid" flat round color="limeGreen">{{merchant.name}}</v-btn>
                                        <div v-if="merchant.companyName" class="body-2"><v-icon size="20" class="mr-1">domain</v-icon>{{merchant.companyName}}</div>
                                        <div v-if="merchant.verified" class="mt-3 title">
                                            <v-avatar
                                              size="30"
                                              class="mr-1"
                                            >
                                              <img src="/img/shield.png" alt="alt">
                                            </v-avatar>
                                            This Agent has been Verified
                                        </div>
                                    </v-card-text>
                                </v-card>

                                <v-card flat class="mb-4 py-2 px-1 hero-ba-ads hidden-sm-and-down">
                                    <v-card-text>
                                        <div class="title font-weight-medium mb-2">
                                            Phone the Agent Now?
                                        </div>
                                        <div style="display:flex">
                                            <v-icon size="25">phone</v-icon> <span class="headline font-weight-regular mt-2 hero--text-1">+234906***</span>
                                            <v-spacer></v-spacer>
                                            <v-tooltip top>
                                                <v-btn fab dark small depressed color="limeGreen" slot="activator" @click="showPhone(pid)">
                                                    <v-icon size="25">phone</v-icon>
                                                </v-btn>
                                                <span>View agent's contact</span>
                                            </v-tooltip>
                                            <v-tooltip top>
                                                <v-btn slot="activator" @click="chatWa(merchant.mobile)" outline fab small depressed color="limeGreen">
                                                    <v-avatar tile size="25"><img src="/img/whatsapp.png"></v-avatar>
                                                </v-btn>
                                                <span>Chat with agent on whatsapp</span>
                                            </v-tooltip>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </div>

                            <v-card flat class="mb-4 py-3 px-3 hero-ba-ads grey darken-3">
                                <div class="white--text title mb-4"><v-avatar tile size="25" class="mr-2"><img src="/img/contact.png"></v-avatar> Message Agent</div>
                                <v-form @submit="messageAgent" ref="messageForm">
                                    <v-text-field
                                        :rules="inputRules"
                                        v-model="msgName"
                                        box
                                        dark
                                        color="white"
                                        background-color="666"
                                        class="br-0 mr-1"
                                        label="Name"
                                        ></v-text-field>
                                    <v-text-field
                                        :rules="inputRules"
                                        v-model="msgMobile"
                                        type="number"
                                        box
                                        dark
                                        color="white"
                                        background-color="666"
                                        class="br-0 mr-1"
                                        label="Phone Number"
                                        ></v-text-field>
                                    <v-textarea
                                        :rules="inputRules"
                                        v-model="msg"
                                        box
                                        dark
                                        color="white"
                                        background-color="666"
                                        class="br-0 mr-1"
                                        label="Your message"
                                        ></v-textarea>
                                        <v-btn type="submit" :loading="msgSending" depressed color="limeGreen" dark>Send <v-icon size="20" class="ml-2">send</v-icon></v-btn>
                                </v-form>
                            </v-card>

                            <v-card flat class="mb-2 py-3 px-2 hero-ba-ads">
                                    <v-btn route to="/safety" color="success" dark large block class="mb-4" round><v-icon left>launch</v-icon> Visit Safety center</v-btn>
                                    <v-btn dark large block class="error" round @click="report = !report"><v-icon left>warning</v-icon> Report Listing?</v-btn>
                            </v-card>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <v-bottom-nav :value="true" class="elevation-4 hidden-md-and-up" fixed color="white">
            <v-btn color="teal" value="phone" @click="showPhone(pid)">
                <span class="body-2"> Call Agent</span>
                <v-icon size="20" color="limeGreen">phone</v-icon>
            </v-btn>

            <v-btn @click="chatWa(merchant.mobile)" color="teal" value="whatsapp">
                <span class="body-2 mt-1">Chat with agent</span>
                <v-avatar tile size="20"><img src="/img/whatsapp.png"></v-avatar>
            </v-btn>
        </v-bottom-nav>

        <v-dialog v-if="merchant !== null" v-model="agentData" persistent max-width="400px">
            <v-toolbar card color="white">
                <v-avatar tile size="30">
                    <img src="/img/admin.png">
                </v-avatar>
                <v-toolbar-title>Agent's contact</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="agentData = false">clear</v-icon>
            </v-toolbar>
            <v-card class="pa-3">
                <div class="text-xs-center">
                    <v-responsive>
                        <v-avatar size="80" class="grey lighten-2">
                            <img v-if="merchant.displayPhoto" :src="merchant.displayPhoto">
                            <img v-else src="/img/estate-agent2.png">
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="grey--text-darken-3 font-weight-medium title">{{merchant.name}}</div>
                        <div v-if="merchant.companyName" class="body-2 mt-1"><v-icon size="20" class="mr-1">domain</v-icon>{{merchant.companyName}}</div>
                        <div class="mt-3"></div>
                        <v-chip color="grey darken-2" label>
                            <v-avatar tile color="grey darken-3" class="mr-2"><v-icon size="20" color="white">phone</v-icon></v-avatar> <span class="title font-weight-regular white--text">{{merchant.mobile}}</span>
                        </v-chip>
                        <div v-if="merchant.verified" class="mt-3 title">
                            <v-avatar
                              size="30"
                              class="mr-1"
                            >
                              <img src="/img/shield.png" alt="alt">
                            </v-avatar>
                            This Agent has been Verified
                        </div>
                    </v-card-text>
                </div>
                <v-card-actions>
                    <v-btn round depressed @click="call(merchant.mobile)" dark color="limeGreen">Call Now!</v-btn>
                    <v-btn round route :to="'/agent/'+property.uid" color="limeGreen darken-1" flat >View Profile</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Report dialog -->
        <v-dialog max-width="500" persistent v-model="report">
            <v-card flat color="grey darken-3" class="py-3 px-3 hero-ba-ads">
                <div class="white--text title font-weight-regular bb-hero1 py-3 mb-4"><v-avatar tile size="25" class="mr-2"><img src="/img/problem.png"></v-avatar> Report Property</div>
                <v-form @submit="reportProperty" ref="reportForm">
                    <v-text-field
                        :rules="inputRules"
                        v-model="reportName"
                        solo
                        class="br-0 mr-1"
                        label="Name"
                        ></v-text-field>
                    <v-text-field
                        :rules="inputRules"
                        v-model="reportMobile"
                        type="number"
                        solo
                        class="br-0 mr-1"
                        label="Phone Number"
                        ></v-text-field>
                    <v-text-field
                        :rules="emailRules"
                        v-model="reportEmail"
                        solo
                        class="br-0 mr-1"
                        label="Email Address"
                        ></v-text-field>
                    <v-select
                        :rules="inputRules"
                        v-model="reportReason"
                        :items="reason"
                        solo
                        class="br-0 mr-1"
                        label="Reason"
                        menu-props="offsetY"
                        ></v-select>
                    <v-textarea
                        :rules="inputRules"
                        v-model="complain"
                        solo
                        class="br-0 mr-1"
                        label="Your Complain"
                        ></v-textarea>

                    <v-btn type="submit" :loading="reporting" depressed color="limeGreen" dark>Send Report <v-icon size="20" class="ml-2">send</v-icon></v-btn>
                    <v-btn flat color="limeGreen" @click="report = false" dark>Cancel</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
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
    data () {
      return {
        items: [],
        imgCount: 0,
        showing: 0,
        facility: [],
        agentData: false,
        similar: [],
        property: [],
        merchant: null,
        copied: false,
        dialogShare: false,
        msgName: '',
        msgMobile: '',
        msg: '',
        msgSending: false,
        inputRules: [
            v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!'
        ],
        emailRules: [
            v => (v && v.length !== '' && v.length >= 1) || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        pid: "",
        favoriteLoading: false,
        metaText: "Property Description",
        report: false,
        reporting: false,
        reportName: "",
        reportEmail: "",
        reportMobile: "",
        reportReason: "",
        reason: [
            "Property is Fraudulent",
            "Property is no longer available",
            "Property is being marketed without consent",
            "Offensive Picture/content"
        ],
        complain: "",
      }
    },
    metaInfo: {
      title: "Property Overview",
    },
    methods: {
        copy () {
            const markup = this.$refs.link
            markup.focus()
            document.execCommand('selectAll', false, null)
            this.copied = document.execCommand('copy')
        },
        toggleImg (data) {
            var x = 0
            if (data) {
                x = this.imgCount + 1
                if (x <= this.items.length-1) {
                    this.imgCount++
                }
            } else {
                x = this.imgCount - 1
                if (x >= 0 && this.imgCount !== 0) {
                    this.imgCount--
                }
            }
        },
        router(data) {
            this.$router.push('/property/'+data)
            
            this.merchant = null
            this.property = []

            var urlId = this.$route.params.id
            var docRef = this.$store.state.db.collection("property").doc(urlId);
            docRef.get().then((doc) => {
                this.property = doc.data()
                this.items = this.property.album
                this.facility = this.property.features
                return this.property.uid
            }).then(data => {
                // Fetches user's data from firestore
                var docRef = this.$store.state.db.collection("users").doc(data);
                return docRef.get().then((doc) => {
                    if (doc.exists) {
                        this.merchant = doc.data()
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("Unable to load user's data");
                    }
                    // console.log(this.merchant)
                })
            }).catch((error) => {
            this.$store.dispatch('setSnackText', "Unable to get agent's detail. Check internet connection!")
            this.$store.dispatch('setSnackState', true)
            });

            this.viewCounter()
        },
        shareFb() {
            var data = window.location.href
            var url = "https://www.facebook.com/sharer/sharer.php?u="+data
            window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
        },
        shareWa() {
            var data = "Hey, click this link to check out this property... "+window.location.href
            var url = "https://wa.me/?text="+ data
            window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
        },
        chatWa(num) {
            var wa = this.$store.state.db.collection("property").doc(this.pid)
            
            this.$store.state.db.runTransaction((transaction) => {
                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(wa).then((sfDoc) => {
                    if (!sfDoc.exists) {
                        throw "Document does not exist!";
                    }
                    
                    if (sfDoc.data().whatsappClick) {
                        var newCount = sfDoc.data().whatsappClick + 1;
                    } else {
                        var newCount = 1;
                    }
                    transaction.update(wa, { whatsappClick: newCount })
                })
            })



            var merchantName = this.merchant == null ? 'Agent' : this.merchant.name
            var data = "Good day "+merchantName+", I'm interest in a property you posted... "+window.location.href
            var url = "https://wa.me/"+num+"?text="+ data
            window.open(url, '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
        },
        call(num){
            document.location.href="tel:"+num
        },
        messageAgent(e) {
            e.preventDefault()
            if (this.$refs.messageForm.validate()) {
                this.msgSending = true
                var date = new Date()

                var receiptorId = []
                receiptorId.push(this.property.uid)

                this.$store.state.db.collection('notification').add({
                    createdOn: date.getTime(),
                    sender: this.msgName,
                    senderContact: this.msgMobile,
                    message: this.msg,
                    receiptor: receiptorId,
                    seenBy: [],
                    link: window.location.href
                }).then(() => {
                    if (this.merchant.playerId) {
                        var body = {
                            "app_id": this.$appId,
                            "include_player_ids": this.merchant.playerId,
                            "headings": {"en": this.msgName},
                            "contents": {"en": this.msg},
                            "url": window.location.href,
                            "ttl": "2419200"
                        }

                        this.$axios.post(this.$onesignalRequestUrl, body, this.$onesignalHeader)
                        .then(response => {
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }

                    this.$refs.messageForm.reset()
                    this.$refs.messageForm.resetValidation()
                    this.$store.dispatch('setSnackText', "Your message have been sent to Agent!")
                    this.$store.dispatch('setSnackState', true)
                    this.msgSending = false
                }).catch(err => {
                    this.$store.dispatch('setSnackText', err)
                    this.$store.dispatch('setSnackState', true)
                    this.msgSending = false
                })
            }
        },
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

        },
        showPhone(data) {
            this.agentData = true

            var phone = this.$store.state.db.collection("property").doc(data)
            
            this.$store.state.db.runTransaction((transaction) => {
                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(phone).then((sfDoc) => {
                    if (!sfDoc.exists) {
                        throw "Document does not exist!";
                    }
                    
                    if (sfDoc.data().phoneClick) {
                        var newCount = sfDoc.data().phoneClick + 1;
                    } else {
                        var newCount = 1;
                    }
                    transaction.update(phone, { phoneClick: newCount })
                })
            })
        },
        viewCounter() {
            var viewed = this.$store.state.viewedProducts.includes(this.pid)

            if(!viewed) {
                this.$store.dispatch('addViewed', this.pid)

                var viewRef = this.$store.state.db.collection("property").doc(this.pid)
            
                this.$store.state.db.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(viewRef).then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "Document does not exist!";
                        }
                        
                        if (sfDoc.data().views) {
                            var newCount = sfDoc.data().views + 1;
                        } else {
                            var newCount = 1;
                        }
                        transaction.update(viewRef, { views: newCount })
                    })
                })
            }
        },
        addFavourite(id) {
            if (this.$store.state.loggedIn) {
                this.favoriteLoading = true
                var property = this.$store.state.db.collection("property").doc(id)
                var added = true
            
                this.$store.state.db.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(property)
                    .then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "Document does not exist!";
                        }
                        
                        if (sfDoc.data().admirers) {
                            var temp = sfDoc.data().admirers;

                            if (temp.includes(this.$store.state.userData.uid)) {
                                temp = temp.filter(item => {
                                    item !== this.$store.state.userData.uid
                                })
                                added = false
                            } else {
                                temp.push(this.$store.state.userData.uid)
                            }
                        } else {
                            var temp = []
                            temp.push(this.$store.state.userData.uid)
                        }
                        transaction.update(property, { admirers: temp })
                    })
                    .then(() => {
                        this.favoriteLoading = false
                        if (added) {
                            this.$store.dispatch('setSnackText', "1 item added to your Favorites")
                        } else {
                            this.$store.dispatch('setSnackText', "1 item removed to your Favorites")
                        }
                        this.$store.dispatch('setSnackState', true)
                    })
                    .catch(err => {
                        this.favoriteLoading = false
                        this.$store.dispatch('setSnackText', err)
                        this.$store.dispatch('setSnackState', true)
                        console.log(err)
                    })
                })
            } else {
                this.$store.dispatch('setSnackText', "You must be logged in to favorite a property!")
                this.$store.dispatch('setSnackState', true)
            }
        },
        checkFavorite(data) {
            if(data) {
                if (this.$store.state.userData.uid) {
                    return data.includes(this.$store.state.userData.uid)
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        reportProperty(e) {
            e.preventDefault()
            if (this.$refs.reportForm.validate()) {
                this.reporting = true
                var self = this

                var body = "Name: "+this.reportName+",\n Reason: "+this.reportReason+"  \n Contact: "+this.reportMobile+", Complaint: "+this.complain+"\n The link to the property is: "+window.location.href
                
                Email.send({
                    Host: "smtp25.elasticemail.com",
                    Username: "chibuzo.fg@gmail.com",
                    Password: "4ed00a5b-8516-4bc2-a512-ffb2f0e587d9",
                    To:'support@zuana.com.ng',
                    From: self.reportEmail,
                    Subject : self.reportReason,
                    Body: body,
                    port: 25
                })
                .then( message => {
                    this.reporting = false
                    this.report = false
                    this.$refs.reportForm.reset()
                    this.$refs.reportForm.resetValidation()
                    alert(message)
                    this.$store.dispatch('setSnackText', "We have received your report and will get back to you within 24 hours!")
                    this.$store.dispatch('setSnackState', true)
                })
                .catch(err => {
                    console.log(err)
                    this.reporting = false
                })
            }
        }
    },
    created() {
        var urlId = this.$route.params.id
        this.pid = this.$route.params.id
        var docRef = this.$store.state.db.collection("property").doc(urlId);
        docRef.get().then((doc) => {
            this.property = doc.data()
            this.items = this.property.album
            this.facility = this.property.features
            return this.property.uid
        }).then(data => {
            // Fetches user's data from firestore
            var docRef = this.$store.state.db.collection("users").doc(data);
            return docRef.get().then((doc) => {
                this.merchant = doc.data()
            })
        })
        .then(data => {
            var similar = this.$store.state.db.collection("property")
         
            similar.where("active", "==", true).where("category", "==", this.property.category).orderBy('createdOn', "desc").limit(3).get()
            .then((querySnapshot) => {
                var document
                querySnapshot.forEach((doc) => {
                    document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    this.similar.push(document)
                });

                this.similar = this.similar.filter(item => {
                    return item.id !== this.pid
                })

                if (this.similar.length < 1) {
                    this.similar = 0
                }
            })
            .catch((error) => {
                this.similar = 0
                console.log("Error getting documents: ", error);
            });
        })
        .catch((error) => {
          this.$store.dispatch('setSnackText', "Unable to get agent's detail. Check internet connection!")
          this.$store.dispatch('setSnackState', true)
          console.log(error)
        });

        // Marks viewed products
        this.viewCounter()
    },
    computed: {
        urlValue() {
           return window.location.href
        }
    }
}
</script>

<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
