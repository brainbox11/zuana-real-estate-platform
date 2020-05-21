<template>
  <v-app>
    <Navbar />
    <v-content>
      <!-- <v-fade-transition mode="out-in"> -->
        <keep-alive include="HomePage">
          <router-view></router-view>
        </keep-alive>
      <!-- </v-fade-transition> -->
    </v-content>
    <Footer v-if="$route.name !== 'PostAd' && $route.name !== 'Profile'"/>

    <!-- <BootLoader v-if="!render" /> -->

    <v-snackbar v-model="$store.state.snackState" color="grey darken-3" right :timeout="timeout" top multi-line>
      {{$store.state.snackText}}
      <v-btn color="pink" flat icon @click="closeSnack">
        Close
      </v-btn>
    </v-snackbar>

    <!-- Client Request Dialog -->
    <v-dialog v-model="$store.state.reqFormState" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="500px" >
        <v-card class="pb-4">
            <v-toolbar card color="white" class="bb-hero1 py-2">
                <v-avatar size="32">
                    <img src="/img/request.png">
                </v-avatar>
                <v-toolbar-title>Make a client request</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="$store.state.reqFormState = !$store.state.reqFormState">clear</v-icon>
            </v-toolbar>
            
            <v-form @submit="sendRequest" class="px-3 pt-4 pb-3" ref="reqForm">
                <p class="mb-3 subheading">
                    You can't find what you are looking for? Make a request below and our agent will contact you with solutions!
                </p>

                <v-text-field label="Your name" flat v-model="reqName" :rules="inputRules" solo prepend-inner-icon="person_outline" class="text-field-no-curve" color="#32CD32"></v-text-field>

                <v-tooltip top>
                    <v-text-field type="number" label="Mobile Number (eg: 09036*****)" flat v-model="reqContact" :rules="mobileRules" solo prepend-inner-icon="phone" class="text-field-no-curve" color="#32CD32" slot="activator"></v-text-field>

                    <span>Please you provide a working phone number, because this the only way our Agents can contact you!</span>
                </v-tooltip>

                <v-text-field label="Property Purpose" flat v-model="reqPurpose" :rules="inputRules" solo prepend-inner-icon="sort" class="text-field-no-curve" color="#32CD32"></v-text-field>

                <v-text-field type="number" label="Your Budget" flat v-model="reqBudget" :rules="inputRules" solo prepend-inner-icon="account_balance_wallet" class="text-field-no-curve" color="#32CD32"></v-text-field>

                <v-textarea label="Enter a description of the Property..." flat v-model="reqDescription" prepend-inner-icon="business" :rules="inputRules"  solo class="text-field-no-curve" color="#32CD32"></v-textarea>

                <v-btn type="submit" :loading="requesting" block round dark color="limeGreen" class="mr-4 mx-0 mt-3">Send Request</v-btn>
            </v-form>
        </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import BootLoader from './components/BootLoader.vue'
