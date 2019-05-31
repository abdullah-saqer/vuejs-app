<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            ref="registrationForm"
                            v-model="valid"
                            @keyup.native.enter="validate"
                        >
                            <v-text-field 
                                prepend-icon="person"
                                name="first-name"
                                v-model="registerInfo.firstName"
                                :rules="nameRules"
                                required
                                label="First Name"
                                type="text"
                            ></v-text-field>
                            <v-text-field 
                                prepend-icon="person"
                                name="last-name"
                                v-model="registerInfo.lastName"
                                :rules="nameRules"
                                required
                                label="last Name"
                                type="text"
                            ></v-text-field>
                            <v-text-field 
                                prepend-icon="email"
                                name="email"
                                v-model="registerInfo.email"
                                :rules="emailRules"
                                required
                                label="E-mail Address"
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
                            <v-text-field 
                                prepend-icon="lock"
                                name="confirm-password"
                                v-model="confirmPassword"
                                :rules="passwordConfirmationRules"
                                required label="Confirm Password"
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
                            Register
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
    name: "register",
    data() {
        return {
            valid: true,
            registerInfo: {
                id: null,
                firstName: null,
                lastName: null,
                email: null,
                password: null
            },
            password: null,
            confirmPassword: null,
            nameRules: [
                v => !!v || 'Name is required',
                v => /^[a-zA-Z]+$/.test(v) || 'Name must contain only letters'
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v && v.length > 7 || 'Password must contain at least 8 character, numbers'
            ],
            passwordConfirmationRules: [
                v => !!v || 'Password confirmation is required',
                v => v === this.password || "Password doesn't match"
            ]
        }
    },
    created() {
        if(this.$store.getters.authenticated)
            this.$router.push('/');
    },
    methods: {
        validate () {
            if (this.$refs.registrationForm.validate()) {
                this.register();
            }
        },
        register() {
            this.registerInfo.id = generateId(this.registerInfo.email);
            this.registerInfo.password = encriptPassword(this.password);
            const result = usersService.register(this.registerInfo);
            if(result) {
                   this.$store.dispatch('snackbar', {
                    color: 'success',
                    text: 'Registered successfully, please login'
                }); 
                    this.$router.push('login');
            } else {
                this.$store.dispatch('snackbar', {
                    color: 'error',
                    text: "Email address already exist"
                });
            }
        }
    }
}
</script>
