<template>
    <div>
        <v-toolbar flat class="white hero-ba-ads mb-2">
            <v-toolbar-title class="font-weight-medium grey--text-darken-3">
                Recent messages
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="font-weight-medium title"><v-icon>notifications</v-icon> {{notification.length}}</div>
        </v-toolbar>
        <Loader v-if="notification.length < 1"/>
        <div v-else-if="notification == 0" class="text-xs-center py-5">
             <v-avatar tile size="150"><img src="/img/notification.png" /></v-avatar>
            <p class="headline font-weight-medium mt-3 mb-0">You have no notification...</p>
        </div>
        <v-expansion-panel v-else class="mb-5">
            <v-expansion-panel-content v-for="(note, index) in notification" :key="index">
                <div slot="header" class="font-weight-medium subheading py-2"><v-icon :color="note[1].seenBy.includes($store.state.userData.uid) ? 'limeGreen' : 'grey'" class="mr-2" >comment</v-icon> Message From {{note[1].sender}}<br>
                    <span class="caption ml-5"><v-icon size="15">access_time</v-icon> {{timeManager(note[1].createdOn)}}</span>
                </div>
                <v-card>
                    <v-card-text class="px-4 subheading">
                        <div class="grey lighten-5 px-2 py-3 mb-3 subheading">{{note[1].message}}</div>

                        <v-btn color="success" v-if="note[1].link" @click="open(note[1].link)" flat small round>Visit product page <v-icon>launch</v-icon></v-btn>

                        <div class="font-weight-regular body-1">You can contact <span class="font-weight-medium">{{note[1].sender}}</span> using the mobile number below</div>
                        <v-chip color="grey darken-2" label>
                            <v-avatar tile color="grey darken-3" class="mr-2"><v-icon size="20" color="white">phone</v-icon></v-avatar> <span class="subheading font-weight-regular white--text">{{note[1].senderContact}}</span>
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
import Loader from '../../components/Loader.vue'
export default {
    components: {
        Loader
    },
    data() {
        return {
            notification: [],
        }
    },
    created() {
        var docRef = this.$store.state.db.collection("notification").where("receiptor", "array-contains", localStorage.uid).orderBy("createdOn", "desc").limit(20)

        docRef.get().then((doc) => {
            if (doc.empty) {
                this.notification = 0
            } else {
                doc.forEach((doc) => {
                    let data = [
                        doc.ref,
                        doc.data()
                    ]
                    this.notification.push(data)
                })
            }
        })
        .then(() => {

            if (this.notification !== 0) {
                let batch = this.$store.state.db.batch();
                let temp = []

                this.notification.forEach(note => {
                    if (note[1].seenBy == undefined) {
                        temp.push(this.$store.state.userData.uid)
                        batch.update(note[0], { seenBy: temp })
                    } else {
                        if (!note[1].seenBy.includes(this.$store.state.userData.uid)) {
                            temp = note[1].seenBy
                            temp.push(this.$store.state.userData.uid)
                            batch.update(note[0], { seenBy: temp })
                        }
                    }
                    temp = []
                })

                batch.commit()
                .then(() => {
                    this.$store.dispatch('setNote', 0)
                    // console.log("Seen All Notification")
                })
                .catch(err => console.error(err));
            }
        })
        .catch((error) => {
            this.notification = 0
            this.$store.dispatch('setSnackText', "Unable to get nofications. Check internet connection!")
            this.$store.dispatch('setSnackState', true)
            console.log(error)
        });
    },
    methods: {
        timeManager(timeStamp) {
            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            var currentDate = new Date().toLocaleDateString("en-US", options)
            var date = new Date(timeStamp).toLocaleDateString("en-US", options)
            var time = new Date(timeStamp).toLocaleTimeString("en-US")

            if (currentDate == date) {
                return time
            } else {
                return date
            }

        },
        open(link) {
            window.open(link, '_blank')
        },
    }
}
</script>
