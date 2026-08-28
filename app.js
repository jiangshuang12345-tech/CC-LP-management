const app = document.querySelector('#app');
const state = { source: sessionStorage.getItem('source') || 'lp' };

const assets = {
  lp: 'assets/lp-console.png',
  cc: 'assets/cc-console.png',
};

function navigate(route) {
  window.location.hash = route;
}

function toolbar(active) {
  return `
    <nav class="prototype-toolbar" aria-label="原型页面切换">
      <span>交互原型</span>
      <button class="${active === 'lp' ? 'active' : ''}" data-route="lp">LP 管台</button>
      <button class="${active === 'cc' ? 'active' : ''}" data-route="cc">CC 管台</button>
    </nav>`;
}

function renderConsole(type) {
  state.source = type;
  sessionStorage.setItem('source', type);
  const isLP = type === 'lp';
  app.innerHTML = `
    <main class="prototype-shell">
      ${toolbar(type)}
      <div class="screen-stage" style="--aspect:${isLP ? 1897 / 937 : 1897 / 900}">
        <img src="${assets[type]}" alt="${isLP ? 'LP' : 'CC'} 管台学生页面" />
        <a class="detail-hotspot ${isLP ? 'lp-hotspot' : 'cc-hotspot'}" href="#student" aria-label="查看优学学生详情">
          详情<span class="pulse-ring"></span>
        </a>
      </div>
      <div class="prototype-note"><i></i>点击手机号后的“详情”查看优学学生信息</div>
    </main>`;
}

function renderStudent() {
  app.innerHTML = `
    <main class="student-page">
      <header class="student-topbar">
        <div class="brand-lockup">
          <div class="brand-mark">优</div>
          <div>
            <div class="brand-name">优学用户中心</div>
            <div class="page-context">学生信息查询</div>
          </div>
        </div>
        <div class="page-context">来源：${state.source === 'lp' ? 'LP 管台' : 'CC 管台'}</div>
      </header>
      <section class="student-main">
        <div class="student-container">
          <div class="page-heading">
            <div>
              <h1>用户详情</h1>
              <p>优学侧学生基础信息、学习档案与权益信息</p>
            </div>
            <button class="back-btn" data-back>← 返回</button>
          </div>

          <section class="card" aria-labelledby="user-info-title">
            <h2 class="card-title" id="user-info-title">用户详情</h2>
            <div class="data-grid">
              <div class="label">优学用户ID</div><div class="value">ef3438d6–007f–4fb1–b59a–24efcb46f195</div>
              <div class="label">昵称</div><div class="value">Dino的朋友5595</div>
              <div class="label">性别</div><div class="value">GIRL</div>
              <div class="label">渠道</div><div class="value">14774480</div>
              <div class="label">注册时间</div><div class="value">2026–08–28 13:42:30</div>
              <div class="label">最近更新时间</div><div class="value">2026–08–28 13:42:30</div>
            </div>
          </section>

          <section class="card" aria-labelledby="profile-title">
            <h2 class="card-title" id="profile-title">学习档案</h2>
            <div class="data-grid">
              <div class="label">年级</div><div class="value">GRADE_3</div>
              <div class="label">年龄</div><div class="value">–</div>
              <div class="label">学习目标</div><div class="value">–</div>
              <div class="label">学习课程</div><div class="value">–</div>
            </div>
          </section>

          <section class="card" aria-labelledby="rights-title">
            <h2 class="card-title" id="rights-title">用户权益</h2>
            <div class="rights-wrap">
              <table class="rights-table">
                <thead><tr><th>权益名称</th><th>权益类型</th><th>状态</th><th>有效期</th><th>最近变更时间</th></tr></thead>
                <tbody><tr><td>优学会员</td><td>会员</td><td><span class="status-tag">使用中</span></td><td>2026–08–28 14:00:21 – 2028–08–27 23:59:59</td><td>2026–08–28 15:22:02</td></tr></tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>`;
}

function render() {
  const route = window.location.hash.replace('#', '') || 'lp';
  if (route === 'student') renderStudent();
  else renderConsole(route === 'cc' ? 'cc' : 'lp');
}

document.addEventListener('click', (event) => {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton) navigate(routeButton.dataset.route);
  if (event.target.closest('[data-back]')) navigate(state.source);
});

window.addEventListener('hashchange', render);
render();
