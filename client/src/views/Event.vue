<template>
  <div>
    <h2>View Event</h2>
    <div v-if="event">
      <div>{{event.eventCourse}}</div>
    </div>
  </div>  
</template>
<script>
import EventService from "@/services/event";

export default {
    data() {
        return {
            event: null,
            message: "Loading One Event",
        };
    },
    mounted() {
        console.log("Load One Event Here.");
        if (this.$store.getters.loggedIn) {
            const token = this.$store.getters.token;
            EventService.getEvent(token) 
                .then((data) => {
                    this.event = data;
                    this.message = null;
                })
                .catch((err) => {
                    console.log("Error getting one event: ", err);
                    this.message = "Error getting one event";
                });
        } else {
            this.message = "You must login first";
        }
    },
};
</script>