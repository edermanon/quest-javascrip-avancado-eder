const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
       <img src="${user.avatarUrl}" alt="Foto de perfil do usuário" /> 
       <div class="data">
        <h1>${user.name ?? "Não possui nome cadastrado 😂"}</h1>
        <p>${user.bio ?? "Não possui bio cadastrada 😭"}</p>
        <div class="followers-following-area">
            <div class="followers">
            <P class="seguidores"><img src="src/imagem/user-group-solid.svg" width="20px" height="20px" alt="Logo seguidores"></img> Seguidores</p>
            <p>${user.followers}</p>
            </div>
            <div class="following">
            <p class="seguindo"><img src="src/imagem/users-solid.svg" width="20px" height="20px" alt="Logo seguindo"></img> Seguindo</p>
            <p>${user.following}</p>
        </div>
        </div>    
        </div>
        </div>`;
    let repositoriesItens = "";
    user.repositories.forEach(
      repo => {
      repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a>
                               <div class="repo-stats">
                                    <p><img src="src/imagem/code-fork-solid.svg" width="20px" height="20px" title="forks"> </i>${repo.forks_count !== 0
          ? repo.forks_count
          : "Sem forks"}</img></p>
                                    <p><img src="src/imagem/star.svg" width="20px" height="20px" title="stargazers"> </i>${repo.stargazers_count !== 0
          ? repo.stargazers_count
          : "Sem estrelas"}</img></p>
                                    <p><img src="src/imagem/eye.svg" width="20px" height="20px" title="watchers"> </i>${repo.watchers_count !== 0
          ? repo.watchers_count
          : "Sem observadores"}</img></p>
                                    <p><img src="src/imagem/laptop-code-solid.svg" width="20px" height="20px" title="language"> </i>${repo.language ?? "Sem linguagem"}</img></p>
                                    </div>
                                    </li>`;
    });

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                            </div>`;
    }
    let eventsItens = "";
    user.events.forEach(element => {
      if (element.type === "PushEvent") {
        eventsItens += `<li>
                                  <p>${element.repo.name}<span class="commit-message">-${element.payload.commits[0].message}</span></p>
                                  </li>`;
      } else {
        eventsItens += `<li>
                                   <p>${
                                     element.repo.name
                                   }<span class="commit-message">-${
          element.payload.description ??
          `Evento sem commits por ser do tipo ${element.payload.ref_type}`
        }</span></p>
                                   </li>`;
      };
    });

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events section">
                                              <h2>Eventos</h2>
                                              <ul>${eventsItens}</ul>
                                              </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
