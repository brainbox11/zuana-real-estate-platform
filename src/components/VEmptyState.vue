<template>
    <v-container>
        <center>
            <v-icon :style="{fontSize: iconSize}" class="icon" v-if="icon">{{icon}}</v-icon>
            <p class="title" v-if="title">{{title}}</p>
            <p class="subheading desMax" v-if="description">{{description}}</p>
            <slot></slot>
        </center>
    </v-container>
</template>

<script>
export default {
    name: "VEmptyState",
    props: {
        icon: String,
        title: String,
        description: String,
        iconSize: {
            type: String,
            default: "20em"
        }
    }

}
</script>

<style scoped>
    .icon{
        opacity: 0.5
    }
    .desMax {
        max-width: 500px;
    }
</style>
