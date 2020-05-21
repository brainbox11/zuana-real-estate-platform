import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userData: [],
    snackText: "",
    snackState: false,
    db: null,
    auth: null,
    storage: null,
    functions: null,
    adverts: [],
    loading: false,
    viewedProducts: [],
    reqFormState: false,
    loginDialog: false,
    locationBank: [
      {
          "state": {
              "name": "Abia State",
              "id": 1,
              "locals": [
                  {
                      "name": "Aba South",
                      "id": 1
                  },
                  {
                      "name": "Arochukwu",
                      "id": 2
                  },
                  {
                      "name": "Bende",
                      "id": 3
                  },
                  {
                      "name": "Ikwuano",
                      "id": 4
                  },
                  {
                      "name": "Isiala Ngwa North",
                      "id": 5
                  },
                  {
                      "name": "Isiala Ngwa South",
                      "id": 6
                  },
                  {
                      "name": "Isuikwuato",
                      "id": 7
                  },
                  {
                      "name": "Obi Ngwa",
                      "id": 8
                  },
                  {
                      "name": "Ohafia",
                      "id": 9
                  },
                  {
                      "name": "Osisioma",
                      "id": 10
                  },
                  {
                      "name": "Ugwunagbo",
                      "id": 11
                  },
                  {
                      "name": "Ukwa East",
                      "id": 12
                  },
                  {
                      "name": "Ukwa West",
                      "id": 13
                  },
                  {
                      "name": "Umuahia North",
                      "id": 14
                  },
                  {
                      "name": "Umuahia South",
                      "id": 15
                  },
                  {
                      "name": "Umu Nneochi",
                      "id": 16
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Akwa Ibom State",
              "id": 3,
              "locals": [
                  {
                      "name": "Eastern Obolo",
                      "id": 1
                  },
                  {
                      "name": "Eket",
                      "id": 2
                  },
                  {
                      "name": "Esit Eket",
                      "id": 3
                  },
                  {
                      "name": "Essien Udim",
                      "id": 4
                  },
                  {
                      "name": "Etim Ekpo",
                      "id": 5
                  },
                  {
                      "name": "Etinan",
                      "id": 6
                  },
                  {
                      "name": "Ibeno",
                      "id": 7
                  },
                  {
                      "name": "Ibesikpo Asutan",
                      "id": 8
                  },
                  {
                      "name": "Ibiono-Ibom",
                      "id": 9
                  },
                  {
                      "name": "Ika",
                      "id": 10
                  },
                  {
                      "name": "Ikono",
                      "id": 11
                  },
                  {
                      "name": "Ikot Abasi",
                      "id": 12
                  },
                  {
                      "name": "Ikot Ekpene",
                      "id": 13
                  },
                  {
                      "name": "Ini",
                      "id": 14
                  },
                  {
                      "name": "Itu",
                      "id": 15
                  },
                  {
                      "name": "Mbo",
                      "id": 16
                  },
                  {
                      "name": "Mkpat-Enin",
                      "id": 17
                  },
                  {
                      "name": "Nsit-Atai",
                      "id": 18
                  },
                  {
                      "name": "Nsit-Ibom",
                      "id": 19
                  },
                  {
                      "name": "Nsit-Ubium",
                      "id": 20
                  },
                  {
                      "name": "Obot Akara",
                      "id": 21
                  },
                  {
                      "name": "Okobo",
                      "id": 22
                  },
                  {
                      "name": "Onna",
                      "id": 23
                  },
                  {
                      "name": "Oron",
                      "id": 24
                  },
                  {
                      "name": "Oruk Anam",
                      "id": 25
                  },
                  {
                      "name": "Udung-Uko",
                      "id": 26
                  },
                  {
                      "name": "Ukanafun",
                      "id": 27
                  },
                  {
                      "name": "Uruan",
                      "id": 28
                  },
                  {
                      "name": "Urue-Offong/Oruko",
                      "id": 29
                  },
                  {
                      "name": "Uyo",
                      "id": 30
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Anambra State",
              "id": 4,
              "locals": [
                  {
                      "name": "Anambra East",
                      "id": 1
                  },
                  {
                      "name": "Anambra West",
                      "id": 2
                  },
                  {
                      "name": "Anaocha",
                      "id": 3
                  },
                  {
                      "name": "Awka North",
                      "id": 4
                  },
                  {
                      "name": "Awka South",
                      "id": 5
                  },
                  {
                      "name": "Ayamelum",
                      "id": 6
                  },
                  {
                      "name": "Dunukofia",
                      "id": 7
                  },
                  {
                      "name": "Ekwusigo",
                      "id": 8
                  },
                  {
                      "name": "Idemili North",
                      "id": 9
                  },
                  {
                      "name": "Idemili South",
                      "id": 10
                  },
                  {
                      "name": "Ihiala",
                      "id": 11
                  },
                  {
                      "name": "Njikoka",
                      "id": 12
                  },
                  {
                      "name": "Nnewi North",
                      "id": 13
                  },
                  {
                      "name": "Nnewi South",
                      "id": 14
                  },
                  {
                      "name": "Ogbaru",
                      "id": 15
                  },
                  {
                      "name": "Onitsha North",
                      "id": 16
                  },
                  {
                      "name": "Onitsha South",
                      "id": 17
                  },
                  {
                      "name": "Orumba North",
                      "id": 18
                  },
                  {
                      "name": "Orumba South",
                      "id": 19
                  },
                  {
                      "name": "Oyi",
                      "id": 20
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Bayelsa State",
              "id": 6,
              "locals": [
                  {
                      "name": "Ekeremor",
                      "id": 1
                  },
                  {
                      "name": "Kolokuma/Opokuma",
                      "id": 2
                  },
                  {
                      "name": "Nembe",
                      "id": 3
                  },
                  {
                      "name": "Ogbia",
                      "id": 4
                  },
                  {
                      "name": "Sagbama",
                      "id": 5
                  },
                  {
                      "name": "Southern Ijaw",
                      "id": 6
                  },
                  {
                      "name": "Yenagoa",
                      "id": 7
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Cross River State",
              "id": 9,
              "locals": [
                  {
                      "name": "Akamkpa",
                      "id": 1
                  },
                  {
                      "name": "Akpabuyo",
                      "id": 2
                  },
                  {
                      "name": "Bakassi",
                      "id": 3
                  },
                  {
                      "name": "Bekwarra",
                      "id": 4
                  },
                  {
                      "name": "Biase",
                      "id": 5
                  },
                  {
                      "name": "Boki",
                      "id": 6
                  },
                  {
                      "name": "Calabar Municipal",
                      "id": 7
                  },
                  {
                      "name": "Calabar South",
                      "id": 8
                  },
                  {
                      "name": "Etung",
                      "id": 9
                  },
                  {
                      "name": "Ikom",
                      "id": 10
                  },
                  {
                      "name": "Obanliku",
                      "id": 11
                  },
                  {
                      "name": "Obubra",
                      "id": 12
                  },
                  {
                      "name": "Obudu",
                      "id": 13
                  },
                  {
                      "name": "Odukpani",
                      "id": 14
                  },
                  {
                      "name": "Ogoja",
                      "id": 15
                  },
                  {
                      "name": "Yakuur",
                      "id": 16
                  },
                  {
                      "name": "Yala",
                      "id": 17
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Delta State",
              "id": 10,
              "locals": [
                  {
                      "name": "Aniocha South",
                      "id": 1
                  },
                  {
                      "name": "Bomadi",
                      "id": 2
                  },
                  {
                      "name": "Burutu",
                      "id": 3
                  },
                  {
                      "name": "Ethiope East",
                      "id": 4
                  },
                  {
                      "name": "Ethiope West",
                      "id": 5
                  },
                  {
                      "name": "Ika North East",
                      "id": 6
                  },
                  {
                      "name": "Ika South",
                      "id": 7
                  },
                  {
                      "name": "Isoko North",
                      "id": 8
                  },
                  {
                      "name": "Isoko South",
                      "id": 9
                  },
                  {
                      "name": "Ndokwa East",
                      "id": 10
                  },
                  {
                      "name": "Ndokwa West",
                      "id": 11
                  },
                  {
                      "name": "Okpe",
                      "id": 12
                  },
                  {
                      "name": "Oshimili North",
                      "id": 13
                  },
                  {
                      "name": "Oshimili South",
                      "id": 14
                  },
                  {
                      "name": "Patani",
                      "id": 15
                  },
                  {
                      "name": "Sapele",
                      "id": 16
                  },
                  {
                      "name": "Udu",
                      "id": 17
                  },
                  {
                      "name": "Ughelli North",
                      "id": 18
                  },
                  {
                      "name": "Ughelli South",
                      "id": 19
                  },
                  {
                      "name": "Ukwuani",
                      "id": 20
                  },
                  {
                      "name": "Uvwie",
                      "id": 21
                  },
                  {
                      "name": "Warri North",
                      "id": 22
                  },
                  {
                      "name": "Warri South",
                      "id": 23
                  },
                  {
                      "name": "Warri South West",
                      "id": 24
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Ebonyi State",
              "id": 11,
              "locals": [
                  {
                      "name": "Afikpo North",
                      "id": 1
                  },
                  {
                      "name": "Afikpo South",
                      "id": 2
                  },
                  {
                      "name": "Ebonyi",
                      "id": 3
                  },
                  {
                      "name": "Ezza North",
                      "id": 4
                  },
                  {
                      "name": "Ezza South",
                      "id": 5
                  },
                  {
                      "name": "Ikwo",
                      "id": 6
                  },
                  {
                      "name": "Ishielu",
                      "id": 7
                  },
                  {
                      "name": "Ivo",
                      "id": 8
                  },
                  {
                      "name": "Izzi",
                      "id": 9
                  },
                  {
                      "name": "Ohaozara",
                      "id": 10
                  },
                  {
                      "name": "Ohaukwu",
                      "id": 11
                  },
                  {
                      "name": "Onicha",
                      "id": 12
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Enugu State",
              "id": 14,
              "locals": [
                  {
                      "name": "Awgu",
                      "id": 1
                  },
                  {
                      "name": "Enugu East",
                      "id": 2
                  },
                  {
                      "name": "Enugu North",
                      "id": 3
                  },
                  {
                      "name": "Enugu South",
                      "id": 4
                  },
                  {
                      "name": "Ezeagu",
                      "id": 5
                  },
                  {
                      "name": "Igbo Etiti",
                      "id": 6
                  },
                  {
                      "name": "Igbo Eze North",
                      "id": 7
                  },
                  {
                      "name": "Igbo Eze South",
                      "id": 8
                  },
                  {
                      "name": "Isi Uzo",
                      "id": 9
                  },
                  {
                      "name": "Nkanu East",
                      "id": 10
                  },
                  {
                      "name": "Nkanu West",
                      "id": 11
                  },
                  {
                      "name": "Nsukka",
                      "id": 12
                  },
                  {
                      "name": "Oji River",
                      "id": 13
                  },
                  {
                      "name": "Udenu",
                      "id": 14
                  },
                  {
                      "name": "Udi",
                      "id": 15
                  },
                  {
                      "name": "Uzo Uwani",
                      "id": 16
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Imo State",
              "id": 17,
              "locals": [
                  {
                      "name": "Ahiazu Mbaise",
                      "id": 1
                  },
                  {
                      "name": "Ehime Mbano",
                      "id": 2
                  },
                  {
                      "name": "Ezinihitte",
                      "id": 3
                  },
                  {
                      "name": "Ideato North",
                      "id": 4
                  },
                  {
                      "name": "Ideato South",
                      "id": 5
                  },
                  {
                      "name": "Ihitte/Uboma",
                      "id": 6
                  },
                  {
                      "name": "Ikeduru",
                      "id": 7
                  },
                  {
                      "name": "Isiala Mbano",
                      "id": 8
                  },
                  {
                      "name": "Isu",
                      "id": 9
                  },
                  {
                      "name": "Mbaitoli",
                      "id": 10
                  },
                  {
                      "name": "Ngor Okpala",
                      "id": 11
                  },
                  {
                      "name": "Njaba",
                      "id": 12
                  },
                  {
                      "name": "Nkwerre",
                      "id": 13
                  },
                  {
                      "name": "Nwangele",
                      "id": 14
                  },
                  {
                      "name": "Obowo",
                      "id": 15
                  },
                  {
                      "name": "Oguta",
                      "id": 16
                  },
                  {
                      "name": "Ohaji/Egbema",
                      "id": 17
                  },
                  {
                      "name": "Okigwe",
                      "id": 18
                  },
                  {
                      "name": "Orlu",
                      "id": 19
                  },
                  {
                      "name": "Orsu",
                      "id": 20
                  },
                  {
                      "name": "Oru East",
                      "id": 21
                  },
                  {
                      "name": "Oru West",
                      "id": 22
                  },
                  {
                      "name": "Owerri Municipal",
                      "id": 23
                  },
                  {
                      "name": "Owerri North",
                      "id": 24
                  },
                  {
                      "name": "Owerri West",
                      "id": 25
                  },
                  {
                      "name": "Unuimo",
                      "id": 26
                  }
              ]
          }
      },
      {
          "state": {
              "name": "Rivers State",
              "id": 33,
              "locals": [
                  {
                      "name": "Ahoada East",
                      "id": 1
                  },
                  {
                      "name": "Ahoada West",
                      "id": 2
                  },
                  {
                      "name": "Akuku-Toru",
                      "id": 3
                  },
                  {
                      "name": "Andoni",
                      "id": 4
                  },
                  {
                      "name": "Asari-Toru",
                      "id": 5
                  },
                  {
                      "name": "Bonny",
                      "id": 6
                  },
                  {
                      "name": "Degema",
                      "id": 7
                  },
                  {
                      "name": "Eleme",
                      "id": 8
                  },
                  {
                      "name": "Emuoha",
                      "id": 9
                  },
                  {
                      "name": "Etche",
                      "id": 10
                  },
                  {
                      "name": "Gokana",
                      "id": 11
                  },
                  {
                      "name": "Ikwerre",
                      "id": 12
                  },
                  {
                      "name": "Khana",
                      "id": 13
                  },
                  {
                      "name": "Obio/Akpor",
                      "id": 14
                  },
                  {
                      "name": "Ogba/Egbema/Ndoni",
                      "id": 15
                  },
                  {
                      "name": "Ogu/Bolo",
                      "id": 16
                  },
                  {
                      "name": "Okrika",
                      "id": 17
                  },
                  {
                      "name": "Omuma",
                      "id": 18
                  },
                  {
                      "name": "Opobo/Nkoro",
                      "id": 19
                  },
                  {
                      "name": "Oyigbo",
                      "id": 20
                  },
                  {
                      "name": "Port Harcourt",
                      "id": 21
                  },
                  {
                      "name": "Tai",
                      "id": 22
                  }
              ]
          }
      }
    ],
    isAdmin: false,
    notification: 0
  },
  getters: {
    popUpAds: state => {
      var ad = state.adverts.filter(item => item.position == "PopUp")
      if (!ad) {
        ad = []
      }
      return ad
    },
    inlineAds: state => {
      var ad = state.adverts.filter(item => item.position == "Inline")
      if (!ad) {
        ad = []
      }
      return ad
    },
    sideBar: state => {
      var ad = state.adverts.filter(item => item.position == "SideBar")
      if (!ad) {
        ad = []
      }
      return ad
    },
    mainAds: state => {
      var ad = state.adverts.filter(item => item.position == "Main")
      if (!ad) {
        ad = []
      }
      return ad
    }
  },
  mutations: {
    setSnackText: (state, payload) => {
      state.snackText = payload
    },
    setSnackState: (state, payload) => {
      state.snackState = payload
    },
    setUserState: (state, payload) => {
      state.loggedIn = payload
    },
    setUserData: (state, payload) => {
      state.userData = payload
    },
    setDatabase: (state, payload) => {
      state.db = payload
    },
    setAuth: (state, payload) => {
      state.auth = payload
    },
    setStorage: (state, payload) => {
      state.storage = payload
    },
    setFunctions: (state, payload) => {
      state.functions = payload
    },
    setLoader: (state, payload) => {
      state.loading = payload
    },
    addViewed: (state, payload) => {
      state.viewedProducts.push(payload)
    },
    setLocationBank: (state, payload) => {
      state.locationBank = payload
    },
    setLoginDialog: (state, payload) => {
      state.loginDialog = payload
    },
    setAdverts: (state, payload) => {
      state.adverts = payload
    },
    setAdminStatus: (state, payload) => {
      state.isAdmin = payload
    },
    setNote: (state, payload) => {
      state.notification = payload
    }
  },
  actions: {
    setSnackText: (context, payload) => {
      context.commit('setSnackText', payload)
    },
    setSnackState: (context, payload) => {
      context.commit('setSnackState', payload)
    },
    setUserState: (context, payload) => {
      context.commit('setUserState', payload)
    },
    setUserData: (context, payload) => {
      context.commit('setUserData', payload)
    },
    setDatabase: (context, payload) => {
      context.commit('setDatabase', payload)
    },
    setAuth: (context, payload) => {
      context.commit('setAuth', payload)
    },
    syncUserData: (context) => {
      // Fetches user's data from firestore
      var docRef = context.state.db.collection("users").doc(context.state.userData.uid);
      docRef.get().then((doc) => {
          if (doc.exists) {
            // Updates user's data when it is retrived
            context.commit('setUserData', doc.data())
            //console.log(doc.data())
          }
      })
    },
    setLoader: (context, payload) => {
      context.commit('setLoader', payload)
    },
    setStorage: (context, payload) => {
      context.commit('setStorage', payload)
    },
    setFunctions: (context, payload) => {
      context.commit('setFunctions', payload)
    },
    addViewed: (context, payload) => {
      context.commit('addViewed', payload)
    },
    setLocationBank: (context, payload) => {
      context.commit('setLocationBank', payload)
    },
    setLoginDialog: (context, payload) => {
      context.commit('setLoginDialog', payload)
    },
    setAdverts: (context, payload) => {
      context.commit('setAdverts', payload)
    },
    setAdminStatus: (context, payload) => {
      context.commit('setAdminStatus', payload)
    },
    setNote: (context, payload) => {
      context.commit('setNote', payload)
    }
  }
})