const config = window.LAURA_CONFIG || {};
const notice = document.getElementById('notice');
const noticeText = document.getElementById('notice-text');
function showSoon(label) {
  noticeText.textContent = `${label}: ainda não está disponível. Nenhum cadastro, download ou pagamento foi iniciado.`;
  notice.hidden = false;
  document.getElementById('notice-close').focus();
}
document.querySelectorAll('[data-link], [data-soon]').forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.soon) return showSoon(button.dataset.soon);
    const url = config[button.dataset.link];
    if (typeof url === 'string' && /^https:\/\//.test(url)) window.location.assign(url);
    else showSoon(button.textContent.trim());
  });
});
document.getElementById('notice-close').addEventListener('click', () => { notice.hidden = true; });
const accountButton = document.getElementById('account-button');
const accountMenu = document.getElementById('account-menu');
accountButton.addEventListener('click', () => { const open = accountMenu.hidden; accountMenu.hidden = !open; accountButton.setAttribute('aria-expanded', String(open)); });
document.addEventListener('click', event => { if (!event.target.closest('.account')) { accountMenu.hidden = true; accountButton.setAttribute('aria-expanded', 'false'); } });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { accountMenu.hidden = true; accountButton.setAttribute('aria-expanded', 'false'); notice.hidden = true; } });
const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', event => { if (event.target.closest('a')) { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); } });
document.querySelectorAll('[data-period]').forEach(button => button.addEventListener('click', () => {
  const annual = button.dataset.period === 'annual';
  document.querySelectorAll('[data-period]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  document.querySelectorAll('.price[data-monthly]').forEach(price => { price.textContent = price.dataset[annual ? 'annual' : 'monthly']; });
  document.querySelectorAll('.period').forEach(period => { period.textContent = `por ${annual ? 'ano' : 'mês'} · valor provisório`; });
}));
