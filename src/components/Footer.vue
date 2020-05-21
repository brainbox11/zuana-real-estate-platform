<template>
  <footer class="grey darken-3" height="auto">
    <v-card flat tile class="grey darken-3 white--text text-xs-center">
      <v-container class="px-0">
            <v-card-text class="pt-0">
                <v-layout row wrap>
                    <v-flex xs12 sm6 md3 v-for="(foot, index) in footer" :key="foot.title">
                        <v-list class="transparent" subheader dense>
                            <v-subheader class="hero-text-f5 title">{{foot.title}}</v-subheader>
                            <v-list-tile v-for="(item) in foot.items" :key="item.subtitle" router :to="item.link">
                                <v-list-tile-content>
                                    <v-list-tile-title class="hero-text-f5 subheading">{{item.subtitle}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-container>
        <v-divider dark></v-divider>
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12 sm12 md3 class="title text-xs-center font-weight-bold py-3 hidden-sm-and-up">
              Follow us on:
            </v-flex>
            <v-spacer class="hidden-xs-only"></v-spacer>
            <v-flex v-for="(link, i) in social" :key="link.title" @click="open(link.link)" shrink class="pointer">
                <v-list-tile>
                    <v-list-tile-action>
                        <v-avatar size="20" :color=" i == 0 ? 'white' : ''" style="border-radius:5px" tile>
                            <img :src="link.icon">
                        </v-avatar>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="hero-text-f5 subheading">{{link.title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-flex>
            <v-spacer class="hidden-xs-only"></v-spacer>
          </v-layout>
        </v-card-text>

        <v-divider dark></v-divider>

      <v-card-text @click="open_alt" class="white--text text-uppercase pointer">
        &copy;2019 — <strong>Zuana Property Lisitings</strong>
      </v-card-text>
    </v-card>
  </footer>
</template>

<script>
export default {
    data() {
        return {
            footer: [
                {
                    title: "COMPANY",
                    items: [
                        {subtitle: "About us", link: "/about"},
                        {subtitle: "Contact us", link: ""},
                    ]
                },
                {
                    title: "ADVERTISE WITH US",
                    items: [
                        {subtitle: "Advertise/Market your property", link: "/post"},
                        {subtitle: "Featured Estate Agents", link: "/featured-agent-advert"},
                        {subtitle: "Place Banner Advert", link: "/place-banner"},
                        {subtitle: "Subscription Plans", link: "/subscription"},
                    ]
                },
                {
                    title: "USEFUL LINKS",
                    items: [
                        {subtitle: "Properties for sale", link: "/listings/Sale"},
                        {subtitle: "Properties for Rent", link: "/listings/Rent"},
                        {subtitle: "Our Agents", link: "/agents"},
                    ]
                },
                {
                    title: "WEBSITE",
                    items: [
                        {subtitle: "Privacy Policy", link: "/policy"},
                        {subtitle: "Terms and Conditions", link: "/terms"},
                        {subtitle: "Saftey Tips", link: "/safety"},
                        {subtitle: "FAQ", link: ""},
                    ]
                }
            ],
            social: [
                {title: "Facebook", icon: "/img/facebook.png", link: 'https://web.facebook.com/zuanalistings'},
                {title: "Twitter", icon: "/img/twitter.png", link: 'https://twitter.com/zuana_ng'},
                {title: "Whatsapp", icon: "/img/whatsapp.png", link: 'https://wa.me/07037894333'},
                {title: "Instagram", icon: "/img/instagram.png", link: 'https://www.instagram.com/zuana_ng/'},
            ]
        }
    },
    methods: {
        open(link) {
            window.open(link, '_blank')
        },
        open_alt() {
            this.$router.push("/admin")
        }
    }
}
</script>
