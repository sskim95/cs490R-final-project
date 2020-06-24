<template>
    <div class="users">
        <h2>Users</h2>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <div id="users">
            <div class="users" v-for="user in this.users" :key="user._id">
                <p class="class">
                    {{ user.email }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            users: [],
            message: "Loading User Profile",
        };
    },
    mounted() {
        console.log("Load Users Here.");
        if (this.$store.getters.loggedIn) {
            const token = this.$store.getters.token;
            UserService.getUsers(token) 
                .then((data) => {
                    this.users = data;
                    this.message = null;
                })
                .catch((err) => {
                    console.log("Error getting user: ", err);
                    this.message = "Error getting user";
                });
        } else {
            this.message = "You must login first";
        }
    },
};
</script>