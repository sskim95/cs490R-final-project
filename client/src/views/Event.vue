<template>
  <div>
    <h2>View Post</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="post">
      <h3>[ID: {{post.id}}]</h3>
      <div>{{post.text}}</div>
    </div>
  </div>  
</template>
<script>
import EventService from "@/services/event";

export default {
    data() {
        return {
            events: [],
            message: "Loading Events",
        };
    },
    mounted() {
        console.log("Load Events Here.");
        if (this.$store.getters.loggedIn) {
            const token = this.$store.getters.token;
            EventService.getEvents(token) 
                .then((data) => {
                    this.events = data;
                    this.message = null;
                })
                .catch((err) => {
                    console.log("Error getting events: ", err);
                    this.message = "Error getting events";
                });
        } else {
            this.message = "You must login first";
        }
    },
};
</script>