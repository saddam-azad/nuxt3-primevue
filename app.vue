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
						<span v-if="v$.name.$error && submitted">
                            <span id="name-error" v-for="(error, index) of v$.name.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>
                        <small v-else-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
					</div>

					<div class="field">
						<Dropdown name="author" v-model="selectedAuthor" :options="authors" optionLabel="name" optionValue="id" @change="changeAuthor($event)"  placeholder="Select an author" />
					</div>

					<div class="field">
						<Dropdown name="book" v-model="selectedBook" :options="state.books" optionLabel="name" optionValue="id" placeholder="Select a book" />
					</div>
					

					<Button type="submit" label="Submit" />
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
const authors: Author[] = await authorStore.getAuthors();

/**
 * Reactive bits
 */
let selectedAuthor = ref();
let selectedBook = ref();

const state = reactive({
	name: null,
	books: [] as Book[]
})

/**
 * Switch author dropdown
 * @param event Selected option in dropdown
 */

async function changeAuthor(event) {
	console.log(event);

	try {
		const data: Array<Book> = await $fetch('https://63a1958ba543280f775b0a50.mockapi.io/books');
		// books.value = data;
		state.books = data;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Submit 
 */
const handleSubmit = ( event ) => {
	submitted.value = true;

	if (!event) {
		return;
	} else {
		const formData = new FormData();
		formData.append('name', state?.name);
		formData.append('author', selectedAuthor.value);
		formData.append('book', selectedBook.value);
		console.log(formData);
	}
};

/**
 * Validation
 */
const rules = {
	name: { required, alphaNum, minLength: minLength(3) },
}

const submitted = ref(false);
const v$ = useVuelidate(rules, state);

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
