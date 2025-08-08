<script>
	import Header from "./Header.svelte";
	import "../app.css";

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		© {new Date().getFullYear()} <strong>Lux Annam Rivius</strong>. All
		rights reserved.
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		background-color: #111;
		color: #ccc;
		padding: 1.5rem 0;
		font-size: 0.9rem;
		text-align: center;
		margin-top: 3rem;
		border-top: 2px solid #333;
	}
</style>
