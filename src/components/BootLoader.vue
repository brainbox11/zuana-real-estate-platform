<template>
    <div id="loader">
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300">
            <v-card color="limeGreen" dark>
                <v-card-text>
                Please stand by
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: true
        }
    }
}
</script>

<style scoped>
    #loader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
</style>
