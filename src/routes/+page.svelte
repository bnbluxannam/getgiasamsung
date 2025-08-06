<script>
	import { onMount } from "svelte";
	import SearchBar from "$lib/components/SearchBar.svelte";

	/**
	 * @typedef {Object} Product
	 * @property {number} id
	 * @property {string} name
	 * @property {string} image
	 * @property {number|null} nguyen_kim
	 * @property {number|null} dien_may_xanh
	 * @property {number|null} cho_lon
	 * @property {number|null} rivius_price
	 */

	/** @type {Product[]} */
	let products = [];
	let searchQuery = "";

	let pageLoading = true;
	let priceLoading = false;

	$: filteredProducts = products.filter((p) =>
		p.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Đổi sang hiển thị N/A nếu null
	/**
	 * @param {number|null} price
	 * @returns {string}
	 */
	function formatPrice(price) {
		return price !== null ? price.toLocaleString() + "₫" : "N/A";
	}

	async function fetchProducts(delay = 0) {
		const res = await fetch("/products.json");
		if (!res.ok) throw new Error("Không tải được JSON");
		const data = await res.json();

		const computed = /** @type {Product[]} */ (data).map((p) => {
			// Lọc giá hợp lệ
			const validPrices = [
				p.nguyen_kim,
				p.dien_may_xanh,
				p.cho_lon,
			].filter((v) => typeof v === "number");

			// Nếu không có giá hợp lệ → rivius_price = null
			const minPrice =
				validPrices.length > 0 ? Math.min(...validPrices) : null;

			return {
				...p,
				rivius_price: minPrice !== null ? minPrice + 500000 : null,
			};
		});

		if (delay > 0) {
			await new Promise((r) => setTimeout(r, delay));
		}

		products = computed;
	}

	onMount(async () => {
		pageLoading = true;
		await fetchProducts(2000);
		pageLoading = false;
	});

	async function refreshPrices() {
		priceLoading = true;
		await fetchProducts(3000 + Math.random() * 2000);
		priceLoading = false;
	}
</script>

{#if pageLoading}
	<div class="loading-overlay">
		<div class="loading-spinner"></div>
	</div>
{/if}

<h1>Danh sách sản phẩm</h1>
<!-- Thanh search -->

<SearchBar onSearchChange={(/** @type {string} */ q) => searchQuery = q} />

<button class="refresh-btn" on:click={refreshPrices}>🔄 Refresh giá</button>

<div class="products-grid">
	{#each filteredProducts as product}
		<div class="product-card">
			<img src={product.image} alt={product.name} />
			<h2>{product.name}</h2>

			<div class="price-list">
				<div class="other-prices">
					{#if priceLoading}
						<div class="price-spinner-wrapper">
							<div class="price-spinner"></div>
						</div>
					{:else}
						<p class="other">
							Nguyễn Kim: {formatPrice(product.nguyen_kim)}
						</p>
						<p class="other">
							Điện Máy Xanh: {formatPrice(product.dien_may_xanh)}
						</p>
						<p class="other">
							Điện Máy Chợ Lớn: {formatPrice(product.cho_lon)}
						</p>
						<p class="rivius">
							Giá Rivius: {formatPrice(product.rivius_price)}
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
