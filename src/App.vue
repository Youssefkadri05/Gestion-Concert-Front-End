<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">

          <router-link class="nav-link" to="/">Home</router-link> ||
          <router-link class="nav-link" to="/About">Concerts</router-link>
          <router-link class="nav-link" to="/Artistes">Artistes</router-link>
          <router-link class="nav-link" to="/Groupes">Groupes</router-link>
          <router-link class="nav-link" to="/Salles">Salles</router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>



