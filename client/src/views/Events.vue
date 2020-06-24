<template>
    <div class="events">
        <h2>Events</h2>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <div id="events">
            <div class="events" v-for="event in this.events" :key="event._id">
                <!-- <li>
                    <router-link :to="{ name: 'About' }" class="links">Event: {{ event.eventCourse }}</router-link>
                </li> -->
                <router-link :to="{ name: 'event', params: { id: event._id } }">
                    Event: {{event.eventCourse}}
                </router-link>
            </div>
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