<script>
  const images = Array.from({ length: 24 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/images/luxannam/lux${num}.jpg`;
  });
</script>

<style>
  .masonry {
    column-count: 4;
    column-gap: 1rem;
    padding: 2rem;
  }

  .masonry img {
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 8px;
    display: block;
  }

  @media (max-width: 1200px) {
    .masonry {
      column-count: 3;
    }
  }

  @media (max-width: 768px) {
    .masonry {
      column-count: 2;
    }
  }

  @media (max-width: 480px) {
    .masonry {
      column-count: 1;
    }
  }
</style>

<div class="masonry">
  {#each images as img}
    <img src={img} alt="" loading="lazy" />
  {/each}
</div>