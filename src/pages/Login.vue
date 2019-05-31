<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            ref="loginForm"
                            v-model="valid"
                            lazy-validation
                            @keyup.native.enter="validate"
                        >
                            <v-text-field 
                                prepend-icon="email"
                                name="email"
                                v-model="loginInfo.email"
                                :rules="emailRules"
                                required
                                label="Email Address"
                                type="text"
                            ></v-text-field>
                            <v-text-field 
                                prepend-icon="lock"
                                name="password"
                                v-model="password"
                                :rules="passwordRules"
                                required label="Password"
                                type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="px-3 pb-3">
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="primary"
                            :disabled="!valid"
                            @click="validate"
                        >
                            Login
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {encriptPassword, generateId} from '@/utilities/functions'
import usersService from '@/services/usersService'
export default {
    name: "login",
    data() {
        return {
            valid: true,
            loginInfo: {
                id: null,
                email: null,
                password: null
            },
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required'
            ],
        }
    },
    created() {
        if(this.$store.getters.authenticated)
            this.$router.push('/');
    },
    methods: {
        validate () {
            if (this.$refs.loginForm.validate()) {
                this.login();
            }
        },
        login() {
            this.loginInfo.id = generateId(this.loginInfo.email);
            this.loginInfo.password = encriptPassword(this.password);
            const result = usersService.login(this.loginInfo);
            if(result) {
                    this.$store.dispatch('login', result).then(() => {
                        this.$store.dispatch('snackbar', {
                            color: 'success',
                            text: `Welcome, ${this.$store.getters.user.firstName}`
                        });
                        this.$router.push('/');
                    });
            } else {
                this.$store.dispatch('snackbar', {
                    color: 'error',
                    text: "Invalid Email or Password"
                });
            }
        }
    }
}
</script>
