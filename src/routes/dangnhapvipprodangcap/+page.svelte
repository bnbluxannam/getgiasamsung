<script>
  let username = '';
  let password = '';

  async function login() {
    if (username === 'itratdeptrai' && password === 'LamSaoHackPassTaoDuoc') {
      // set cookie qua fetch POST
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loggedIn: true })
      });
      window.location.href = '/adminvipprodangcap';
    } else {
      alert('Sai tài khoản hoặc mật khẩu');
    }
  }
</script>

<h1>Đăng nhập Admin</h1>
<input placeholder="Tên đăng nhập" bind:value={username} />
<input type="password" placeholder="Mật khẩu" bind:value={password} />
<button on:click={login}>Đăng nhập</button>