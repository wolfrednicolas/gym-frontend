<template>
    <h2>Create a club</h2>
    <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Address</label>
                    <Field name="address" type="text" class="form-control" :class="{ 'is-invalid': errors.address }" />
                    <div class="invalid-feedback">{{ errors.address }}</div>
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <Field name="content" type="text" class="form-control" :class="{ 'is-invalid': errors.content }" />
                    <div class="invalid-feedback">{{ errors.content }}</div>
                </div>
                <div class="form-group">
                    <label>Photo Url</label>
                    <Field name="photoUrl" type="text" class="form-control" :class="{ 'is-invalid': errors.photoUrl }" />
                    <div class="invalid-feedback">{{ errors.photoUrl }}</div>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <Field name="title" type="text" class="form-control" :class="{ 'is-invalid': errors.title }" />
                    <div class="invalid-feedback">{{ errors.title }}</div>
                </div>
                <div class="form-group">
                    <label>City</label>
                    <Field name="city" type="text" class="form-control" :class="{ 'is-invalid': errors.city }" />
                    <div class="invalid-feedback">{{ errors.city }}</div>
                </div>
                <div class="form-group">
                    <label>State</label>
                    <Field name="state" as="select" class="form-control" :class="{ 'is-invalid': errors.state }">
                        <option value="" disabled>Select a state</option>
                        <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
                    </Field>
                    <div class="invalid-feedback">{{ errors.state }}</div>
                </div>
                <div class="form-group">
                    <label>Zip Code</label>
                    <Field name="zipCode" type="text" class="form-control" :class="{ 'is-invalid': errors.zipCode }" />
                    <div class="invalid-feedback">{{ errors.zipCode }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Create
                    </button>
                </div>
            </Form>

</template>

<script setup>
    import { useAdminStore } from '@/stores';
    import * as Yup from 'yup';
    import { Form, Field } from 'vee-validate';

    const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
    'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    
    const schema = Yup.object().shape({
        address: Yup.string().min("6").max("254").required(),
        content: Yup.string().min("6").max("254").required(),
        photoUrl: Yup.string().min("3").max("254").url().required(),
        title: Yup.string().min("3").max("25").required(),
        city: Yup.string().min("3").max("25").required(),
        state: Yup.string().oneOf(states, 'Invalid state').required(),
        zipCode: Yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP Code').required(),
    });

    const handleSubmit = async (values) =>{
        const adminStore = useAdminStore();
        const { address, content, photoUrl, title, city, state, zipCode } = values;
        await adminStore.createClub(address, content, photoUrl, title, city, state, zipCode);
        
    }
</script>

<style>
</style>