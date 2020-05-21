<template>
    <v-container class="main" style="position: relative">
        <v-empty-state description="Requested Page not found. Please check the link and try again!" icon="mood_bad" title="404 Error">
            <v-btn round color="error" router to="/"><v-icon left>home</v-icon> Go to home page?</v-btn>
        </v-empty-state>
    </v-container>
</template>

<script>
import VEmptyState from "../components/VEmptyState.vue";
export default {
    components: {
        VEmptyState
    }
}
</script>
