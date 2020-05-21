<template>
    <v-container>
        <center>
            <v-responsive>
                <img class="hidden-xs-only" src="/img/empty.png" />
                <img src="/img/empty.png" class="img hidden-sm-and-up" />
            </v-responsive>
            <p class="subheading desMax grey--text" v-if="description">{{description}}</p>
            <slot></slot>
        </center>
    </v-container>
</template>

<script>
export default {
    name: "VEmpty",
    props: {
        description: String,
    }

}
</script>

<style scoped>
    .desMax {
        max-width: 500px;
    }
    .img {
        width: 100%;
    }
</style>
