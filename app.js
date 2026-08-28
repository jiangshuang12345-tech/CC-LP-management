const app = document.querySelector('#app');
const state = { source: sessionStorage.getItem('source') || 'lp' };

const assets = { lp: 'assets/lp-console.png', cc: 'assets/cc-console.png' };

function navigate(route) { window.location.hash = route; }

function toolbar(active) {
  return `<nav class="prototype-toolbar" aria-label="原型页面切换">
    <span>交互原型</span>
    <button class="${active === 'lp' ? 'active' : ''}" data-route="lp">LP 管台</button>
    <button class="${active === 'cc' ? 'active' : ''}" data-route="cc">CC 管台</button>
  </nav>`;
}

function studentDrawer() {
  return `<div class="drawer-layer" data-drawer hidden>
    <button class="drawer-backdrop" data-close-drawer aria-label="关闭学生详情"></button>
    <aside class="student-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <header class="drawer-header">
        <button class="drawer-close" data-close-drawer aria-label="关闭学生详情"><span>×</span> 关闭</button>
        <div class="drawer-source">来源：${state.source === 'lp' ? 'LP 管台' : 'CC 管台'}</div>
      </header>
      <div class="drawer-body">
        <div class="drawer-heading">
          <h1 id="drawer-title">优学学生详情</h1>
          <p>优学侧学生基础信息、学习档案与权益信息</p>
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
          <div class="rights-wrap"><table class="rights-table">
            <thead><tr><th>权益名称</th><th>权益类型</th><th>状态</th><th>有效期</th><th>最近变更时间</th></tr></thead>
            <tbody><tr><td>优学会员</td><td>会员</td><td><span class="status-tag">使用中</span></td><td>2026–08–28 14:00:21 – 2028–08–27 23:59:59</td><td>2026–08–28 15:22:02</td></tr></tbody>
          </table></div>
        </section>
      </div>
    </aside>
  </div>`;
}

function renderConsole(type, openOnRender = false) {
  state.source = type;
  sessionStorage.setItem('source', type);
  const isLP = type === 'lp';
  app.innerHTML = `<main class="prototype-shell">
    ${toolbar(type)}
    <div class="screen-stage" style="--aspect:${isLP ? 1897 / 937 : 1897 / 900}">
      <img src="${assets[type]}" alt="${isLP ? 'LP' : 'CC'} 管台学生页面" />
      <button class="detail-hotspot ${isLP ? 'lp-hotspot' : 'cc-hotspot'}" data-open-detail aria-label="查看优学学生详情">详情</button>
    </div>
    ${studentDrawer()}
  </main>`;
  if (openOnRender) openDrawer();
}

function openDrawer() {
  const drawer = document.querySelector('[data-drawer]');
  if (!drawer) return;
  drawer.hidden = false;
  document.body.classList.add('drawer-open');
  drawer.querySelector('.drawer-close').focus();
}

function closeDrawer() {
  const drawer = document.querySelector('[data-drawer]');
  if (!drawer || drawer.hidden) return;
  drawer.hidden = true;
  document.body.classList.remove('drawer-open');
  document.querySelector('[data-open-detail]')?.focus();
}

function render() {
  const route = window.location.hash.replace('#', '') || 'lp';
  const legacyStudentRoute = route === 'student';
  renderConsole(legacyStudentRoute ? state.source : route === 'cc' ? 'cc' : 'lp', legacyStudentRoute);
}

document.addEventListener('click', (event) => {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton) navigate(routeButton.dataset.route);
  if (event.target.closest('[data-open-detail]')) openDrawer();
  if (event.target.closest('[data-close-drawer]')) closeDrawer();
});

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDrawer(); });
window.addEventListener('hashchange', render);
render();