import config from '@/fb'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    BootLoader,
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'ZUANA - Buy, Rent and Search for properties across south-south and south-east Nigeria.',
    // all titles will be injected into this template
    titleTemplate: '%s | Zuana.com.ng'
  },
  data () {
    return {
      timeout: 7000,
      reqName: "",
      reqPurpose: "",
      reqDescription: "",
      reqContact: "",
      reqBudget: "",
      inputRules: [
          v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!'
      ],
      mobileRules: [
          v => (v && v.length !== '' && v.length >= 1) || 'This Field is required!',
          v => (v && v.length === 11) || 'Mobile Number should be 11 digits!'
      ],
      requesting: false,
    }
  },
  computed: {

  },
  methods: {
    closeSnack() {
      this.$store.dispatch('setSnackState', false)
    },
    sendRequest(e) {
      e.preventDefault()
      if (this.$refs.reqForm.validate()) {
        this.requesting = true

        this.msgSending = true
        var date = new Date()

        this.$store.state.db.collection('requests').add({
            createdOn: date.getTime(),
            name: this.reqName,
            purpose: this.reqPurpose,
            contact: this.reqContact,
            description: this.reqDescription,
            budget: Math.abs(this.reqBudget),
            readBy: []
        }).then(() => {
            var agents = []
            var desc = this.reqDescription
            var users = this.$store.state.db.collection("users")
         
            users.where("type", "==", 'Agent').orderBy("createdOn").limit(1500).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        if (doc.data().playerId) {
                          doc.data().playerId.forEach((id) => {
                            agents.push(id)
                          });
                        }
                    });
                    if (agents) {
                      var body = {
                          "app_id": this.$appId,
                          "include_player_ids": agents,
                          "headings": {"en": "New Client Request For You"},
                          "contents": {"en": desc},
                          "url": this.$baseUrl+"/requests",
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
                }
                //console.log("Data: ",agents)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


            this.$store.state.reqFormState = false
            this.$refs.reqForm.reset()
            this.$refs.reqForm.resetValidation()
            this.$store.dispatch('setSnackText', "Your request has been sent to agents!")
            this.$store.dispatch('setSnackState', true)
            this.requesting = false
        }).catch(err => {
            this.$store.dispatch('setSnackText', err)
            this.$store.dispatch('setSnackState', true)
            this.requesting = false
        })
      }
    }
  },
  created() {
    // if (localStorage.uid === undefined) {
    //   this.$router.push('/')
    // }

    this.$store.dispatch('setDatabase', config.db)
    this.$store.dispatch('setAuth', config.auth)
    this.$store.dispatch('setStorage', config.storage)
    this.$store.dispatch('setFunctions', config.functions)

    // Listens for authentication changes
    this.$store.state.auth.onAuthStateChanged(user => {
      if (user) {
        // Updates user login status
        this.$store.dispatch('setUserState', true)

        user.getIdTokenResult().then(idTokenResult => {
          user.admin = idTokenResult.claims.admin
          this.$store.dispatch('setAdminStatus', user.admin)
        })

        // Fetches user's data from firestore
        var docRef = this.$store.state.db.collection("users").doc(user.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
              // Updates user's data when it is retrived
              this.$store.dispatch('setUserData', doc.data())
              var admin = doc.data().type === "Admin" ? true : false
              this.$store.dispatch('setAdminStatus', admin)
            } else {
              // doc.data() will be undefined in this case
              console.log("Unable to load user's data");
            }
            
            this.$store.dispatch('setSnackText', "Welcome back "+ this.$store.state.userData.name)
            this.$store.dispatch('setSnackState', true)

            localStorage.setItem('uid', user.uid)
        })
        .then(() => {
            if (localStorage.playerId) {
                var userRef = this.$store.state.db.collection("users").doc(user.uid)

                this.$store.state.db.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(userRef)
                    .then((sfDoc) => {
                        if (!sfDoc.exists) {
                            throw "User does not exist!";
                        }
                        
                        var temp = []
                        temp.push(localStorage.playerId)

                        if (sfDoc.data().playerId) {
                            var temp = sfDoc.data().playerId;

                            if (temp.includes(localStorage.playerId)) {
                              console.log("You already subscribed for Notification")
                            } else {
                                if (temp.length < 3) {
                                  temp.push(localStorage.playerId)
                                } else {
                                  temp.shift()
                                  temp.push(localStorage.playerId)
                                }
                            }
                        } else {
                            var temp = []
                            temp.push(localStorage.playerId)
                        }

                        transaction.update(userRef, { playerId: temp })
                    })
                    .catch(err => {
                        console.log("Error: "+err)
                    })
                })
            }
        })
        .catch((error) => {
          this.render = true
          this.$store.dispatch('setSnackText', "Error getting user data")
          this.$store.dispatch('setSnackState', true)
          //console.log("Error getting document:", error);
        });
        //localStorage.setItem('uid', user.uid)
      } else {
        this.render = true
        localStorage.removeItem('uid')
        this.$store.dispatch('setUserState', false)
        this.$store.dispatch('setUserData', [])
      }
    })

    // Sets up offline data presistence 
    this.$store.state.db.enablePersistence()
    .catch(err => {
      if(err.code == 'failed-precondition'){
        // Probably multiple tabs open at once
        console.log('Persistence failed');
      } else if(err.code == 'unimplemented'){
        // Lack browser support
        console.log('persistence is not available');
      }
    })

    // Registers a service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('service worker registered!'))
      .catch((err) => console.log('service worker not registered!', err))
    }
  },
  mounted() {
    // Stores an instance of vue in a variable
    var self = this
    var date = new Date()
    var currentTimeStamp = date.getTime()

    // Initializes Onesignal Api For push notification
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: "4f5a0973-0996-406b-81e8-14b19c13646f",
        autoRegister: false,
        notifyButton: {
          enable: false,
        },
        welcomeNotification: {
          "title": "Thanks for subscribing!",
          "message": "ZUANA - Search Properties Across Nigeria",
          // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
        },
        promptOptions: {
          /* actionMessage limited to 90 characters */
          actionMessage: "We would like to notify you on latest properties for sale!",
          /* acceptButtonText limited to 15 characters */
          acceptButtonText: "ALLOW",
          /* cancelButtonText limited to 15 characters */
          //cancelButtonText: "NO THANKS"
        }
      });
      
     OneSignal.registerForPushNotifications();

      if (Notification.permission === "granted") {
        OneSignal.registerForPushNotifications();
      } else {
        OneSignal.showHttpPrompt();
      }

      // Gets user's PlayerId
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        if (isSubscribed) {
          // If the user subscribed
          OneSignal.getUserId((userId) => {
            localStorage.setItem('playerId', userId)

            if (localStorage.uid) {
              var userRef = self.$store.state.db.collection("users").doc(localStorage.uid)

              self.$store.state.db.runTransaction((transaction) => {
                  // This code may get re-run multiple times if there are conflicts.
                  return transaction.get(userRef)
                  .then((sfDoc) => {
                      if (!sfDoc.exists) {
                          throw "User does not exist!";
                      }
                      
                      if (sfDoc.data().playerId) {
                          var temp = sfDoc.data().playerId;

                          if (temp.includes(userId)) {
                            console.log("PlayerId already exists For user")
                          } else {
                              if (temp.length < 3) {
                                temp.push(userId)
                              } else {
                                temp.shift()
                                temp.push(userId)
                              }
                          }
                      } else {
                          var temp = []
                          temp.push(userId)
                      }
                      transaction.update(userRef, { playerId: temp })
                  })
                  .then(() => {
                      console.log("PlayerId has been updated!")
                  })
                  .catch(err => {
                      console.log("Error: "+err)
                  })
              })
            }
          })
        } else {
          location.removeItem("playerId")
          console.log("Subscription cancelled!")
        }
      })
    });

    // Loads in advertisements
    var ad = this.$store.state.db.collection("adverts").limit(20)
    ad.get()
    .then((querySnapshot) => {
        var document = []
        querySnapshot.forEach((doc) => {
            document.push(doc.data())
        });

        this.$store.dispatch('setAdverts', document)
    })

    // Notification counter
    if (localStorage.uid) {
      var docRef = this.$store.state.db.collection("notification").where("receiptor", "array-contains", localStorage.uid).orderBy("createdOn", "desc").limit(10)

        docRef.get().then((doc) => {
            if (doc.empty) {
                this.$store.dispatch('setNote', 0)
            } else {
                let temp = []

                doc.forEach((doc) => {
                    temp.push(doc.data())
                })

                temp = temp.filter((doc) => {
                    return !doc.seenBy.includes(localStorage.uid)
                })
                this.$store.dispatch('setNote', temp.length)
            }
        })
    }

    // Background tasks
    if(localStorage.managerKey == undefined || Math.abs(localStorage.managerKey) < currentTimeStamp) {
      var bgTask1 = this.$store.state.db.collection("users").where("validity", "<", Math.abs(currentTimeStamp))
      bgTask1.get().then(resp => {

        let batch = this.$store.state.db.batch();

        resp.forEach(userDocRef => {
          batch.update(userDocRef.ref, { active: false })
        })

        batch.commit()
        .then(() => {
          localStorage.setItem("managerKey", currentTimeStamp+(60*60*6*1000))
        })
        .catch(err => console.error(err));
      })
      .catch(error => console.error(error))

      var bgTask2 = this.$store.state.db.collection("property")
      .where("expiresOn", "<", Math.abs(currentTimeStamp))
      bgTask2.get().then(resp => {

        let batch = this.$store.state.db.batch();

        resp.forEach(propDocRef => {
          batch.update(propDocRef.ref, { active: false })
        })

        batch.commit()
        .then(() => {
          localStorage.setItem("managerKey", currentTimeStamp+(60*60*6*1000))
        })
        .catch(err => console.error(err));
      })
      .catch(error => console.error(error))
    }
  }
}
</script>

