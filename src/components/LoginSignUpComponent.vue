<template>
    <h2>{{ props.type }}</h2>
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
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        {{ props.type }}
                    </button>
                </div>
            </Form>

</template>

<script setup>
    import { useAuthStore } from '@/stores';
    import * as Yup from 'yup';
    import { Form, Field } from 'vee-validate';
    import { defineProps } from 'vue';

    const props = defineProps(['type'])
    
    const schema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min("6").max("20").required('Password is required')
    });
        
    const handleSubmit = async (values) =>{
        const authStore = useAuthStore();
        const { email, password, role } = values;
        if (props.type == 'Login') {
            await authStore.login(email, password);
        }else{
            await authStore.signUp(email, password, role);   
        }
        
    }
</script>

<style>
</style>