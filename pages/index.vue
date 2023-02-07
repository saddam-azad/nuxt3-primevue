<template>
	<div class="container">
		<div class="flex justify-content-center">
			<Toast />

            <div class="card">
                <h2 class="text-center">Create Library</h2>
			
				<form @submit.prevent="handleSubmit(!v$.$invalid)">
					<div class="field">
                        <div class="p-float-label">
							<InputText id="name" name="name" v-model="v$.name.$model" :class="{'p-invalid': v$.name.$invalid && submitted }" />
                            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Library Name*</label>
                        </div>
						<div class="warning" v-if="v$.name.$error && submitted">
                            <span id="name-error" v-for="(error, index) of v$.name.$errors" :key="index">
								<small class="p-error">{{error.$message}}</small>
                            </span>
                        </div>
                        <div class="warning" v-else-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response">
							<small class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
						</div>
					</div>

					<div class="field">
						<Dropdown name="author" v-model="state.selectedAuthor" :options="state.authors" optionLabel="name" optionValue="id" @change="changeAuthor($event)"  placeholder="Select an author" :class="{'p-invalid': v$.selectedAuthor.$invalid && submitted }" />
						<div class="warning" v-if="v$.selectedAuthor.$invalid && submitted">
							<small class="p-error">Required.</small>
						</div>
					</div>

					<div class="field">
						<Dropdown name="book" v-model="state.selectedBook" :options="state.books" optionLabel="name" optionValue="id" placeholder="Select a book" :class="{'p-invalid': v$.selectedBook.$invalid && submitted }" />
						<div class="warning" v-if="v$.selectedBook.$invalid && submitted">
							<small class="p-error">Required.</small>
						</div>
					</div>
					
					<Button type="submit" label="Save" :loading="loading" @click="load" />
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required,alphaNum, minLength } from "@vuelidate/validators";
import { useAuthorStore } from '~/stores/author';
import { useToast } from "primevue/usetoast"; 
const toast = useToast();

definePageMeta({
  title: "Nuxt3 + PrimeVUE Starter"
})

/**
 * Types
 */
interface Author {
  id: string,
  name: string,
  createdAt: Date
}

interface Book {
  id: string,
  name: string,
  createdAt: Date
}

/**
 * Fetch data from pinia store
 */
const authorStore = useAuthorStore();
// const authors: Author[] = await authorStore.getAuthors();

/**
 * Reactive bits
 */
const state = reactive({
	name: '',
	books: [] as Book[],
	authors: await authorStore.getAuthors() as Author[],
	selectedAuthor: '',
	selectedBook: ''
})

/**
 * Switch author dropdown
 * @param event Selected option in dropdown
 */
async function changeAuthor(event) {
	// console.log(event.value);
	try {
		const data: Book[] = await $fetch('https://63a1958ba543280f775b0a50.mockapi.io/books');
		state.books = data;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Validation
 */
 const rules = {
	name: { required, alphaNum, minLength: minLength(3) },
	selectedAuthor: { required }, 
	selectedBook: { required }
}

const submitted = ref(false);
const v$ = useVuelidate(rules, state);

/**
 * Loading states
 */
const loading = ref(false);
const load = () => {
	// loading.value = true;
	// setTimeout(() => loading.value = false, 1000);
};

/**
 * Submit 
 * @param event boolean true if no validation errors
 */
const handleSubmit = async ( event ) => {
	submitted.value = true;

	if (!event) {
		return;
	} else {
		const formData = new FormData();
		formData.append('name', state.name);
		formData.append('author', state.selectedAuthor);
		formData.append('book', state.selectedBook);
		console.log(formData);

		// Set loading to true. Do your async calls and .then { loading.value = false }
		loading.value = true;
		setTimeout(() => loading.value = false, 1000);

		// Toast
		toast.add({
			severity: 'success',
			summary: state.name,
			detail: state.selectedAuthor,
			life: 3000
		});
	}
};
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>