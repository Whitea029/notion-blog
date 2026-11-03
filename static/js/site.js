(() => {
  const page = document.querySelector('[data-search-page]');
  if (page) {
    const articles = JSON.parse(document.getElementById('search-data').textContent);
    const input = document.getElementById('post-search');
    const results = document.getElementById('search-results');
    const status = document.getElementById('search-status');
    const normalize = (value) => value.normalize('NFKC').toLocaleLowerCase();
    const snippet = (article, terms) => {
      const text = article.content.replace(/\s+/g, ' ').trim();
      const position = terms.length ? normalize(text).indexOf(terms[0]) : -1;
      const start = Math.max(0, position - 45);
      return `${start ? '…' : ''}${text.slice(start, start + 150)}${text.length > start + 150 ? '…' : ''}`;
    };
    const render = () => {
      const query = input.value.trim();
      const terms = normalize(query).split(/\s+/).filter(Boolean);
      const matches = articles.map((article) => {
        const title = normalize(article.title);
        const metadata = normalize([...article.tags, ...article.categories].join(' '));
        const content = normalize(article.content);
        if (!terms.every((term) => `${title} ${metadata} ${content}`.includes(term))) return null;
        const score = terms.reduce((total, term) => total + (title.includes(term) ? 10 : 0) + (metadata.includes(term) ? 5 : 0) + (content.includes(term) ? 1 : 0), 0);
        return { article, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score || b.article.date.localeCompare(a.article.date));
      results.replaceChildren();
      const visible = terms.length ? matches : matches.slice(0, 8);
      for (const { article } of visible) {
        const card = document.createElement('a');
        card.className = 'search-result';
        card.href = article.url;
        const date = document.createElement('time');
        date.dateTime = article.date;
        date.textContent = article.date;
        const title = document.createElement('h2');
        title.textContent = article.title;
        const description = document.createElement('p');
        description.textContent = snippet(article, terms);
        const tags = document.createElement('span');
        tags.className = 'search-result-tags';
        tags.textContent = article.tags.join(' / ');
        card.append(date, title, description, tags);
        results.append(card);
      }
      status.textContent = terms.length
        ? matches.length ? `找到 ${matches.length} 篇相关文章` : '没有找到相关文章，换个关键词试试。'
        : `共 ${articles.length} 篇文章，以下是最近发布的内容。`;
    };
    input.value = new URL(window.location.href).searchParams.get('q') || '';
    input.addEventListener('input', render);
    page.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const url = new URL(window.location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      else url.searchParams.delete('q');
      window.history.replaceState(null, '', url);
      render();
    });
    window.addEventListener('popstate', () => {
      input.value = new URL(window.location.href).searchParams.get('q') || '';
      render();
    });
    render();
  }

  const images = document.querySelectorAll('#dream-single-post-content img');
  if (images.length) {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-lightbox';
    dialog.setAttribute('aria-label', '图片预览');
    const close = document.createElement('button');
    close.className = 'image-lightbox-close';
    close.type = 'button';
    close.textContent = '关闭 ×';
    const image = document.createElement('img');
    dialog.append(close, image);
    document.body.append(dialog);
    const dismiss = () => dialog.close();
    close.addEventListener('click', dismiss);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dismiss(); });
    dialog.addEventListener('close', () => { document.documentElement.classList.remove('image-preview-open'); });
    for (const thumbnail of images) {
      const link = thumbnail.closest('[data-image-preview]');
      if (!link) continue;
      link.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        image.src = thumbnail.currentSrc || thumbnail.src;
        image.alt = thumbnail.alt || '文章图片';
        dialog.showModal();
        document.documentElement.classList.add('image-preview-open');
      });
    }
  }

  document.addEventListener('click', (event) => {
    for (const menu of document.querySelectorAll('.site-menu[open]')) {
      if (!menu.contains(event.target)) menu.open = false;
    }
  });
})();
