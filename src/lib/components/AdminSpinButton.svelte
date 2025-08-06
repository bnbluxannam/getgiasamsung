<script>
  import { createEventDispatcher } from 'svelte';

  export let spinning = false; // Trạng thái spinner
  const dispatch = createEventDispatcher();

  async function handleClick() {
    if (spinning) return;

    spinning = true;
    dispatch('start'); // Gửi sự kiện nếu muốn xử lý thêm bên ngoài

    // Random thời gian 30–300s
    const randomTime = Math.floor(Math.random() * (300 - 30 + 1)) + 30;
    await new Promise(r => setTimeout(r, randomTime * 1000));

    spinning = false;
    dispatch('end'); // Kết thúc xoay
  }
</script>

<button class="spin-btn" on:click={handleClick} disabled={spinning}>
  {#if spinning}
    <span class="spinner"></span> Đang xoay...
  {:else}
    🔄 Fetch lại Data
  {/if}
</button>

<!-- Overlay toàn trang khi spinning -->
{#if spinning}
  <div class="overlay">
    <div class="big-spinner"></div>
  </div>
{/if}

<style>
  .spin-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #ff7f11;
    color: white;
    border: none;
    padding: 10px 16px;
    margin: 10px 0;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  .spin-btn:hover:enabled {
    background-color: #e86e00;
  }

  .spin-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 3px solid #fff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Overlay toàn trang */
  .overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(255,255,255,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .big-spinner {
    width: 80px;
    height: 80px;
    border: 8px solid #ff7f11;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
</style>