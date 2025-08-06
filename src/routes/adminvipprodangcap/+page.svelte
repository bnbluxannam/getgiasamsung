<script>
  import { onMount } from "svelte";
  import AdminSpinButton from "$lib/components/AdminSpinButton.svelte";

  /**
   * @typedef {Object} Product
   * @property {number} id
   * @property {string} name
   * @property {string} image
   * @property {number|null} nguyen_kim
   * @property {number|null} dien_may_xanh
   * @property {number|null} cho_lon
   */

  /** @type {Product[]} */
  let products = [];

  /** @type {Product} */
  let newProduct = {
    id: 0,
    name: "",
    image: "",
    nguyen_kim: null,
    dien_may_xanh: null,
    cho_lon: null,
  };

  let editingIndex = -1;
  let loading = true;

  const api = "/api/products";

  async function loadProducts() {
    loading = true;
    const res = await fetch(api);
    products = await res.json();
    loading = false;
  }

  /** Thêm sản phẩm */
  async function addProduct() {
    if (!newProduct.name || !newProduct.image) return alert("Nhập tên và ảnh!");
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      await loadProducts();
      resetForm();
    }
  }

  /** Bắt đầu sửa */
  function editProduct(index) {
    editingIndex = index;
    newProduct = { ...products[index] };
  }

  /** Cập nhật sản phẩm */
  async function updateProduct() {
    if (editingIndex === -1) return;
    const res = await fetch(api, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      await loadProducts();
      resetForm();
    }
  }

  /** Xóa sản phẩm */
  async function deleteProduct(index) {
    const id = products[index].id;
    const res = await fetch(api, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      await loadProducts();
    }
  }

  function resetForm() {
    newProduct = {
      id: 0,
      name: "",
      image: "",
      nguyen_kim: null,
      dien_may_xanh: null,
      cho_lon: null,
    };
    editingIndex = -1;
  }

  /** @param {number|null} price */
  const formatPrice = (price) => (price ? price.toLocaleString() + "₫" : "N/A");

  onMount(loadProducts);
</script>

<h1>Trang Admin - Quản lý sản phẩm</h1>
<AdminSpinButton />
{#if loading}
  <p>Đang tải dữ liệu...</p>
{:else}
  <table class="admin-table">
    <thead>
      <tr>
        <th>Ảnh</th>
        <th>Tên sản phẩm</th>
        <th>Nguyễn Kim</th>
        <th>Điện Máy Xanh</th>
        <th>Điện Máy Chợ Lớn</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      {#each products as product, index}
        <tr>
          <td><img src={product.image} alt={product.name} width="80" /></td>
          <td>{product.name}</td>
          <td>{formatPrice(product.nguyen_kim)}</td>
          <td>{formatPrice(product.dien_may_xanh)}</td>
          <td>{formatPrice(product.cho_lon)}</td>
          <td>
            <button on:click={() => editProduct(index)}>Sửa</button>
            <button on:click={() => deleteProduct(index)}>Xóa</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h2>{editingIndex === -1 ? "Thêm sản phẩm mới" : "Cập nhật sản phẩm"}</h2>
  <div class="admin-form">
    <input placeholder="Tên sản phẩm" bind:value={newProduct.name} />
    <input placeholder="Đường dẫn ảnh" bind:value={newProduct.image} />
    <input
      type="number"
      placeholder="Giá Nguyễn Kim"
      bind:value={newProduct.nguyen_kim}
    />
    <input
      type="number"
      placeholder="Giá Điện Máy Xanh"
      bind:value={newProduct.dien_may_xanh}
    />
    <input
      type="number"
      placeholder="Giá Chợ Lớn"
      bind:value={newProduct.cho_lon}
    />

    {#if editingIndex === -1}
      <button on:click={addProduct}>Thêm sản phẩm</button>
    {:else}
      <button on:click={updateProduct}>Cập nhật sản phẩm</button>
      <button on:click={resetForm}>Hủy</button>
    {/if}
  </div>
{/if}

<style>
  .admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  .admin-table th,
  .admin-table td {
    border: 1px solid #ddd;
    padding: 6px;
    text-align: center;
  }
  .admin-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  .admin-form input {
    flex: 1;
    min-width: 150px;
    padding: 6px;
  }
  .admin-form button {
    padding: 6px 12px;
    cursor: pointer;
  }
</style>
