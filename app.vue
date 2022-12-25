<template>
	<div class="container">
		<div class="flex justify-content-center">
			<Toast />

            <div class="card">
                <h2 class="text-center">Create Library</h2>
			
				<form @submit.prevent="handleSubmit">
					<div class="field">
                        <div class="p-float-label">
                            <InputText id="name" name="name" v-model="text" />
                            <label for="name">Library Name*</label>
                        </div>
                    </div>

					<div class="field">
						<Dropdown name="author" v-model="selectedAuthor" :options="authors" optionLabel="name" optionValue="id" @change="changeAuthor($event)"  placeholder="Select an author" />
					</div>

					<div class="field">
						<Dropdown name="book" v-model="selectedBook" :options="books" optionLabel="name" optionValue="id" placeholder="Select a book" />
					</div>
					

					<Button type="submit" label="Submit" />
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
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
const text = ref();
const authorStore = useAuthorStore();
const authors: Author[] = await authorStore.getAuthors();
let selectedAuthor = ref();
let selectedBook = ref();
let books = ref<Book[]>([]);

async function changeAuthor(event) {
	console.log(event);

	try {
		const data: Array<Book> = await $fetch('https://63a1958ba543280f775b0a50.mockapi.io/books');
		books.value = data;

	} catch (error) {
		console.error(error);
	}
};

/**
 * Submit 
 */
const toast = useToast();
const handleSubmit = ( event ) => {
	const form = event.target;
	const formData = new FormData(form);
	formData.append('author', selectedAuthor.value);
	formData.append('book', selectedBook.value);
	console.log(formData);

	toast.add({ severity: "info", summary: "Hello " + text.value });
};

/**
 * Validation
 */
const rules = {
	text: { required },
	author: { required }
}




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
