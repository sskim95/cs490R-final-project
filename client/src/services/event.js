import axios from "axios";

const API_URL = "http://localhost:3000/api/events/";

class EventService {
    static getEvents(token) {
        return new Promise((resolve, reject) => {
            axios  
                .get(API_URL, { headers: { authorization: token } })
                .then((res) => {
                    console.log("Service returned success");
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    static getEvent(token) {
        return new Promise((resolve, reject) => {
            axios  
                .get(API_URL + "/:id", { headers: { authorization: token } })
                .then((res) => {
                    console.log("Service returned success");
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    static postEvent(token) {
        return new Promise((resolve, reject) => {
            axios
                .post(API_URL, {
                    eventCourse: event.eventCourse,
                    eventPlace: event.eventPlace,
                    eventCapacity: event.eventCapacity,
                })
                .then((res) => {
                    console.log("Service return success");
                    resolve(res.data.event);
                })
                .catch((err) => {
                    console.log("Service returned failure");
                    reject(err);
                });
        });
    }
}

export default EventService;
