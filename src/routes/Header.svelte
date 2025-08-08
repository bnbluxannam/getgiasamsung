<script>
  import { page } from '$app/stores';
</script>

<style>
header {
  background-color: #111;
  color: #ccc;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #333;
}

nav a {
  color: #ccc;
  text-decoration: none;
  margin-left: 2rem;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover{
  color: #fff;
  text-decoration: underline;
}
</style>

<header class="header">
  <nav>
    <a href="/">Home</a>
    <a href="/gallery">Gallery</a>
  </nav>
</header>