<script>
  export let searchQuery = '';
  export let onSearchChange; // callback để báo về parent
</script>

<input
  type="text"
  placeholder="Tìm kiếm sản phẩm..."
  bind:value={searchQuery}
  on:input={() => onSearchChange(searchQuery)}
  class="search-input"
/>

<style>
  .search-input {
    width: 100%;
    padding: 8px 12px;
    margin: 0 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    display: block;
  }
</style>