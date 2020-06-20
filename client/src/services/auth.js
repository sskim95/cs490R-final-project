import axios from "axios";

const API_URL ="http://localhost:3000/api/auth";

class AuthService {
    static signup(user) {
        return new Promise((resolve, reject) => {
            axios
                .post(API_URL + "/signup", {
                    email: user.email,
                    password: user.password,
                })
                .then((res) => {
                    console.log("Service return success");
                    resolve(res.data.user);
                })
                .catch((err) => {
                    console.log("Service returned failure");
                    reject(err);
                });
        });
    }

    static login(user) {
        return new Promise((resolve, reject) => {
            axios
                .post(API_URL + "/login", {
                    email: user.email,
                    password: user.password,
                })
                .then((res) => {
                    console.log(res);
                    resolve(res.data.token);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default AuthService;