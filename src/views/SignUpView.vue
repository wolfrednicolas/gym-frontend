<template>
    <h2>Sign Up</h2>
    <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>email</label>
                    <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <label>Password Repeat</label>
                    <Field name="passwordRepeat" type="password" class="form-control" :class="{ 'is-invalid': errors.passwordRepeat }" />
                    <div class="invalid-feedback">{{ errors.passwordRepeat }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Sign Up
                    </button>
                </div>
            </Form>

</template>

<script setup>
    import { useAuthStore } from '@/stores';
    import * as Yup from 'yup';
    import { Form, Field } from 'vee-validate';
    const authStore = useAuthStore();
    
    const schema = Yup.object().shape({
        email: Yup.string()
                .email('Email must be valid')
                .required('Email is required')
                .test('unique-email', 'Email already exists', async function (value) {
                    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    const isValidEmail = emailRegex.test(value);
                    if(isValidEmail){
                        const emailExists = await authStore.getEmail(value);
                        return emailExists;
                    }else{
                        throw this.createError({ message: 'Email must be valid' });
                    } 
                }),
        password: Yup.string().min("6").max("20").required('Password is required'),
        passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords does not match')
                .min(6, 'Password must be at least 6 characters')
                .max(20, 'Password must be at most 20 characters')
                .required('Password Repeat is required'),
    });
  
    const handleSubmit = async (values) =>{
        const { email, password, role } = values;
        await authStore.signUp(email, password, role); 
    }
</script>

<style>
</style>