<style>
    .overlapper{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0,0,0,0.2)
    }
    .bottom-gradient {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.931) 0%, transparent 72%);
    }
    .br-10 {
      border-radius: 10px;
    }
    .hero-ba-ads {
      border: 1px solid rgba(0,0,0,0.10)!important;
    }
    .bt-hero1 {
      border-top: 3px solid #32CD32!important;
    }
    .bb-hero1 {
      border-bottom: 3px solid #32CD32!important;
    }
    .bb-hero2 {
      border-bottom: 1px solid #eee!important;
    }
    .bg-hero2 {
      background: #f5f5f5!important;
    }
    .bra-0 {
      border-radius: 0px!important;
    }
    .hero-text{
      text-shadow: 0 0 3px #111111;
    }
    .hero-text-bg{
      background: rgba(0, 0, 0, 0.5);
      padding: 5px 7px;
    }
    .hero-icon-bg{
      background: rgba(0, 0, 0, 0.5);
    }
    .hero--text-1 {
      color: #32CD32!important
    }
    .hero-text-ads{
      background: rgba(0, 0, 0, 0.65);
      padding: 5px 10px;
      line-height: normal!important;
      margin-top: 5px;
      display: inline-block;
      border-left: 5px solid #32CD32;
    }
    .hero-text-ads2{
      background: rgba(0, 0, 0, 0.65);
      padding: 5px 10px;
      line-height: normal!important;
      display: inline-block;
      border-left: 5px solid #32CD32;
    }
    .relative {
      position: relative;
    }
    .transparent {
      background: transparent;
    }
    .hero-text-f5 {
      color: #f5f5f5!important;
    }
    .badge .v-badge__badge {
        top: 5px!important;
        right: 4px!important;
    }
    #filter .v-text-field__details {
      display: none!important;
    }
    /* featured agent prev and next */
    .delimiter-left {
      position: absolute;
      top: 40%;
      left: -10px;
      padding: 5px;
      background: #f5ffff;
      z-index: 1000;
      border: 1px solid rgba(0,0,0,0.10)!important;
      display: none;
    }
    .delimiter-right {
      position: absolute;
      top: 40%;
      right: -10px;
      padding: 5px;
      background: #f5ffff;
      z-index: 1000;
      border: 1px solid rgba(0,0,0,0.10)!important;
      display: none;
    }
    .delimiter-left:hover, .delimiter-right:hover {
      background: #ddd
    }
    .hover:hover {
      background: #eee
    }

    /* V-Img coursel */
    div.v-img-carousel {
      height:auto;
      position:absolute;
      bottom:0px;
      width:100%;
      display:flex;
      background: rgba(0, 0, 0, 0.5);
      padding: 5px;
    }
    div.v-img-carousel > span {
      cursor: pointer;
    }
    .pointer {
      cursor: pointer!important;
    }
    .border-white {
      border: 4px solid #fff;
    }
    .v-btn--active:before, .v-btn:hover:before, .v-btn:focus:before {
        background-color: #32CD32;
        color: #fff;
    }
    .invisible {
      visibility: hidden!important;
    }
    /* .theme--light.v-stepper .v-stepper__step__step  {
      background-color: #32CD32!important;
    } */

    .primary--text .v-list__tile__action, .primary--text .v-list__tile__title {
        color: #32CD32 !important;
        caret-color: #32CD32 !important;
    }

    .main {
      min-height: 350px;
    }

    /* Login Modal style */
    .text-field-curve .v-input__slot {
        border-radius: 50px!important;
        border: 1px solid #eee;
    }

    .text-field-no-curve .v-input__slot {
        border-radius: 0px!important;
        border: 1px solid #eee;
    }
</style>