<template>
  <div class="CreateEvent">
    <h2>CreateEvent</h2>
    <form name="createEventForm" @submit.prevent="handleCreateEvent">
      <div v-if="message" id ="message">{{message}}</div>
        <div class ="form_row">
            <label for ="eventCourse">Course:</label>
            <input type ="eventCourse" name ="eventCourse" v-model="eventCourse" />
        </div>
        <div class ="form_row">
            <label for ="eventPlace">Place:</label>
            <input type ="eventPlace" name ="eventPlace" v-model="eventPlace" />
        </div>
        <div class ="form_row">
            <label for ="eventCapacity">Capacity:</label>
            <input type ="eventCapacity" name ="eventCapacity" v-model="eventCapacity" />
        </div>
        <div class ="form_row">
            <button :disabled="submitted">
                <span>Create Event</span>
            </button>
        </div>
    </form>
  </div>
</template>

<script>
import EventService from "@/services/event";

export default {
    name: "CreateEvent",
    data() {
        return {
            submitted: false,
            message: "",
            eventCourse: "",
            eventPlace: "",
            eventCapacity: "",
        };
    },
    methods:{
        handleCreateEvent() {
            console.log("Create Pressed");
            this.submitted = true;
            if (this.eventCourse != "" && this.eventPlace != "") {
                EventService.postEvent({
                    eventCourse: this.eventCourse,
                    eventPlace: this.eventPlace,
                    eventCapacity: this.eventCapacity,
                })
                    .then((event) => {
                        console.log(event);
                        this.$router.push("/events");
                        this.message ="Event Created";  
                    })
                    .catch((err) => {
                        console.log(err);
                        this.message ="Error";
                        this.submitted = false;
                    });
            } else{
                this.message ="Course and Place required";
                this.submitted = false;
            }
        },
    },
};
</script>